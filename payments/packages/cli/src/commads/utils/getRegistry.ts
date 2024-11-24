import { registrySchema } from "@/commads/validations";
import { fetchRegistry } from "@/commads/utils";
import { handleErrors } from "@/utils";

export const getRegistry = async () => {
  try {
    const [response] = await fetchRegistry(["index.json"]);
    return registrySchema.parse(response);
  } catch (error) {
    handleErrors("Failed to connect to the components library.");
    process.exit(0);
  }
};
