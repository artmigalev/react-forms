import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import removeConsole from "vite-plugin-remove-console";
import { configDefaults } from "vitest/config";
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    removeConsole({ custom: ["console.log()", "console.warn()", "debugger"] }),
  ],
  test: {
    root: "./",
    dir: "./src/test-utils/",

    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-tests.ts",
    exclude: [...configDefaults.exclude],
    passWithNoTests: true,
    coverage: {
      provider: "v8",
      reporter: ["text"],
      enabled: true,
      cleanOnRerun: true,
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/**/*.test.{js,jsx,ts,tsx}",
        "src/**/*.spec.{js,jsx,ts,tsx}",
        "src/index.{js,jsx,ts,tsx}",
        "src/setupTests.{js,ts}",
        "src/**/*.d.ts",
      ],
    },
    deps: {
      optimizer: {
        web: { enabled: true },
      },
    },
    watch: true,
    clearMocks: true,
    mockReset: true,
  },
});
