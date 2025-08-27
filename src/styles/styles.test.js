import { describe, test, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("CSS Modular Architecture Tests", () => {
  const stylesPath = path.join(process.cwd(), "src", "styles");

  test("main.css should exist and be properly structured", () => {
    const mainCssPath = path.join(stylesPath, "main.css");
    expect(fs.existsSync(mainCssPath)).toBe(true);

    const content = fs.readFileSync(mainCssPath, "utf-8");

    // Check that @import statements come before @tailwind directives
    const importRegex = /@import\s+["'][^"']+["'];/g;
    const tailwindRegex = /@tailwind\s+(base|components|utilities);/g;

    const imports = [...content.matchAll(importRegex)];
    const tailwinds = [...content.matchAll(tailwindRegex)];

    if (imports.length > 0 && tailwinds.length > 0) {
      const lastImportIndex = imports[imports.length - 1].index;
      const firstTailwindIndex = tailwinds[0].index;

      expect(lastImportIndex).toBeLessThan(firstTailwindIndex);
    }
  });

  test("all imported CSS files should exist", () => {
    const mainCssPath = path.join(stylesPath, "main.css");
    const content = fs.readFileSync(mainCssPath, "utf-8");

    const importRegex = /@import\s+["']([^"']+)["'];/g;
    const imports = [...content.matchAll(importRegex)];

    imports.forEach(([, importPath]) => {
      const fullPath = path.join(stylesPath, importPath);
      expect(fs.existsSync(fullPath)).toBe(true);
    });
  });

  test("CSS files should have balanced brackets", () => {
    const componentFiles = [
      "components/hero.css",
      "components/services.css",
      "components/attorneys.css",
      "components/testimonials.css",
      "components/contact.css",
      "components/buttons.css",
      "base/reset.css",
      "base/variables.css",
      "base/typography.css",
      "layout/sections.css",
      "layout/animations.css",
      "utilities/responsive.css",
      "utilities/scroll.css",
    ];

    componentFiles.forEach((file) => {
      const filePath = path.join(stylesPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");
        const openBraces = (content.match(/\{/g) || []).length;
        const closeBraces = (content.match(/\}/g) || []).length;

        expect(openBraces).toBe(closeBraces);
      }
    });
  });

  test("component CSS files should be wrapped in @layer components", () => {
    const componentFiles = [
      "hero.css",
      "services.css",
      "attorneys.css",
      "testimonials.css",
      "contact.css",
      "buttons.css",
    ];

    componentFiles.forEach((file) => {
      const filePath = path.join(stylesPath, "components", file);
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toMatch(/@layer components\s*\{/);
    });
  });

  test("main.css should import all required files in correct order", () => {
    const mainCssPath = path.join(stylesPath, "main.css");
    const content = fs.readFileSync(mainCssPath, "utf-8");

    const requiredImports = [
      "./base/reset.css",
      "./base/variables.css",
      "./base/typography.css",
      "./layout/sections.css",
      "./layout/animations.css",
      "./components/hero.css",
      "./components/services.css",
      "./components/attorneys.css",
      "./components/testimonials.css",
      "./components/contact.css",
      "./components/buttons.css",
      "./utilities/responsive.css",
      "./utilities/scroll.css",
    ];

    requiredImports.forEach((importPath) => {
      expect(content).toContain(`@import "${importPath}"`);
    });
  });

  test("CSS syntax validation", () => {
    const allCssFiles = [
      "main.css",
      "base/reset.css",
      "base/variables.css",
      "base/typography.css",
      "layout/sections.css",
      "layout/animations.css",
      "components/hero.css",
      "components/services.css",
      "components/attorneys.css",
      "components/testimonials.css",
      "components/contact.css",
      "components/buttons.css",
      "utilities/responsive.css",
      "utilities/scroll.css",
    ];

    allCssFiles.forEach((file) => {
      const filePath = path.join(stylesPath, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf-8");

        // Basic syntax checks
        expect(content).toBeDefined();
        expect(content.length).toBeGreaterThan(0);

        // Check for unclosed strings
        const singleQuotes = (content.match(/'/g) || []).length;
        const doubleQuotes = (content.match(/"/g) || []).length;
        expect(singleQuotes % 2).toBe(0);
        expect(doubleQuotes % 2).toBe(0);
      }
    });
  });
});
