"use client";

import { FormEvent, Fragment, useRef, useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type SubmissionState = "idle" | "sending" | "ok" | "error";
type ApiResponse = { ok?: boolean; error?: string };
type RatingValue = 1 | 2 | 3 | 4 | 5;

const ratingOptions: RatingValue[] = [5, 4, 3, 2, 1];

export default function ReviewForm() {
    const [rating, setRating] = useState<RatingValue>(5);
    const [state, setState] = useState<SubmissionState>("idle");
    const [error, setError] = useState<string>("");
    const startedRef = useRef(false);

    function handleFocus() {
        if (!startedRef.current) {
            startedRef.current = true;
            trackEvent(ANALYTICS_EVENTS.formStart, { form: "review", context: "standalone" });
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setState("sending");
        setError("");

        const formElement = event.currentTarget;
        const form = new FormData(formElement);
        const token = ((form.get("cf-turnstile-response") as string | null) || "").trim();

        const name = ((form.get("name") as string) || "").trim();
        const email = ((form.get("email") as string) || "").trim();
        const comment = ((form.get("comment") as string) || "").trim();

        const body = {
            name,
            email,
            rating,
            comment,
            token,
        };

        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = (await response.json().catch(() => ({}))) as ApiResponse;
            if (!response.ok || data.ok !== true) {
                const message = data.error ?? `Bad response ${response.status}`;
                throw new Error(message);
            }

            trackEvent(ANALYTICS_EVENTS.formSuccess, {
                form: "review",
                context: "standalone",
                rating,
            });

            setState("ok");
            formElement.reset();
            setRating(5);
            startedRef.current = false;
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unexpected error";
            setState("error");
            setError(message);
            trackEvent(ANALYTICS_EVENTS.formError, {
                form: "review",
                context: "standalone",
                reason: message,
            });
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            onFocusCapture={handleFocus}
            className="form review-form"
            aria-live="polite"
        >
            <div className="form-grid">
                <label className="field">
                    <span>Name</span>
                    <input name="name" type="text" required placeholder="Your full name" autoComplete="name" />
                </label>
                <label className="field">
                    <span>Email <span className="muted">(optional)</span></span>
                    <input name="email" type="email" placeholder="you@domain.com" autoComplete="email" />
                </label>
            </div>

            <fieldset className="review-form__rating" aria-label="rating">
                <legend className="sr-only">Rating</legend>
                <div className="stars" role="radiogroup">
                    {ratingOptions.map((option) => (
                        <Fragment key={option}>
                            <input
                                id={`rate-${option}`}
                                type="radio"
                                name="rating"
                                value={option}
                                checked={rating === option}
                                onChange={() => setRating(option)}
                            />
                            <label htmlFor={`rate-${option}`} aria-label={`${option} stars`}>
                                {"\u2605"}
                            </label>
                        </Fragment>
                    ))}
                </div>
            </fieldset>

            <label className="field">
                <span>Comment</span>
                <textarea
                    name="comment"
                    rows={4}
                    placeholder="Tell us about your experience"
                    required
                />
            </label>

            <div
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                data-theme="light"
            />

            <div className="form-actions">
                <button className="btn" type="submit" disabled={state === "sending"}>
                    {state === "sending" ? "Sending..." : "Publish review"}
                </button>
            </div>

            {state === "ok" ? (
                <p className="form-message success" role="status">
                    Thank you - your review was recorded.
                </p>
            ) : null}
            {state === "error" ? (
                <p className="form-message error" role="alert">
                    Error: {error}
                </p>
            ) : null}
        </form>
    );
}
