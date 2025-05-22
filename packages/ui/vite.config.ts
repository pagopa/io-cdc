import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      fileName: (format) => `index.${format}.js`,
      name: "@io-cdc/ui",
    },
    sourcemap: false,
  },
  plugins: [react(), dts({ rollupTypes: true }), externalizeDeps()],
});
