/**
 * Service Highlights Interactive Behavior
 * Handles expand/collapse functionality for service cards
 */

class ServiceHighlights {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.setupEventListeners()
      );
    } else {
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    const highlightItems = document.querySelectorAll(
      '.highlight-item[role="button"]'
    );

    highlightItems.forEach((item) => {
      // Click event
      item.addEventListener("click", (e) => this.toggleItem(e.currentTarget));

      // Keyboard event (Enter and Space)
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleItem(e.currentTarget);
        }

        // Escape to collapse
        if (
          e.key === "Escape" &&
          item.getAttribute("aria-expanded") === "true"
        ) {
          this.collapseItem(item);
        }
      });

      // Add hover effect for better UX
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-2px)";
      });

      item.addEventListener("mouseleave", () => {
        if (item.getAttribute("aria-expanded") !== "true") {
          item.style.transform = "";
        }
      });
    });
  }

  toggleItem(item) {
    const isExpanded = item.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      this.collapseItem(item);
    } else {
      // First collapse any other expanded items for better mobile UX
      this.collapseAllItems();
      this.expandItem(item);
    }
  }

  expandItem(item) {
    item.setAttribute("aria-expanded", "true");

    // Smooth scroll to ensure the expanded card is visible
    setTimeout(() => {
      const rect = item.getBoundingClientRect();
      const isVisible =
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight);

      if (!isVisible) {
        item.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }, 200); // Wait for expansion animation

    // Analytics tracking
    this.trackInteraction("expand", this.getServiceName(item));
  }

  collapseItem(item) {
    item.setAttribute("aria-expanded", "false");
    item.style.transform = "";

    // Analytics tracking
    this.trackInteraction("collapse", this.getServiceName(item));
  }

  collapseAllItems() {
    const expandedItems = document.querySelectorAll(
      '.highlight-item[aria-expanded="true"]'
    );
    expandedItems.forEach((item) => this.collapseItem(item));
  }

  getServiceName(item) {
    const titleElement = item.querySelector("h3");
    return titleElement ? titleElement.textContent.trim() : "Unknown Service";
  }

  trackInteraction(action, serviceName) {
    // Analytics tracking - replace with your preferred analytics solution

    // Example: Google Analytics 4
    if (typeof gtag !== "undefined") {
      gtag("event", "service_interaction", {
        action: action,
        service_name: serviceName,
        event_category: "engagement",
      });
    }

    // Custom event for other tracking systems
    document.dispatchEvent(
      new CustomEvent("serviceInteraction", {
        detail: { action, serviceName },
      })
    );
  }
}

// Initialize when script loads
new ServiceHighlights();

export default ServiceHighlights;
