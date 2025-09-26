"use client";

import { FormEvent, Fragment, useState } from "react";

type SubmissionState = "idle" | "sending" | "ok" | "error";
type ApiResponse = { ok?: boolean; error?: string };
type RatingValue = 1 | 2 | 3 | 4 | 5;

const ratingOptions: RatingValue[] = [5, 4, 3, 2, 1];

export default function ReviewForm() {
    const [rating, setRating] = useState<RatingValue>(5);
    const [state, setState] = useState<SubmissionState>("idle");
    const [error, setError] = useState<string>("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setState("sending");
        setError("");

        const form = new FormData(event.currentTarget);
        const token = (form.get("cf-turnstile-response") as string | null) ?? "";

        const body = {
            name: (form.get("name") as string) ?? "",
            email: (form.get("email") as string) ?? "",
            rating,
            comment: (form.get("comment") as string) ?? "",
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

            setState("ok");
            event.currentTarget.reset();
            setRating(5);
        } catch (err) {
            setState("error");
            setError(err instanceof Error ? err.message : "Unexpected error");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <div className="grid">
                <label>
                    name
                    <input name="name" type="text" required placeholder="Your full name" />
                </label>
                <label>
                    email <span className="muted">(optional)</span>
                    <input name="email" type="email" placeholder="you@domain.com" />
                </label>
            </div>

            <div className="stars" role="radiogroup" aria-label="rating">
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

            <label>
                comment
                <textarea name="comment" rows={4} placeholder="Tell us about your experience"></textarea>
            </label>

            <div
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                data-theme="light"
            />

            <button className="btn primary" disabled={state === "sending"}>
                {state === "sending" ? "sending..." : "submit review"}
            </button>

            {state === "ok" ? (
                <p className="sub" role="status">
                    Thank you — your review was recorded.
                </p>
            ) : null}
            {state === "error" ? (
                <p className="sub" role="alert">
                    Error: {error}
                </p>
            ) : null}
        </form>
    );
}
