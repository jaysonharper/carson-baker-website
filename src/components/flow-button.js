import { LitElement, html, css } from "lit";

/**
 * A reusable button component based on Flowbite design patterns
 * Integrates with Tailwind CSS utility classes
 */
export class FlowButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
  `;

  static properties = {
    variant: { type: String },
    size: { type: String },
    disabled: { type: Boolean },
    type: { type: String },
    loading: { type: Boolean },
  };

  constructor() {
    super();
    this.variant = "primary";
    this.size = "md";
    this.disabled = false;
    this.type = "button";
    this.loading = false;
  }

  render() {
    const classes = this._buildClasses();
    return html`
      <button
        type="${this.type}"
        class="${classes}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${this.loading ? this._renderSpinner() : html`<slot></slot>`}
      </button>
    `;
  }

  _buildClasses() {
    // Base Flowbite classes
    const base =
      "font-medium rounded-lg focus:ring-4 focus:outline-none transition-colors";

    // Size variants (Flowbite patterns)
    const sizes = {
      xs: "px-3 py-2 text-xs",
      sm: "px-3 py-2 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-5 py-3 text-base",
      xl: "px-6 py-3.5 text-base",
    };

    // Color variants (Flowbite patterns)
    const variants = {
      primary:
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      secondary:
        "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
      success:
        "text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
      danger:
        "text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
      warning:
        "text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 dark:focus:ring-yellow-900",
      info: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    };

    // Disabled state
    const disabledClasses =
      this.disabled || this.loading ? "opacity-50 cursor-not-allowed" : "";

    return `${base} ${sizes[this.size]} ${
      variants[this.variant]
    } ${disabledClasses}`.trim();
  }

  _renderSpinner() {
    return html`
      <svg
        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Loading...
    `;
  }

  _handleClick(e) {
    if (!this.disabled && !this.loading) {
      // Dispatch custom event for parent components
      this.dispatchEvent(
        new CustomEvent("flow-click", {
          detail: {
            variant: this.variant,
            originalEvent: e,
          },
          bubbles: true,
        })
      );
    }
  }
}

customElements.define("flow-button", FlowButton);
