import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      // Browser project: full DOM tests that need a real Chromium runtime.
      // Requires: npx playwright install chromium
      {
        extends: true,
        test: {
          name: "browser",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [{ browser: "chromium" }],
          },
          include: [
            "src/components/flow-attorney-card.test.js",
            "src/**/*.dom.test.js",
          ],
        },
      },
      // Node project: unit and integration tests, per-file @vitest-environment
      // annotations are honoured (e.g. jsdom for component tests).
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["src/**/*.test.js", "tests/**/*.js"],
          exclude: [
            "src/stories/**/*",
            "src/**/*.stories.js",
            "src/**/*.dom.test.js",
            "src/styles/css-integration.test.js",
            "src/components/flow-attorney-card.test.js",
          ],
        },
      },
    ],
  },
});
