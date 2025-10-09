import { describe, it, expect, vi } from "vitest";
import { createCheckoutSession } from "../src/lib/checkout";
import { getOrder } from "../src/lib/orders";

describe("createCheckoutSession", () => {
    it("records order and returns url for price based checkout", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: "sess_1", url: "https://stripe.test" }),
        });

        const session = await createCheckoutSession({
            lineItems: [{ type: "price", priceId: "price_test" }],
            mode: "payment",
            secretKey: "example_key",
            successUrl: "https://test/success?session_id={CHECKOUT_SESSION_ID}",
            cancelUrl: "https://test/cancel",
            fetchImpl: fetchMock as any,
        });

        expect(session.url).toBe("https://stripe.test");
        const order = getOrder("sess_1");
        expect(order).toBeTruthy();
        expect(order?.priceId).toBe("price_test");
    });

    it("supports custom line items and trims the secret key", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: "sess_custom" }),
        });

        await createCheckoutSession({
            lineItems: [
                {
                    type: "custom",
                    amount: 1250,
                    currency: "EUR",
                    name: "Custom Deposit",
                    description: "Guests: 10",
                },
            ],
            mode: "payment",
            secretKey: "  sk_test_trim  ",
            successUrl: "https://test/success?session_id={CHECKOUT_SESSION_ID}",
            cancelUrl: "https://test/cancel",
            fetchImpl: fetchMock as any,
        });

        expect(fetchMock).toHaveBeenCalledWith("https://api.stripe.com/v1/checkout/sessions", {
            body: expect.any(URLSearchParams),
            headers: expect.objectContaining({
                Authorization: "Bearer sk_test_trim",
            }),
            method: "POST",
        });

        const params = fetchMock.mock.calls[0][1].body as URLSearchParams;
        expect(params.get("line_items[0][price_data][unit_amount]")).toBe(String(1250 * 100));

        const order = getOrder("sess_custom");
        expect(order?.amount).toBe(1250);
        expect(order?.currency).toBe("EUR");
    });
});

