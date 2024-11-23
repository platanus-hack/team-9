import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { SupportedCurrencies } from "./supported-currencies";
import type { PaymentIntentOutput } from "@rccpr/core";

type NextPaySdkOptions = {
  apiURL: string;
  axiosOptions?: AxiosRequestConfig;
};

export class NextPaySdk {
  axios: AxiosInstance;
  constructor(options: NextPaySdkOptions) {
    this.axios = axios.create({
      ...(options.axiosOptions ?? {}),
      baseURL: options.apiURL,
    });
  }

  getSupportedCurrencies = async () => {
    const response = await this.axios.get<SupportedCurrencies[]>(
      "/general/supported_currencies"
    );

    return response.data;
  };

  getSupportedProviderForCurrency = async (currency: SupportedCurrencies) => {
    const response = await this.axios.get<string[]>(
      `/general/supported_services/${currency}`
    );

    return response.data;
  };

  requestPaymentLink = async ({
    service,
    selectedCurrency,
    amount,
    referenceId,
    name,
  }: {
    service: string;
    selectedCurrency: SupportedCurrencies;
    amount: string | number;
    referenceId: string;
    name?: string;
  }) => {
    const serviceString = String(service);
    const response = await this.axios.post<PaymentIntentOutput>(
      `/integration/${serviceString}/create_request`,
      {
        currency: selectedCurrency,
        amount,
        referenceId,
        name,
      }
    );

    return response.data;
  };
}
