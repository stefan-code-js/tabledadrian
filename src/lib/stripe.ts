import { resolveCfEnv } from "./cloudflare";

export const STRIPE_SECRET_ENV_KEYS = [
    "STRIPE_SECRET_KEY",
    "STRIPE_KEY",
    "STRIPE_LIVE_SECRET_KEY",
    "STRIPE_SECRET_KEY_LIVE",
    "STRIPE_LIVE_KEY",
    "STRIPE_SECRET_LIVE_KEY",
    "STRIPE_SECRET",
    "STRIPE_API_KEY",
] as const;

export type StripeSecretEnv = Partial<Record<(typeof STRIPE_SECRET_ENV_KEYS)[number], string>>;

export function sanitizeStripeSecret(value: string | undefined): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
}

const globalObject = typeof globalThis === "object" && globalThis ? globalThis : undefined;

type MaybeRecord = Partial<Record<(typeof STRIPE_SECRET_ENV_KEYS)[number], string | undefined>> | undefined;

const globalProcessEnv: MaybeRecord = globalObject
    ? ((globalObject as { process?: { env?: Record<string, string | undefined> } }).process?.env as MaybeRecord)
    : undefined;

const globalRuntimeEnv: MaybeRecord = globalObject
    ? ((globalObject as { __ENV__?: Record<string, string | undefined>; __env__?: Record<string, string | undefined> }).__ENV__ ||
          (globalObject as { __ENV__?: Record<string, string | undefined>; __env__?: Record<string, string | undefined> }).__env__ ||
          (globalObject as { ENV?: Record<string, string | undefined> }).ENV ||
          undefined)
    : undefined;

const FALLBACK_ENV_SOURCES: MaybeRecord[] = [globalProcessEnv, globalRuntimeEnv].filter(
    (source): source is NonNullable<MaybeRecord> => Boolean(source),
);

export function resolveStripeSecret(env?: StripeSecretEnv): string | undefined {
    const resolvedEnv = resolveCfEnv(env);
    const sources: MaybeRecord[] = [resolvedEnv, ...FALLBACK_ENV_SOURCES];

    for (const source of sources) {
        if (!source) continue;
        for (const key of STRIPE_SECRET_ENV_KEYS) {
            const candidate = sanitizeStripeSecret(source[key]);
            if (candidate) {
                return candidate;
            }
        }
    }

    return undefined;
}
