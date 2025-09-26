"use client";

import { useRef, useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type ContactResponse = { ok: true; id?: string } | { ok: false; errors?: string[] } | null;

export default function ContactForm({ context }: { context?: string }) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [message, setMessage] = useState<string>("");
    const startedRef = useRef(false);

    function handleFocus() {
        if (!startedRef.current) {
            startedRef.current = true;
            trackEvent(ANALYTICS_EVENTS.formStart, { form: "contact", context });
        }
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const payload = {
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            guests: Number(formData.get("guests") || 0),
            eventDate: String(formData.get("eventDate") || ""),
            location: String(formData.get("location") || ""),
            budget: String(formData.get("budget") || ""),
            message: String(formData.get("message") || ""),
            company: String(formData.get("company") || ""),
        };

        setStatus("submitting");
        setMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const raw = (await response.json().catch(() => null)) as ContactResponse;
            const data = raw && typeof raw === "object" ? raw : null;

            if (!response.ok || !data || ("ok" in data && data.ok !== true)) {
                const errors = data && "errors" in data ? data.errors?.join(" ") : undefined;
                trackEvent(ANALYTICS_EVENTS.formError, {
                    form: "contact",
                    context,
                    reason: "response",
                    status: response.status,
                    errors,
                });
                setStatus("error");
                setMessage(errors || "Unable to send right now. Please check your details and try again.");
                return;
            }

            form.reset();
            if (context) {
                const messageField = form.elements.namedItem("message") as HTMLTextAreaElement | null;
                if (messageField) {
                    messageField.value = `Pricing context: ${context}\n`;
                }
            }

            trackEvent(ANALYTICS_EVENTS.formSuccess, {
                form: "contact",
                context,
                id: "id" in data ? data.id : undefined,
            });
            setStatus("success");
            setMessage("Merci - we'll confirm details shortly.");
        } catch {
            trackEvent(ANALYTICS_EVENTS.formError, {
                form: "contact",
                context,
                reason: "network",
            });
            setStatus("error");
            setMessage("Network error. Please retry in a moment.");
        }
    }

    return (
        <form id="contact-form" className="form contact-form" onSubmit={onSubmit} onFocusCapture={handleFocus}>
            <div className="grid-two">
                <label>
                    <span>Name</span>
                    <input name="name" autoComplete="name" required aria-required type="text" />
                </label>
                <label>
                    <span>Email</span>
                    <input name="email" type="email" autoComplete="email" required aria-required />
                </label>
            </div>
            <div className="grid-two">
                <label>
                    <span>Guests</span>
                    <input name="guests" type="number" min={1} max={120} required aria-required />
                </label>
                <label>
                    <span>Event date</span>
                    <input name="eventDate" type="date" required aria-required />
                </label>
            </div>
            <div className="grid-two">
                <label>
                    <span>Location</span>
                    <input name="location" placeholder="Antibes, Cannes, Monaco" />
                </label>
                <label>
                    <span>Budget</span>
                    <input name="budget" placeholder="Approximate investment" />
                </label>
            </div>
            <label>
                <span>Intent / notes</span>
                <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about the evening, preferences, or key priorities."
                    defaultValue={context ? `Pricing context: ${context}\n` : undefined}
                />
            </label>
            <div style={{ display: "none" }} aria-hidden="true">
                <label>
                    company
                    <input name="company" tabIndex={-1} autoComplete="off" />
                </label>
            </div>
            <div className="actions">
                <button className="btn" type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "sending..." : "submit inquiry"}
                </button>
            </div>
            {status === "error" ? (
                <p className="error" role="alert">{message}</p>
            ) : null}
            {status === "success" ? <p className="ok">{message}</p> : null}
        </form>
    );
}

