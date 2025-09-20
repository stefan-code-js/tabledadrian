import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { buildLeadFromBooking, safeParseBooking } from "@/lib/booking";
import { insertLead } from "@/lib/leads";

export const runtime = "edge";

type Env = {
    CF_TURNSTILE_SECRET?: string;
    TURNSTILE_SECRET?: string;
    TURNSTILE_SECRET_KEY?: string;
    BOOKINGS_KV?: KVNamespace;
    TABLEDADRIAN_DB?: D1Database;
};

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

function getIpAddress(request: Request) {
    return (
        request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-forwarded-for") ||
        request.headers.get("client-ip") ||
        "unknown"
    );
}

function getTurnstileSecret(env: Env) {
    return env.CF_TURNSTILE_SECRET || env.TURNSTILE_SECRET || env.TURNSTILE_SECRET_KEY;
}

async function verifyTurnstile(env: Env, token: string | undefined, ip: string) {
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
    if (!env.BOOKINGS_KV) return true;
    const key = `lead-rate:${ip}`;
    try {
        const currentRaw = await env.BOOKINGS_KV.get(key);
        const current = currentRaw ? Number(currentRaw) : 0;
        if (current >= 5) {
            return false;
        }
        await env.BOOKINGS_KV.put(key, String(current + 1), { expirationTtl: 600 });
        return true;
    } catch (error) {
        Sentry.captureException(error);
        console.error("ratelimit-error", error);
        return true; // fail open
    }
}

type RouteContext = { params: Promise<Record<string, string>> } & { env: Env };

export async function POST(req: Request, context: RouteContext): Promise<Response> {
    try {
        const json = await req.json();
        const parsed = requestSchema.safeParse(json);
        if (!parsed.success) {
            return Response.json(
                { ok: false, errors: parsed.error.issues.map((issue) => issue.message) },
                { status: 400, headers: { "Cache-Control": "no-store" } }
            );
        }

        const honeypot = parsed.data.company?.trim();
        if (honeypot) {
            return Response.json({ ok: true, id: "ignored" }, { headers: { "Cache-Control": "no-store" } });
        }

        const ip = getIpAddress(req);
        const allowed = await rateLimit(context.env, ip);
        if (!allowed) {
            return Response.json(
                { ok: false, errors: ["Too many requests. Please wait a few minutes before retrying."] },
                { status: 429, headers: { "Cache-Control": "no-store" } }
            );
        }

        const turnstileOk = await verifyTurnstile(context.env, parsed.data.turnstileToken, ip);
        if (!turnstileOk) {
            return Response.json(
                { ok: false, errors: ["Verification failed. Please refresh and try again."] },
                { status: 400, headers: { "Cache-Control": "no-store" } }
            );
        }

        const bookingParse = safeParseBooking(parsed.data);
        if (!bookingParse.success) {
            return Response.json(
                { ok: false, errors: bookingParse.error.issues.map((issue) => issue.message) },
                { status: 400, headers: { "Cache-Control": "no-store" } }
            );
        }

        const leadInput = buildLeadFromBooking(bookingParse.data);
        const record = await insertLead(context.env, leadInput);

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
