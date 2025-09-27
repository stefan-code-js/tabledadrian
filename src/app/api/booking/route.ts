import { z } from "zod";
import { resolveCfEnv, getClientIp } from "@/lib/cloudflare";

export const runtime = "edge";

type Env = {
    CF_TURNSTILE_SECRET?: string;
    TURNSTILE_SECRET?: string;
    TURNSTILE_SECRET_KEY?: string;
    BOOKINGS_KV?: KVNamespace;
    TABLEDADRIAN_DB?: D1Database;
};

type RateLimitResult = { allowed: boolean; debug: boolean };
type VerifyResult = { ok: boolean; debug: boolean };
type PersistResult = { ok: boolean; id?: string; error?: string; debug: boolean };

type RouteContext = { params: Promise<Record<string, string>> } & { env?: Env };

const HEADERS = {
    "Cache-Control": "no-store",
};

const EMPTY_ENV: Env = {};

const requestSchema = z
    .object({
        name: z.string().trim().min(2).max(120),
        email: z.string().trim().email().max(320),
        phone: z.string().trim().max(40).optional(),
        guests: z.coerce.number().int().min(1).max(200),
        date: z.string().trim().min(4).max(40),
        message: z.string().trim().min(2).max(2000),
        website: z.string().optional(),
        "cf-turnstile-response": z.string().optional(),
    })
    .transform((value) => ({
        booking: {
            name: value.name,
            email: value.email,
            phone: value.phone && value.phone.length > 0 ? value.phone : undefined,
            guests: value.guests,
            date: value.date,
            message: value.message,
        },
        website: value.website?.trim() ?? "",
        turnstileToken: value["cf-turnstile-response"]?.trim(),
    }));

type ParsedRequest = z.infer<typeof requestSchema>;
type BookingPayload = ParsedRequest["booking"];

function resolveTurnstileSecret(env: Env): { secret?: string; debug: boolean } {
    const secret =
        env.CF_TURNSTILE_SECRET ||
        env.TURNSTILE_SECRET ||
        env.TURNSTILE_SECRET_KEY ||
        (typeof process !== "undefined" ? process.env.CF_TURNSTILE_SECRET : undefined) ||
        (typeof process !== "undefined" ? process.env.TURNSTILE_SECRET : undefined) ||
        (typeof process !== "undefined" ? process.env.TURNSTILE_SECRET_KEY : undefined);

    return { secret, debug: !secret };
}

async function verifyTurnstile(env: Env, token: string | undefined, ip: string): Promise<VerifyResult> {
    if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
        return { ok: true, debug: true };
    }
    const { secret, debug } = resolveTurnstileSecret(env);
    if (!secret) {
        return { ok: true, debug: true };
    }

    if (!token) {
        return { ok: false, debug: false };
    }

    try {
        const params = new URLSearchParams();
        params.set("secret", secret);
        params.set("response", token);
        if (ip && ip !== "unknown") {
            params.set("remoteip", ip);
        }

        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: params,
        });

        if (!response.ok) {
            return { ok: false, debug: false };
        }

        const data = (await response.json()) as { success?: boolean };
        return { ok: Boolean(data.success), debug: false };
    } catch {
        return { ok: false, debug: false };
    }
}

async function applyRateLimit(env: Env, ip: string): Promise<RateLimitResult> {
    const kv = env.BOOKINGS_KV;
    if (!kv) {
        return { allowed: true, debug: true };
    }

    const key = `booking:${ip}`;
    try {
        const currentRaw = await kv.get(key);
        const current = Number(currentRaw ?? "0");
        const safeCurrent = Number.isFinite(current) ? current : 0;
        if (safeCurrent >= 60) {
            return { allowed: false, debug: false };
        }
        await kv.put(key, String(safeCurrent + 1), { expirationTtl: 600 });
        return { allowed: true, debug: false };
    } catch {
        return { allowed: true, debug: true };
    }
}

async function persistBooking(env: Env, booking: BookingPayload, ip: string): Promise<PersistResult> {
    const db = env.TABLEDADRIAN_DB;
    const id = crypto.randomUUID();

    if (!db) {
        return { ok: true, id, debug: true };
    }

    try {
        await db
            .prepare(
                `INSERT INTO bookings (id, created_at, name, email, phone, guests, date, message, ip)
                VALUES (?, datetime('now'), ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
                id,
                booking.name,
                booking.email,
                booking.phone ?? null,
                booking.guests,
                booking.date,
                booking.message,
                ip === "unknown" ? null : ip
            )
            .run();

        return { ok: true, id, debug: false };
    } catch {
        return { ok: false, debug: false, error: "Unable to save booking." };
    }
}

export async function POST(req: Request, context: RouteContext): Promise<Response> {
    const env = resolveCfEnv<Env>(context.env) ?? EMPTY_ENV;

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return Response.json(
            { ok: false, errors: ["Invalid JSON payload."] },
            { status: 400, headers: HEADERS }
        );
    }

    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
        const errors = parsed.error.issues.map((issue) => issue.message);
        return Response.json({ ok: false, errors }, { status: 400, headers: HEADERS });
    }

    const { booking, website, turnstileToken } = parsed.data;

    if (website) {
        return Response.json({ ok: true, id: "ignored" }, { headers: HEADERS });
    }

    const ip = getClientIp(req);

    const rate = await applyRateLimit(env, ip);
    let debug = rate.debug;
    if (!rate.allowed) {
        return Response.json(
            { ok: false, errors: ["Too many requests. Please wait a few minutes before retrying."] },
            { status: 429, headers: HEADERS }
        );
    }

    const verification = await verifyTurnstile(env, turnstileToken, ip);
    debug = debug || verification.debug;
    if (!verification.ok) {
        return Response.json(
            { ok: false, errors: ["Verification failed. Please refresh and try again."] },
            { status: 400, headers: HEADERS }
        );
    }

    const persistence = await persistBooking(env, booking, ip);
    debug = debug || persistence.debug;
    if (!persistence.ok || !persistence.id) {
        return Response.json(
            { ok: false, errors: [persistence.error ?? "Unable to save your request right now."] },
            { status: 500, headers: HEADERS }
        );
    }

    const response: { ok: true; id: string; debug?: boolean } = { ok: true, id: persistence.id };
    if (debug) {
        response.debug = true;
    }

    return Response.json(response, { headers: HEADERS });
}
