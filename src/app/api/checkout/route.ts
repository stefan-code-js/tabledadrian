import { NextRequest } from "next/server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { createCheckoutSession } from "@/lib/checkout";
import { priceCatalog, type PriceKey } from "@/lib/pricing";
import { addOrder } from "@/lib/orders";
import { resolveCfEnv } from "@/lib/cloudflare";

export const runtime = "edge";

type Env = { STRIPE_SECRET_KEY?: string; STRIPE_KEY?: string };

const HEADERS = {
    "Cache-Control": "no-store",
};

const requestSchema = z.object({
    priceHandle: z.string(),
});

const STRIPE_SECRET_KEYS = ["STRIPE_SECRET_KEY", "STRIPE_KEY"] as const;

const processStripeSecretKey =
    typeof process !== "undefined" && typeof process.env !== "undefined"
        ? process.env.STRIPE_SECRET_KEY
        : undefined;
const processStripeKey =
    typeof process !== "undefined" && typeof process.env !== "undefined" ? process.env.STRIPE_KEY : undefined;

function readEnv(env: Env | undefined): string | undefined {
    for (const key of STRIPE_SECRET_KEYS) {
        const value = env?.[key];
        if (typeof value === "string" && value.length) {
            return value;
        }
    }    }

    return processStripeSecretKey && processStripeSecretKey.length
        ? processStripeSecretKey
        : processStripeKey && processStripeKey.length
          ? processStripeKey
          : undefined;
    }

    return processStripeSecretKey && processStripeSecretKey.length
        ? processStripeSecretKey
        : processStripeKey && processStripeKey.length
          ? processStripeKey
          : undefined;
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

    const secret = readEnv(context.env);


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
