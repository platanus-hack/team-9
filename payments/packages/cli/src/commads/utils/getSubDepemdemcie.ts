import { handleErrors } from "@/utils";
import { registrySchema } from "@/commads/validations";
import { fetchRegistry } from "@/commads/utils";

export const getSubDependency = async (path: string) => {
  try {
    const response = await fetchRegistry([path]);
    return registrySchema.parse(response);
  } catch (error) {
    handleErrors("Failed to connect to the components library.");
    process.exit(0);
  }
};
