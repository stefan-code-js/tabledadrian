import * as Sentry from "@sentry/nextjs";

export function register() {
    const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
    Sentry.init({
        dsn,
        enabled: Boolean(dsn),
        tracesSampleRate: 0.05,
        debug: false,
    });
}

export const onRequestError = Sentry.captureRequestError;
