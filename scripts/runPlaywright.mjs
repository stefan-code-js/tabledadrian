import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const browsersDir =
    process.env.PLAYWRIGHT_BROWSERS_PATH ?? join(process.cwd(), "node_modules", "playwright-core", ".local-browsers");
const resolveBin = (name) =>
    join(process.cwd(), "node_modules", ".bin", process.platform === "win32" ? `${name}.cmd` : name);
const playwrightBin = resolveBin("playwright");
const vitestBin = resolveBin("vitest");
const browsersAvailable = () => existsSync(browsersDir) && readdirSync(browsersDir).length > 0;
let hasInstalledBrowsers = browsersAvailable();

if (!hasInstalledBrowsers) {
    console.info("Playwright browsers not found; attempting Chromium installation...");
    const installResult = spawnSync(playwrightBin, ["install", "chromium"], { stdio: "inherit" });

    if (installResult.status !== 0) {
        console.warn("Chromium download failed; falling back to the HTTP integration suite.");
    } else {
        hasInstalledBrowsers = browsersAvailable();
    }
}

if (hasInstalledBrowsers) {
    const child = spawn(playwrightBin, ["test"], { stdio: "inherit" });

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

    const fallback = spawn(vitestBin, ["run", "--config", "tests/e2e/fallback/vitest.config.ts"], {
        stdio: "inherit",
        env: { ...process.env, PLAYWRIGHT_FALLBACK: "1" },
    });

    fallback.on("exit", (code) => {
        process.exit(code ?? 1);
    });
}
