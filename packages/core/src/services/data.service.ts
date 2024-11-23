import { Effect, Context } from "effect";
import type { Jsonifiable } from "type-fest";
import { PaymentIntentStatus, SupportedCurrencies } from "../constants";

export type CreatePaymentParams = {
  serviceName: string;
  externalId: string;
  currency: SupportedCurrencies;
  baseUnit: number;
  metadata?: Jsonifiable;
};

export type PaymentIntent = {
  id: string;
  externalId: string;
  serviceName: string;
  currency: SupportedCurrencies;
  baseUnit: number;
  status: PaymentIntentStatus;
  metadata?: Jsonifiable;
  createdAt: Date;
  updatedAt: Date;
};

export type WithTransactionCallback<T, TransactionCTX> = (
  ctx: TransactionCTX
) => Effect.Effect<T>;

type PlaceholderCTX = { __type: "PlaceholderCTX" };

abstract class Data<TransactionCTX = PlaceholderCTX> {
  public abstract callWithCtx<T>(
    callback: WithTransactionCallback<T, TransactionCTX>
  ): Effect.Effect<T>;
  startTransaction<T>(
    callback: WithTransactionCallback<T, TransactionCTX>
  ): Effect.Effect<T> {
    return this.callWithCtx(callback);
  }

  async createPaymentIntent(
    value: CreatePaymentParams,
    ctx?: TransactionCTX
  ): Promise<PaymentIntent> {
    throw new Error("you must implement createOrder");

    return {} as PaymentIntent;
  }

  async updatePaymentIntent(
    find: Partial<PaymentIntent>,
    update: Partial<PaymentIntent>,
    ctx?: TransactionCTX
  ): Promise<PaymentIntent> {
    throw new Error("you must implement createOrder");

    return {} as PaymentIntent;
  }

  async getOrderByExternalId(value: string): Promise<PaymentIntent | null> {
    throw new Error("you must implement getOrderByExternalId");

    return {} as PaymentIntent;
  }
  async getOrderById(value: string): Promise<PaymentIntent | null> {
    throw new Error("you must implement getOrderByExternalId");

    return {} as PaymentIntent;
  }
}

export class DataService extends Context.Tag("@rccpr/internal/data-service")<
  DataService,
  Data<any>
>() {}
