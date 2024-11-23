import { PaySdk } from "@rccpr/sdk";
import { env } from "../env";

export const sdk = new PaySdk({
  apiURL: env.NEXT_PAY_URL,
});

const createExamplePayment = async () => {
  const payment = await sdk.requestPaymentLink({
    service: "mercadopago",
    selectedCurrency: "CLP",
    unitBase: 1000,
    referenceId: "123",
  });
};
