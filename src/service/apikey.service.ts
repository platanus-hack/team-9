import { db } from "@/server/db";
import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";

class ApikeyService {
  /**
   * Genera una API key en formato Base32 sin padding.
   */
  generateApiKeyToken(): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
  }

  /**
   * Crea un API key asociado a un usuario, si no tiene uno existente.
   * @param userId ID del usuario.
   */
  async createApiKeyToken(userId: string): Promise<void> {
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId },
    });

    if (existingApiKey) {
      return; // Si ya tiene un API key, no se crea uno nuevo.
    }

    const token = this.generateApiKeyToken();
    await db.apiKey.create({
      data: {
        userId,
        token,
      },
    });
  }

  /**
   * Obtiene el API key de un usuario.
   * @param userId ID del usuario.
   * @returns El token o `null` si no existe.
   */
  async getApiKey(
    userId: string,
  ): Promise<{ token: string; id: string; createdAt: Date } | null> {
    const apiKey = await db.apiKey.findFirst({
      where: { userId },
      select: { token: true, id: true, createdAt: true },
    });

    return apiKey ?? null;
  }

  /**
   * Elimina el API key asociado a un usuario.
   * @param userId ID del usuario.
   * @returns `true` si se elimina correctamente, `false` si no existe.
   */
  async deleteApiKey(userId: string): Promise<boolean> {
    const deleted = await db.apiKey.deleteMany({
      where: { userId },
    });

    await db.providerToken.deleteMany({
      where: { userId },
    });

    return deleted.count > 0; // Devuelve true si se eliminó al menos un registro.
  }

  /**
   * Reemplaza el API key existente por uno nuevo.
   * @param userId ID del usuario.
   * @returns El nuevo token generado.
   */
  async rollKey(userId: string): Promise<string> {
    const existingApiKey = await db.apiKey.findFirst({
      where: { userId },
    });

    if (!existingApiKey) {
      throw new Error("No se encontró un API key para este usuario.");
    }

    const newToken = this.generateApiKeyToken();

    await db.apiKey.update({
      where: { id: existingApiKey.id },
      data: { token: newToken },
    });

    return newToken;
  }
}

export const apiKeyService = new ApikeyService();
