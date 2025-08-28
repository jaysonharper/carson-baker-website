# Static Web Starter Template

> A modern, lightweight static web starter template featuring Lit web components, Tailwind CSS, and Storybook. Built with Vite for fast development and designed with a mobile-first approach for rapid prototyping and learning.

## ✨ Features

- 🚀 **Fast Development** - Vite build tool with HMR
- 🎨 **Modern UI Components** - Lit web components with Flowbite design patterns
- 💨 **Tailwind CSS** - Utility-first CSS framework
- 📚 **Storybook** - Component development and documentation
- 🧪 **Testing** - Vitest for unit testing
- 📱 **Mobile-First** - Responsive design approach
- ⚡ **Single Page App** - Client-side navigation with smooth transitions
- 🔧 **Developer Experience** - ESLint, Prettier, PostCSS
- ♿ **Accessibility** - Built-in a11y testing with Storybook

## 🏗️ Tech Stack

### Core Technologies

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling
- **Vanilla JavaScript** - No framework dependencies
- **Lit** - Lightweight web components

### Development Tools

- **Vite** - Build tool and dev server
- **Storybook** - Component development environment
- **Vitest** - Testing framework
- **Prettier** - Code formatting
- **ESLint** - JavaScript linting
- **PostCSS** - CSS processing

### UI Components

- **Flowbite** - Design system and component patterns
- **Custom Lit Components** - Reusable web components

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (required for Storybook)
- npm or yarn

### Installation & Development

````bash
# Clone the repository
git clone https://github.com/jaysonharper/static-web-starter-template.git
cd static-web-starter-template

# Install dependencies
npm install

# Start development server

Visit `http://localhost:5173` to see your application.

### Component Development

```bash
# Start Storybook for component development
npm run storybook
````

Visit `http://localhost:6006` to access the component library.

## � Environment Variables

This project now relies on a local-only env file and no longer includes a committed `.env.example`.

Create a `.env.local` in the project root (already added to `.gitignore`). Example contents:

```bash
VITE_APP_NAME="Law Offices of Carson & Baker"
VITE_APP_VERSION="1.0.0"
VITE_APP_ENVIRONMENT="development"
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG=true
VITE_OFFICE_PHONE="+1-555-LAW-FIRM"
VITE_OFFICE_EMAIL="contact@harperandcats.law"
```

Guidelines:

- Only variables prefixed with `VITE_` are exposed to client code via `import.meta.env`.
- Never place secrets (API keys, tokens) in `VITE_` variables—they are bundled into frontend JavaScript.
- Restart the dev server after adding or renaming variables.
- Use additional env files if needed (`.env.production`, `.env.development`, etc.). Add a `.local` suffix for machine‑specific overrides (already git‑ignored).

const debugEnabled = import.meta.env.VITE_ENABLE_DEBUG === 'true';

````

If you need a template for distribution, you can recreate one manually (e.g. `cp .env.local .env.example` and strip sensitive values) before sharing the project.

## �📜 Available Scripts

### Development

- `npm run dev` - Start Vite dev server
- `npm run dev:clean` - Clean cache and start dev server

### Building

- `npm run preview` - Preview production build

### Testing
### Storybook

- `npm run storybook` - Start Storybook dev server

### Maintenance

- `npm run clean:all` - Clear all build artifacts
- `npm run fresh-install` - Clean reinstall dependencies

### Available Components

#### Flow Button (`<flow-button>`)

```html
<flow-button variant="primary" size="md">Click me</flow-button>
<flow-button variant="success" loading>Processing...</flow-button>
````

**Properties:**

- `variant`: primary, secondary, success, danger, warning, info
- `size`: xs, sm, md, lg, xl
- `disabled`: boolean
- `loading`: boolean

  <strong>Success!</strong> Operation completed.
  </flow-alert>

```

**Properties:**

- `type`: info, success, warning, danger
- `dismissible`: boolean
- `icon`: boolean

#### Flow Floating Call Button (`<flow-floating-call-button>`)
  phone-number="+15032889291"
></flow-floating-call-button>
```

**Properties:**

- `phone-number`: string (tel: format)
- `visible`: boolean (auto-managed)
- `pinned`: boolean (auto-managed)

**Features:**

- Intersection Observer-based visibility control

#### Flow Scroll to Top (`<flow-scroll-to-top>`)

```

**Properties:**

- `visible`: boolean (auto-managed)
- `pinned`: boolean (auto-managed)

**Features:**

- Smart positioning above footer when footer is visible

#### Responsive Footer
**Desktop/Tablet Features:**

- Business name and tagline
- Navigation links to main sections
- Complete copyright notice
- Dark gradient theme matching navbar

- Optimized typography and spacing

**Smart Integration:**
- Smooth transitions between positioning states

### Creating New Components
3. Create stories in `src/components/[component].stories.js`
4. Document in Storybook

## 📁 Project Structure

```

├── .storybook/ # Storybook configuration
├── docs/ # Component documentation
├── scripts/ # Build and dev scripts
├── src/
│ ├── components/ # Lit web components
│ │ ├── flow-button.js
│ │ ├── flow-alert.js
│ │ └── \*.stories.js # Storybook stories
│ ├── stories/ # Default Storybook examples
│ ├── styles/ # Modular CSS architecture
│ │ ├── main.css # Main stylesheet entry point
│ │ ├── base/ # Reset, variables, typography
│ │ ├── components/ # Component-specific styles
│ │ ├── layout/ # Layout and animations
│ │ └── utilities/ # Responsive and scroll utilities
│ └── app.main.js # Application entry point
├── index.html # Main HTML file
└── vite.config.js # Vite configuration

````

## 🎨 Design System

Components follow [Flowbite](https://flowbite.com/) design patterns and use Tailwind CSS utility classes. This ensures:

- **Consistency** across components
- **Accessibility** built-in
- **Responsive** design
- **Dark mode** support
- **Professional** appearance
```bash
npm run test
````

Test files should be placed alongside components with `.test.js` suffix.

## 📖 Documentation

- **Live Demo**: Available in development server
- **Component Library**: Accessible via Storybook
- **API Documentation**: Auto-generated in Storybook docs

## 🚀 Deployment

This template is configured so that when you click "Use this template" and create a new repository, GitHub Pages deployment works without manual edits—CSS and assets will load correctly under your new repo name.

How it works:

- The Vite config derives the correct `base` path from `VITE_BASE_PATH` or the `GITHUB_REPOSITORY` env var inside the GitHub Actions workflow.
- The workflow injects `VITE_BASE_PATH=/your-repo-name/` automatically unless the repo is a root user/org site (`username.github.io`).
- For user/org Pages sites (`*.github.io`), the base is `/`.

User steps after creating a repo from the template: 3. Visit: `https://<your-username>.github.io/<your-repo-name>/` (or root if a `*.github.io` repo).

No need to edit `vite.config.js`, scripts, or HTML paths.

### Local Production Build

```bash
npm run build
```

If you need to simulate a different repo name locally:

```bash
VITE_BASE_PATH=/my-custom-repo/ npm run build
```

On Windows PowerShell:

```powershell
$env:VITE_BASE_PATH="/my-custom-repo/"; npm run build
```

### Optional .env.production

Create `.env.production` only if you want to pin a custom base:

```
VITE_BASE_PATH=/custom-path/
```

An example file is provided at `.env.production.example`.

### Deploy Storybook (optional)

```bash
npm run build-storybook
```

Outputs: `dist/` (app) and `storybook-static/` (Storybook).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Run tests: `npm run test`
6. Format code: `npm run format`
7. Commit changes: `git commit -am 'Add feature'`
8. Push to branch: `git push origin feature-name`
9. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Lightning fast build tool
- [Lit](https://lit.dev/) - Simple, fast web components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Storybook](https://storybook.js.org/) - Component development environment
- [Flowbite](https://flowbite.com/) - Component design patterns

```bash

```
