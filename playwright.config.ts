import { defineConfig, devices } from "@playwright/test";

const useDevServer = process.env.PLAYWRIGHT_USE_DEV_SERVER === "true";
const webServerCommand = useDevServer ? "npm run dev" : "npm run build && npm run start";
const webServerTimeout = useDevServer ? 180_000 : 300_000;
const reuseExistingServer = useDevServer && !process.env.CI;

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const devCommand = "npm run dev -- --hostname 127.0.0.1 --port 3000";
const browsersDir =
    process.env.PLAYWRIGHT_BROWSERS_PATH ?? join(__dirname, "node_modules", "playwright-core", ".local-browsers");
const hasInstalledBrowsers = existsSync(browsersDir) && readdirSync(browsersDir).length > 0;

if (!hasInstalledBrowsers) {
    console.warn("Playwright browsers not found; skipping e2e projects.");
}

export default defineConfig({
    testDir: "tests/e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : undefined,
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3000",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
    },

  webServer: hasInstalledBrowsers
        ? {
              command: process.env.CI ? "npm run build && npm run start" : devCommand,
              url: "http://127.0.0.1:3000",
              reuseExistingServer: !process.env.CI,
              stdout: "pipe",
              stderr: "pipe",
              timeout: process.env.CI ? 300_000 : 240_000,
          }
        : undefined,
    projects: hasInstalledBrowsers
        ? [
              {
                  name: "Desktop Chrome",
                  use: devices["Desktop Chrome"],
              },
          ]
        : [],

    webServer: {
        command: webServerCommand,
        url: "http://127.0.0.1:3000",
        reuseExistingServer,
        stdout: "pipe",
        stderr: "pipe",
        timeout: webServerTimeout,
    },
    projects: [
        {
            name: "Desktop Chrome",
            use: devices["Desktop Chrome"],
        },
    ],

});
