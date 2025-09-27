import { NextResponse } from "next/server";
import { resolveCfEnv } from "@/lib/cloudflare";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type Rating = 1 | 2 | 3 | 4 | 5;

type ReviewPayload = {
    name: string;
    email?: string;
    rating: Rating;
    comment?: string;
    token?: string;
};

type Stats = {
    count: number;
    sum: number;
    avg: number;
};

type KvNamespaceLite = {
    get(key: string): Promise<string | null>;
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
};

const STAT_KEY = "stats";
const EMAIL_FALLBACK = "adrian@tabledadrian.com";

function isEmail(value: string): boolean {
    return value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function readBody(req: Request): Promise<Record<string, string> | null> {
    const contentType = (req.headers.get("content-type") ?? "").toLowerCase();

    if (contentType.includes("application/json")) {
        try {
            const parsed = (await req.json()) as unknown;
            if (parsed && typeof parsed === "object") {
                const output: Record<string, string> = {};
                for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
                    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
                        output[key] = String(value);
                    }
                }
                if (Object.keys(output).length > 0) {
                    return output;
                }
            }
        } catch {
            // ignore JSON errors and fall back to form data
        }
    }

    try {
        const form = await req.formData();
        const output: Record<string, string> = {};
        form.forEach((value, key) => {
            if (typeof value === "string") {
                output[key] = value;
            }
        });
        if (Object.keys(output).length > 0) {
            return output;
        }
    } catch {
        // ignore form errors
    }

    return null;
}

function toPayload(source: Record<string, string>): ReviewPayload {
    const name = (source.name || source.fullName || source["your-name"] || "").trim();
    const email = (source.email || source["your-email"] || "").trim();
    const score = Number(source.rating ?? source.stars ?? source.score ?? 0);
    const comment = (source.comment || source.message || source.text || "").trim();
    const token = source["cf-turnstile-response"] || source.token || undefined;

    if (!name || !(score >= 1 && score <= 5)) {
        throw new Error("Missing name or rating (1..5)");
    }

    return {
        name,
        email,
        rating: Math.round(score) as Rating,
        comment,
        token,
    };
}

async function verifyTurnstile(token?: string, ip?: string): Promise<boolean> {
    if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
        return true;
    }
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) {
        return true; // not configured, do not block submissions
    }
    if (!token) {
        return false;
    }

    const form = new URLSearchParams({ secret, response: token });
    if (ip) {
        form.set("remoteip", ip);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: form,
    });

    const data = (await response.json().catch(() => null)) as { success?: boolean } | null;
    return data?.success === true;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

async function maybeEmail(payload: ReviewPayload): Promise<void> {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
        return;
    }

    const to = process.env.CONTACT_TO || EMAIL_FALLBACK;
    const html = `
    <h2>New review - rating ${payload.rating}/5</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}${payload.email ? ` &lt;${escapeHtml(payload.email)}&gt;` : ""}</p>
    ${payload.comment ? `<p>${escapeHtml(payload.comment)}</p>` : ""}
  `;

    try {
        await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${resendKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Table d'Adrian <no-reply@tabledadrian.com>",
                to: [to],
                subject: `New review - rating ${payload.rating}/5`,
                html,
            }),
        });
    } catch {
        // do not block on email failure
    }
}

export async function POST(req: Request) {
    try {
        const ip =
            req.headers.get("cf-connecting-ip") ??
            req.headers.get("x-forwarded-for") ??
            undefined;

        const raw = await readBody(req);
        if (!raw) {
            return NextResponse.json({ ok: false, error: "Invalid JSON or FormData" }, { status: 400 });
        }

        const payload = toPayload(raw);
        if (!isEmail(payload.email ?? "")) {
            return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
        }

        const passedTurnstile = await verifyTurnstile(payload.token, ip);
        if (!passedTurnstile) {
            return NextResponse.json({ ok: false, error: "Turnstile verification failed" }, { status: 400 });
        }

        await maybeEmail(payload);

        const cfEnv = resolveCfEnv<{ REVIEWS?: KvNamespaceLite }>() ?? {};
        const kv = cfEnv.REVIEWS;
        let stats: Stats = { count: 1, sum: payload.rating, avg: payload.rating };

        if (kv) {
            let current: Stats = { count: 0, sum: 0, avg: 0 };
            const existing = await kv.get(STAT_KEY);
            if (existing) {
                try {
                    const parsed = JSON.parse(existing) as Partial<Stats>;
                    if (
                        typeof parsed.count === "number" &&
                        typeof parsed.sum === "number" &&
                        typeof parsed.avg === "number"
                    ) {
                        current = { count: parsed.count, sum: parsed.sum, avg: parsed.avg };
                    }
                } catch {
                    // ignore broken payloads
                }
            }

            const next: Stats = {
                count: current.count + 1,
                sum: current.sum + payload.rating,
                avg: Math.round(((current.sum + payload.rating) / (current.count + 1)) * 10) / 10,
            };

            await kv.put(STAT_KEY, JSON.stringify(next), { expirationTtl: 60 * 60 * 24 * 365 });
            stats = next;
        }

        const review = {
            name: payload.name,
            rating: payload.rating,
            text: payload.comment ?? "",
            createdAt: new Date().toISOString(),
        };

        return NextResponse.json({ ok: true, review, count: stats.count, avg: stats.avg });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected error";
        return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
}
