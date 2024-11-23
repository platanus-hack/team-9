import { registrySchema } from "@/commads/validations";
import { fetchRegistry } from "./fetchRegistry";

export const getRegistry = async () => {
  try {
    const [response] = await fetchRegistry(["index.json"]);
    return registrySchema.parse(response);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch registry");
  }
};
