import type { NextConfig } from "next";

export const sentryConfig: Partial<NextConfig> = {
    sentry: {
        autoInstrumentMiddleware: true,
    },
};
