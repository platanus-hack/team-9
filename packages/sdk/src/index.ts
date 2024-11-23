import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { SupportedCurrencies } from "./supported-currencies";
import type { PaymentIntentOutput } from "@rccpr/core";

type PaySdkOptions = {
  apiURL: string;
  axiosOptions?: AxiosRequestConfig;
};

export class PaySdk {
  axios: AxiosInstance;
  constructor(options: PaySdkOptions) {
    this.axios = axios.create({
      ...(options.axiosOptions ?? {}),
      baseURL: options.apiURL,
    });
  }

  getSupportedCurrencies = async (): Promise<SupportedCurrencies[]> => {
    const response = await this.axios.get<SupportedCurrencies[]>(
      "/general/supported_currencies"
    );

    return response.data;
  };

  getSupportedProviderForCurrency = async (
    currency: SupportedCurrencies
  ): Promise<string[]> => {
    const response = await this.axios.get<string[]>(
      `/general/supported_services/${currency}`
    );

    return response.data;
  };

  requestPaymentLink = async ({
    service,
    selectedCurrency,
    unitBase,
    referenceId,
  }: {
    service: string;
    selectedCurrency: SupportedCurrencies;
    unitBase: number;
    referenceId: string;
  }): Promise<PaymentIntentOutput> => {
    const serviceString = String(service);
    const response = await this.axios.post<PaymentIntentOutput>(
      `/integration/${serviceString}/create_request`,
      {
        currency: selectedCurrency,
        unitBase,
        referenceId,
      }
    );

    return response.data;
  };
}
