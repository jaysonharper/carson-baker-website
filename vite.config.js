import { defineConfig, loadEnv } from "vite";

// Helper to normalize base path (always leading + trailing slash unless root)
function normalizeBase(base) {
  if (!base || base === "." || base === "/") return "/";
  let b = base.trim();
  if (!b.startsWith("/")) b = "/" + b;
  if (!b.endsWith("/")) b += "/";
  return b;
}

// Export config with access to mode/env so GitHub Pages workflow can inject VITE_BASE_PATH
export default defineConfig(({ mode }) => {
  // Load all env vars (include those without VITE_ prefix so workflow injection works either way)
  const env = loadEnv(mode, process.cwd(), "");

  // Priority order for determining base path:
  // 1. Explicit VITE_BASE_PATH (set by GitHub Action or user .env.production)
  // 2. If running in GitHub Actions with GITHUB_REPOSITORY (owner/repo) and repo is not a user/ org site, derive from repo name
  // 3. Root '/'
  let derivedBase = env.VITE_BASE_PATH;

  if (!derivedBase && env.GITHUB_REPOSITORY) {
    const repoName = env.GITHUB_REPOSITORY.split("/").pop();
    // user.github.io style repos should deploy at root
    if (repoName && !repoName.endsWith(".github.io")) {
      derivedBase = `/${repoName}/`;
    } else {
      derivedBase = "/";
    }
  }

  const base = normalizeBase(derivedBase);

  return {
    // Dynamic base for GitHub Pages or other hosting
    base,

    // Build options
    build: {
      outDir: "dist",
      assetsDir: "assets",
      manifest: false, // Set to true if you later need manifest-driven integration
      target: "esnext",
      minify: "esbuild",
      sourcemap: false,
    },

    // Development server options
    server: {
      port: 5173,
      host: true,
      open: true,
    },

    // Preview server options (for testing build)
    preview: {
      port: 5173,
      host: true,
    },
  };
});
