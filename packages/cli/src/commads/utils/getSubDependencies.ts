import { registrySchema, registryWithContentSchema } from "../validations";
import { fetchRegistry } from "./fetchRegistry";

export const getSubDependencies = async (paths: string[]) => {
  try {
    const response = await fetchRegistry(paths);
    return registryWithContentSchema.parse(response);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch registry");
  }
};
