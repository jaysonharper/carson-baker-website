// Component registry - imports and registers all custom components
// Import this file to use all components in your app

// UI Components (Basic building blocks)
import "./flow-button.js";
import "./flow-alert.js";
import "./flow-attorney-card.js";

// Layout Components (Page structure)
import "./flow-navbar.js";
import "./flow-scroll-to-top.js";

// Feature Components (Business logic)
import "./flow-call-button.js";
import "./flow-floating-call-button.js";

// Icons & Graphics
import "./flow-scales-icon.js";

// Export for programmatic access
// UI Components
export { FlowButton } from "./flow-button.js";
export { FlowAlert } from "./flow-alert.js";

// Layout Components
export { FlowNavbar } from "./flow-navbar.js";
export { FlowScrollToTop } from "./flow-scroll-to-top.js";

// Feature Components
export { FlowCallButton } from "./flow-call-button.js";
export { FlowFloatingCallButton } from "./flow-floating-call-button.js";

// Icons & Graphics
export { FlowScalesIcon } from "./flow-scales-icon.js";

if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
  console.log("🎨 Flow Components loaded successfully");
}
