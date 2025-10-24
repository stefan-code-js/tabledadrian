import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const browsersDir =
    process.env.PLAYWRIGHT_BROWSERS_PATH ?? join(process.cwd(), "node_modules", "playwright-core", ".local-browsers");
let hasInstalledBrowsers = existsSync(browsersDir) && readdirSync(browsersDir).length > 0;
const command = process.platform === "win32" ? "npx.cmd" : "npx";

if (!hasInstalledBrowsers) {
    console.info("Playwright browsers not found; attempting Chromium installation...");
    const installResult = spawnSync(command, ["playwright", "install", "chromium"], { stdio: "inherit" });

    if (installResult.status !== 0) {
        console.warn("Chromium download failed; falling back to the HTTP integration suite.");
    } else {
        hasInstalledBrowsers = existsSync(browsersDir) && readdirSync(browsersDir).length > 0;
    }
}

if (hasInstalledBrowsers) {
    const child = spawn(command, ["playwright", "test"], { stdio: "inherit" });

    child.on("exit", (code) => {
        process.exit(code ?? 1);
    });
} else {
    const buildIdFile = join(process.cwd(), ".next", "BUILD_ID");
    if (!existsSync(buildIdFile)) {
        console.info("Running production build for fallback e2e suite...");
        const buildResult = spawnSync("npm", ["run", "build"], {
            stdio: "inherit",
            env: { ...process.env, PLAYWRIGHT_FALLBACK: "1" },
        });

        if (buildResult.status !== 0) {
            process.exit(buildResult.status ?? 1);
        }
    }

    const fallback = spawn(command, ["vitest", "run", "--config", "tests/e2e/fallback/vitest.config.ts"], {
        stdio: "inherit",
        env: { ...process.env, PLAYWRIGHT_FALLBACK: "1" },
    });

    fallback.on("exit", (code) => {
        process.exit(code ?? 1);
    });
}
