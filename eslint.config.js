// ESLint flat config for a Vite + Vanilla JS project (CommonJS)
// Using CJS avoids Node warnings without setting "type": "module" in package.json.
const js = require("@eslint/js");
const globals = require("globals");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
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
        // Analytics global referenced in client code
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
