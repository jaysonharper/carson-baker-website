import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.js", "!src/**/*.stories.js"],
    exclude: [
      "src/stories/**/*",
      "src/**/*.dom.test.js", // Exclude DOM tests that need browser
      "src/main.test.js", // Exclude main.js tests that need browser APIs
      "src/styles/css-integration.test.js", // Exclude integration tests that need browser
      "src/components/flow-attorney-card.test.js", // Exclude complex web component tests that need browser (keeping simple version)
    ],
  },
});
