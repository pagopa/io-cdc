import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "**/index.ts",
        "**/generated/**/*.ts",
        "**/clients/**/*.ts",
        "**/src/config.ts",
        "**/src/main.ts",
        "**/src/functions/info.ts",
      ],
      include: ["**/__tests__/*.test.ts", "**/src/**/*.ts"],
      reporter: ["text", "html"],
    },
    globals: true,
    typecheck: {
      ignoreSourceErrors: true,
    },
    exclude: [...configDefaults.exclude],
  },
});
