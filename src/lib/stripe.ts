export const STRIPE_SECRET_ENV_KEYS = [
    "STRIPE_SECRET_KEY",
    "STRIPE_KEY",
    "STRIPE_LIVE_SECRET_KEY",
    "STRIPE_SECRET_KEY_LIVE",
    "STRIPE_LIVE_KEY",
    "STRIPE_SECRET_LIVE_KEY",
    "STRIPE_SECRET",
    "STRIPE_LIVE_SECRET",
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
        if (typeof process === "undefined" || typeof process.env === "undefined") {
            return undefined;
        }

        for (const key of STRIPE_SECRET_ENV_KEYS) {
            const candidate = sanitizeStripeSecret(process.env[key]);
            if (candidate) {
                return candidate;
            }
        }

        return undefined;
    } catch {
        return undefined;
    }
}

export function resolveStripeSecret(env?: StripeSecretEnv): string | undefined {
    const sources: Array<StripeSecretEnv | undefined> = [];

    if (env) {
        sources.push(env);
    }

    if (typeof process !== "undefined" && typeof process.env !== "undefined") {
        sources.push(process.env as StripeSecretEnv);
    }

    for (const source of sources) {
        for (const key of STRIPE_SECRET_ENV_KEYS) {
            const candidate = sanitizeStripeSecret(source?.[key]);
            if (candidate) {
                return candidate;
            }
        }
    }

    const staticSecret = resolveStaticStripeSecret();
    if (staticSecret) {
        return staticSecret;
    }

    return undefined;
}
