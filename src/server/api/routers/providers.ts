import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { providerService } from "@/service/provider.service";
import { ProviderName } from "@prisma/client";
import {
  apikeysTypes,
  type ValidatedProviderTokenType,
} from "@/service/apiKey.model";

/**
 * Router para manejar las operaciones de los tokens de proveedores con tRPC.
 */
export const providerRouter = createTRPCRouter({
  /**
   * Crear múltiples tokens de proveedor para un usuario.
   */
  createProviders: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        encryptedTokens: apikeysTypes,
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, encryptedTokens } = input;

      await providerService.createProviders(encryptedTokens, userId);
      return { message: "Providers created successfully." };
    }),

  /**
   * Obtener todos los tokens activos de un usuario.
   */
  getProviders: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    const providerTokens = await providerService.getProviderTokens(userId);
    return providerTokens;
  }),

  /**
   * Eliminar (desactivar) un token de proveedor específico.
   */
  deleteProviderToken: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        providerName: z.nativeEnum(ProviderName),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, providerName } = input;

      const isDeleted = await providerService.deleteProviderToken(
        userId,
        providerName,
      );
      if (!isDeleted) {
        throw new Error("Provider token not found or already inactive.");
      }
      return { message: "Provider token deleted successfully." };
    }),

  /**
   * Validar si un usuario es propietario de una API key.
   */
  validateIsUserOwner: protectedProcedure
    .input(
      z.object({
        userId: z.string().uuid(),
        apikey: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, apikey } = input;

      const isOwner = await providerService.validateIsUserOwner(userId, apikey);
      return { isOwner };
    }),

  /**
   * Obtener y desencriptar los tokens de proveedores asociados a un usuario.
   */
  getProviderSecrets: protectedProcedure
    .input(
      z.object({
        apikey: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const validatedInput: ValidatedProviderTokenType = {
        userId: ctx.user.id,
        apikey: input.apikey,
      };

      const providerSecrets =
        await providerService.getProviderSecrets(validatedInput);
      if (!providerSecrets) {
        throw new Error("No active provider tokens found.");
      }

      return providerSecrets;
    }),
});
