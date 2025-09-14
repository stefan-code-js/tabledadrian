import { z } from "zod";

export const reviewInputSchema = z.object({
    name: z.string().trim().optional(),
    email: z.string().email().trim().optional(),
    rating: z.coerce.number().int().min(1).max(5),
    message: z.string().trim().min(2).max(800),
    token: z.string().trim().min(1),
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;

export type Review = {
    id: string;
    createdAt: string; // ISO
    name?: string;
    rating: number;
    message: string;
};

export function validateReviewInput(
    payload: unknown,
): { ok: true; data: ReviewInput } | { ok: false; errors: string[] } {
    const parsed = reviewInputSchema.safeParse(payload);
    if (!parsed.success) {
        return { ok: false, errors: parsed.error.issues.map((i) => i.message) };
    }
    return { ok: true, data: parsed.data };
}
