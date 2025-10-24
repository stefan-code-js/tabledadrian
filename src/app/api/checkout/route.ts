import { NextRequest } from "next/server";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/checkout";
import {
    priceCatalog,
    pricingCalculatorOptions,
    estimatePricing,
    type PriceKey,
} from "@/lib/pricing";
import { resolveCfEnv } from "@/lib/cloudflare";
import { resolveStripeSecret, type StripeSecretEnv } from "@/lib/stripe";

export const runtime = "edge";

type Env = StripeSecretEnv;

const HEADERS = {
    "Cache-Control": "no-store",
};

const calculatorSchema = z.object({
    optionId: z.string(),
    guests: z.number().int().min(1).max(200),
    addons: z.array(z.string()).optional(),
});

const requestSchema = z.object({
    priceHandle: z.string(),
    payload: z
        .object({
            calculator: calculatorSchema.optional(),
        })
        .optional(),
});

const DEPOSIT_HANDLES = new Set<PriceKey>(
    pricingCalculatorOptions
        .map((option) => (option.cta.type === "checkout" ? option.cta.priceHandle : null))
        .filter((handle): handle is PriceKey => Boolean(handle))
);

const formatAddons = (labels: string[]): string =>
    labels.length ? labels.join(", ") : "none";

type RouteContext = { params: Promise<Record<string, string>> } & { env?: Env };

export async function POST(request: NextRequest, context: RouteContext): Promise<Response> {
    const cfContext = context as RouteContext & { cloudflare?: { env?: Env } };
    const env = resolveCfEnv(cfContext.env ?? cfContext.cloudflare?.env);

    let payload: unknown;
    try {
        payload = await request.json();
    } catch {
        return Response.json({ error: "Invalid JSON payload." }, { status: 400, headers: HEADERS });
    }

    const parsed = requestSchema.safeParse(payload);
    if (!parsed.success) {
        return Response.json({ error: "Missing price identifier." }, { status: 400, headers: HEADERS });
    }

    const { priceHandle } = parsed.data;
    if (!(priceHandle in priceCatalog)) {
        return Response.json({ error: "Unknown price." }, { status: 400, headers: HEADERS });
    }

    const catalogEntry = priceCatalog[priceHandle as PriceKey];
    if (!catalogEntry) {
        return Response.json({ error: "Unknown price." }, { status: 400, headers: HEADERS });
    }

    const origin = request.nextUrl?.origin ?? new URL(request.url).origin;
    const successUrl = `${origin}/api/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/?payment=cancelled`;

    const secret = resolveStripeSecret(env);

    if (!secret) {
        return Response.json({ error: "Stripe secret key not found." }, { status: 500, headers: HEADERS });
    }

    try {
        const isDynamicDeposit = DEPOSIT_HANDLES.has(priceHandle as PriceKey);
        let session;

        if (isDynamicDeposit) {
            const calculatorPayload = parsed.data.payload?.calculator;
            if (!calculatorPayload) {
                return Response.json({ error: "Calculator payload missing." }, { status: 400, headers: HEADERS });
            }

            const option = pricingCalculatorOptions.find((opt) => opt.id === calculatorPayload.optionId);
            if (!option || option.cta.type !== "checkout" || option.cta.priceHandle !== priceHandle) {
                return Response.json({ error: "Invalid calculator option." }, { status: 400, headers: HEADERS });
            }

            const validAddonSet = new Set(option.enhancements.map((enhancement) => enhancement.id));
            const safeAddons = (calculatorPayload.addons ?? []).filter((addon) => validAddonSet.has(addon));
            const addonLabels = option.enhancements
                .filter((enhancement) => safeAddons.includes(enhancement.id))
                .map((enhancement) => enhancement.label);
            const estimate = estimatePricing(option, calculatorPayload.guests, safeAddons);
            const depositAmount = estimate.deposit.amount;
            const depositCurrency = estimate.deposit.currency;

            session = await createCheckoutSession({
                lineItems: [
                    {
                        type: "custom",
                        amount: depositAmount,
                        currency: depositCurrency,
                        name: `Deposit – ${option.name}`,
                        description: `Guests: ${estimate.guestCount}. Enhancements: ${formatAddons(
                            addonLabels
                        )}.`,
                    },
                ],
                mode: catalogEntry.mode,
                secretKey: secret,
                successUrl,
                cancelUrl,
                metadata: {
                    price_handle: priceHandle,
                    calculator_option_id: option.id,
                    guest_count: String(estimate.guestCount),
                    addons: safeAddons.join(",") || "none",
                    addon_labels: formatAddons(addonLabels),
                    total_amount: estimate.total.amount.toString(),
                    total_currency: estimate.total.currency,
                    deposit_amount: depositAmount.toString(),
                    deposit_currency: depositCurrency,
                },
            });
        } else {
            session = await createCheckoutSession({
                lineItems: [
                    {
                        type: "price",
                        priceId: catalogEntry.id,
                    },
                ],
                mode: catalogEntry.mode,
                secretKey: secret,
                successUrl,
                cancelUrl,
                metadata: {
                    price_handle: priceHandle,
                },
            });
        }

        const redirectUrl = session.url ?? `${origin}/api/checkout/success?session_id=${session.id}`;
        return Response.json({ url: redirectUrl }, { headers: HEADERS });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to create checkout session.";
        return Response.json({ error: message }, { status: 502, headers: HEADERS });
    }
}
