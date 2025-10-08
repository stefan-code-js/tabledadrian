import { NextRequest } from "next/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { createCheckoutSession } from "@/lib/checkout";
import { priceCatalog, type PriceKey } from "@/lib/pricing";
import { addOrder } from "@/lib/orders";
import { resolveCfEnv } from "@/lib/cloudflare";
import { resolveStripeSecret, type StripeSecretEnv } from "@/lib/stripe";

export const runtime = "nodejs";

type Env = StripeSecretEnv;

const HEADERS = {
    "Cache-Control": "no-store",
};

const requestSchema = z.object({
    priceHandle: z.string(),
});

type RouteContext = { params: Promise<Record<string, string>> } & { env?: Env };

export async function POST(request: NextRequest, context: RouteContext): Promise<Response> {
    const cfContext = context as RouteContext & { cloudflare?: { env?: Env } };
    const env = cfContext.env ?? cfContext.cloudflare?.env;

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

    const priceHandle = parsed.data.priceHandle as PriceKey;
    const catalogEntry = priceCatalog[priceHandle];
    if (!catalogEntry) {
        return Response.json({ error: "Unknown price." }, { status: 400, headers: HEADERS });
    }

    const origin = request.nextUrl?.origin ?? new URL(request.url).origin;
    const successUrl = `${origin}/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/cancel`;

    const secret = resolveStripeSecret(env);

    if (!secret) {
        return Response.json({ error: "Stripe secret key not found." }, { status: 500, headers: HEADERS });
    }

    try {
        const session = await createCheckoutSession({
            priceId: catalogEntry.id,
            mode: catalogEntry.mode,
            secretKey: secret,
            successUrl,
            cancelUrl,
        });

        const redirectUrl = session.url ?? `${origin}/success?session_id=${session.id}`;
        return Response.json({ url: redirectUrl }, { headers: HEADERS });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to create checkout session.";
        return Response.json({ error: message }, { status: 502, headers: HEADERS });
    }
}
