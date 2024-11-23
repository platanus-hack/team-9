import { z } from "zod";
import { TrieRouter } from "../../trie-router/dist";

enum SupportedHTTPMethod {
  GET = "GET",
  POST = "POST",
}

const isSupportedHTTPMethod = (method: string): method is SupportedHTTPMethod =>
  z.nativeEnum(SupportedHTTPMethod).safeParse(method).success;

export const processRequest = async (req: Request, basePath?: string) => {
  const url = new URL(req.url.replace(/\/$/, ""));
  const { pathname } = url;

  if (!isSupportedHTTPMethod(req.method)) {
    throw new Error(`Unsupported HTTP method: ${req.method}`);
  }

  const method = req.method;

  const finalPathname = basePath ? pathname.replace(basePath, "") : pathname;

  return pathname;
};

const router = new TrieRouter<string>();

router.add("GET", "/hello", "Hello, world!");
