// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';

type Intent = 'signature' | 'garden' | 'salon';

interface ContactPayload {
    name: string;
    email: string;
    phone?: string;
    intent: Intent;
    message: string;
    token: string; // Cloudflare Turnstile token
}

interface TurnstileVerifyResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    'error-codes'?: string[];
    action?: string;
    cdata?: string;
}

/* ---------------- helpers ---------------- */

function isRecord(v: unknown): v is Record<string, unknown> {
    return typeof v === 'object' && v !== null;
}

function getString(obj: Record<string, unknown>, key: string): string {
    const v = obj[key];
    return typeof v === 'string' ? v : '';
}

function asIntent(v: string): Intent {
    return v === 'garden' || v === 'salon' ? v : 'signature';
}

function toPayload(raw: unknown): ContactPayload {
    if (!isRecord(raw)) throw new Error('Invalid request body');

    const name = getString(raw, 'name');
    const email = getString(raw, 'email');
    const phone = getString(raw, 'phone') || undefined;
    const intent = asIntent(getString(raw, 'intent'));
    const message = getString(raw, 'message');

    // accept either `turnstileToken` or `token` from the client
    const token =
        getString(raw, 'turnstileToken') || getString(raw, 'token');

    if (!name || !email || !token) {
        throw new Error('Missing required fields');
    }

    return { name, email, phone, intent, message, token };
}

function isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function verifyTurnstile(
    responseToken: string,
    remoteIp?: string
): Promise<boolean> {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true; // dev: skip when not configured

    const body = new URLSearchParams({
        secret,
        response: responseToken,
    });
    if (remoteIp) body.set('remoteip', remoteIp);

    const resp = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        { method: 'POST', body }
    );

    const data = (await resp.json()) as unknown as TurnstileVerifyResponse;
    return data.success === true;
}

async function sendWithResend(payload: ContactPayload): Promise<void> {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO || 'adrian@tabledadrian.com';
    if (!key) return; // silently skip if not wired

    const html = `
    <h2>New enquiry — ${escapeHtml(payload.intent)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ''}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message)}</p>
  `;

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Table d’Adrian <no-reply@tabledadrian.com>',
            to: [to],
            subject: `New enquiry — ${payload.intent}`,
            html,
        }),
    });

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`Email send failed (${res.status}): ${text.slice(0, 200)}`);
    }
}

/* ---------------- handler ---------------- */

export async function POST(req: Request) {
    try {
        const remoteIp =
            req.headers.get('cf-connecting-ip') ??
            req.headers.get('x-forwarded-for') ??
            undefined;

        const raw = await req.json().catch(() => null);
        if (!raw) {
            return NextResponse.json(
                { ok: false, error: 'Invalid JSON' },
                { status: 400 }
            );
        }

        const payload = toPayload(raw);

        if (!isEmail(payload.email)) {
            return NextResponse.json(
                { ok: false, error: 'Invalid email' },
                { status: 400 }
            );
        }

        const ok = await verifyTurnstile(payload.token, remoteIp);
        if (!ok) {
            return NextResponse.json(
                { ok: false, error: 'Turnstile verification failed' },
                { status: 400 }
            );
        }

        await sendWithResend(payload).catch(() => {
            // Allow success even if email sending isn’t configured
        });

        return NextResponse.json({ ok: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unexpected error';
        return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
}

