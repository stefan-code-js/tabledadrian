"use client";

import React, { useState } from "react";
import { z } from "zod";

const emailSchema = z.string().email();

type SubmissionState = "idle" | "pending" | "success" | "error";

export default function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [state, setState] = useState<SubmissionState>("idle");
    const [message, setMessage] = useState("Occasional notes on menus, voyages, and seasonal ateliers.");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setState("pending");
            const normalized = emailSchema.parse(email.trim());
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: normalized }),
            });

            if (!response.ok) {
                throw new Error("Subscription request failed");
            }
            setState("success");
            setMessage("You're confirmed. Expect curated dispatches crafted for discerning hosts.");
            setEmail("");
        } catch {
            setState("error");
            setMessage("We could not confirm the address. Refine and try again, or reach the concierge directly.");
        }
    }

    return (
        <section className="newsletter-card">
            <div className="newsletter-card__header">
                <h2 className="newsletter-card__title">Concierge newsletter</h2>
                <p className="newsletter-card__subtitle">{message}</p>
            </div>
            <form className="newsletter-card__form" onSubmit={handleSubmit} noValidate>
                <div className="newsletter-card__field">
                    <label className="newsletter-card__label" htmlFor="newsletter-email">
                        Email address
                    </label>
                    <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        placeholder="you@residence.com"
                        required
                        className="newsletter-card__input"
                        aria-invalid={state === "error"}
                        aria-describedby="newsletter-helper"
                    />
                </div>
                <button type="submit" className="newsletter-card__action" disabled={state === "pending"}>
                    {state === "pending" ? "Submitting…" : "Request dispatches"}
                </button>
            </form>
            <p id="newsletter-helper" className="newsletter-card__helper">
                Your details stay within the atelier. Unsubscribe anytime via the concierge.
            </p>
        </section>
    );
}

