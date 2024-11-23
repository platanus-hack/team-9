export type PaymentIntentStatus = "PROCESSING" | "SUCCEEDED" | "FAILED";

export type SupportedCurrencies = "USD" | "CLP";
export const SupportedCurrencies = { USD: "USD", CLP: "CLP" };

export enum SupportedHTTPMethod {
  GET = "GET",
  POST = "POST",
}
