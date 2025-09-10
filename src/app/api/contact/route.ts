import { NextResponse } from "next/server";
export const runtime = "edge";
async function verifyTurnstile(token: string | null) {
    const secret = process.env.TURNSTILE_SECRET_KEY;
    if (!secret) return true; // skip if not configured
    if (!token) return false;

    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await r.json()) as { success?: boolean };
    return !!data.success;
}

export async function POST(req: Request) {
    try {
        const form = await req.formData();
        const token = form.get("cf-turnstile-response") as string | null;
        const ok = await verifyTurnstile(token);
        if (!ok) return NextResponse.json({ error: "Bot verification failed." }, { status: 400 });

        const name = String(form.get("name") || "");
        const email = String(form.get("email") || "");
        const phone = String(form.get("phone") || "");
        const date = String(form.get("date") || "");
        const location = String(form.get("location") || "");
        const guests = String(form.get("guests") || "");
        const path = String(form.get("path") || "signature");
        const message = String(form.get("message") || "");

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        const to = process.env.EMAIL_TO || process.env.EMAIL_FROM; // fallback
        const from = process.env.EMAIL_FROM || "no-reply@tabledadrian.com";
        const apiKey = process.env.RESEND_API_KEY;

        const subject = `New enquiry — ${name} (${path})`;
        const text = [
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : null,
            date ? `Date: ${date}` : null,
            location ? `Location: ${location}` : null,
            guests ? `Guests: ${guests}` : null,
            `Path: ${path}`,
            "",
            message,
        ]
            .filter(Boolean)
            .join("\n");

        if (apiKey && to) {
            // Send via Resend HTTP API (no SDK required)
            const r = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    from,
                    to,
                    reply_to: email,
                    subject,
                    text,
                }),
            });

            if (!r.ok) {
                const err = await r.text();
                console.error("Resend error:", err);
                // but still return ok to the user
            }
        } else {
            // Not configured yet—log to console so we can see payload in logs
            console.log("[CONTACT] (no email configured):", { name, email, phone, date, location, guests, path, message });
        }

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
    }
}
