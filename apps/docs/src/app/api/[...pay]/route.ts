import { Core, createMercadoPagoIntegration } from "@rccpr/core";

const mockData = {
  id: "asdasda",
  externalId: "asdasda",
  serviceName: "mercadopago",
  currency: "CLP",
  baseUnit: 1000,
  status: "PROCESSING",
  createdAt: new Date(),
  updatedAt: new Date(),
} as const;

const core = new Core({
  basePath: "/api/pay",
  integrations: [
    createMercadoPagoIntegration({
      accessToken: "sdada",
    }),
  ],
  dataService: {
    async updatePaymentIntent(...args: any[]) {
      return mockData;
    },
    callWithCtx(callback) {
      return callback({ __type: "PlaceholderCTX" });
    },
    async startTransaction(callback) {
      return callback({ __type: "PlaceholderCTX" });
    },
    async createPaymentIntent() {
      return mockData;
    },
    async getOrderByExternalId(id: string) {
      return mockData;
    },
    async getOrderById(id: string) {
      return mockData;
    },
  },
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
