import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { apiKeyService } from "@/service/apiKey.service";

export const apiKeyRouter = createTRPCRouter({
  /**
   * Crear una API key para el usuario autenticado.
   * Si ya existe, no hace nada.
   */
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user.id;
    await apiKeyService.createApiKeyToken(userId);
    return { message: "API key creada exitosamente (si no existía)." };
  }),

  /**
   * Obtener la API key del usuario autenticado.
   */
  get: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const apiKey = await apiKeyService.getApiKey(userId);

    if (!apiKey) {
      throw new Error("No se encontró un API key para este usuario.");
    }

    return { token: apiKey };
  }),

  /**
   * Eliminar la API key del usuario autenticado.
   */
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user.id;
    const success = await apiKeyService.deleteApiKey(userId);

    if (!success) {
      throw new Error("No se encontró un API key para eliminar.");
    }

    return { message: "API key eliminada exitosamente." };
  }),

  /**
   * Reemplazar la API key existente por una nueva.
   */
  roll: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user.id;
    const newToken = await apiKeyService.rollKey(userId);

    return { message: "API key reemplazada exitosamente.", token: newToken };
  }),
});
