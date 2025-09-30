"use client";

import React from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import KineticHeading from "@/components/KineticHeading";
import KineticParagraph from "@/components/KineticParagraph";

export type Review = {
    id: string;
    name: string;
    email?: string;
    text: string;
    rating: number;
    createdAt: string;
};

type ApiSuccess = {
    ok: true;
    review: Review;
    count?: number;
    avg?: number;
    stats?: { count: number; avg: number };
    debug?: boolean;
};

type ApiFailure = {
    ok: false;
    error?: string;
};

type ApiResponse = ApiSuccess | ApiFailure | null;

type Props = {
    initialItems: Review[];
    initialCount: number;
    initialAvg: number;
};

const StarIcon: React.FC<{ filled?: boolean; size?: number }> = ({ filled, size = 22 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={`star ${filled ? "filled" : ""}`}
        aria-hidden="true"
    >
        <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
        />
    </svg>
);

export default function ReviewsClient({ initialItems, initialCount, initialAvg }: Props) {
    const [items, setItems] = React.useState<Review[]>(initialItems);
    const [count, setCount] = React.useState<number>(initialCount);
    const [avg, setAvg] = React.useState<number>(initialAvg);

    const [rating, setRating] = React.useState(0);
    const [hover, setHover] = React.useState<number | null>(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [text, setText] = React.useState("");

    const [busy, setBusy] = React.useState(false);
    const [err, setErr] = React.useState<string | null>(null);
    const [ok, setOk] = React.useState<string | null>(null);

    const formStartedRef = React.useRef(false);

    function recompute(newItems: Review[]) {
        if (newItems.length === 0) {
            setAvg(0);
            setCount(0);
            return;
        }
        const total = newItems.reduce((sum, review) => sum + review.rating, 0);
        const nextAvg = +(total / newItems.length).toFixed(2);
        setAvg(nextAvg);
        setCount(newItems.length);
    }

    function handleFormFocus() {
        if (!formStartedRef.current) {
            formStartedRef.current = true;
            trackEvent(ANALYTICS_EVENTS.formStart, { form: "review", context: "reviews-page" });
        }
    }

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setErr(null);
        setOk(null);

        if (!name.trim() || !text.trim() || rating < 1) {
            setErr("Please add name, comment, and a rating.");
            trackEvent(ANALYTICS_EVENTS.formError, {
                form: "review",
                context: "reviews-page",
                reason: "validation",
            });
            return;
        }

        setBusy(true);
        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim() || undefined,
                    text: text.trim(),
                    rating,
                }),
            });

            const data = (await response.json().catch(() => null)) as ApiResponse;
            if (!response.ok || !data || !data.ok || !data.review) {
                const message = data && "error" in data && data.error ? data.error : "Network error. Please try again.";
                setErr(message);
                trackEvent(ANALYTICS_EVENTS.formError, {
                    form: "review",
                    context: "reviews-page",
                    reason: message,
                    status: response.status,
                });
                return;
            }

            const created = data.review;
            let nextItems: Review[] | null = null;
            setItems((prev) => {
                const merged = [created, ...prev].slice(0, 50);
                nextItems = merged;
                return merged;
            });

            if (data.stats) {
                setCount(data.stats.count);
                setAvg(data.stats.avg);
            } else if (nextItems) {
                recompute(nextItems);
            }

            trackEvent(ANALYTICS_EVENTS.formSuccess, {
                form: "review",
                context: "reviews-page",
                rating,
            });

            setOk("Thank you - your note is published.");
            setName("");
            setEmail("");
            setText("");
            setRating(0);
        } catch (error) {
            const message = "Network error. Please try again.";
            const analyticsReason = error instanceof Error && error.message ? error.message : "network";
            setErr(message);
            trackEvent(ANALYTICS_EVENTS.formError, {
                form: "review",
                context: "reviews-page",
                reason: analyticsReason,
            });
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="reviews-layout">
            <section className="reviews-column" aria-live="polite">
                <header className="reviews-column__header">
                    <KineticHeading as="h2" className="reviews-column__heading">Guest notes</KineticHeading>
                    <KineticParagraph className="muted">
                        {count} review{count === 1 ? "" : "s"} - average {avg.toFixed(1)}
                    </KineticParagraph>
                </header>
                {items.length === 0 ? (
                    <KineticParagraph className="muted">Reviews will appear here when guests publish them.</KineticParagraph>
                ) : (
                    <div className="reviews-stack">
                        {items.map((review) => (
                            <article key={review.id} className="review-item">
                                <div className="review-meta">
                                    <strong>{review.name}</strong>
                                    <span className="review-stars" aria-label={`${review.rating} out of 5`}>
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <StarIcon key={n} filled={n <= review.rating} size={18} />
                                        ))}
                                    </span>
                                </div>
                                <p>{review.text}</p>
                                <p className="muted small">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <section className="reviews-column">
                <header className="reviews-column__header">
                    <KineticHeading as="h3" className="reviews-column__heading">Leave a review</KineticHeading>
                    <KineticParagraph className="muted">Share a brief note about your experience.</KineticParagraph>
                </header>
                <fieldset className="review-form__rating" aria-label="choose rating">
                    <legend className="sr-only">Rating</legend>
                    <div className="stars" role="radiogroup" aria-label="rating">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <button
                                key={n}
                                type="button"
                                className={`star-button ${n <= (hover ?? rating) ? "is-active" : ""}`}
                                onMouseEnter={() => setHover(n)}
                                onMouseLeave={() => setHover(null)}
                                onClick={() => setRating(n)}
                                aria-label={`${n} star${n === 1 ? "" : "s"}`}
                                aria-pressed={rating === n}
                            >
                                <StarIcon filled={n <= (hover ?? rating)} />
                            </button>
                        ))}
                    </div>
                </fieldset>
                <form className="form review-form" onSubmit={onSubmit} onFocusCapture={handleFormFocus} aria-live="polite">
                    <label className="field">
                        <span>Name</span>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                            aria-required
                            placeholder="Your full name"
                            autoComplete="name"
                        />
                    </label>
                    <label className="field">
                        <span>Email (optional)</span>
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            placeholder="you@domain.com"
                            autoComplete="email"
                        />
                    </label>
                    <label className="field">
                        <span>Message</span>
                        <textarea
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            rows={4}
                            required
                            aria-required
                            placeholder="Share highlights from your evening"
                        />
                    </label>

                    <div className="cta">
                        <button className="btn" type="submit" disabled={busy || rating < 1}>
                            {busy ? "sending..." : "publish review"}
                        </button>
                    </div>
                </form>

                {err ? (
                    <p className="error" role="alert">
                        {err}
                    </p>
                ) : null}
                {ok ? (
                    <p className="ok" role="status">
                        {ok}
                    </p>
                ) : null}
            </section>
        </div>
    );
}
