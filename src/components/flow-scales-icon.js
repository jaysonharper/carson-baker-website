import { LitElement, html, css } from "lit";

/**
 * An animated Scales of Justice icon for legal websites
 * Toggles between balanced and unbalanced states every 5 seconds
 */
export class FlowScalesIcon extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    :host(:hover) {
      transform: scale(1.1);
    }

    .scales-container {
      width: 50px;
      height: 50px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .scales-svg {
      width: 100%;
      height: 100%;
      transition: all 0.8s ease-in-out;
    }

    .scales-base {
      fill: url(#goldGradient);
      transition: fill 0.2s ease;
    }

    .scales-beam {
      fill: url(#goldGradient);
      transform-origin: 25px 20px; /* Adjusted for larger size */
      transition: all 0.8s ease-in-out;
    }

    .scales-pan-left,
    .scales-pan-right {
      fill: url(#goldGradientPans);
      transition: all 0.8s ease-in-out;
    }

    .scales-chain {
      stroke: url(#goldGradient);
      stroke-width: 0.8;
      fill: none;
      transition: all 0.8s ease-in-out;
    }

    /* Balanced state (default) */
    .scales-beam {
      transform: rotate(0deg);
    }

    .scales-pan-left {
      transform: translateY(0px);
    }

    .scales-pan-right {
      transform: translateY(0px);
    }

    .chain-left {
      /* Removed invalid d property */
    }

    .chain-right {
      /* Removed invalid d property */
    }

    /* Unbalanced state */
    :host(.unbalanced) .scales-beam {
      transform: rotate(-8deg);
    }

    :host(.unbalanced) .scales-pan-left {
      transform: translateY(2px);
    }

    :host(.unbalanced) .scales-pan-right {
      transform: translateY(-2px);
    }

    :host(.unbalanced) .chain-left {
      transform: translateY(1px);
    }

    :host(.unbalanced) .chain-right {
      transform: translateY(-1px);
    }

    /* Hover effects */
    :host(:hover) .scales-base,
    :host(:hover) .scales-beam,
    :host(:hover) .scales-chain {
      fill: url(#goldGradientBright);
      stroke: url(#goldGradientBright);
    }

    :host(:hover) .scales-pan-left,
    :host(:hover) .scales-pan-right {
      fill: url(#goldGradientBright);
    }

    /* Enhanced glow effect on hover */
    :host(:hover) .scales-svg {
      filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.8))
        drop-shadow(0 0 20px rgba(255, 215, 0, 0.4));
    }

    /* Responsive scaling */
    @media (min-width: 768px) {
      .scales-container {
        width: 55px;
        height: 55px;
      }
    }

    @media (min-width: 1024px) {
      .scales-container {
        width: 60px;
        height: 60px;
      }
    }
  `;

  static properties = {
    isBalanced: { type: Boolean },
    animationInterval: { type: Number },
  };

  constructor() {
    super();
    this.isBalanced = true;
    this.animationInterval = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._startAnimation();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopAnimation();
  }

  render() {
    return html`
      <div
        class="scales-container"
        @click="${this._handleClick}"
        role="button"
        tabindex="0"
        @keydown="${this._handleKeydown}"
        title="Scales of Justice - Symbol of Fair Legal Representation"
      >
        <svg
          class="scales-svg"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Gold Gradient Definitions -->
          <defs>
            <!-- Main gold gradient for base and beam -->
            <linearGradient
              id="goldGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
              <stop offset="30%" style="stop-color:#FFA500;stop-opacity:1" />
              <stop offset="70%" style="stop-color:#DAA520;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1" />
            </linearGradient>

            <!-- Brighter gold gradient for pans -->
            <radialGradient id="goldGradientPans" cx="50%" cy="30%" r="70%">
              <stop offset="0%" style="stop-color:#FFFF99;stop-opacity:1" />
              <stop offset="40%" style="stop-color:#FFD700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#DAA520;stop-opacity:1" />
            </radialGradient>

            <!-- Bright hover gradient -->
            <linearGradient
              id="goldGradientBright"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style="stop-color:#FFFF66;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#FFD700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
            </linearGradient>
          </defs>

          <!-- Base/Stand -->
          <rect class="scales-base" x="22" y="40" width="6" height="8" rx="3" />
          <rect
            class="scales-base"
            x="17"
            y="46"
            width="16"
            height="3"
            rx="1.5"
          />

          <!-- Central Pole -->
          <rect
            class="scales-base"
            x="24"
            y="10"
            width="2"
            height="32"
            rx="1"
          />

          <!-- Beam/Bar -->
          <rect class="scales-beam" x="5" y="19" width="40" height="2" rx="1" />

          <!-- Chains -->
          <line
            class="scales-chain chain-left"
            x1="10"
            y1="20"
            x2="10"
            y2="25"
          />
          <line
            class="scales-chain chain-right"
            x1="40"
            y1="20"
            x2="40"
            y2="25"
          />

          <!-- Left Pan -->
          <ellipse class="scales-pan-left" cx="10" cy="27" rx="7" ry="2.5" />

          <!-- Right Pan -->
          <ellipse class="scales-pan-right" cx="40" cy="27" rx="7" ry="2.5" />

          <!-- Small weights/details on pans -->
          <circle class="scales-base" cx="10" cy="26" r="1.2" opacity="0.8" />
          <circle class="scales-base" cx="40" cy="26" r="1.2" opacity="0.8" />
        </svg>
      </div>
    `;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("isBalanced")) {
      this._updateScalesState();
    }
  }

  _startAnimation() {
    // Start the animation cycle
    this.animationInterval = setInterval(() => {
      this.isBalanced = !this.isBalanced;
    }, 5000); // Toggle every 5 seconds
  }

  _stopAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  _updateScalesState() {
    if (this.isBalanced) {
      this.classList.remove("unbalanced");
    } else {
      this.classList.add("unbalanced");
    }
  }

  _handleClick() {
    // Dispatch custom event for analytics or other purposes
    this.dispatchEvent(
      new CustomEvent("scales-click", {
        detail: {
          timestamp: Date.now(),
          currentState: this.isBalanced ? "balanced" : "unbalanced",
        },
        bubbles: true,
        composed: true,
      })
    );

    // Manually trigger state change for interactive feedback
    this.isBalanced = !this.isBalanced;

    // Reset the animation timer
    this._stopAnimation();
    setTimeout(() => {
      this._startAnimation();
    }, 100);
  }

  _handleKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this._handleClick();
    }
  }
}

customElements.define("flow-scales-icon", FlowScalesIcon);
