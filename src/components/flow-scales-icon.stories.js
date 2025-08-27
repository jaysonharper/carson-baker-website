import { html } from "lit";
import "../components/flow-scales-icon.js";

export default {
  title: "Components/FlowScalesIcon",
  component: "flow-scales-icon",
  parameters: {
    docs: {
      description: {
        component:
          "An animated Scales of Justice icon that toggles between balanced and unbalanced states every 5 seconds. Perfect for legal websites to symbolize justice and fairness.",
      },
    },
  },
  argTypes: {
    onClick: { action: "scales-click" },
  },
};

// Template function
const Template = (args) => html`
  <flow-scales-icon @scales-click="${args.onClick}"></flow-scales-icon>
`;

// Default story
export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story:
        "The default scales icon with automatic animation every 5 seconds. Click to manually toggle the state.",
    },
  },
};

// Interactive example
export const Interactive = () => html`
  <div style="padding: 2rem; background: #0d1117; border-radius: 8px;">
    <h3 style="color: #f0f6fc; margin-bottom: 1rem;">Interactive Scales</h3>
    <p style="color: #8b949e; margin-bottom: 2rem;">
      Click the scales to manually toggle between balanced and unbalanced
      states. The animation will continue automatically every 5 seconds.
    </p>
    <flow-scales-icon
      @scales-click="${(e) => {
        /* Event logged in development mode */
      }}"
    ></flow-scales-icon>
  </div>
`;

Interactive.parameters = {
  docs: {
    description: {
      story:
        "An interactive example showing the scales icon in a dark theme context, similar to how it appears in the navbar.",
    },
  },
};

// Multiple scales with different timings
export const MultipleScales = () => html`
  <div style="display: flex; gap: 2rem; padding: 2rem; align-items: center;">
    <div style="text-align: center;">
      <h4 style="margin-bottom: 1rem; color: #6b7280;">Default Animation</h4>
      <flow-scales-icon></flow-scales-icon>
    </div>
    <div style="text-align: center;">
      <h4 style="margin-bottom: 1rem; color: #6b7280;">Interactive</h4>
      <flow-scales-icon
        @scales-click="${(e) => {
          e.target.style.transform = "scale(1.2)";
          setTimeout(() => {
            e.target.style.transform = "scale(1)";
          }, 200);
        }}"
      ></flow-scales-icon>
    </div>
    <div style="text-align: center;">
      <h4 style="margin-bottom: 1rem; color: #6b7280;">With Custom Styling</h4>
      <flow-scales-icon
        style="filter: hue-rotate(180deg); transform: scale(1.5);"
      ></flow-scales-icon>
    </div>
  </div>
`;

MultipleScales.parameters = {
  docs: {
    description: {
      story:
        "Multiple scales icons demonstrating different states and interactions. The middle one has a custom click animation.",
    },
  },
};

// Usage in navbar context
export const InNavbarContext = () => html`
  <div
    style="background: linear-gradient(135deg, #0d1117 0%, #161b22 100%); padding: 1rem; border-radius: 8px;"
  >
    <div
      style="display: flex; align-items: center; justify-content: space-between; max-width: 800px; margin: 0 auto;"
    >
      <div style="color: #8b949e; font-size: 0.9rem;">Law Offices of</div>
      <div
        style="color: #f0f6fc; font-size: 1.2rem; font-weight: bold; background: linear-gradient(135deg, #f0f6fc 0%, #7c3aed 50%, #2563eb 100%); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
      >
        Harper & Cats
      </div>
      <nav style="display: flex; gap: 1.5rem; align-items: center;">
        <a
          href="#services"
          style="color: #f0f6fc; text-decoration: none; font-size: 0.9rem;"
          >Services</a
        >
        <a
          href="#attorneys"
          style="color: #f0f6fc; text-decoration: none; font-size: 0.9rem;"
          >Attorneys</a
        >
        <flow-scales-icon></flow-scales-icon>
      </nav>
    </div>
  </div>
`;

InNavbarContext.parameters = {
  docs: {
    description: {
      story:
        "Example of how the scales icon appears in the navbar context, replacing the call button.",
    },
  },
};
