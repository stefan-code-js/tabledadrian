import { z } from "zod";

export const runtime = "edge";

const STATS_SOURCE = "https://reviews.source/api/stats";

const statsSchema = z
    .object({
        count: z.number().int().nonnegative(),
        avg: z.number().min(0).max(5).optional(),
        average: z.number().min(0).max(5).optional(),
    })
    .transform((value) => ({
        count: value.count,
        avg: value.avg ?? value.average ?? 0,
    }));

const cacheHeaders = {
    "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
};

export async function GET(): Promise<Response> {
    try {
        const response = await fetch(STATS_SOURCE, {
            headers: { accept: "application/json" },
        });

        if (!response.ok) {
            return Response.json({ count: 0, avg: 0 }, { headers: cacheHeaders });
        }

        const json = await response.json().catch(() => null);
        const parsed = statsSchema.safeParse(json);

        if (!parsed.success) {
            return Response.json({ count: 0, avg: 0 }, { headers: cacheHeaders });
        }

        return Response.json(parsed.data, { headers: cacheHeaders });
    } catch {
        return Response.json({ count: 0, avg: 0 }, { headers: cacheHeaders });
    }
}
