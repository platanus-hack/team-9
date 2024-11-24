import { registryWithContentSchema } from "@/commads/validations";
import { fetchRegistry } from "@/commads/utils";
import { handleErrors } from "@/utils";

export const getSubDependencies = async (paths: string[]) => {
  try {
    const response = await fetchRegistry(paths);
    return registryWithContentSchema.parse(response);
  } catch (error) {
    handleErrors("Failed to connect to the components library.");
    process.exit(0);
  }
};
