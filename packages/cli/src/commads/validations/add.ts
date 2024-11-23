import { z } from "zod";

export const addOptionsSchema = z.object({
  components: z.array(z.string()).optional(),
});
