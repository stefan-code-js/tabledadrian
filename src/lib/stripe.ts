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

const BUILD_TIME_STRIPE_SECRET_ENV: StripeSecretEnv = (() => {
    const result: StripeSecretEnv = {};
    for (const key of STRIPE_SECRET_ENV_KEYS) {
        const candidate = sanitizeStripeSecret(process?.env?.[key as keyof NodeJS.ProcessEnv]);
        if (candidate) {
            result[key] = candidate;
        }
    }
    return result;
})();

function readSecretFromProcessEnv(key: (typeof STRIPE_SECRET_ENV_KEYS)[number]): string | undefined {
    if (typeof process !== "undefined" && typeof process.env !== "undefined") {
        return process.env[key];
    }
    return BUILD_TIME_STRIPE_SECRET_ENV[key];
}

export function resolveStaticStripeSecret(): string | undefined {
    try {
        for (const key of STRIPE_SECRET_ENV_KEYS) {
            const candidate = sanitizeStripeSecret(readSecretFromProcessEnv(key));
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
