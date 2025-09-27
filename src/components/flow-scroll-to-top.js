import { LitElement, html, css } from "lit";

/**
 * A scroll-to-top button that appears when hero section is out of view
 * Features GitHub-inspired styling and smooth animations
 */
export class FlowScrollToTop extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(0.8);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    :host([visible]) {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    :host([pinned]) {
      position: absolute;
      bottom: auto;
      top: -5rem;
      right: 2rem;
    }

    .scroll-button {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      background: var(--scroll-top-btn-bg);
      border: none;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--scroll-top-btn-shadow);
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    .scroll-button::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.6s ease;
    }

    .scroll-button:hover {
      background: var(--scroll-top-btn-hover);
      box-shadow: var(--scroll-top-btn-hover-shadow);
      transform: translateY(-2px) scale(1.05);
    }

    .scroll-button:hover::before {
      left: 100%;
    }

    .scroll-button:active {
      transform: translateY(0) scale(0.95);
    }

    .scroll-button:focus {
      outline: none;
      box-shadow: var(--scroll-top-btn-focus-shadow);
    }

    .arrow-icon {
      width: 1.5rem;
      height: 1.5rem;
      transition: transform 0.2s ease;
    }

    .scroll-button:hover .arrow-icon {
      transform: translateY(-2px);
    }

    /* Pulse animation when first appearing */
    :host([visible]) .scroll-button {
      animation: pulse 2s ease-in-out;
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
        box-shadow: var(--scroll-top-btn-pulse-shadow);
      }
    }

    /* Mobile responsive */
    @media (max-width: 640px) {
      :host {
        bottom: 1.5rem;
        right: 1.5rem;
      }

      .scroll-button {
        width: 3rem;
        height: 3rem;
      }

      .arrow-icon {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    /* Reduce motion for accessibility */
    @media (prefers-reduced-motion: reduce) {
      :host {
        transition: opacity 0.2s ease;
      }

      .scroll-button {
        transition: background-color 0.2s ease;
      }

      .scroll-button:hover {
        transform: none;
      }

      :host([visible]) .scroll-button {
        animation: none;
      }
    }
  `;

  static properties = {
    visible: { type: Boolean, reflect: true },
    pinned: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.visible = false;
    this.pinned = false;
    this._intersectionObserver = null;
    this._footerObserver = null;
    this._heroElement = null;
    this._footerElement = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._setupIntersectionObserver();
    this._setupFooterObserver();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
    if (this._footerObserver) {
      this._footerObserver.disconnect();
    }
  }

  render() {
    return html`
      <button
        class="scroll-button"
        @click="${this._scrollToTop}"
        @keydown="${this._handleKeydown}"
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <svg class="arrow-icon" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    `;
  }

  _setupIntersectionObserver() {
    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      this._heroElement = document.querySelector(".hero-section");

      if (this._heroElement) {
        this._intersectionObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Button is visible when hero is NOT intersecting (out of view)
              this.visible = !entry.isIntersecting;
            });
          },
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
          }
        );

        this._intersectionObserver.observe(this._heroElement);
      }
    });
  }

  _setupFooterObserver() {
    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      this._footerElement = document.querySelector("footer");

      if (this._footerElement) {
        this._footerObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Pin button when footer comes into view
              this.pinned = entry.isIntersecting;
            });
          },
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
          }
        );

        this._footerObserver.observe(this._footerElement);
      }
    });
  }

  _scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Dispatch custom event for analytics
    this.dispatchEvent(
      new CustomEvent("flow-scroll-top-click", {
        detail: {
          timestamp: Date.now(),
          scrollPosition: window.scrollY,
        },
        bubbles: true,
      })
    );
  }

  _handleKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._scrollToTop();
    }
  }
}

customElements.define("flow-scroll-to-top", FlowScrollToTop);
