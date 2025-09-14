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

type Props = {
    initialItems: Review[];
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

export default function ReviewsClient({ initialItems }: Props) {
    const [items, setItems] = React.useState<Review[]>(initialItems);

    const [rating, setRating] = React.useState(0);
    const [hover, setHover] = React.useState<number | null>(null);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [text, setText] = React.useState("");

    const [busy, setBusy] = React.useState(false);
    const [err, setErr] = React.useState<string | null>(null);
    const [ok, setOk] = React.useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErr(null);
        setOk(null);

        if (!name.trim() || !text.trim() || rating < 1) {
            setErr("Please add name, comment, and a rating.");
            return;
        }

        setBusy(true);
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    email: email.trim() || undefined,
                    text: text.trim(),
                    rating,
                }),
            });

            type ApiResp = { ok?: boolean; error?: string; review?: Review };
            const data = (await res.json().catch(() => ({}))) as ApiResp;
            if (!res.ok || !data.ok) {
                setErr(data.error || "Network error. Please try again.");
                setBusy(false);
                return;
            }

            if (data.review) {
                setItems((prev) => [data.review as Review, ...prev].slice(0, 50));
            }
            setOk("Thank you — your note is published.");
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
        <section className="section" style={{ paddingTop: 10 }}>
            <div className="lux-grid">
                {/* Left: Public list */}
                <article className="lux-card reveal" style={delay(60)}>
                    <div className="lux-body" style={{ width: "100%" }}>
                        <h2 className="lux-h">Guest notes</h2>

                        {items.length === 0 ? (
                            <ul className="list skeleton" aria-live="polite" aria-busy="true">
                                <li />
                                <li />
                                <li />
                            </ul>
                        ) : (
                            <ul className="list" aria-live="polite">
                                {items.map((r) => (
                                    <li key={r.id} className="review-row">
                                        <div className="row">
                                            <strong>{r.name}</strong>
                                            <span className="stars" aria-label={`${r.rating} out of 5`}>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <StarIcon key={n} filled={n <= r.rating} size={18} />
                        ))}
                      </span>
                                        </div>
                                        <p className="review-text">{r.text}</p>
                                        <p className="muted" style={{ margin: 0, fontSize: ".85rem" }}>
                                            {new Date(r.createdAt).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </article>

                {/* Right: Form */}
                <article className="lux-card reveal" style={delay(120)}>
                    <div className="lux-body" style={{ width: "100%" }}>
                        <h2 className="lux-h">Leave a review</h2>

                        {/* stars */}
                        <fieldset className="stars-fieldset" aria-label="choose rating">
                            <div className="stars" role="radiogroup" aria-label="rating">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        className="star-btn"
                                        aria-pressed={rating >= n}
                                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                                        onMouseEnter={() => setHover(n)}
                                        onMouseLeave={() => setHover(null)}
                                        onClick={() => setRating(n)}
                                    >
                                        <StarIcon filled={(hover ?? rating) >= n} />
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        {/* form */}
                        <form className="form review-form" onSubmit={onSubmit} style={{ width: "100%" }}>
                            <label>
                                <span>name</span>
                                <input
                                    required
                                    placeholder="your name"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>

                            <label>
                                <span>email (optional)</span>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            <label>
                                <span>comment</span>
                                <textarea
                                    placeholder="share a brief note about your experience"
                                    autoComplete="on"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    rows={6}
                                />
                            </label>

                            <div className="actions">
                                <button className="btn" type="submit" disabled={busy}>
                                    {busy ? "sending…" : "submit review"}
                                </button>
                            </div>

                            {err ? <p className="error" role="alert">{err}</p> : null}
                            {ok ? <p className="ok">{ok}</p> : null}
                        </form>
                    </div>
                </article>
            </div>
        </section>
    );
}


function delay(ms: number): React.CSSProperties {
    return { "--d": `${ms}ms` } as React.CSSProperties;
}
