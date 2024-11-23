import { type SerializeOptions } from "cookie";

export type RequestInternal = {
  url: URL;
  method: string;
  headers: {
    [k: string]: string;
  };
  body: Record<string, any> | undefined;
  cookies: Record<string, string | undefined>;
  error: string | undefined;
  query: {
    [k: string]: string;
  };
};
interface CookieOption {
  name: string;
  options: SerializeOptions;
}
interface Cookie extends CookieOption {
  value: string;
}

export interface ResponseInternal<
  Body extends string | Record<string, any> | any[] = any,
> {
  status?: number;
  headers?: Record<string, string>;
  body?: Body;
  redirect?: string;
  cookies?: Cookie[];
}
