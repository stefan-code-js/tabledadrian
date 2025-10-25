import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["tests/e2e/fallback/**/*.test.ts"],
        testTimeout: 120_000,
        hookTimeout: 120_000,
        threads: false,
        alias: {
            "@": path.resolve(dirname, "../../..", "src"),
        },
    },
});
