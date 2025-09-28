import { describe, it, expect, vi } from "vitest";
import { createCheckoutSession } from "../src/lib/checkout";
import { getOrder } from "../src/lib/orders";

describe("createCheckoutSession", () => {
    it("records order and returns url", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve({ id: "sess_1", url: "https://stripe.test" }),
        });

        const key = "example_key";

        const session = await createCheckoutSession({
            priceId: "price_test",
            mode: "payment",
            secretKey: key,
            successUrl: "https://test/success?session_id={CHECKOUT_SESSION_ID}",
            cancelUrl: "https://test/cancel",
            fetchImpl: fetchMock as any,
        });

        expect(session.url).toBe("https://stripe.test");
        expect(getOrder("sess_1")).toBeTruthy();
    });
});
