import { addOrder } from "./orders";

export type Mode = "payment" | "subscription";

type PriceLineItem = {
    type: "price";
    priceId: string;
    quantity?: number;
};

type CustomLineItem = {
    type: "custom";
    amount: number;
    currency: string;
    name: string;
    description?: string;
    quantity?: number;
};

type LineItem = PriceLineItem | CustomLineItem;

export type CreateCheckoutSessionOptions = {
    lineItems: LineItem[];
    mode: Mode;
    secretKey: string;
    successUrl: string;
    cancelUrl: string;
    metadata?: Record<string, string>;
    fetchImpl?: typeof fetch;
};

type StripeSession = { id: string; url?: string };

export async function createCheckoutSession({
    lineItems,
    mode,
    secretKey,
    successUrl,
    cancelUrl,
    metadata,
    fetchImpl = fetch,
}: CreateCheckoutSessionOptions): Promise<StripeSession> {
    const sanitizedSecretKey = secretKey.trim();

    if (!sanitizedSecretKey.length) {
        throw new Error("Stripe key missing or invalid.");
    }

    if (!lineItems.length) {
        throw new Error("At least one line item is required.");
    }

    const body = new URLSearchParams({
        mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
        "automatic_tax[enabled]": "true",
    });

    let recordedPriceId: string | undefined;
    let recordedAmount: number | undefined;
    let recordedCurrency: string | undefined;

    lineItems.forEach((item, index) => {
        const key = `line_items[${index}]`;
        const quantity = item.quantity ?? 1;
        body.append(`${key}[quantity]`, String(quantity));

        if (item.type === "price") {
            body.append(`${key}[price]`, item.priceId);
            if (!recordedPriceId) {
                recordedPriceId = item.priceId;
            }
        } else {
            const amountInMajorUnits = item.amount;
            if (!Number.isFinite(amountInMajorUnits) || amountInMajorUnits <= 0) {
                throw new Error("Invalid line item amount.");
            }
            const amountInMinorUnits = Math.round(amountInMajorUnits * 100);
            const currency = item.currency.toLowerCase();
            body.append(`${key}[price_data][currency]`, currency);
            body.append(`${key}[price_data][unit_amount]`, String(amountInMinorUnits));
            body.append(`${key}[price_data][product_data][name]`, item.name);
            if (item.description) {
                body.append(`${key}[price_data][product_data][description]`, item.description);
            }
            if (!recordedAmount) {
                recordedAmount = amountInMajorUnits * quantity;
                recordedCurrency = currency.toUpperCase();
            }
        }
    });

    if (metadata) {
        for (const [key, value] of Object.entries(metadata)) {
            if (typeof value === "string") {
                body.append(`metadata[${key}]`, value);
            }
        }
    }

    const response = await fetchImpl("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${sanitizedSecretKey}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create Stripe session");
    }

    const session = (await response.json()) as StripeSession;
    addOrder({
        sessionId: session.id,
        mode,
        priceId: recordedPriceId,
        amount: recordedAmount,
        currency: recordedCurrency,
        metadata,
    });
    return session;
}
