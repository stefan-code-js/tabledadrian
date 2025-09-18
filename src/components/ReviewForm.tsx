'use client';

import React from 'react';

type State = 'idle' | 'sending' | 'ok' | 'error';

export default function ReviewForm() {
    const [rating, setRating] = React.useState<number>(5);
    const [state, setState] = React.useState<State>('idle');
    const [error, setError] = React.useState<string>('');

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setState('sending');
        setError('');

        const fd = new FormData(e.currentTarget);
        const token = (fd.get('cf-turnstile-response') as string | null) ?? '';

        const body = {
            name: (fd.get('name') as string) ?? '',
            email: (fd.get('email') as string) ?? '',
            rating,
            comment: (fd.get('comment') as string) ?? '',
            token
        };

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
            if (!res.ok || !data.ok) {
                throw new Error(data?.error || `Bad response ${res.status}`);
            }
            setState('ok');
            e.currentTarget.reset();
            setRating(5);
        } catch (err) {
            setState('error');
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
    }

    return (
        <form onSubmit={onSubmit} className="review-form">
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
                {[5,4,3,2,1].map((n) => (
                    <React.Fragment key={n}>
                        <input
                            id={`rate-${n}`}
                            type="radio"
                            name="rating"
                            value={n}
                            checked={rating === n}
                            onChange={() => setRating(n)}
                        />
                        <label htmlFor={`rate-${n}`} aria-label={`${n} stars`}>★</label>
                    </React.Fragment>
                ))}
            </div>

            <label>
                comment
                <textarea name="comment" rows={4} placeholder="Tell us about your experience"></textarea>
            </label>

            {/* Turnstile INSIDE the form so it injects cf-turnstile-response */}
            <div
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                data-theme="light"
            />

            <button className="btn primary" disabled={state === 'sending'}>
                {state === 'sending' ? 'sending…' : 'submit review'}
            </button>

            {state === 'ok' && <p className="sub" role="status">Thank you — your review was recorded.</p>}
            {state === 'error' && <p className="sub" role="alert">Error: {error}</p>}
        </form>
    );
}
