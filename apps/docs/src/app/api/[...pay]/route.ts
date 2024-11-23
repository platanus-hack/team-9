import { Core, createMercadoPagoIntegration } from "@rccpr/core";
import { prismaAdapter } from "@rccpr/adapter-prisma";
import { db } from "../../../server/db";
import { env } from "../../../env";

const core = new Core({
  basePath: "/api/pay",
  integrations: [
    createMercadoPagoIntegration({
      accessToken: env.MP_ACCESS_TOKEN,
    }),
  ],
  adapter: prismaAdapter(db),
  config: {
    onApproved(data) {
      console.log(data);
    },
    onPending(data) {
      console.log(data);
    },
    onRejected(data) {
      console.log(data);
    },
  },
});

export const POST = (request: Request) => core.processRequest(request);
