/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import ServiceHighlights from "./service-highlights.js";

describe("ServiceHighlights", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <div role="button" class="highlight-item" aria-expanded="false" tabindex="0">
        <h3>Corporate Law</h3>
      </div>
      <div role="button" class="highlight-item" aria-expanded="false" tabindex="0">
        <h3>Family Law</h3>
      </div>
    `;
    document.body.appendChild(container);

    // Provide a no-op scrollIntoView (not implemented in jsdom)
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    if (container.parentNode) {
      document.body.removeChild(container);
    }
    vi.restoreAllMocks();
  });

  describe("Initialization", () => {
    it("should construct without throwing", () => {
      expect(() => new ServiceHighlights()).not.toThrow();
    });

    it("should attach event listeners to .highlight-item elements", () => {
      const item = container.querySelector(".highlight-item");
      const spy = vi.spyOn(item, "addEventListener");

      new ServiceHighlights();

      // click, keydown, mouseenter, mouseleave
      expect(spy.mock.calls.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("toggleItem", () => {
    it("should expand a collapsed item", () => {
      const sh = new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      sh.toggleItem(item);

      expect(item.getAttribute("aria-expanded")).toBe("true");
    });

    it("should collapse an already-expanded item", () => {
      const sh = new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.setAttribute("aria-expanded", "true");
      sh.toggleItem(item);

      expect(item.getAttribute("aria-expanded")).toBe("false");
    });

    it("should collapse other items before expanding a new one", () => {
      const sh = new ServiceHighlights();
      const [item1, item2] = container.querySelectorAll(".highlight-item");

      item1.setAttribute("aria-expanded", "true");
      sh.toggleItem(item2);

      expect(item1.getAttribute("aria-expanded")).toBe("false");
      expect(item2.getAttribute("aria-expanded")).toBe("true");
    });
  });

  describe("expandItem / collapseItem", () => {
    it("should set aria-expanded to true on expandItem", () => {
      const sh = new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      sh.expandItem(item);

      expect(item.getAttribute("aria-expanded")).toBe("true");
    });

    it("should set aria-expanded to false on collapseItem", () => {
      const sh = new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.setAttribute("aria-expanded", "true");
      sh.collapseItem(item);

      expect(item.getAttribute("aria-expanded")).toBe("false");
    });

    it("should clear inline transform style on collapseItem", () => {
      const sh = new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.style.transform = "translateY(-2px)";
      sh.collapseItem(item);

      expect(item.style.transform).toBe("");
    });
  });

  describe("collapseAllItems", () => {
    it("should collapse every currently-expanded item", () => {
      const sh = new ServiceHighlights();
      const items = container.querySelectorAll(".highlight-item");

      items.forEach((i) => i.setAttribute("aria-expanded", "true"));
      sh.collapseAllItems();

      items.forEach((i) =>
        expect(i.getAttribute("aria-expanded")).toBe("false"),
      );
    });
  });

  describe("getServiceName", () => {
    it("should return the trimmed h3 text", () => {
      const sh = new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      expect(sh.getServiceName(item)).toBe("Corporate Law");
    });

    it("should return 'Unknown Service' when there is no h3", () => {
      const sh = new ServiceHighlights();
      const div = document.createElement("div");

      expect(sh.getServiceName(div)).toBe("Unknown Service");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should toggle expansion on Enter key", () => {
      new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      );

      expect(item.getAttribute("aria-expanded")).toBe("true");
    });

    it("should toggle expansion on Space key", () => {
      new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.dispatchEvent(
        new KeyboardEvent("keydown", { key: " ", bubbles: true }),
      );

      expect(item.getAttribute("aria-expanded")).toBe("true");
    });

    it("should collapse an expanded item on Escape key", () => {
      new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.setAttribute("aria-expanded", "true");
      item.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );

      expect(item.getAttribute("aria-expanded")).toBe("false");
    });

    it("should not collapse a non-expanded item on Escape key", () => {
      new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      // Starts collapsed; Escape on a collapsed item should be a no-op
      item.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );

      expect(item.getAttribute("aria-expanded")).toBe("false");
    });
  });

  describe("Analytics Events", () => {
    it("should dispatch a serviceInteraction event with action 'expand'", () => {
      const sh = new ServiceHighlights();
      const item = container.querySelector(".highlight-item");
      const received = [];

      document.addEventListener("serviceInteraction", (e) =>
        received.push(e.detail),
      );
      sh.expandItem(item);

      expect(received.length).toBeGreaterThanOrEqual(1);
      expect(received[received.length - 1]).toMatchObject({
        action: "expand",
        serviceName: "Corporate Law",
      });
    });

    it("should dispatch a serviceInteraction event with action 'collapse'", () => {
      const sh = new ServiceHighlights();
      const item = container.querySelector(".highlight-item");
      const received = [];

      document.addEventListener("serviceInteraction", (e) =>
        received.push(e.detail),
      );
      sh.collapseItem(item);

      expect(received.length).toBeGreaterThanOrEqual(1);
      expect(received[received.length - 1]).toMatchObject({
        action: "collapse",
        serviceName: "Corporate Law",
      });
    });
  });

  describe("Hover Behavior", () => {
    it("should apply a translateY transform on mouseenter", () => {
      new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));

      expect(item.style.transform).toBe("translateY(-2px)");
    });

    it("should clear the transform on mouseleave when item is not expanded", () => {
      new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.style.transform = "translateY(-2px)";
      item.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));

      expect(item.style.transform).toBe("");
    });

    it("should preserve the transform on mouseleave when item is expanded", () => {
      new ServiceHighlights();
      const item = container.querySelector(".highlight-item");

      item.setAttribute("aria-expanded", "true");
      item.style.transform = "translateY(-2px)";
      item.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));

      // Expanded items keep their transform
      expect(item.style.transform).toBe("translateY(-2px)");
    });
  });
});
