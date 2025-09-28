// src/config/env.ts
const required = (key: string) => {
    const v = process.env[key];
    if (!v) throw new Error(`Missing env: ${key}`);
    return v;
};

const requiredAny = (...keys: string[]) => {
    for (const key of keys) {
        const value = process.env[key];
        if (value) {
            return value;
        }
    }
    throw new Error(`Missing env: one of ${keys.join(", ")}`);
};

// Non-secrets
export const SITE_URL = process.env.SITE_URL || "https://tabledadrian.com";
export const CAL_PUBLIC_LINK = process.env.CAL_PUBLIC_LINK || "https://cal.com/adrian-stefan";
export const INSTAGRAM_PROFILE_URL = process.env.INSTAGRAM_PROFILE_URL || "";
export const LINKEDIN_PROFILE_URL = process.env.LINKEDIN_PROFILE_URL || "";

// Stripe
export const STRIPE_PUBLISHABLE_KEY = requiredAny("STRIPE_PUBLISHABLE_KEY", "STRIPE_PUBLIC_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
export const STRIPE_SECRET_KEY = requiredAny("STRIPE_SECRET_KEY", "STRIPE_KEY");
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
export const STRIPE_PRICE_SIGNATURE = process.env.STRIPE_PRICE_SIGNATURE || "";
export const STRIPE_PRICE_MEMBERSHIP = process.env.STRIPE_PRICE_MEMBERSHIP || "";
export const STRIPE_SUCCESS_URL = process.env.STRIPE_SUCCESS_URL || `${SITE_URL}/book?success=1`;
export const STRIPE_CANCEL_URL = process.env.STRIPE_CANCEL_URL || `${SITE_URL}/book?canceled=1`;

// Turnstile
export const TURNSTILE_SITE_KEY = process.env.TURNSTILE_SITE_KEY || "";
export const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || "";

// Email
export const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const EMAIL_FROM = process.env.EMAIL_FROM || "";
export const EMAIL_TO = process.env.EMAIL_TO || "";

// Analytics
export const PLAUSIBLE_DOMAIN = process.env.PLAUSIBLE_DOMAIN || "";
export const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID || "";

// Cal API (optional)
export const CAL_API_KEY = process.env.CAL_API_KEY || "";
