import { expect, it, describe } from "vitest";

import { processRequest } from "./core";

describe("processRequest", () => {
  it("should return pathname from URL", async () => {
    const request = new Request("https://example.com/test/path");

    const result = await processRequest(request);
    expect(result).toBe("/test/path");
  });

  it("should remove trailing slash from URL", async () => {
    const request = new Request("https://example.com/test/path/");

    const result = await processRequest(request);
    expect(result).toBe("/test/path");
  });

  it("should handle root path", async () => {
    const request = new Request("https://example.com/");

    const result = await processRequest(request);
    expect(result).toBe("/");
  });
});
