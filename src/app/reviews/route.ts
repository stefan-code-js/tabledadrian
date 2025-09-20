import { z } from "zod";

export const runtime = "edge";

const REVIEW_SOURCE = "https://reviews.source/api/list";

const reviewSchema = z.object({
    id: z.string(),
    name: z.string(),
    text: z.string(),
    rating: z.number(),
    createdAt: z.number(),
});

const reviewsSchema = z.array(reviewSchema);

const cacheHeaders = {
    "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
};

export async function GET(): Promise<Response> {
    try {
        const response = await fetch(REVIEW_SOURCE, {
            headers: { accept: "application/json" },
        });

        if (!response.ok) {
            return Response.json([], { headers: cacheHeaders });
        }

        const json = await response.json().catch(() => null);
        const parsed = reviewsSchema.safeParse(json);

        if (!parsed.success) {
            return Response.json([], { headers: cacheHeaders });
        }

        return Response.json(parsed.data, { headers: cacheHeaders });
    } catch {
        return Response.json([], { headers: cacheHeaders });
    }
}
