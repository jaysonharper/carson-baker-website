import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { chromium } from "playwright";

describe("CSS Integration Tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("styles should be loaded and applied to main elements", async () => {
    // Navigate to the development server
    await page.goto("http://localhost:5174");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Check that hero section has proper styles
    const heroSection = page.locator(".hero-section");
    await expect(heroSection).toBeVisible();

    const heroStyles = await heroSection.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        minHeight: styles.minHeight,
        position: styles.position,
      };
    });

    expect(heroStyles.display).toBe("flex");
    expect(heroStyles.position).toBe("relative");
    expect(heroStyles.minHeight).toContain("100vh");

    // Check that service highlights grid is properly styled
    const serviceHighlights = page.locator(".service-highlights");
    await expect(serviceHighlights).toBeVisible();

    const gridStyles = await serviceHighlights.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        gridTemplateColumns: styles.gridTemplateColumns,
      };
    });

    expect(gridStyles.display).toBe("grid");
    expect(gridStyles.gridTemplateColumns).toBeTruthy();

    // Check that section titles have gradient text
    const sectionTitle = page.locator(".section-title").first();
    await expect(sectionTitle).toBeVisible();

    const titleStyles = await sectionTitle.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundClip: styles.webkitBackgroundClip || styles.backgroundClip,
        textFillColor: styles.webkitTextFillColor,
      };
    });

    expect(titleStyles.backgroundClip).toBe("text");
    expect(titleStyles.textFillColor).toBe("transparent");
  });

  test("responsive styles should work on mobile viewport", async () => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:5174");
    await page.waitForLoadState("networkidle");

    // Check mobile-specific styles
    const heroTitle = page.locator(".hero-title");
    const titleStyles = await heroTitle.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
      };
    });

    // On mobile, hero title should be smaller (text-4xl instead of text-5xl+)
    const fontSize = parseFloat(titleStyles.fontSize);
    expect(fontSize).toBeLessThan(60); // Less than desktop size

    // Check that service highlights adjusts to mobile grid
    const serviceHighlights = page.locator(".service-highlights");
    const mobileGridStyles = await serviceHighlights.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        gridTemplateColumns: styles.gridTemplateColumns,
      };
    });

    // Should be single column on mobile
    expect(mobileGridStyles.gridTemplateColumns).toContain("1fr");
  });

  test("CSS animations should be working", async () => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("http://localhost:5174");
    await page.waitForLoadState("networkidle");

    // Check that highlight items have hover effects
    const highlightItem = page.locator(".highlight-item").first();
    await expect(highlightItem).toBeVisible();

    // Get initial transform
    const initialTransform = await highlightItem.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // Hover over the element
    await highlightItem.hover();

    // Check that transform changed (hover effect applied)
    await page.waitForTimeout(100); // Wait for transition
    const hoverTransform = await highlightItem.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    expect(hoverTransform).not.toBe(initialTransform);
  });
});
