import { ProviderName } from "@prisma/client";
import { z } from "zod";

export interface ValidatedProviderTokenType {
  userId: string;
  apikey: string;
}

// Define Zod schemas
export const mercadoPagoType = z.object({
  provider: z.literal(ProviderName.MERCADOPAGO),
  api_key: z.string().min(1, "Access Token is required"),
});

export const fintocType = z.object({
  provider: z.literal(ProviderName.FINTOC),
  api_key: z.string().min(1, "Access Token is required"),
  secret_key: z.string().min(1, "Secret Key is required"),
});

export const apikeysType = z.discriminatedUnion("provider", [
  mercadoPagoType,
  fintocType,
]);

export const apikeysTypes = z.array(apikeysType);

export type EncryptedToken = z.infer<typeof apikeysType>;
export type EncryptedTokens = z.infer<typeof apikeysTypes>;
