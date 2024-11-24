import {
  Core,
  createMercadoPagoIntegration,
  createStripeIntegration,
} from "@rccpr/core";
import { prismaAdapter } from "@rccpr/adapter-prisma";
import { db } from "@/server/db";
import { env } from "@/env";

const core = new Core({
  basePath: "/api/pay",
  integrations: [
    createMercadoPagoIntegration({
      accessToken:
        "TEST-8340422168007994-070810-1ec6847ac69bb82aedbe7ca2d7035eef-787966996",
    }),
    createStripeIntegration({
      secretKey:
        "sk_test_51QOVu5DzmFO6MtFYBQNrdSkaHe5SR6aHtgblpcYKZp9fMXD9RRA9kVMPoB7B1BoC0I2xMPjlraojdx0Y4rvCywcY00j5xrR7K6",
      publicKey:
        "pk_test_51QOVu5DzmFO6MtFYPwAyxByBsUlLE8jiEx5vCXP2QczXY7Zca32nqfc1DpNrxxZ2j1sNMMKvBuHJyfRbP78lNaNR0028yQ0F7O",
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

const handler = (request: Request) => core.processRequest(request);
export const POST = handler;
export const GET = handler;
