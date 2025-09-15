// ESLint flat config for a Vite + Vanilla JS project (ESM)
import js from "@eslint/js";
import globals from "globals";

export default [
  // Ignore build artifacts and external folders
  {
    ignores: [
      "node_modules/",
      "dist/",
      "public/",
      "storybook-static/",
      "coverage/",
      "**/.vite/",
    ],
  },

  // Base recommended rules
  js.configs.recommended,

  // Project-wide settings
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        // Declare analytics global used in client code
        gtag: "readonly",
      },
    },
    rules: {
      // Helpful defaults that play nicely with Prettier formatting
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "off",
    },
  },

  // Test files (Vitest)
  {
    files: [
      "**/*.test.js",
      "**/*.spec.js",
      "tests/**/*.js",
      "src/**/*.test.js",
      "src/**/*.spec.js",
    ],
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Allow assertions like `expect(something).to.be.true`
      "no-unused-expressions": "off",
    },
  },
];
