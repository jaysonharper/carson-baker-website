/**
 * @vitest-environment jsdom
 *
 * Integration tests: verify exported app functions behave correctly in a
 * realistic DOM environment, without needing a live dev server.
 */
import { vi } from "vitest";

// Stub IntersectionObserver before app.main.js module code executes
vi.hoisted(() => {
  globalThis.IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
  };
});

// Prevent CSS and Lit component side-effect imports from failing in jsdom
vi.mock("../../src/styles/main.css", () => ({}));
vi.mock("../../src/components/index.js", () => ({}));

import { describe, it, expect } from "vitest";
import { trackEvent, scrollToService } from "../../src/app.main.js";

describe("trackEvent", () => {
  it("logs the event name and data to console", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    trackEvent("test_event", { key: "value" });

    expect(spy).toHaveBeenCalledWith("Event tracked:", "test_event", {
      key: "value",
    });

    spy.mockRestore();
  });

  it("works when called with no data argument", () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    trackEvent("bare_event", undefined);

    expect(spy).toHaveBeenCalledWith("Event tracked:", "bare_event", undefined);

    spy.mockRestore();
  });
});

describe("scrollToService", () => {
  it("returns false when the target element does not exist", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = scrollToService("nonexistent-id");
    expect(result).toBe(false);
    spy.mockRestore();
  });

  it("returns true and calls window.scrollTo when the target exists", () => {
    const target = document.createElement("div");
    target.id = "service-corporate-law";
    document.body.appendChild(target);

    window.scrollTo = vi.fn();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    const result = scrollToService("service-corporate-law", {
      source: "test",
    });

    expect(result).toBe(true);
    expect(window.scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: "smooth" }),
    );

    document.body.removeChild(target);
    spy.mockRestore();
  });

  it("adds and removes highlight-flash class on the target element", () => {
    vi.useFakeTimers();

    const target = document.createElement("div");
    target.id = "service-family-law";
    document.body.appendChild(target);

    window.scrollTo = vi.fn();
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    scrollToService("service-family-law");

    expect(target.classList.contains("highlight-flash")).toBe(true);

    vi.advanceTimersByTime(2100);
    expect(target.classList.contains("highlight-flash")).toBe(false);

    document.body.removeChild(target);
    spy.mockRestore();
    vi.useRealTimers();
  });
});
