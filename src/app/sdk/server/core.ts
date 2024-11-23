export const processRequest = async (req: Request) => {
  const url = new URL(req.url.replace(/\/$/, ""));
  const { pathname } = url;

  return pathname;
};
