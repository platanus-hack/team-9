import { Context, Effect, Layer } from "effect";
import {
  Integration,
  IntegrationConfigContext,
} from "./integrations/base-integration";
import { DataService } from "./services/data.service";
import { TrieRouter } from "@rccpr/trie-router";
import { RccprHandler } from "./internal.types";
import { SupportedCurrencies, SupportedHTTPMethod } from "./constants";
import z from "zod";
import { processRequest } from "./request-handler";

type Integrations = [
  {
    [T in string]: Layer.Layer<
      Integration,
      never,
      DataService | IntegrationConfigContext
    >;
  },
];

type DataServiceType = Context.Tag.Service<DataService>;
type IntegrationConfigContextType =
  Context.Tag.Service<IntegrationConfigContext>;

type InternalOptions = {
  basePath?: string;
  integrations: Integrations;
  dataService: DataServiceType;
  config: IntegrationConfigContextType;
};

const requestBody = z.object({
  unitBase: z.number().int(),
  currency: z.enum(["USD", "CLP"] as const satisfies SupportedCurrencies[]),
  referenceId: z.string(),
});

class SchemaError {
  readonly _tag = "SchemaError";
}

export class Core {
  router = new TrieRouter<RccprHandler>();
  integrations: Integrations;
  basePath?: string;
  dataServiceLive: Layer.Layer<DataService>;
  configLive: Layer.Layer<IntegrationConfigContext>;

  constructor(options: InternalOptions) {
    if (options.basePath) {
      this.basePath = options?.basePath;
    }
    this.integrations = options.integrations;
    this.dataServiceLive = Layer.succeed(
      DataService,
      DataService.of(options.dataService)
    );
    this.configLive = Layer.succeed(
      IntegrationConfigContext,
      IntegrationConfigContext.of(options.config)
    );
    this.init();
  }

  init() {
    for (const integration of this.integrations) {
      const [integrationName, integrationLive] = Object.entries(integration)[0];

      const newLive = integrationLive.pipe(
        Layer.provide(this.dataServiceLive),
        Layer.provide(this.configLive)
      );

      this.addIntegration(integrationName, newLive);
    }
  }

  addIntegration = (
    integrationName: string,
    integrationLive: Layer.Layer<Integration>
  ) => {
    this.router.add(
      SupportedHTTPMethod.POST,
      `/integration/${integrationName}/create_request`,
      async (ctx) => {
        const program = Effect.gen(function* () {
          const integration = yield* Integration;
          const parsedBody = requestBody.safeParse(ctx.req.body);

          if (!parsedBody.success) {
            return yield* Effect.fail(new SchemaError());
          }
          const paymentIntent = yield* integration.createPaymentIntent({
            baseUnit: parsedBody.data.unitBase,
            currency: parsedBody.data.currency,
            paymentIntentId: parsedBody.data.referenceId,
            externalId: "",
          });

          return {
            headers: { "Content-Type": "application/json" },
            body: paymentIntent,
          };
        }).pipe(
          Effect.catchTags({
            SchemaError: () =>
              Effect.succeed({
                status: 422,
              }),
          })
        );

        const runnable = Effect.provide(program, integrationLive);

        return Effect.runPromise(runnable);
      }
    );
  };
  processRequest = async (req: Request) => {
    return processRequest(this.router, req, this.basePath);
  };
}
