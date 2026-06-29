/**
 * @vitest-environment jsdom
 *
 * Smoke tests: verify every component is properly exported and registered as a
 * custom element after the component registry is imported.
 */
import { describe, it, expect } from "vitest";
import {
  FlowButton,
  FlowAlert,
  FlowNavbar,
  FlowScrollToTop,
  FlowCallButton,
  FlowFloatingCallButton,
} from "../../src/components/index.js";

describe("Component Exports", () => {
  it("exports FlowButton as a function/class", () => {
    expect(typeof FlowButton).toBe("function");
  });

  it("exports FlowAlert as a function/class", () => {
    expect(typeof FlowAlert).toBe("function");
  });

  it("exports FlowNavbar as a function/class", () => {
    expect(typeof FlowNavbar).toBe("function");
  });

  it("exports FlowScrollToTop as a function/class", () => {
    expect(typeof FlowScrollToTop).toBe("function");
  });

  it("exports FlowCallButton as a function/class", () => {
    expect(typeof FlowCallButton).toBe("function");
  });

  it("exports FlowFloatingCallButton as a function/class", () => {
    expect(typeof FlowFloatingCallButton).toBe("function");
  });
});

describe("Custom Element Registration", () => {
  it("registers flow-button", () => {
    expect(customElements.get("flow-button")).toBeDefined();
  });

  it("registers flow-alert", () => {
    expect(customElements.get("flow-alert")).toBeDefined();
  });

  it("registers flow-attorney-card", () => {
    expect(customElements.get("flow-attorney-card")).toBeDefined();
  });

  it("registers flow-navbar", () => {
    expect(customElements.get("flow-navbar")).toBeDefined();
  });

  it("registers flow-scroll-to-top", () => {
    expect(customElements.get("flow-scroll-to-top")).toBeDefined();
  });

  it("registers flow-call-button", () => {
    expect(customElements.get("flow-call-button")).toBeDefined();
  });

  it("registers flow-floating-call-button", () => {
    expect(customElements.get("flow-floating-call-button")).toBeDefined();
  });
});
