/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import "../components/flow-scroll-to-top.js";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  // Reset mocks
  mockIntersectionObserver.mockClear();
  mockObserve.mockClear();
  mockDisconnect.mockClear();

  // Mock IntersectionObserver
  mockIntersectionObserver.mockImplementation((callback) => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
    callback,
  }));

  window.IntersectionObserver = mockIntersectionObserver;

  // Mock requestAnimationFrame
  window.requestAnimationFrame = vi.fn((callback) => {
    callback();
    return 1;
  });

  // Mock window.scrollTo
  window.scrollTo = vi.fn();

  // Setup DOM
  document.body.innerHTML = `
    <div class="hero-section">Hero Content</div>
    <footer>Footer Content</footer>
    <flow-scroll-to-top></flow-scroll-to-top>
  `;
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("FlowScrollToTop", () => {
  it("should create component with default properties", async () => {
    const component = document.querySelector("flow-scroll-to-top");
    await component.updateComplete;

    expect(component.visible).toBe(false);
    expect(component.pinned).toBe(false);
  });

  it("should setup intersection observers on connection", async () => {
    const component = document.querySelector("flow-scroll-to-top");
    await component.updateComplete;

    // Should create two observers (hero and footer)
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledTimes(2);
  });

  it("should show button when hero goes out of view", async () => {
    const component = document.querySelector("flow-scroll-to-top");
    await component.updateComplete;

    // Get the hero observer callback
    const heroObserverCall = mockIntersectionObserver.mock.calls[0];
    const heroCallback = heroObserverCall[0];

    // Simulate hero going out of view
    heroCallback([{ isIntersecting: false }]);

    expect(component.visible).toBe(true);
  });

  it("should pin button when footer comes into view", async () => {
    const component = document.querySelector("flow-scroll-to-top");
    await component.updateComplete;

    // Get the footer observer callback
    const footerObserverCall = mockIntersectionObserver.mock.calls[1];
    const footerCallback = footerObserverCall[0];

    // Simulate footer coming into view
    footerCallback([{ isIntersecting: true }]);

    expect(component.pinned).toBe(true);
  });

  it("should scroll to top when clicked", async () => {
    const component = document.querySelector("flow-scroll-to-top");
    component.visible = true;
    await component.updateComplete;

    const button = component.shadowRoot.querySelector(".scroll-button");
    button.click();

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("should dispatch custom event on click", async () => {
    const component = document.querySelector("flow-scroll-to-top");
    component.visible = true;
    await component.updateComplete;

    let eventFired = false;
    component.addEventListener("flow-scroll-top-click", () => {
      eventFired = true;
    });

    const button = component.shadowRoot.querySelector(".scroll-button");
    button.click();

    expect(eventFired).toBe(true);
  });

  it("should render up arrow icon", async () => {
    const component = document.querySelector("flow-scroll-to-top");
    component.visible = true;
    await component.updateComplete;

    const svg = component.shadowRoot.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg.getAttribute("viewBox")).toBe("0 0 20 20");
  });

  it("should disconnect observers on disconnection", async () => {
    const component = document.querySelector("flow-scroll-to-top");
    await component.updateComplete;

    component.remove();

    expect(mockDisconnect).toHaveBeenCalledTimes(2);
  });

  it("should apply correct CSS classes based on state", async () => {
    const component = document.querySelector("flow-scroll-to-top");

    // Test visible state
    component.visible = true;
    await component.updateComplete;
    expect(component.hasAttribute("visible")).toBe(true);

    // Test pinned state
    component.pinned = true;
    await component.updateComplete;
    expect(component.hasAttribute("pinned")).toBe(true);
  });
});
