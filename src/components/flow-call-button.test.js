/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { FlowCallButton } from "./flow-call-button.js";

if (!customElements.get("flow-call-button")) {
  customElements.define("flow-call-button", FlowCallButton);
}

describe("FlowCallButton", () => {
  let element;

  beforeEach(async () => {
    element = document.createElement("flow-call-button");
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    if (element.parentNode) {
      document.body.removeChild(element);
    }
  });

  describe("Default Properties", () => {
    it("should default phoneNumber to the office number", () => {
      expect(element.phoneNumber).toBe("+15032889291");
    });

    it("should default size to 'md'", () => {
      expect(element.size).toBe("md");
    });

    it("should default variant to 'primary'", () => {
      expect(element.variant).toBe("primary");
    });

    it("should default disabled to false", () => {
      expect(element.disabled).toBe(false);
    });

    it("should default fullWidth to false", () => {
      expect(element.fullWidth).toBe(false);
    });
  });

  describe("Phone Number Formatting", () => {
    it("should format a 10-digit US number as (NXX) NXX-XXXX", () => {
      expect(element._formatPhoneNumber("+15032889291")).toBe("(503) 288-9291");
    });

    it("should format a number without country code", () => {
      expect(element._formatPhoneNumber("5032889291")).toBe("(503) 288-9291");
    });

    it("should return the original value when it cannot be parsed", () => {
      expect(element._formatPhoneNumber("invalid")).toBe("invalid");
    });
  });

  describe("Rendering", () => {
    it("should render an anchor link with class call-button", async () => {
      const link = element.shadowRoot.querySelector("a.call-button");
      expect(link).toBeTruthy();
    });

    it("should set href to tel: scheme", async () => {
      const link = element.shadowRoot.querySelector("a.call-button");
      expect(link.getAttribute("href")).toBe("tel:+15032889291");
    });

    it("should include an aria-label with Call text", async () => {
      const link = element.shadowRoot.querySelector("a.call-button");
      expect(link.getAttribute("aria-label")).toContain("Call");
    });

    it("should render a phone icon SVG", async () => {
      const icon = element.shadowRoot.querySelector("svg.phone-icon");
      expect(icon).toBeTruthy();
    });

    it("should update href when phoneNumber changes", async () => {
      element.phoneNumber = "+19876543210";
      await element.updateComplete;
      const link = element.shadowRoot.querySelector("a.call-button");
      expect(link.getAttribute("href")).toBe("tel:+19876543210");
    });
  });

  describe("Attribute Binding", () => {
    it("should accept phone-number attribute", async () => {
      element.setAttribute("phone-number", "+19995550100");
      await element.updateComplete;
      expect(element.phoneNumber).toBe("+19995550100");
    });
  });

  describe("Click Events", () => {
    it("should dispatch a flow-call-click event on click", async () => {
      const spy = vi.fn();
      element.addEventListener("flow-call-click", spy);

      const link = element.shadowRoot.querySelector("a.call-button");
      // Prevent jsdom from attempting to navigate the tel: href
      link.addEventListener("click", (e) => e.preventDefault(), {
        once: true,
        capture: true,
      });
      link.click();

      expect(spy).toHaveBeenCalledOnce();
    });

    it("should include phoneNumber, variant, and size in event detail", async () => {
      element.variant = "hero";
      element.size = "xl";
      await element.updateComplete;

      const spy = vi.fn();
      element.addEventListener("flow-call-click", spy);

      const link = element.shadowRoot.querySelector("a.call-button");
      link.addEventListener("click", (e) => e.preventDefault(), {
        once: true,
        capture: true,
      });
      link.click();

      expect(spy.mock.calls[0][0].detail).toMatchObject({
        phoneNumber: "+15032889291",
        variant: "hero",
        size: "xl",
      });
    });

    it("should call preventDefault and not dispatch event when disabled", () => {
      element.disabled = true;
      const spy = vi.fn();
      element.addEventListener("flow-call-click", spy);

      const mockEvent = { preventDefault: vi.fn() };
      element._handleClick(mockEvent);

      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("Static Properties", () => {
    it("should declare the expected reactive properties", () => {
      const props = FlowCallButton.properties;
      expect(props.phoneNumber).toEqual({
        type: String,
        attribute: "phone-number",
      });
      expect(props.size).toEqual({ type: String });
      expect(props.variant).toEqual({ type: String });
      expect(props.disabled).toEqual({ type: Boolean });
      expect(props.fullWidth).toEqual({
        type: Boolean,
        attribute: "full-width",
      });
    });
  });
});
