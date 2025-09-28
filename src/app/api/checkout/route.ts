import { NextRequest } from "next/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { createCheckoutSession } from "@/lib/checkout";
import { priceCatalog, type PriceKey } from "@/lib/pricing";
import { addOrder } from "@/lib/orders";

export const runtime = "edge";

type Env = { STRIPE_SECRET_KEY?: string };

const HEADERS = {
    "Cache-Control": "no-store",
};

const requestSchema = z.object({
    priceHandle: z.string(),
});

function readEnv(env: Env | undefined, key: keyof Env): string | undefined {
    const value = env?.[key];
    if (typeof value === "string" && value.length) {
        return value;
    }
    if (typeof process !== "undefined" && process.env) {
        const fallback = process.env[key];
        return typeof fallback === "string" && fallback.length ? fallback : undefined;
    }
    return undefined;
}

type RouteContext = { params: Promise<Record<string, string>> } & { env?: Env };

export async function POST(request: NextRequest, context: RouteContext): Promise<Response> {
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

    const secret = readEnv(context.env, "STRIPE_SECRET_KEY");

    if (!secret) {
        const mockSessionId = `cs_test_mock_${crypto.randomUUID()}`;
        const mockUrl = `${origin}/success?session_id=${mockSessionId}`;
        addOrder({ sessionId: mockSessionId, priceId: catalogEntry.id, mode: catalogEntry.mode });
        return Response.json({ url: mockUrl, mock: true }, { headers: HEADERS });
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
