/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { FlowAlert } from "./flow-alert.js";

if (!customElements.get("flow-alert")) {
  customElements.define("flow-alert", FlowAlert);
}

describe("FlowAlert", () => {
  let element;

  beforeEach(async () => {
    element = document.createElement("flow-alert");
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    if (element.parentNode) {
      document.body.removeChild(element);
    }
  });

  describe("Default Properties", () => {
    it("should have type 'info' by default", () => {
      expect(element.type).toBe("info");
    });

    it("should be visible by default", () => {
      expect(element.visible).toBe(true);
    });

    it("should not be dismissible by default", () => {
      expect(element.dismissible).toBe(false);
    });

    it("should show icon by default", () => {
      expect(element.icon).toBe(true);
    });
  });

  describe("Visibility", () => {
    it("should render alert div when visible", async () => {
      const alert = element.shadowRoot.querySelector("[role='alert']");
      expect(alert).toBeTruthy();
    });

    it("should not render alert div when visible is false", async () => {
      element.visible = false;
      await element.updateComplete;
      const alert = element.shadowRoot.querySelector("[role='alert']");
      expect(alert).toBeNull();
    });

    it("should reflect visible as an attribute", async () => {
      expect(element.hasAttribute("visible")).toBe(true);
      element.visible = false;
      await element.updateComplete;
      expect(element.hasAttribute("visible")).toBe(false);
    });
  });

  describe("Alert Types", () => {
    it("should apply info classes by default", async () => {
      const alert = element.shadowRoot.querySelector("[role='alert']");
      expect(alert.className).toContain("text-blue-800");
      expect(alert.className).toContain("bg-blue-50");
    });

    it("should apply success classes when type is success", async () => {
      element.type = "success";
      await element.updateComplete;
      const alert = element.shadowRoot.querySelector("[role='alert']");
      expect(alert.className).toContain("text-green-800");
      expect(alert.className).toContain("bg-green-50");
    });

    it("should apply warning classes when type is warning", async () => {
      element.type = "warning";
      await element.updateComplete;
      const alert = element.shadowRoot.querySelector("[role='alert']");
      expect(alert.className).toContain("text-yellow-800");
      expect(alert.className).toContain("bg-yellow-50");
    });

    it("should apply danger classes when type is danger", async () => {
      element.type = "danger";
      await element.updateComplete;
      const alert = element.shadowRoot.querySelector("[role='alert']");
      expect(alert.className).toContain("text-red-800");
      expect(alert.className).toContain("bg-red-50");
    });

    it("should always include base layout classes", async () => {
      const alert = element.shadowRoot.querySelector("[role='alert']");
      expect(alert.className).toContain("flex");
      expect(alert.className).toContain("items-center");
      expect(alert.className).toContain("rounded-lg");
    });
  });

  describe("Icon", () => {
    it("should render an SVG icon when icon is true", async () => {
      const icon = element.shadowRoot.querySelector("svg[aria-hidden='true']");
      expect(icon).toBeTruthy();
    });

    it("should not render an icon SVG when icon is false", async () => {
      element.icon = false;
      await element.updateComplete;
      // With dismissible=false and icon=false there should be no svg in shadow root
      const svgs = element.shadowRoot.querySelectorAll("svg");
      expect(svgs.length).toBe(0);
    });
  });

  describe("Dismissible", () => {
    it("should not render a close button when dismissible is false", async () => {
      const btn = element.shadowRoot.querySelector(
        "button[aria-label='Close']",
      );
      expect(btn).toBeNull();
    });

    it("should render a close button when dismissible is true", async () => {
      element.dismissible = true;
      await element.updateComplete;
      const btn = element.shadowRoot.querySelector(
        "button[aria-label='Close']",
      );
      expect(btn).toBeTruthy();
    });

    it("should dispatch flow-alert-closed and hide after close button click", async () => {
      element.type = "warning";
      element.dismissible = true;
      await element.updateComplete;

      const eventSpy = vi.fn();
      element.addEventListener("flow-alert-closed", eventSpy);

      const btn = element.shadowRoot.querySelector(
        "button[aria-label='Close']",
      );
      btn.click();

      // _handleClose uses a 300ms timeout before dispatching and hiding
      await new Promise((resolve) => setTimeout(resolve, 350));

      expect(eventSpy).toHaveBeenCalledOnce();
      expect(eventSpy.mock.calls[0][0].detail).toMatchObject({
        type: "warning",
      });
      expect(element.visible).toBe(false);
    });
  });

  describe("Static Properties", () => {
    it("should declare the expected reactive properties", () => {
      const props = FlowAlert.properties;
      expect(props.type).toEqual({ type: String });
      expect(props.dismissible).toEqual({ type: Boolean });
      expect(props.icon).toEqual({ type: Boolean });
      expect(props.visible).toEqual({ type: Boolean, reflect: true });
    });
  });
});
