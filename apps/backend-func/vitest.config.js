import { defineConfig } from "vite";

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
        "**/src/functions/load-test.ts",
        "**/src/functions/get-years.ts",
      ],
      include: ["**/__tests__/*.test.ts", "**/src/**/*.ts"],
      reporter: ["text", "html"],
    },
    globals: true,
    typecheck: {
      ignoreSourceErrors: true,
    },
  },
});
