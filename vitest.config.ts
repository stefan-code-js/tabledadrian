import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        include: ["tests/**/*.test.ts"],
        setupFiles: ["./tests/vitest.setup.ts"],
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@sentry/nextjs": path.resolve(__dirname, "src/stubs/sentry.ts"),
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

