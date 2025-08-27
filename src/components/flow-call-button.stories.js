import { html } from "lit";
import "./flow-call-button.js";

export default {
  title: "Components/FlowCallButton",
  component: "flow-call-button",
  parameters: {
    docs: {
      description: {
        component:
          "A professional call button component with phone icon animations and multiple style variants. Perfect for law office websites and professional services.",
      },
    },
  },
  argTypes: {
    phoneNumber: {
      control: "text",
      description: "Phone number to call (with or without tel: prefix)",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Button size variant",
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "hero", "navbar"],
      description: "Visual style variant",
    },
    disabled: {
      control: "boolean",
      description: "Disable the button",
    },
    fullWidth: {
      control: "boolean",
      description: "Make button full width",
    },
  },
};

const Template = (args) => html`
  <style>
    .demo-container {
      padding: 2rem;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      min-height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .dark-demo {
      background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
    }
  </style>

  <div
    class="demo-container ${args.variant === "secondary" ? "dark-demo" : ""}"
  >
    <flow-call-button
      phone-number="${args.phoneNumber}"
      size="${args.size}"
      variant="${args.variant}"
      ?disabled="${args.disabled}"
      ?full-width="${args.fullWidth}"
    >
      ${args.slotContent || ""}
    </flow-call-button>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  phoneNumber: "+15555555555",
  size: "md",
  variant: "primary",
  disabled: false,
  fullWidth: false,
};

export const NavbarStyle = Template.bind({});
NavbarStyle.args = {
  phoneNumber: "+15555555555",
  size: "md",
  variant: "navbar",
  disabled: false,
  fullWidth: false,
};
NavbarStyle.parameters = {
  docs: {
    description: {
      story:
        "The navbar variant with blue-purple gradient, optimized for navigation bar use.",
    },
  },
};

export const HeroStyle = Template.bind({});
HeroStyle.args = {
  phoneNumber: "+15555555555",
  size: "lg",
  variant: "hero",
  disabled: false,
  fullWidth: false,
};
HeroStyle.parameters = {
  docs: {
    description: {
      story: "Hero section style with larger size and accent gradient.",
    },
  },
};

export const SecondaryStyle = Template.bind({});
SecondaryStyle.args = {
  phoneNumber: "+15555555555",
  size: "md",
  variant: "secondary",
  disabled: false,
  fullWidth: false,
};
SecondaryStyle.parameters = {
  docs: {
    description: {
      story: "Secondary style with dark theme colors.",
    },
  },
};

export const AllSizes = () => html`
  <style>
    .sizes-demo {
      padding: 2rem;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
    .size-row {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .size-label {
      width: 60px;
      font-weight: 600;
      color: #374151;
    }
  </style>

  <div class="sizes-demo">
    <div class="size-row">
      <div class="size-label">XS:</div>
      <flow-call-button
        size="sm"
        phone-number="+15555555555"
      ></flow-call-button>
    </div>
    <div class="size-row">
      <div class="size-label">MD:</div>
      <flow-call-button
        size="md"
        phone-number="+15555555555"
      ></flow-call-button>
    </div>
    <div class="size-row">
      <div class="size-label">LG:</div>
      <flow-call-button
        size="lg"
        phone-number="+15555555555"
      ></flow-call-button>
    </div>
    <div class="size-row">
      <div class="size-label">XL:</div>
      <flow-call-button
        size="xl"
        phone-number="+15555555555"
      ></flow-call-button>
    </div>
  </div>
`;

export const CustomText = Template.bind({});
CustomText.args = {
  phoneNumber: "+18005551234",
  size: "lg",
  variant: "primary",
  disabled: false,
  fullWidth: false,
  slotContent: "Emergency Hotline",
};
CustomText.parameters = {
  docs: {
    description: {
      story:
        "Custom button text using slots instead of default phone number format.",
    },
  },
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  phoneNumber: "+15555555555",
  size: "lg",
  variant: "hero",
  disabled: false,
  fullWidth: true,
};
FullWidth.parameters = {
  docs: {
    description: {
      story: "Full width button for mobile layouts or prominent CTAs.",
    },
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  phoneNumber: "+15555555555",
  size: "md",
  variant: "primary",
  disabled: true,
  fullWidth: false,
};
