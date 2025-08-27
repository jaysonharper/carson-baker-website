import { describe, it, expect } from "vitest";
import { trackEvent } from "./main";

describe("Law Office Main App", () => {
  describe("trackEvent function", () => {
    it("should track events with correct data", () => {
      // Mock console.log to verify tracking
      const originalConsoleLog = console.log;
      const logMessages = [];
      console.log = (...args) => logMessages.push(args);

      trackEvent("phone_call_attempted", { phone_number: "+15555555555" });

      expect(logMessages).toContainEqual([
        "Event tracked:",
        "phone_call_attempted",
        { phone_number: "+15555555555" },
      ]);

      // Restore console.log
      console.log = originalConsoleLog;
    });

    it("should track call button events with enhanced data", () => {
      // Mock console.log to verify tracking
      const originalConsoleLog = console.log;
      const logMessages = [];
      console.log = (...args) => logMessages.push(args);

      trackEvent("phone_call_attempted", {
        phone_number: "+15555555555",
        source: "hero_section",
        button_size: "xl",
        button_variant: "hero",
      });

      expect(logMessages).toContainEqual([
        "Event tracked:",
        "phone_call_attempted",
        {
          phone_number: "+15555555555",
          source: "hero_section",
          button_size: "xl",
          button_variant: "hero",
        },
      ]);

      // Restore console.log
      console.log = originalConsoleLog;
    });
  });
});
