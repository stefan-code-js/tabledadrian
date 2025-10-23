import { spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const browsersDir =
    process.env.PLAYWRIGHT_BROWSERS_PATH ?? join(process.cwd(), "node_modules", "playwright-core", ".local-browsers");
const hasInstalledBrowsers = existsSync(browsersDir) && readdirSync(browsersDir).length > 0;

if (!hasInstalledBrowsers) {
    console.warn("Playwright browsers not found; skipping e2e tests.");
    process.exit(0);
}

const command = process.platform === "win32" ? "npx.cmd" : "npx";
const child = spawn(command, ["playwright", "test"], { stdio: "inherit" });

child.on("exit", (code) => {
    process.exit(code ?? 1);
});
