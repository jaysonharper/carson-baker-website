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

```bash
# Clone the repository
git clone https://github.com/jaysonharper/static-web-starter-template.git
cd static-web-starter-template

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your application.

### Component Development

```bash
# Start Storybook for component development
npm run storybook
```

Visit `http://localhost:6006` to access the component library.

## 📜 Available Scripts

### Development

- `npm run dev` - Start Vite dev server
- `npm run dev:clean` - Clean cache and start dev server

### Building

- `npm run build` - Build for production
- `npm run build:clean` - Clean cache and build
- `npm run preview` - Preview production build

### Testing

- `npm run test` - Run unit tests with Vitest

### Storybook

- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build Storybook for deployment

### Maintenance

- `npm run format` - Format code with Prettier
- `npm run clean:cache` - Clear Vite cache
- `npm run clean:all` - Clear all build artifacts
- `npm run fresh-install` - Clean reinstall dependencies

## 🧩 Component Library

The project includes a growing library of reusable Lit web components:

### Available Components

#### Flow Button (`<flow-button>`)

```html
<flow-button variant="primary" size="md">Click me</flow-button>
<flow-button variant="success" loading>Processing...</flow-button>
```

**Properties:**

- `variant`: primary, secondary, success, danger, warning, info
- `size`: xs, sm, md, lg, xl
- `disabled`: boolean
- `loading`: boolean

#### Flow Alert (`<flow-alert>`)

```html
<flow-alert type="success" dismissible>
  <strong>Success!</strong> Operation completed.
</flow-alert>
```

**Properties:**

- `type`: info, success, warning, danger
- `dismissible`: boolean
- `icon`: boolean

#### Flow Floating Call Button (`<flow-floating-call-button>`)

```html
<flow-floating-call-button
  phone-number="+15555555555"
></flow-floating-call-button>
```

**Properties:**

- `phone-number`: string (tel: format)
- `visible`: boolean (auto-managed)
- `pinned`: boolean (auto-managed)

**Features:**

- Appears when hero section scrolls out of view
- Smart positioning above footer when footer is visible
- Intersection Observer-based visibility control

#### Flow Scroll to Top (`<flow-scroll-to-top>`)

```html
<flow-scroll-to-top></flow-scroll-to-top>
```

**Properties:**

- `visible`: boolean (auto-managed)
- `pinned`: boolean (auto-managed)

**Features:**

- Smooth scroll to top functionality
- Appears when hero section scrolls out of view
- Smart positioning above footer when footer is visible

#### Responsive Footer

The footer component provides a professional, mobile-responsive footer:

**Desktop/Tablet Features:**

- Business name and tagline
- Navigation links to main sections
- Complete copyright notice
- Dark gradient theme matching navbar

**Mobile Features:**

- Compact design with essential information only
- No redundant navigation (hamburger menu provides navigation)
- Optimized typography and spacing

**Smart Integration:**

- Floating elements automatically pin above footer when footer comes into view
- Prevents UI overlap while maintaining functionality
- Smooth transitions between positioning states

### Creating New Components

1. Create component in `src/components/`
2. Add to `src/components/index.js`
3. Create stories in `src/components/[component].stories.js`
4. Document in Storybook

## 📁 Project Structure

```
├── .storybook/          # Storybook configuration
├── docs/                # Component documentation
├── scripts/             # Build and dev scripts
├── src/
│   ├── components/      # Lit web components
│   │   ├── flow-button.js
│   │   ├── flow-alert.js
│   │   └── *.stories.js # Storybook stories
│   ├── stories/         # Default Storybook examples
│   ├── styles/          # Modular CSS architecture
│   │   ├── main.css     # Main stylesheet entry point
│   │   ├── base/        # Reset, variables, typography
│   │   ├── components/  # Component-specific styles
│   │   ├── layout/      # Layout and animations
│   │   └── utilities/   # Responsive and scroll utilities
│   └── app.main.js          # Application entry point
├── index.html           # Main HTML file
└── vite.config.js       # Vite configuration
```

## 🎨 Design System

Components follow [Flowbite](https://flowbite.com/) design patterns and use Tailwind CSS utility classes. This ensures:

- **Consistency** across components
- **Accessibility** built-in
- **Responsive** design
- **Dark mode** support
- **Professional** appearance

## 🧪 Testing

Run tests with Vitest:

```bash
npm run test
```

Test files should be placed alongside components with `.test.js` suffix.

## 📖 Documentation

- **Live Demo**: Available in development server
- **Component Library**: Accessible via Storybook
- **API Documentation**: Auto-generated in Storybook docs

## 🚀 Deployment

### GitHub Pages (Automatic Base Path)

This template is configured so that when you click "Use this template" and create a new repository, GitHub Pages deployment works without manual edits—CSS and assets will load correctly under your new repo name.

How it works:

- The Vite config derives the correct `base` path from `VITE_BASE_PATH` or the `GITHUB_REPOSITORY` env var inside the GitHub Actions workflow.
- The workflow injects `VITE_BASE_PATH=/your-repo-name/` automatically unless the repo is a root user/org site (`username.github.io`).
- For user/org Pages sites (`*.github.io`), the base is `/`.

User steps after creating a repo from the template:

1. Push to `main` (or just keep the initial commit).
2. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions). The first workflow run will publish automatically.
3. Visit: `https://<your-username>.github.io/<your-repo-name>/` (or root if a `*.github.io` repo).

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
- [Vitest](https://vitest.dev/) - Blazing fast testing framework
