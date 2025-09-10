export type ReviewInput = {
    name?: string;
    email?: string; // optional, not shown publicly
    rating: number; // 1..5
    message: string; // 2..800 chars
    token: string;   // turnstile token
};

export type Review = {
    id: string;
    createdAt: string; // ISO
    name?: string;
    rating: number;
    message: string;
};

export function validateReviewInput(payload: unknown): { ok: true; data: ReviewInput } | { ok: false; errors: string[] } {
    const errors: string[] = [];
    const p = payload as Partial<ReviewInput> | undefined;

    if (!p) return { ok: false, errors: ['Missing body'] };

    if (typeof p.message !== 'string' || p.message.trim().length < 2 || p.message.length > 800) {
        errors.push('Message must be 2–800 characters.');
    }
    const rating = Number(p.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
        errors.push('Rating must be between 1 and 5.');
    }
    if (!p.token || typeof p.token !== 'string') {
        errors.push('Missing Turnstile token.');
    }

    if (p.name && typeof p.name !== 'string') errors.push('Name must be a string.');
    if (p.email && typeof p.email !== 'string') errors.push('Email must be a string.');

    if (errors.length) return { ok: false, errors };

    return {
        ok: true,
        data: {
            name: p.name?.trim(),
            email: p.email?.trim(),
            rating,
            message: p.message!.trim(),
            token: p.token!,
        },
    };
}
