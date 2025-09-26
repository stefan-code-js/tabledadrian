"use client";

import React from "react";

export type Review = {
    id: string;
    name: string;
    email?: string;
    text: string;
    rating: number;
    createdAt: number;
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

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setErr(null);
        setOk(null);

        if (!name.trim() || !text.trim() || rating < 1) {
            setErr("Please add name, comment, and a rating.");
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
                setBusy(false);
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

            setOk("Thank you - your note is published.");
            setName("");
            setEmail("");
            setText("");
            setRating(0);
        } catch {
            setErr("Network error. Please try again.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="reviews-layout">
            <section className="reviews-column" aria-live="polite">
                <header className="reviews-column__header">
                    <h3>Guest notes</h3>
                    <p className="muted">
                        {count} review{count === 1 ? "" : "s"} - average {avg.toFixed(1)}
                    </p>
                </header>
                {items.length === 0 ? (
                    <p className="muted">Reviews will appear here when guests publish them.</p>
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
                    <h3>Leave a review</h3>
                    <p className="muted">Share a brief note about your experience.</p>
                </header>
                <fieldset className="stars-fieldset" aria-label="choose rating">
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
                <form className="form" onSubmit={onSubmit}>
                    <label>
                        <span>Name</span>
                        <input value={name} onChange={(event) => setName(event.target.value)} required aria-required />
                    </label>
                    <label>
                        <span>Email (optional)</span>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
                    </label>
                    <label>
                        <span>Message</span>
                        <textarea value={text} onChange={(event) => setText(event.target.value)} rows={4} required />
                    </label>

                    <div className="actions">
                        <button className="btn" type="submit" disabled={busy}>
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
