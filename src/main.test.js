/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from "vitest";

// Hoist IntersectionObserver stub so it exists before app.main.js module code runs
vi.hoisted(() => {
  globalThis.IntersectionObserver = class {
    observe() {}
    disconnect() {}
    unobserve() {}
  };
});

// Prevent CSS and component side-effect imports from breaking the test environment
vi.mock("./styles/main.css", () => ({}));
vi.mock("./components/index.js", () => ({}));

import { trackEvent } from "./app.main.js";

describe("Law Office Main App", () => {
  describe("trackEvent function", () => {
    it("should track events with correct data", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      trackEvent("phone_call_attempted", { phone_number: "+15032889291" });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Event tracked:",
        "phone_call_attempted",
        { phone_number: "+15032889291" },
      );

      consoleSpy.mockRestore();
    });

    it("should track call button events with enhanced data", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      trackEvent("phone_call_attempted", {
        phone_number: "+15032889291",
        source: "hero_section",
        button_size: "xl",
        button_variant: "hero",
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "Event tracked:",
        "phone_call_attempted",
        {
          phone_number: "+15032889291",
          source: "hero_section",
          button_size: "xl",
          button_variant: "hero",
        },
      );

      consoleSpy.mockRestore();
    });

    it("should handle events with no data object", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      trackEvent("page_view", undefined);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Event tracked:",
        "page_view",
        undefined,
      );

      consoleSpy.mockRestore();
    });
  });
});
