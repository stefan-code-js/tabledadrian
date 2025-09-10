// src/components/Reviews.tsx
import React from "react";

type Review = {
    name: string;
    text: string;
    when?: string;
    rating?: number; // 1..5 (default 5)
};

function Stars({ rating = 5 }: { rating?: number }) {
    const value = Math.max(1, Math.min(5, rating));
    return (
        <span className="star-row" aria-label={`${value} out of 5`}>
      {"★★★★★".slice(0, value)}
    </span>
    );
}

export default function Reviews({ items }: { items?: Review[] }) {
    const data: Review[] =
        items && items.length
            ? items
            : [
                {
                    name: "Élise",
                    text:
                        "Seasonality held like a narrative — fragrance first, then texture. Graceful pacing.",
                    when: "June",
                    rating: 5,
                },
                {
                    name: "Marco",
                    text:
                        "Garden course luminous. Seafood precise and quiet. Service composed and calm.",
                    when: "July",
                    rating: 5,
                },
                {
                    name: "Nadia",
                    text:
                        "Composed sequence; nothing rushed. Reductions were immaculate.",
                    when: "August",
                    rating: 5,
                },
                {
                    name: "Jonas",
                    text:
                        "Pairings understated and exact. Dry-aged fish was a quiet masterstroke.",
                    when: "September",
                    rating: 5,
                },
            ];

    return (
        <ul className="review-list">
            {data.map((r, i) => (
                <li className="review-item" key={`${r.name}-${i}`}>
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">{r.name}</h4>
                            <Stars rating={r.rating} />
                        </div>
                        <p style={{ margin: 0 }}>{r.text}</p>
                        {r.when ? (
                            <p className="meta" style={{ marginTop: 6 }}>
                                {r.when}
                            </p>
                        ) : null}
                    </div>
                </li>
            ))}
        </ul>
    );
}
