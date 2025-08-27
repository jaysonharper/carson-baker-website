import { html } from "lit";
import "../components/flow-button.js";

export default {
  title: "Components/Flow Button",
  component: "flow-button",
  parameters: {
    docs: {
      description: {
        component:
          "A reusable button component based on Flowbite design patterns with Tailwind CSS styling.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "danger", "warning", "info"],
      description: "Button color variant",
      defaultValue: "primary",
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Button size",
      defaultValue: "md",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disables the button",
      defaultValue: false,
    },
    loading: {
      control: { type: "boolean" },
      description: "Shows loading spinner",
      defaultValue: false,
    },
    type: {
      control: { type: "select" },
      options: ["button", "submit", "reset"],
      description: "Button type attribute",
      defaultValue: "button",
    },
  },
};

// Template function
const Template = (args) => html`
  <flow-button
    variant="${args.variant}"
    size="${args.size}"
    ?disabled="${args.disabled}"
    ?loading="${args.loading}"
    type="${args.type}"
    @flow-click="${(e) => {
      /* Event logged in development mode */
    }}"
  >
    ${args.children || "Button Text"}
  </flow-button>
`;

// Default story
export const Default = Template.bind({});
Default.args = {
  variant: "primary",
  size: "md",
  children: "Default Button",
};

// Variant stories
export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
  children: "Primary Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
  children: "Secondary Button",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  children: "Success Button",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  children: "Danger Button",
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  children: "Warning Button",
};

// Size stories
export const AllSizes = () => html`
  <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
    <flow-button size="xs">Extra Small</flow-button>
    <flow-button size="sm">Small</flow-button>
    <flow-button size="md">Medium</flow-button>
    <flow-button size="lg">Large</flow-button>
    <flow-button size="xl">Extra Large</flow-button>
  </div>
`;

// State stories
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  children: "Disabled Button",
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  children: "Loading Button",
};

// Interactive demo
export const AllVariants = () => html`
  <div style="display: grid; gap: 1rem;">
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <flow-button variant="primary">Primary</flow-button>
      <flow-button variant="secondary">Secondary</flow-button>
      <flow-button variant="success">Success</flow-button>
      <flow-button variant="danger">Danger</flow-button>
      <flow-button variant="warning">Warning</flow-button>
      <flow-button variant="info">Info</flow-button>
    </div>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      <flow-button disabled>Disabled</flow-button>
      <flow-button loading>Loading</flow-button>
    </div>
  </div>
`;
