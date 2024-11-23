import { z } from "zod";
import { TrieRouter, Params, ParamIndexMap } from "@rccpr/trie-router";
import { RequestInternal, ResponseInternal } from "./internal.types";
import { readJSONBody } from "./http.helpers";
import { parse as parseCookie, serialize } from "cookie";

enum SupportedHTTPMethod {
  GET = "GET",
  POST = "POST",
}

const isSupportedHTTPMethod = (method: string): method is SupportedHTTPMethod =>
  z.nativeEnum(SupportedHTTPMethod).safeParse(method).success;

export type RccprHandler = (ctx: {
  req: RequestInternal;
  params: Params | ParamIndexMap;
  originalRequest: Request;
}) => ResponseInternal | Promise<ResponseInternal>;

export class Whatever {
  router = new TrieRouter<RccprHandler>();

  processRequest = async (
    req: Request,
    basePath?: string
  ): Promise<ResponseInternal> => {
    const url = new URL(req.url.replace(/\/$/, ""));
    const { pathname } = url;

    if (!isSupportedHTTPMethod(req.method)) {
      throw new Error(`Unsupported HTTP method: ${req.method}`);
    }

    const method = req.method;

    const finalPathname = basePath ? pathname.replace(basePath, "") : pathname;

    const [match] = this.router.match(method, finalPathname);
    if (match.length === 0) {
      throw new Error(`No handler found for ${method} ${finalPathname}`);
    }

    const [handler, params] = match[0];
    const internal = {
      url,
      method,
      headers: Object.fromEntries(req.headers as any),
      body: req.body ? await readJSONBody(req.body) : undefined,
      cookies: parseCookie(req.headers.get("cookie") ?? "") ?? {},
      error: url.searchParams.get("error") ?? undefined,
      query: Object.fromEntries(url.searchParams),
    };

    return handler({
      req: internal,
      params,
      originalRequest: req,
    });
  };
}
