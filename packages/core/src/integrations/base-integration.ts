import { Console, Context, Effect, Either, Layer } from "effect";
import { PaymentIntentStatus, SupportedCurrencies } from "../constants";
import { DataService, PaymentIntent } from "../services/data.service";
type Detail = {
  name: string;
  createPaymentIntent(options: {
    baseUnit: number;
    paymentIntentId: string;
    externalId: string;
    currency: SupportedCurrencies;
  }): Effect.Effect<{ id: string; link: string }>;

  /**
   * Check against the implemented service in which status the order is.
   *
   * Which ever status the service has must be map to either `APPROVED`, `PENDING` or `REJECTED`.
   */
  getPaymentIntentStatus(
    paymentIntentId: string
  ): Effect.Effect<{ status: PaymentIntentStatus }>;
};
export class IntegrationDetail extends Context.Tag(
  "@rccpr/internal/integration-detail"
)<IntegrationDetail, Detail>() {}

class Integration extends Context.Tag("@rccpr/internal/integration-detail")<
  Integration,
  Detail & {
    onApproved: (paymentIntentId: string) => Effect.Effect<void>;
    onRejected: (paymentIntentId: string) => Effect.Effect<void>;
    onPending: (paymentIntentId: string) => Effect.Effect<void>;
  }
>() {}

export type CallbackData = {
  body: Record<string, any> | undefined;
  integrationName: string;
  paymentIntent?: PaymentIntent | null;
};

type IntegrationConfig = {
  /**
   * Executes right after updating the payment status on APPROVED payments
   * @param integrationName - i.e: PAYPAL, MERCADOPAGO
   * @param id - Payment internal (next-pay)
   * @param clientName - Next-pay client name, useful if you have more than one integration per payment provider
   */
  onApproved: (data: CallbackData) => Promise<void> | void;

  /**
   * Executes right after updating the payment status on REJECTED payments
   * @param integrationName - i.e: PAYPAL, MERCADOPAGO
   * @param id - Payment internal (next-pay)
   * @param clientName - Next-pay client name, useful if you have more than one integration per payment provider
   */
  onRejected: (data: CallbackData) => Promise<void> | void;
  /**
   * Executes right after updating the payment status on PENDING payments
   * @param integrationName - i.e: PAYPAL, MERCADOPAGO
   * @param id - Payment internal (next-pay)
   * @param clientName - Next-pay client name, useful if you have more than one integration per payment provider
   */
  onPending: (data: CallbackData) => Promise<void> | void;
};

class IntegrationConfigContext extends Context.Tag(
  "@rccpr/internal/integration-config"
)<IntegrationConfigContext, IntegrationConfig>() {}

const IntegrationLive = Layer.effect(
  Integration,
  Effect.gen(function* () {
    const dataService = yield* DataService;
    const details = yield* IntegrationDetail;
    const integrationConfig = yield* IntegrationConfigContext;

    return {
      createPaymentIntent: (options) =>
        Effect.gen(function* () {
          const paymentIntent = yield* Effect.promise(() =>
            dataService.createPaymentIntent({
              baseUnit: options.baseUnit,
              currency: options.currency,
              externalId: "not_set",
              serviceName: details.name,
            })
          );

          if (!paymentIntent) throw new Error(`couldn't create payment intent`);

          const docId = paymentIntent.id.toString();

          const payment = yield* details.createPaymentIntent({
            baseUnit: options.baseUnit,
            paymentIntentId: docId,
            externalId: options.externalId,
            currency: options.currency,
          });

          yield* Effect.promise(() =>
            dataService.updatePaymentIntent(
              { id: docId },
              {
                externalId: payment.id,
              }
            )
          );
          return payment;
        }),
      getPaymentIntentStatus: (paymentIntentId) =>
        Effect.gen(function* () {
          return yield* details.getPaymentIntentStatus(paymentIntentId);
        }),
      name: details.name,
      onRejected: (paymentIntentId) =>
        Effect.gen(function* () {
          yield* Effect.promise(() =>
            dataService.updatePaymentIntent(
              { id: paymentIntentId },
              {
                status: "FAILED",
              }
            )
          );
          const result = yield* Effect.either(
            Effect.tryPromise(() => dataService.getOrderById(paymentIntentId))
          );

          if (Either.isLeft(result)) {
            return;
          }
          if (!result.right) {
            return;
          }
          const paymentIntent = result.right;

          yield* Effect.tryPromise(() =>
            (async () =>
              integrationConfig.onRejected({
                body: paymentIntent,
                integrationName: details.name,
                paymentIntent,
              }))()
          ).pipe(Effect.catchAll((e) => Console.log("Error")));

          return;
        }),
      onApproved: (paymentIntentId) =>
        Effect.gen(function* () {
          yield* Effect.promise(() =>
            dataService.updatePaymentIntent(
              { id: paymentIntentId },
              {
                status: "SUCCEEDED",
              }
            )
          );
          const result = yield* Effect.either(
            Effect.tryPromise(() => dataService.getOrderById(paymentIntentId))
          );

          if (Either.isLeft(result)) {
            return;
          }
          if (!result.right) {
            return;
          }
          const paymentIntent = result.right;

          yield* Effect.tryPromise(() =>
            (async () =>
              integrationConfig.onApproved({
                body: paymentIntent,
                integrationName: details.name,
                paymentIntent,
              }))()
          ).pipe(Effect.catchAll((e) => Console.log("Error")));

          return;
        }),
      onPending: (paymentIntentId) =>
        Effect.gen(function* () {
          const result = yield* Effect.either(
            Effect.tryPromise(() => dataService.getOrderById(paymentIntentId))
          );

          if (Either.isLeft(result)) {
            return;
          }
          if (!result.right) {
            return;
          }
          const paymentIntent = result.right;

          yield* Effect.tryPromise(() =>
            (async () =>
              integrationConfig.onPending({
                body: paymentIntent,
                integrationName: details.name,
                paymentIntent,
              }))()
          ).pipe(Effect.catchAll((e) => Console.log("Error")));

          return;
        }),
    };
  })
);

export const createIntegration = (
  integrationDetail: Layer.Layer<IntegrationDetail>
) => {
  return IntegrationLive.pipe(Layer.provide(integrationDetail));
};
