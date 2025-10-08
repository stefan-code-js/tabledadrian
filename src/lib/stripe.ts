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
    const sources: StripeSecretEnv[] = [];

    if (env) {
        sources.push(env);
    }

    const resolvedEnv = resolveCfEnv(env);
    if (resolvedEnv && resolvedEnv !== env) {
        sources.push(resolvedEnv);
    }

    if (typeof process !== "undefined" && typeof process.env !== "undefined") {
        sources.push(process.env as StripeSecretEnv);
    }

    for (const source of sources) {
        for (const key of STRIPE_SECRET_ENV_KEYS) {
            const resolved = sanitizeStripeSecret(source?.[key]);
            if (resolved) {
                return resolved;
            }
        }
    }

    const staticSecret = resolveStaticStripeSecret();
    if (staticSecret) {
        return staticSecret;
    }

    return undefined;
}
