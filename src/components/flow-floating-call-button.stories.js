import { html } from "lit";
import "../components/flow-floating-call-button.js";

export default {
  title: "Components/FlowFloatingCallButton",
  component: "flow-floating-call-button",
  parameters: {
    docs: {
      description: {
        component:
          "A floating call button that appears when the hero section is out of view. Positioned on the bottom left, opposite of the scroll-to-top button. Features smooth animations and hero-style styling.",
      },
    },
  },
  argTypes: {
    phoneNumber: {
      control: { type: "text" },
      description: "Phone number for the call button",
    },
    visible: {
      control: { type: "boolean" },
      description:
        "Whether the button is visible (normally controlled by intersection observer)",
    },
    onClick: { action: "flow-floating-call-click" },
  },
};

// Template function
const Template = (args) => html`
  <flow-floating-call-button
    phone-number="${args.phoneNumber}"
    ?visible="${args.visible}"
    @flow-floating-call-click="${args.onClick}"
  ></flow-floating-call-button>
`;

// Default story
export const Default = Template.bind({});
Default.args = {
  phoneNumber: "+15032889291",
  visible: true,
};
Default.parameters = {
  docs: {
    description: {
      story:
        "The default floating call button. In the real app, visibility is controlled by an intersection observer that detects when the hero section is out of view.",
    },
  },
};

// With custom phone number
export const CustomPhoneNumber = Template.bind({});
CustomPhoneNumber.args = {
  phoneNumber: "+1-800-LAW-HELP",
  visible: true,
};
CustomPhoneNumber.parameters = {
  docs: {
    description: {
      story:
        "Floating call button with a custom phone number. The button displays 'Call Now' regardless of the phone number format.",
    },
  },
};

// Hidden state
export const Hidden = Template.bind({});
Hidden.args = {
  phoneNumber: "+15032889291",
  visible: false,
};
Hidden.parameters = {
  docs: {
    description: {
      story:
        "The button in its hidden state. This is how it appears when the hero section is in view.",
    },
  },
};

// Interactive demo with toggle
export const InteractiveDemo = () => {
  let isVisible = false;

  const toggleVisibility = () => {
    isVisible = !isVisible;
    const button = document.querySelector("#demo-floating-call");
    if (button) {
      button.visible = isVisible;
    }
  };

  return html`
    <div style="padding: 2rem;">
      <h3 style="margin-bottom: 1rem;">
        Interactive Floating Call Button Demo
      </h3>
      <p style="margin-bottom: 2rem; color: #6b7280;">
        Click the toggle button below to simulate the button
        appearing/disappearing based on hero section visibility.
      </p>

      <button
        @click="${toggleVisibility}"
        style="
          background: #2563eb;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          margin-bottom: 2rem;
        "
      >
        Toggle Call Button Visibility
      </button>

      <p style="color: #6b7280; font-size: 0.875rem;">
        The floating call button should appear in the bottom left corner when
        visible.
      </p>
    </div>

    <flow-floating-call-button
      id="demo-floating-call"
      phone-number="+1-555-LAW-FIRM"
      ?visible="${isVisible}"
      @flow-floating-call-click="${(_e) => {
        /* Event logged in development mode */
      }}"
    ></flow-floating-call-button>
  `;
};

InteractiveDemo.parameters = {
  docs: {
    description: {
      story:
        "Interactive demo showing how the floating call button appears and disappears. In the real application, this behavior is triggered by scrolling past the hero section.",
    },
  },
};

// Positioning comparison
export const PositioningComparison = () => html`
  <div
    style="position: relative; height: 400px; background: #f3f4f6; border-radius: 8px; overflow: hidden;"
  >
    <div style="padding: 2rem;">
      <h3 style="margin-bottom: 1rem;">Floating Button Positioning</h3>
      <p style="color: #6b7280; margin-bottom: 2rem;">
        This demo shows how the floating call button positions itself relative
        to other floating elements. The call button appears on the bottom left,
        opposite to where a scroll-to-top button would appear.
      </p>

      <div
        style="
        position: absolute;
        bottom: 2rem;
        right: 2rem;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.875rem;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      "
      >
        ↑
        <div
          style="
          position: absolute;
          top: -2rem;
          right: 0;
          font-size: 0.75rem;
          white-space: nowrap;
          color: #6b7280;
        "
        >
          Scroll to Top
        </div>
      </div>
    </div>

    <flow-floating-call-button
      phone-number="+15032889291"
      visible="true"
      style="position: absolute;"
      @flow-floating-call-click="${(_e) => {
        /* Event logged in development mode */
      }}"
    ></flow-floating-call-button>

    <div
      style="
      position: absolute;
      bottom: 2rem;
      left: 13rem;
      font-size: 0.75rem;
      color: #6b7280;
    "
    >
      Floating Call Button
    </div>
  </div>
`;

PositioningComparison.parameters = {
  docs: {
    description: {
      story:
        "Demonstrates the positioning of the floating call button relative to other floating UI elements like scroll-to-top buttons.",
    },
  },
};
