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
        "**/src/functions/test-session.ts",
        "**/src/utils/queue.ts",
        "**/src/utils/redis.ts",
        "**/src/utils/lollipopKeys.ts",
        "**/src/utils/lollipop.ts",
        "**/src/utils/httpSignature.verifiers.ts",
        "**/src/utils/cosmosdb.ts",
        "**/src/utils/base64.ts",
        "**/src/types/queue-message.ts",
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
