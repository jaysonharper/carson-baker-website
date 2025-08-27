import { html } from "lit";
import "./flow-navbar.js";

export default {
  title: "Components/FlowNavbar",
  component: "flow-navbar",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A professional navigation bar for law offices with GitHub-inspired dark theme, mobile responsiveness, and smooth animations.",
      },
    },
  },
  argTypes: {
    mobileMenuOpen: {
      control: "boolean",
      description: "Controls the mobile menu visibility",
    },
  },
};

const Template = (args) => html`
  <style>
    body {
      margin: 0;
      padding: 0;
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }
    .demo-content {
      padding-top: 80px;
      padding: 80px 2rem 2rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .demo-section {
      margin: 4rem 0;
      padding: 2rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  </style>

  <flow-navbar .mobileMenuOpen=${args.mobileMenuOpen}></flow-navbar>

  <div class="demo-content">
    <div class="demo-section" id="services">
      <h2>Professional Services</h2>
      <p>
        Temporary content showcasing our legal services. This section will be
        expanded in future updates with detailed service offerings.
      </p>
    </div>

    <div class="demo-section" id="attorneys">
      <h2>Meet Our Attorneys</h2>
      <p>
        Temporary content introducing our legal team. This section will feature
        attorney profiles and expertise areas.
      </p>
    </div>

    <div class="demo-section" id="testimonials">
      <h2>Testimonials</h2>
      <p>
        Temporary content for client testimonials. This section will showcase
        client feedback and success stories.
      </p>
    </div>

    <div class="demo-section" id="find-us">
      <h2>Find Us</h2>
      <p>
        Temporary content for location and contact information. This section
        will include office locations and contact details.
      </p>
    </div>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  mobileMenuOpen: false,
};

export const MobileMenuOpen = Template.bind({});
MobileMenuOpen.args = {
  mobileMenuOpen: true,
};
MobileMenuOpen.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
