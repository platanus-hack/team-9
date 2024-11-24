import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  /**
   * Obtener la API key del usuario autenticado.
   */
  get: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return {userId};
  }),
});
