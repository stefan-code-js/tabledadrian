import { resolveCfEnv } from "./cloudflare";

export const STRIPE_SECRET_ENV_KEYS = [
    "STRIPE_SECRET_KEY",
    "STRIPE_KEY",
    "STRIPE_LIVE_SECRET_KEY",
    "STRIPE_SECRET_KEY_LIVE",
    "STRIPE_LIVE_KEY",
    "STRIPE_SECRET_LIVE_KEY",
] as const;

export type StripeSecretEnv = Partial<Record<(typeof STRIPE_SECRET_ENV_KEYS)[number], string>>;

export function sanitizeStripeSecret(value: string | undefined): string | undefined {
    if (typeof value !== "string") {
        return undefined;
    }
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
}

export function resolveStaticStripeSecret(): string | undefined {
    try {
        const secret =
            process.env.STRIPE_SECRET_KEY ||
            process.env.STRIPE_KEY ||
            process.env.STRIPE_LIVE_SECRET_KEY ||
            process.env.STRIPE_SECRET_KEY_LIVE ||
            process.env.STRIPE_LIVE_KEY ||
            process.env.STRIPE_SECRET_LIVE_KEY;
        return sanitizeStripeSecret(secret);
    } catch {
        return undefined;
    }
}

export function resolveStripeSecret(env?: StripeSecretEnv): string | undefined {
    const resolvedEnv = resolveCfEnv(env);

    for (const key of STRIPE_SECRET_ENV_KEYS) {
        const fromEnv = sanitizeStripeSecret(resolvedEnv?.[key]);
        if (fromEnv) {
            return fromEnv;
        }
    }

    if (typeof process !== "undefined" && typeof process.env !== "undefined") {
        for (const key of STRIPE_SECRET_ENV_KEYS) {
            const fallback = sanitizeStripeSecret(process.env[key]);
            if (fallback) {
                return fallback;
            }
        }
    }

    const staticSecret = resolveStaticStripeSecret();
    if (staticSecret) {
        return staticSecret;
    }

    return undefined;
}
