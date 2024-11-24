import { Effect, Layer } from "effect";
import { Readable } from "stream";
import { createIntegration, IntegrationDetail } from "../base-integration";
import { SupportedHTTPMethod } from "../../constants";
import z from "zod";

type FintocHTMLOptions = {
  sessionToken: string;
  publicKey: string;
};

const fintocHTML = (options: FintocHTMLOptions) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0, maximum-scale=1.0"
      />
      <title>Fintoc Demo</title>
      <script src="https://js.fintoc.com/v1/"></script>
    </head>
    <body>
      <script>
        window.onload = () => {
          const widget = Fintoc.create({
            sessionToken: "${options.sessionToken}",
            product: "payments",
            publicKey:  "${options.publicKey}",
          });
          widget.open();
        };
      </script>
    </body>
  </html>
`;

export const createFintocIntegration = () => {
  const name = "fintoc" as const;

  const fintocLive = Layer.succeed(
    IntegrationDetail,
    IntegrationDetail.of({
      name,
      getPaymentIntentStatus(paymentIntentId: string) {
        return Effect.gen(function* () {
          return {} as any;
        });
      },

      createPaymentIntent({ baseUnit, externalId, paymentIntentId }) {
        return Effect.gen(function* () {
          return {} as any;
        });
      },
      handleWebhookRequest: (originalRequest, req) => {
        return {} as any;
      },
      addInternalRoutes: (router) => {
        router.add(
          SupportedHTTPMethod.GET,
          `/integration/${name}/internal/fintoc-html`,
          ({ params }) => {
            const { sessionToken, publicKey } = z
              .object({
                sessionToken: z.string(),
                publicKey: z.string(),
              })
              .parse(params);

            const html = fintocHTML({
              sessionToken,
              publicKey,
            });

            const body = new Readable();
            body.push(html);
            body.push(null);

            return {
              body,
              headers: {
                "Content-Type": "text/html",
              },
            };
          }
        );
      },
    })
  );

  return { [name]: fintocLive.pipe(createIntegration) };
};
