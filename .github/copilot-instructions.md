# Copilot Instructions: Carson Seegmuller & Baker Website

## Project Type and Intent

This repository is a static, single-page website template with client-side section navigation (anchor-based smooth scrolling, no full-page route transitions).

The project is intended to be:

- a clean starter for prototyping and learning
- mobile-first and accessible
- simple to maintain (vanilla JS + Lit web components)

Do not introduce framework-level routing, server-side rendering, or heavy runtime abstractions unless explicitly requested.

## Current Stack (Authoritative)

- HTML5
- Vanilla JavaScript (ES modules)
- Lit (web components)
- Tailwind CSS + PostCSS
- Flowbite (UI patterns)
- Vite (dev/build tool)
- ESLint (flat config)
- Vitest (dual-project setup)
- Playwright (Chromium for browser tests)

## Canonical NPM Scripts

Use only scripts that currently exist in `package.json`:

- `npm run dev` -> Vite dev server
- `npm run build` -> Production build
- `npm run preview` -> Preview built app
- `npm run test` -> Vitest (browser + node projects)
- `npm run lint` -> ESLint

Do not assume scripts like `storybook`, `format`, `clean:*`, or `test:node` exist unless they are re-added to `package.json`.

## Testing Model

Testing is configured in `vitest.config.js` with two projects:

1. `browser` project
   - Runs Playwright Chromium tests
   - Includes:
     - `src/components/flow-attorney-card.test.js`
     - `src/**/*.dom.test.js`

2. `node` project
   - Runs node/jsdom-oriented tests
   - Includes:
     - `src/**/*.test.js`
     - `tests/**/*.js`
   - Excludes browser-only suites and deprecated Storybook patterns

Important testing notes:

- First-time browser test setup requires:
  - `npx playwright install chromium`
- `npm run test` defaults to watch mode in Vitest. For one-shot execution in automation, use:
  - `npx vitest run`
- In jsdom tests for `tel:` links, prevent default navigation to avoid false failures.

## Architecture and Key Files

- Entry HTML: `index.html`
- App bootstrap: `src/app.main.js`
- Component registry/export hub: `src/components/index.js`
- Styles entry: `src/styles/main.css`
- Test config: `vitest.config.js`
- Lint config: `eslint.config.mjs` (ESM, flat config)
- Documentation folder: `docs/`

## Core Components in `src/components/`

- `flow-navbar.js`
- `flow-button.js`
- `flow-alert.js`
- `flow-call-button.js`
- `flow-floating-call-button.js`
- `flow-scroll-to-top.js`
- `flow-attorney-card.js`
- `service-highlights.js`

Other notes:

- `flow-scales-icon.js` is intentionally deprecated (icon inlined in navbar SVG).
- Component tests are co-located with component files using `.test.js` naming.

## Coding Conventions and Expectations

Follow existing code style and patterns:

- ES modules (`import`/`export`)
- Double quotes in JS strings
- Semicolons enabled
- Lit components extend `LitElement` and register via `customElements.define`
- Prefer small, explicit helpers over implicit side effects
- Keep behavior deterministic and testable

When adding or modifying components:

1. Implement in `src/components/flow-*.js`
2. Register/export in `src/components/index.js` if needed
3. Add/adjust tests (`.test.js`)
4. Update docs in `docs/` and/or `README.md` when behavior changes

## SPA Behavior Requirements

Preserve these characteristics unless explicitly asked to change them:

- Single-page behavior
- Smooth in-page navigation
- Mobile-first layout behavior
- Floating call/scroll buttons with footer-aware pinning
- Accessibility hooks (ARIA labels, keyboard support)

## Environment Variable Guidance

- Only `VITE_*` variables are exposed to browser code.
- Never place secrets in client-exposed env vars.
- If env usage is added/changed, keep docs aligned with actual usage.

## Storybook Status

Storybook was removed from active project workflows.

- Do not add Storybook references, scripts, or docs unless explicitly requested.
- If you encounter stale Storybook references in docs/config/comments, prefer removing or updating them for accuracy.

## Change Safety Checklist (for future sessions)

Before finishing any substantial change:

1. Run relevant tests (at minimum `npm run test` or targeted Vitest run).
2. Confirm lint status with `npm run lint` when JS/CSS structure changed.
3. Ensure docs match implementation (especially `README.md` and files in `docs/`).
4. Avoid introducing tools/dependencies not present in the stack unless requested.
5. Keep edits focused; do not refactor unrelated files.

## High-Value Context for Chat Sessions

When helping in future chats, prioritize:

- correctness of scripts/configs over assumptions from older docs
- consistency with existing Lit + static SPA architecture
- test reliability across both Vitest projects
- documentation accuracy after every behavioral or tooling change
