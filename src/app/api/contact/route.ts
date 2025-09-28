import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { buildLeadFromBooking, safeParseBooking } from "@/lib/booking";
import { insertLead } from "@/lib/leads";
import { resolveCfEnv, getClientIp } from "@/lib/cloudflare";

export const runtime = "edge";

type Env = {
    CF_TURNSTILE_KEY?: string;
    TURNSTILE_SECRET?: string;
    TURNSTILE_SECRET_KEY?: string;
    BOOKINGS_KV?: KVNamespace;
    TABLEDADRIAN_DB?: D1Database;
};

type RouteContext = { params: Promise<Record<string, string>> } & { env?: Env };

const requestSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    guests: z.coerce.number().int().min(1),
    eventDate: z.string().min(4),
    location: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().optional(),
    company: z.string().optional(),
    turnstileToken: z.string().optional(),
});

function getTurnstileSecret(env: Env) {
    return (
        env.CF_TURNSTILE_KEY ||
        env.TURNSTILE_SECRET ||
        env.TURNSTILE_SECRET_KEY ||
        (typeof process !== "undefined" ? process.env.CF_TURNSTILE_KEY : undefined) ||
        (typeof process !== "undefined" ? process.env.TURNSTILE_SECRET : undefined) ||
        (typeof process !== "undefined" ? process.env.TURNSTILE_SECRET_KEY : undefined)
    );
}

async function verifyTurnstile(env: Env, token: string | undefined, ip: string) {
    if (typeof process !== "undefined" && process.env.NODE_ENV === "test") return true;
    const secret = getTurnstileSecret(env);
    if (!secret) return true;
    if (!token) return false;

    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: new URLSearchParams({ secret, response: token, remoteip: ip }),
        });
        const data: { success?: boolean } = await response.json();
        return Boolean(data.success);
    } catch (error) {
        Sentry.captureException(error);
        console.error("turnstile-error", error);
        return false;
    }
}

async function rateLimit(env: Env, ip: string) {
    const kv = env.BOOKINGS_KV;
    if (!kv) return true;
    const key = `lead-rate:${ip}`;
    try {
        const currentRaw = await kv.get(key);
        const current = currentRaw ? Number(currentRaw) : 0;
        if (current >= 5) {
            return false;
        }
        await kv.put(key, String(current + 1), { expirationTtl: 600 });
        return true;
    } catch (error) {
        Sentry.captureException(error);
        console.error("ratelimit-error", error);
        return true; // fail open
    }
}

export async function POST(req: Request, context: RouteContext): Promise<Response> {
    const env: Env = resolveCfEnv<Env>(context.env) ?? {};

    try {
        const json = await req.json();
        const parsed = requestSchema.safeParse(json);
        if (!parsed.success) {
            return Response.json(
                { ok: false, errors: parsed.error.issues.map((issue) => issue.message) },
                { status: 400, headers: { "Cache-Control": "no-store" } }
            );
        }

        const { turnstileToken, ...bookingInput } = parsed.data;

        const honeypot = bookingInput.company?.trim();
        if (honeypot) {
            return Response.json({ ok: true, id: "ignored" }, { headers: { "Cache-Control": "no-store" } });
        }

        const ip = getClientIp(req);
        const allowed = await rateLimit(env, ip);
        if (!allowed) {
            return Response.json(
                { ok: false, errors: ["Too many requests. Please wait a few minutes before retrying."] },
                { status: 429, headers: { "Cache-Control": "no-store" } }
            );
        }

        const turnstileOk = await verifyTurnstile(env, turnstileToken, ip);
        if (!turnstileOk) {
            return Response.json(
                { ok: false, errors: ["Verification failed. Please refresh and try again."] },
                { status: 400, headers: { "Cache-Control": "no-store" } }
            );
        }

        const bookingParse = safeParseBooking(bookingInput);
        if (!bookingParse.success) {
            return Response.json(
                { ok: false, errors: bookingParse.error.issues.map((issue) => issue.message) },
                { status: 400, headers: { "Cache-Control": "no-store" } }
            );
        }

        const leadInput = buildLeadFromBooking(bookingParse.data);
        const record = await insertLead(env, { ...leadInput, ip: ip === "unknown" ? undefined : ip });

        return Response.json(
            { ok: true, id: record.id },
            {
                status: 200,
                headers: {
                    "Cache-Control": "no-store",
                },
            }
        );
    } catch (error) {
        Sentry.captureException(error);
        console.error("contact-error", error);
        return Response.json(
            { ok: false, errors: ["Unable to submit at the moment. Please try again shortly."] },
            { status: 500, headers: { "Cache-Control": "no-store" } }
        );
    }
}


