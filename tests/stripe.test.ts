import { describe, expect, it, afterEach, vi } from "vitest";
import { resolveStaticStripeSecret, resolveStripeSecret, sanitizeStripeSecret } from "../src/lib/stripe";
import * as cloudflare from "@/lib/cloudflare";

describe("stripe secret helpers", () => {
    const originalSecret = process.env.STRIPE_SECRET_KEY;
    const originalKey = process.env.STRIPE_KEY;
    const originalLiveSecret = process.env.STRIPE_LIVE_SECRET_KEY;
    const originalSecretLive = process.env.STRIPE_SECRET_KEY_LIVE;
    const originalLiveKey = process.env.STRIPE_LIVE_KEY;
    const originalSecretLiveKey = process.env.STRIPE_SECRET_LIVE_KEY;
    const originalStripeSecret = process.env.STRIPE_SECRET;
    const originalStripeLiveSecret = process.env.STRIPE_LIVE_SECRET;

    afterEach(() => {
        if (typeof originalSecret === "undefined") {
            delete process.env.STRIPE_SECRET_KEY;
        } else {
            process.env.STRIPE_SECRET_KEY = originalSecret;
        }

        if (typeof originalKey === "undefined") {
            delete process.env.STRIPE_KEY;
        } else {
            process.env.STRIPE_KEY = originalKey;
        }

        if (typeof originalLiveSecret === "undefined") {
            delete process.env.STRIPE_LIVE_SECRET_KEY;
        } else {
            process.env.STRIPE_LIVE_SECRET_KEY = originalLiveSecret;
        }

        if (typeof originalSecretLive === "undefined") {
            delete process.env.STRIPE_SECRET_KEY_LIVE;
        } else {
            process.env.STRIPE_SECRET_KEY_LIVE = originalSecretLive;
        }

        if (typeof originalLiveKey === "undefined") {
            delete process.env.STRIPE_LIVE_KEY;
        } else {
            process.env.STRIPE_LIVE_KEY = originalLiveKey;
        }

        if (typeof originalSecretLiveKey === "undefined") {
            delete process.env.STRIPE_SECRET_LIVE_KEY;
        } else {
            process.env.STRIPE_SECRET_LIVE_KEY = originalSecretLiveKey;
        }

        if (typeof originalStripeSecret === "undefined") {
            delete process.env.STRIPE_SECRET;
        } else {
            process.env.STRIPE_SECRET = originalStripeSecret;
        }

        if (typeof originalStripeLiveSecret === "undefined") {
            delete process.env.STRIPE_LIVE_SECRET;
        } else {
            process.env.STRIPE_LIVE_SECRET = originalStripeLiveSecret;
        }

        vi.restoreAllMocks();
    });

    it("trims secret values", () => {
        expect(sanitizeStripeSecret("  sk_live_123  ")).toBe("sk_live_123");
        expect(sanitizeStripeSecret("   ")).toBeUndefined();
        expect(sanitizeStripeSecret(undefined)).toBeUndefined();
    });

    it("prefers context env values", () => {
        const secret = resolveStripeSecret({ STRIPE_SECRET_KEY: "  sk_test_context  " });
        expect(secret).toBe("sk_test_context");
    });

    it("falls back to process env", () => {
        delete process.env.STRIPE_SECRET_KEY;
        process.env.STRIPE_SECRET_KEY = " sk_process_key ";
        expect(resolveStripeSecret()).toBe("sk_process_key");
    });

    it("accepts alternative secret key bindings", () => {
        const secret = resolveStripeSecret({ STRIPE_SECRET: " sk_alt_secret " });
        expect(secret).toBe("sk_alt_secret");
    });

    it("uses Cloudflare bindings when no context env is provided", () => {
        vi.spyOn(cloudflare, "resolveCfEnv").mockReturnValue({ STRIPE_SECRET_KEY: " sk_cf_secret " });
        expect(resolveStripeSecret()).toBe("sk_cf_secret");
    });
    it("falls back to compile-time env references", () => {
        delete process.env.STRIPE_SECRET_KEY;
        delete process.env.STRIPE_KEY;
        process.env.STRIPE_LIVE_SECRET_KEY = " sk_build_secret ";
        expect(resolveStaticStripeSecret()).toBe("sk_build_secret");
    });
});

