import { registrySchema } from "../validations";
import { fetchRegistry } from "./fetchRegistry";

export const getSubDependency = async (path: string) => {
  try {
    const response = await fetchRegistry([path]);
    return registrySchema.parse(response);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch registry");
  }
};
