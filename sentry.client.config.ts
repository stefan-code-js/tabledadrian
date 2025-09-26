import * as Sentry from "@sentry/nextjs";
// migrated to src/instrumentation-client.ts
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

Sentry.init({
    dsn,
    enabled: Boolean(dsn),
    tracesSampleRate: 0.05,
    debug: false,
});
