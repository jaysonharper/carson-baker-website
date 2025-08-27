import { describe, test, expect } from "vitest";
import { build } from "vite";
import path from "path";
import fs from "fs/promises";

describe("CSS Compilation Tests", () => {
  test("CSS should compile without errors", async () => {
    const config = {
      build: {
        write: false, // Don't write files, just test compilation
        rollupOptions: {
          input: path.resolve(process.cwd(), "src/styles/main.css"),
          output: {
            format: "es",
          },
        },
      },
      logLevel: "silent", // Suppress logs during test
    };

    // This should not throw an error
    await expect(build(config)).resolves.toBeDefined();
  });

  test("Individual CSS files should be valid", async () => {
    const cssFiles = [
      "src/styles/base/reset.css",
      "src/styles/base/variables.css",
      "src/styles/base/typography.css",
      "src/styles/components/hero.css",
      "src/styles/components/services.css",
      "src/styles/layout/sections.css",
    ];

    for (const cssFile of cssFiles) {
      try {
        const content = await fs.readFile(
          path.resolve(process.cwd(), cssFile),
          "utf-8"
        );

        // Basic CSS syntax validation
        expect(content).toBeDefined();
        expect(content.length).toBeGreaterThan(0);

        // Check for balanced braces
        const openBraces = (content.match(/{/g) || []).length;
        const closeBraces = (content.match(/}/g) || []).length;
        expect(openBraces).toBe(closeBraces);

        // Check for proper @layer syntax if present
        if (content.includes("@layer")) {
          expect(content).toMatch(/@layer\s+\w+\s*{[\s\S]*}/);
        }
      } catch (error) {
        throw new Error(`CSS file ${cssFile} is invalid: ${error.message}`);
      }
    }
  });
});
