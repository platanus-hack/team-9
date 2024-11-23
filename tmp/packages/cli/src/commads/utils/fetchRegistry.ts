export const fetchRegistry = async (paths: string[]) => {
  try {
    const results = await Promise.all(
      paths.map(async (path) => {
        const response = await fetch(`${process.env.REGISTRY_URL}/${path}`);
        return await response.json();
      })
    );

    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch registry");
  }
};
