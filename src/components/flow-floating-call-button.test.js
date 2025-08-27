/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import "../components/flow-floating-call-button.js";

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

  // Setup DOM
  document.body.innerHTML = `
    <div class="hero-section">Hero Content</div>
    <footer>Footer Content</footer>
    <flow-floating-call-button phone-number="+15555555555"></flow-floating-call-button>
  `;
});

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("FlowFloatingCallButton", () => {
  it("should create component with default properties", async () => {
    const component = document.querySelector("flow-floating-call-button");
    await component.updateComplete;

    expect(component.visible).toBe(false);
    expect(component.pinned).toBe(false);
    expect(component.phoneNumber).toBe("+15555555555");
  });

  it("should setup intersection observers on connection", async () => {
    const component = document.querySelector("flow-floating-call-button");
    await component.updateComplete;

    // Should create two observers (hero and footer)
    expect(mockIntersectionObserver).toHaveBeenCalledTimes(2);
    expect(mockObserve).toHaveBeenCalledTimes(2);
  });

  it("should show button when hero goes out of view", async () => {
    const component = document.querySelector("flow-floating-call-button");
    await component.updateComplete;

    // Get the hero observer callback
    const heroObserverCall = mockIntersectionObserver.mock.calls[0];
    const heroCallback = heroObserverCall[0];

    // Simulate hero going out of view
    heroCallback([{ isIntersecting: false }]);

    expect(component.visible).toBe(true);
  });

  it("should pin button when footer comes into view", async () => {
    const component = document.querySelector("flow-floating-call-button");
    await component.updateComplete;

    // Get the footer observer callback
    const footerObserverCall = mockIntersectionObserver.mock.calls[1];
    const footerCallback = footerObserverCall[0];

    // Simulate footer coming into view
    footerCallback([{ isIntersecting: true }]);

    expect(component.pinned).toBe(true);
  });

  it("should handle phone number attribute", async () => {
    const component = document.querySelector("flow-floating-call-button");
    component.setAttribute("phone-number", "+19876543210");
    await component.updateComplete;

    expect(component.phoneNumber).toBe("+19876543210");
  });

  it("should render call button with correct href", async () => {
    const component = document.querySelector("flow-floating-call-button");
    component.visible = true;
    await component.updateComplete;

    const link = component.shadowRoot.querySelector(".call-button");
    expect(link.href).toBe("tel:+15555555555");
    expect(link.textContent.trim()).toContain("Call Now");
  });

  it("should dispatch custom event on click", async () => {
    const component = document.querySelector("flow-floating-call-button");
    component.visible = true;
    await component.updateComplete;

    let eventFired = false;
    component.addEventListener("flow-floating-call-click", () => {
      eventFired = true;
    });

    const link = component.shadowRoot.querySelector(".call-button");
    link.click();

    expect(eventFired).toBe(true);
  });

  it("should disconnect observers on disconnection", async () => {
    const component = document.querySelector("flow-floating-call-button");
    await component.updateComplete;

    component.remove();

    expect(mockDisconnect).toHaveBeenCalledTimes(2);
  });

  it("should apply correct CSS classes based on state", async () => {
    const component = document.querySelector("flow-floating-call-button");

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
