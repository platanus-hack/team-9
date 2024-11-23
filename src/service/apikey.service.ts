import {
  apikeysType,
  type EncryptedToken,
  type EncryptedTokens,
} from "@/components/payments-provider";
import { db } from "@/server/db";
import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
  decodeBase32,
  decodeHex,
} from "@oslojs/encoding";
import { type ProviderToken } from "@prisma/client";
import { type ValidatedProviderTokenType } from "./apikey.model";

class ApikeyService {
  /**
   * Genera una API key en formato Base32 sin padding.
   */
  generateApikeyToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
  }

  /**
   * Genera un token para el proveedor basado en un hash SHA-256 y lo codifica en Hex.
   */
  generateProviderTokens(
    providerToken: EncryptedToken,
  ): ProviderToken["token"] {
    return encodeHexLowerCase(
      sha256(new TextEncoder().encode(JSON.stringify(providerToken))),
    );
  }

  /**
   * Crea registros para múltiples tokens de proveedor en la base de datos.
   */
  async createProviders(
    encryptedTokens: EncryptedTokens,
    userId: ProviderToken["userId"],
  ): Promise<void> {
    const data = encryptedTokens.map((provider) => ({
      userId,
      providerName: provider.provider,
      token: this.generateProviderTokens(provider),
    }));
    await db.providerToken.createMany({ data });
  }

  /**
   * Convierte un Uint8Array en string (usado para decodificaciones).
   */
  private uint8ArrayToString(array: Uint8Array): string {
    return new TextDecoder().decode(array);
  }

  /**
   * Valida si un usuario es el propietario de una API key.
   */
  async validateIsUserOwner(userId: string, apikey: string): Promise<boolean> {
    // Decodifica la apikey desde Base32
    const decodedApikey = decodeBase32(apikey);
    if (!decodedApikey) {
      throw new Error("Invalid apikey");
    }

    const decodedString = this.uint8ArrayToString(decodedApikey);

    // Busca la API key en la base de datos
    const isOwnerApikey = await db.apiKey.findFirst({
      where: { userId, token: decodedString },
    });

    if (!isOwnerApikey) {
      throw new Error("Invalid user for apikey");
    }

    return true;
  }

  /**
   * Valida el token del proveedor y realiza el decode desde Hex para obtener el token original.
   */
  async validateProviderToken(
    input: ValidatedProviderTokenType,
  ): Promise<EncryptedTokens | null> {
    // Valida si el usuario es propietario de la API key
    await this.validateIsUserOwner(input.userId, input.apikey);

    // Busca un token activo del proveedor
    const providerTokens = await db.providerToken.findMany({
      where: { active: true, userId: input.userId },
    });

    if (!providerTokens) {
      return null;
    }
    const parsedTokens = providerTokens.map(
      ({ token, providerName }) => {
        const decodedToken = decodeHex(token);
        const decodedString = this.uint8ArrayToString(decodedToken);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const anyForm = JSON.parse(decodedString);
        return apikeysType.parse({
          ...anyForm,
          provider: providerName,
        });
      },

      // Decodifica el token desde Hex y retorna como string
    );
    return parsedTokens;
  }
}

export const apikeyService = new ApikeyService();
