import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["**/index.ts"],
      include: ["**/__tests__/*.test.ts"],
      reporter: ["text", "html"],
    },
    globals: true,
    typecheck: {
      ignoreSourceErrors: true,
    },
  },
});
