import { defineConfig } from "vitest/config";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

const isModuleNotFoundError = (error: unknown): error is { code?: string } =>
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "MODULE_NOT_FOUND";

const hasSentry = (() => {
    try {
        require.resolve("@sentry/nextjs/package.json");
        return true;
    } catch (error) {
        if (isModuleNotFoundError(error)) {
            return false;
        }
        throw error;
    }
})();

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        include: ["tests/**/*.test.ts"],
        setupFiles: ["./tests/vitest.setup.ts"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            ...(hasSentry
                ? {}
                : {
                      "@sentry/nextjs": path.resolve(__dirname, "src/stubs/sentry.ts"),
                  }),
        },
        coverage: {
            provider: "v8",
            reportsDirectory: "coverage",
            reporter: ["text", "lcov"],
            include: ["src/**/*.{ts,tsx}"],
            exclude: ["src/app/api/og/route.tsx"],
        },
    },
});
