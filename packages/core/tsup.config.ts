import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    ".": "src/index.tsx",
  },
  format: ["cjs", "esm"],
  external: ["react"],
  noExternal: ["@rccpr/trie-router"],
  dts: true,
});
