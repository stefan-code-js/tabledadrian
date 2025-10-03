import { addOrder } from "./orders";

export type Mode = "payment" | "subscription";

export type CreateCheckoutSessionOptions = {
    priceId: string;
    mode: Mode;
    secretKey: string;
    successUrl: string;
    cancelUrl: string;
    fetchImpl?: typeof fetch;
};

type StripeSession = { id: string; url?: string };

export async function createCheckoutSession({
    priceId,
    mode,
    secretKey,
    successUrl,
    cancelUrl,
    fetchImpl = fetch,
}: CreateCheckoutSessionOptions): Promise<StripeSession> {
    if (!secretKey) {
        throw new Error("Stripe key missing");
    }
    console.log(`Creating Stripe checkout session with priceId: ${priceId}`);

    const body = new URLSearchParams({
        mode,
        "line_items[0][price]": priceId,
        "line_items[0][quantity]": "1",
        success_url: successUrl,
        cancel_url: cancelUrl,
        automatic_tax: "enabled",
    });

    const response = await fetchImpl("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create Stripe session");
    }

    const session = (await response.json()) as StripeSession;
    addOrder({ sessionId: session.id, priceId, mode });
    return session;
}
