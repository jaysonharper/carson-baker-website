import { LitElement, html, css } from "lit";

/**
 * Alert component based on Flowbite design patterns
 * Supports different types and dismissible functionality
 */
export class FlowAlert extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .alert-enter {
      animation: slideIn 0.3s ease-out;
    }

    .alert-exit {
      animation: slideOut 0.3s ease-in forwards;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }
  `;

  static properties = {
    type: { type: String },
    dismissible: { type: Boolean },
    icon: { type: Boolean },
    visible: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.type = "info";
    this.dismissible = false;
    this.icon = true;
    this.visible = true;
  }

  render() {
    if (!this.visible) return html``;

    const classes = this._buildClasses();

    return html`
      <div class="${classes} alert-enter" role="alert">
        ${this.icon ? this._renderIcon() : ""}
        <div class="flex-1">
          <slot></slot>
        </div>
        ${this.dismissible ? this._renderCloseButton() : ""}
      </div>
    `;
  }

  _buildClasses() {
    const base = "flex items-center p-4 mb-4 text-sm rounded-lg";

    const types = {
      info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
      success:
        "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
      warning:
        "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
      danger: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
    };

    return `${base} ${types[this.type]}`;
  }

  _renderIcon() {
    const icons = {
      info: html`
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
          />
        </svg>
      `,
      success: html`
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
      `,
      warning: html`
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-4a1 1 0 0 1-1-1V6a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1Z"
          />
        </svg>
      `,
      danger: html`
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
          />
        </svg>
      `,
    };

    return icons[this.type];
  }

  _renderCloseButton() {
    return html`
      <button
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
        @click="${this._handleClose}"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    `;
  }

  _handleClose() {
    this.classList.add("alert-exit");
    setTimeout(() => {
      this.visible = false;
      this.dispatchEvent(
        new CustomEvent("flow-alert-closed", {
          detail: { type: this.type },
          bubbles: true,
        })
      );
    }, 300);
  }
}

customElements.define("flow-alert", FlowAlert);
