import { html } from "lit";
import "./flow-scroll-to-top.js";

export default {
  title: "Components/FlowScrollToTop",
  component: "flow-scroll-to-top",
  parameters: {
    docs: {
      description: {
        component:
          "A scroll-to-top button that appears when the hero section is out of view. Features smooth animations and GitHub-inspired styling.",
      },
    },
  },
  argTypes: {
    visible: {
      control: "boolean",
      description: "Controls button visibility",
    },
  },
};

const Template = (args) => html`
  <style>
    .demo-container {
      position: relative;
      height: 400px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .demo-content {
      text-align: center;
      color: #374151;
    }
    .scroll-demo {
      height: 150vh;
      background: linear-gradient(to bottom, #f8fafc, #e2e8f0, #cbd5e1);
      padding: 2rem;
    }
  </style>

  <div class="demo-container">
    <div class="demo-content">
      <h3>Scroll to Top Button Demo</h3>
      <p>
        In a real app, this button appears when the hero section scrolls out of
        view.
      </p>
      <p>Use the controls below to toggle visibility.</p>
    </div>

    <flow-scroll-to-top ?visible="${args.visible}"></flow-scroll-to-top>
  </div>
`;

export const Default = Template.bind({});
Default.args = {
  visible: false,
};

export const Visible = Template.bind({});
Visible.args = {
  visible: true,
};

export const ScrollDemo = () => html`
  <style>
    .scroll-demo-container {
      height: 200vh;
      background: linear-gradient(
        to bottom,
        #0d1117 0%,
        #161b22 20%,
        #f8fafc 21%,
        #e2e8f0 50%,
        #cbd5e1 100%
      );
    }
    .hero-section {
      height: 100vh;
      background: linear-gradient(135deg, #0d1117 0%, #161b22 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f0f6fc;
    }
    .content-section {
      height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #374151;
    }
    .demo-text {
      text-align: center;
      max-width: 600px;
      padding: 2rem;
    }
  </style>

  <div class="scroll-demo-container">
    <div class="hero-section">
      <div class="demo-text">
        <h1>Hero Section</h1>
        <p>
          Scroll down to see the scroll-to-top button appear when this section
          goes out of view.
        </p>
      </div>
    </div>

    <div class="content-section">
      <div class="demo-text">
        <h2>Content Section</h2>
        <p>
          The scroll-to-top button should now be visible in the bottom right
          corner.
        </p>
        <p>Click it to smoothly scroll back to the top!</p>
      </div>
    </div>

    <flow-scroll-to-top></flow-scroll-to-top>
  </div>
`;
ScrollDemo.parameters = {
  layout: "fullscreen",
  docs: {
    description: {
      story:
        "Interactive demo showing how the button appears when scrolling past the hero section.",
    },
  },
};
