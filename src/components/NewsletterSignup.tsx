"use client";

import React, { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email("Use a refined email address so we can reach you.");

type SubmissionState = "idle" | "pending" | "success" | "error";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [state, setState] = useState<SubmissionState>("idle");
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const introCopy = "Occasional notes on menus, voyages, and seasonal ateliers.";

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setState("pending");
        setStatusMessage(null);

        try {
            const normalized = emailSchema.parse(email.trim());
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: normalized }),
            });

            if (!response.ok) {
                throw new Error("We could not confirm the address. Refine it and try again.");
            }

            setState("success");
            setStatusMessage("You're confirmed. Expect curated dispatches crafted for discerning hosts.");
            setEmail("");
        } catch (error) {
            setState("error");
            const fallback =
                error instanceof Error ? error.message : "We could not confirm the address. Please try again shortly.";
            setStatusMessage(fallback);
        }
    }

    const messageClass =
        state === "error" ? "form-message error" : state === "success" ? "form-message success" : "form-message";
    const messageRole: "alert" | "status" = state === "error" ? "alert" : "status";

    return (
        <section className="newsletter-card">
            <div className="newsletter-card__header">
                <h2 className="newsletter-card__title">Concierge newsletter</h2>
                <p className="newsletter-card__subtitle">{introCopy}</p>
            </div>
            <form className="form form--narrow newsletter-form" onSubmit={handleSubmit} noValidate>
                <label className="field" htmlFor="newsletter-email">
                    <span>Email address</span>
                    <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        placeholder="you@residence.com"
                        required
                        aria-invalid={state === "error"}
                        aria-describedby="newsletter-helper"
                    />
                </label>
                <div className="form-actions">
                    <button
                        type="submit"
                        className="btn btn--full text-xs uppercase tracking-[0.3em]"
                        disabled={state === "pending"}
                    >
                        {state === "pending" ? "Submitting..." : "Request dispatches"}
                    </button>
                </div>
            </form>
            <p id="newsletter-helper" className="form-note">
                Your details stay within the atelier. Unsubscribe anytime via the concierge.
            </p>
            {statusMessage ? (
                <p className={messageClass} role={messageRole}>
                    {statusMessage}
                </p>
            ) : null}
        </section>
    );
}
