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

type InternalOptions = {
  basePath?: string;
};

export class RequestHandler {
  router = new TrieRouter<RccprHandler>();
  basePath?: string;

  constructor(options?: InternalOptions) {
    if (options?.basePath) {
      this.basePath = options?.basePath;
    }
  }

  requestToInternalResponse = async (
    req: Request
  ): Promise<ResponseInternal> => {
    const url = new URL(req.url.replace(/\/$/, ""));
    const { pathname } = url;

    if (!isSupportedHTTPMethod(req.method)) {
      throw new Error(`Unsupported HTTP method: ${req.method}`);
    }

    const method = req.method;

    const finalPathname = this.basePath
      ? pathname.replace(this.basePath, "")
      : pathname;

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

  toResponse(res: ResponseInternal): Response {
    const headers = new Headers(res.headers);

    res.cookies?.forEach((cookie) => {
      const { name, value, options } = cookie;
      const cookieHeader = serialize(name, value, options);

      if (headers.has("Set-Cookie")) {
        headers.append("Set-Cookie", cookieHeader);
      } else {
        headers.set("Set-Cookie", cookieHeader);
      }
    });

    const body =
      headers.get("content-type") === "application/json"
        ? JSON.stringify(res.body)
        : res.body;

    const response = new Response(body, {
      headers,
      status: res.redirect ? 302 : (res.status ?? 200),
    });

    if (res.redirect) {
      response.headers.set("Location", res.redirect);
    }

    return response;
  }

  processRequest = async (request: Request): Promise<Response> => {
    try {
      const internalResponse = await this.requestToInternalResponse(request);
      return this.toResponse(internalResponse);
    } catch (error) {
      return new Response(
        `Error: There was an error while processing your request.`,
        { status: 400 }
      );
    }
  };
}
