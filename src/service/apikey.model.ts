import { ProviderName } from "@prisma/client";
import { z } from "zod";

export interface ValidatedProviderTokenType {
  userId: string;
  apikey: string;
}

// Define Zod schemas
export const mercadoPagoType = z.object({
  provider: z.literal(ProviderName.MERCADOPAGO),
  active: z.boolean().default(false),
  api_key: z.string(),
});

export const fintocType = z.object({
  provider: z.literal(ProviderName.FINTOC),
  active: z.boolean().default(false),
  api_key: z.string(),
  secret_key: z.string(),
});

export const apikeysType = z.discriminatedUnion("provider", [
  mercadoPagoType,
  fintocType,
]);

export const apikeysTypes = z.array(apikeysType);

export type EncryptedToken = z.infer<typeof apikeysType>;
export type EncryptedTokens = z.infer<typeof apikeysTypes>;
