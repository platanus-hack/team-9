import { processRequest } from "@/app/sdk/server/core";

export const POST = async (req: Request) => {
  const processed = await processRequest(req);
  return Response.json({ processed });
};

export const GET = async (req: Request) => {
  const processed = await processRequest(req);
  return Response.json({ processed });
};
