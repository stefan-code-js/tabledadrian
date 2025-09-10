"use client";

import { useState } from "react";

type Props = { emailFallback: string };

export default function ContactForm({ emailFallback }: Props) {
    const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
    const [msg, setMsg] = useState<string>("");

    const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("sending");
        setMsg("");

        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const res = await fetch("/api/contact", { method: "POST", body: data });

            // Robust parse: handle HTML error pages gracefully
            const ct = res.headers.get("content-type") || "";
            const raw = await res.text();
            const payload = ct.includes("application/json") ? JSON.parse(raw) : null;

            if (!res.ok) {
                const hint = res.status === 404 ? "Contact endpoint not found (/api/contact)." : "";
                throw new Error(payload?.error || hint || raw || "Failed to send");
            }

            setStatus("ok");
            setMsg(payload?.message || "Thank you. We’ll be in touch shortly.");
            form.reset();

            // Reset Turnstile if present
            // @ts-expect-error global
            if (window.turnstile?.reset) window.turnstile.reset();
        } catch (err: any) {
            setStatus("err");
            setMsg(err?.message || "Something went wrong. Please email us directly.");
        }
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <div className="form-grid">
                <div className="field">
                    <label htmlFor="name" className="visually-hidden">Name</label>
                    <input id="name" name="name" placeholder="name" required />
                </div>

                <div className="field">
                    <label htmlFor="email" className="visually-hidden">Email</label>
                    <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="email" required />
                </div>

                <div className="field">
                    <label htmlFor="phone" className="visually-hidden">Phone</label>
                    <input id="phone" name="phone" type="tel" inputMode="tel" placeholder="phone (optional)" />
                </div>

                <div className="field">
                    <label htmlFor="date" className="visually-hidden">Date</label>
                    <input id="date" name="date" type="date" placeholder="date" />
                </div>

                <div className="field">
                    <label htmlFor="location" className="visually-hidden">Location</label>
                    <input id="location" name="location" placeholder="location (villa, yacht, salon)" />
                </div>

                <div className="field">
                    <label htmlFor="guests" className="visually-hidden">Guests</label>
                    <input id="guests" name="guests" type="number" min={1} max={100} placeholder="guests" />
                </div>
            </div>

            <div className="chips" role="group" aria-label="Menu path">
                <label className="chip">
                    <input type="radio" name="path" value="signature" defaultChecked />
                    <span>signature</span>
                </label>
                <label className="chip">
                    <input type="radio" name="path" value="garden" />
                    <span>garden</span>
                </label>
                <label className="chip">
                    <input type="radio" name="path" value="salon" />
                    <span>salon</span>
                </label>
            </div>

            <div className="field">
                <label htmlFor="message" className="visually-hidden">Message</label>
                <textarea id="message" name="message" placeholder="message" rows={6} required />
            </div>

            {/* Cloudflare Turnstile */}
            {SITE_KEY ? (
                <div className="cf-turnstile" data-sitekey={SITE_KEY} />
            ) : null}

            <div className="cta">
                <button className="btn primary" type="submit" disabled={status === "sending"}>
                    {status === "sending" ? "sending…" : "send"}
                </button>
                <a className="btn" href={`mailto:${emailFallback}`}>email instead</a>
            </div>

            {status !== "idle" && (
                <p className="note center-text" aria-live="polite" style={{ marginTop: 8 }}>
                    {msg}
                </p>
            )}
        </form>
    );
}
