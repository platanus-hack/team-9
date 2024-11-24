import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: {
    ".": "src/index.ts",
  },
  format: ["cjs"],
  target: "node14",
  clean: true,
}));
