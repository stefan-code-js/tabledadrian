import { defineConfig, devices } from "@playwright/test";

const useDevServer = process.env.PLAYWRIGHT_USE_DEV_SERVER === "true";
const webServerCommand = useDevServer ? "npm run dev" : "npm run build && npm run start";
const webServerTimeout = useDevServer ? 180_000 : 300_000;
const reuseExistingServer = useDevServer && !process.env.CI;

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
