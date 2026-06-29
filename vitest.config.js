import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "browser-unit",
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
          environment: "happy-dom",
        },
      },
    ],
  },
});
