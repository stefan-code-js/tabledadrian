import { describe, expect, it } from "vitest";
import { POST } from "../src/app/api/reviews/route";

const basePayload = {
    name: "Elena",
    email: "elena@example.com",
    text: "A composed evening with precise pacing and gentle service.",
    rating: 5,
};

function buildRequest(body: unknown) {
    return new Request("http://localhost/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

describe("reviews api", () => {
    it("returns public review payload without ip data", async () => {
        const response = await POST(buildRequest(basePayload), {
            env: {},
            params: Promise.resolve({}),
        } as any);

        expect(response.status).toBe(200);
        const data = (await response.json()) as any;
        expect(data.ok).toBe(true);
        expect(data.review).toBeDefined();
        expect(data.review.name).toBe(basePayload.name);
        expect(data.review.text).toBe(basePayload.text);
        expect(data.review.rating).toBe(basePayload.rating);
        expect(data.review).not.toHaveProperty("ip");
        expect(typeof data.count).toBe("number");
        expect(typeof data.avg).toBe("number");
    });
});
