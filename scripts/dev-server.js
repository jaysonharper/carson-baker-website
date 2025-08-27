#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

// Start Vite dev server
const vite = spawn("npm", ["run", "dev"], {
  stdio: "inherit",
  cwd: process.cwd(),
  shell: true,
});

// Handle graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);

  if (vite && !vite.killed) {
    vite.kill("SIGTERM");

    // Give it a moment to shut down gracefully
    setTimeout(() => {
      if (!vite.killed) {
        vite.kill("SIGKILL");
      }
    }, 2000);
  }

  console.log("✅ Dev server stopped successfully");
  process.exit(0);
};

// Listen for shutdown signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGHUP", () => gracefulShutdown("SIGHUP"));

// Handle Vite process exit
vite.on("exit", (code, signal) => {
  if (signal) {
    console.log(`\n📡 Dev server stopped (${signal})`);
    process.exit(0);
  } else if (code === 0) {
    console.log("\n✅ Dev server stopped successfully");
    process.exit(0);
  } else {
    console.log(`\n⚠️ Dev server exited with code ${code}`);
    process.exit(code);
  }
});

vite.on("error", (err) => {
  console.error("❌ Failed to start dev server:", err);
  process.exit(1);
});
