/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from "vitest";

describe("click behavior (DOM)", () => {
  it("toggles app-active class and button text on click", async () => {
    // Prepare DOM before importing the module so it can attach listeners
    document.body.innerHTML = `
      <div id="app">
        <button id="btn">Click me</button>
      </div>
    `;

    // Clear module cache so importing will re-run top-level code
    await vi.resetModules();

    // Import the module after DOM is ready
    await import("./main.js");

    const app = document.getElementById("app");
    const btn = document.getElementById("btn");

    expect(btn.textContent).toBe("Click me");

    // First click -> active (utility classes added)
    btn.click();
    expect(app.classList.contains("scale-99")).toBe(true);
    expect(app.classList.contains("transition-transform")).toBe(true);
    expect(btn.textContent).toBe("Clicked ✓");

    // Second click -> not active (utility classes removed)
    btn.click();
    expect(app.classList.contains("scale-99")).toBe(false);
    expect(app.classList.contains("transition-transform")).toBe(false);
    expect(btn.textContent).toBe("Click me");
  });
});
