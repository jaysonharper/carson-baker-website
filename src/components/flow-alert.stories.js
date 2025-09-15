import { html } from "lit";
import "../components/flow-alert.js";

export default {
  title: "Components/Flow Alert",
  component: "flow-alert",
  parameters: {
    docs: {
      description: {
        component:
          "Alert component for displaying important messages with different types and dismissible functionality.",
      },
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning", "danger"],
      description: "Alert type/color",
      defaultValue: "info",
    },
    dismissible: {
      control: { type: "boolean" },
      description: "Whether the alert can be dismissed",
      defaultValue: false,
    },
    icon: {
      control: { type: "boolean" },
      description: "Whether to show the type icon",
      defaultValue: true,
    },
    visible: {
      control: { type: "boolean" },
      description: "Whether the alert is visible",
      defaultValue: true,
    },
  },
};

// Template function
const Template = (args) => html`
  <flow-alert
    type="${args.type}"
    ?dismissible="${args.dismissible}"
    ?icon="${args.icon}"
    ?visible="${args.visible}"
    @flow-alert-closed="${(_e) => {
      /* Event logged in development mode */
    }}"
  >
    ${args.children ||
    html`<strong>Alert Title:</strong> This is the alert message content.`}
  </flow-alert>
`;

// Default story
export const Default = Template.bind({});
Default.args = {
  type: "info",
  children: html`<strong>Info:</strong> This is an informational alert.`,
};

// Type stories
export const Info = Template.bind({});
Info.args = {
  type: "info",
  children: html`<strong>Info:</strong> This is an informational message.`,
};

export const Success = Template.bind({});
Success.args = {
  type: "success",
  children: html`<strong>Success:</strong> Operation completed successfully!`,
};

export const Warning = Template.bind({});
Warning.args = {
  type: "warning",
  children: html`<strong>Warning:</strong> Please check your input before
    proceeding.`,
};

export const Danger = Template.bind({});
Danger.args = {
  type: "danger",
  children: html`<strong>Error:</strong> Something went wrong. Please try again.`,
};

// Feature stories
export const Dismissible = Template.bind({});
Dismissible.args = {
  type: "success",
  dismissible: true,
  children: html`<strong>Dismissible Alert:</strong> You can close this alert by
    clicking the X button.`,
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  type: "warning",
  icon: false,
  children: html`<strong>No Icon:</strong> This alert doesn't show an icon.`,
};

// All types demo
export const AllTypes = () => html`
  <div style="display: grid; gap: 1rem;">
    <flow-alert type="info">
      <strong>Info:</strong> This is an informational message.
    </flow-alert>
    <flow-alert type="success">
      <strong>Success:</strong> Operation completed successfully!
    </flow-alert>
    <flow-alert type="warning">
      <strong>Warning:</strong> Please check your input.
    </flow-alert>
    <flow-alert type="danger">
      <strong>Error:</strong> Something went wrong.
    </flow-alert>
  </div>
`;

// Interactive demo
export const InteractiveDemo = () => html`
  <div style="display: grid; gap: 1rem;">
    <h3 style="margin: 0; font-size: 1.2rem;">Dismissible Alerts</h3>
    <flow-alert type="info" dismissible>
      <strong>Info:</strong> This alert can be dismissed.
    </flow-alert>
    <flow-alert type="success" dismissible>
      <strong>Success:</strong> Click the X to close this alert.
    </flow-alert>
    <flow-alert type="warning" dismissible>
      <strong>Warning:</strong> Try dismissing this warning.
    </flow-alert>
    <flow-alert type="danger" dismissible>
      <strong>Error:</strong> This error alert is dismissible.
    </flow-alert>
  </div>
`;

// Complex content example
export const RichContent = () => html`
  <div style="display: grid; gap: 1rem;">
    <flow-alert type="info" dismissible>
      <div>
        <strong>Multiple Updates Available</strong>
        <p style="margin: 0.5rem 0 0 0; color: inherit;">
          We found 3 updates for your installed packages.
          <a href="#" style="color: inherit; text-decoration: underline;"
            >View details</a
          >
        </p>
      </div>
    </flow-alert>

    <flow-alert type="warning">
      <div>
        <strong>Storage Almost Full</strong>
        <p style="margin: 0.5rem 0 0 0; color: inherit;">
          You're using 94% of your available storage space.
        </p>
        <ul style="margin: 0.5rem 0 0 1rem; color: inherit;">
          <li>Delete unused files</li>
          <li>Clear browser cache</li>
          <li>Upgrade your plan</li>
        </ul>
      </div>
    </flow-alert>
  </div>
`;
