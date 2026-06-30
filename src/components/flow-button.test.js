/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { FlowButton } from "./flow-button.js";

if (!customElements.get("flow-button")) {
  customElements.define("flow-button", FlowButton);
}

describe("FlowButton", () => {
  let element;

  beforeEach(async () => {
    element = document.createElement("flow-button");
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    if (element.parentNode) {
      document.body.removeChild(element);
    }
  });

  describe("Default Properties", () => {
    it("should default variant to 'primary'", () => {
      expect(element.variant).toBe("primary");
    });

    it("should default size to 'md'", () => {
      expect(element.size).toBe("md");
    });

    it("should default type to 'button'", () => {
      expect(element.type).toBe("button");
    });

    it("should default disabled to false", () => {
      expect(element.disabled).toBe(false);
    });

    it("should default loading to false", () => {
      expect(element.loading).toBe(false);
    });
  });

  describe("Rendering", () => {
    it("should render a button element", async () => {
      const btn = element.shadowRoot.querySelector("button");
      expect(btn).toBeTruthy();
    });

    it("should include base Flowbite classes", async () => {
      const btn = element.shadowRoot.querySelector("button");
      expect(btn.className).toContain("font-medium");
      expect(btn.className).toContain("rounded-lg");
      expect(btn.className).toContain("focus:ring-4");
    });

    it("should apply primary variant classes by default", async () => {
      const btn = element.shadowRoot.querySelector("button");
      expect(btn.className).toContain("bg-blue-700");
      expect(btn.className).toContain("text-white");
    });

    it("should apply md size classes by default", async () => {
      const btn = element.shadowRoot.querySelector("button");
      expect(btn.className).toContain("px-5");
      expect(btn.className).toContain("py-2.5");
    });

    it("should forward the type attribute to the button", async () => {
      const btn = element.shadowRoot.querySelector("button");
      expect(btn.type).toBe("button");
    });
  });

  describe("Size Variants", () => {
    const sizeClassMap = {
      xs: ["px-3", "py-2", "text-xs"],
      sm: ["px-3", "py-2", "text-sm"],
      md: ["px-5", "py-2.5", "text-sm"],
      lg: ["px-5", "py-3", "text-base"],
      xl: ["px-6", "py-3.5", "text-base"],
    };

    Object.entries(sizeClassMap).forEach(([size, classes]) => {
      it(`should apply correct classes for size '${size}'`, async () => {
        element.size = size;
        await element.updateComplete;
        const btn = element.shadowRoot.querySelector("button");
        classes.forEach((cls) => expect(btn.className).toContain(cls));
      });
    });
  });

  describe("Color Variants", () => {
    const variantColorMap = {
      primary: "bg-blue-700",
      secondary: "bg-white",
      success: "bg-green-700",
      danger: "bg-red-700",
      warning: "bg-yellow-400",
      info: "bg-blue-700",
    };

    Object.entries(variantColorMap).forEach(([variant, colorClass]) => {
      it(`should apply a background color class for variant '${variant}'`, async () => {
        element.variant = variant;
        await element.updateComplete;
        const btn = element.shadowRoot.querySelector("button");
        expect(btn.className).toContain(colorClass);
      });
    });
  });

  describe("Disabled State", () => {
    it("should set the disabled attribute on the inner button", async () => {
      element.disabled = true;
      await element.updateComplete;
      const btn = element.shadowRoot.querySelector("button");
      expect(btn.disabled).toBe(true);
    });

    it("should add opacity and cursor-not-allowed classes when disabled", async () => {
      element.disabled = true;
      await element.updateComplete;
      const btn = element.shadowRoot.querySelector("button");
      expect(btn.className).toContain("opacity-50");
      expect(btn.className).toContain("cursor-not-allowed");
    });

    it("should not dispatch flow-click when disabled", async () => {
      element.disabled = true;
      await element.updateComplete;

      const spy = vi.fn();
      element.addEventListener("flow-click", spy);

      element._handleClick(new MouseEvent("click"));

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("Loading State", () => {
    it("should disable the inner button when loading", async () => {
      element.loading = true;
      await element.updateComplete;
      const btn = element.shadowRoot.querySelector("button");
      expect(btn.disabled).toBe(true);
    });

    it("should render a spinner SVG when loading", async () => {
      element.loading = true;
      await element.updateComplete;
      const spinner = element.shadowRoot.querySelector("svg.animate-spin");
      expect(spinner).toBeTruthy();
    });

    it("should not dispatch flow-click when loading", async () => {
      element.loading = true;
      await element.updateComplete;

      const spy = vi.fn();
      element.addEventListener("flow-click", spy);

      element._handleClick(new MouseEvent("click"));

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("Click Events", () => {
    it("should dispatch a flow-click event on click", async () => {
      const spy = vi.fn();
      element.addEventListener("flow-click", spy);

      const btn = element.shadowRoot.querySelector("button");
      btn.click();

      expect(spy).toHaveBeenCalledOnce();
    });

    it("should include the variant in the flow-click event detail", async () => {
      element.variant = "success";
      await element.updateComplete;

      const spy = vi.fn();
      element.addEventListener("flow-click", spy);

      const btn = element.shadowRoot.querySelector("button");
      btn.click();

      expect(spy.mock.calls[0][0].detail).toMatchObject({ variant: "success" });
    });

    it("should set bubbles:true on the flow-click event", async () => {
      let capturedEvent;
      element.addEventListener("flow-click", (e) => {
        capturedEvent = e;
      });

      const btn = element.shadowRoot.querySelector("button");
      btn.click();

      expect(capturedEvent.bubbles).toBe(true);
    });
  });

  describe("Static Properties", () => {
    it("should declare the expected reactive properties", () => {
      const props = FlowButton.properties;
      expect(props.variant).toEqual({ type: String });
      expect(props.size).toEqual({ type: String });
      expect(props.disabled).toEqual({ type: Boolean });
      expect(props.type).toEqual({ type: String });
      expect(props.loading).toEqual({ type: Boolean });
    });
  });
});
