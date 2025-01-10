import { defineConfig } from "vite";
import { playwrightLauncher } from "@web/test-runner-playwright";

export default defineConfig({
  root: "./",
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: "chromium" }),
  ],
  files: "test/**/*.test.js",
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
  },
  assetsInclude: ["**/*.woff", "**/*.woff2", "**/*.ttf"],
});
