"use client";

import { useEffect, useState } from "react";

type StatsResponse = {
    count?: number;
    avg?: number;
};

export default function ReviewsSummary() {
    const [count, setCount] = useState<number>(0);
    const [average, setAverage] = useState<number>(0);

    useEffect(() => {
        let active = true;

        const loadStats = async () => {
            try {
                const response = await fetch("/api/reviews/stats", { cache: "no-store" });
                const data = (await response.json()) as StatsResponse;
                if (!active) {
                    return;
                }

                setCount(typeof data.count === "number" ? data.count : 0);
                setAverage(typeof data.avg === "number" ? data.avg : 0);
            } catch {
                if (active) {
                    setCount(0);
                    setAverage(0);
                }
            }
        };

        void loadStats();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="card center-text">
            <h3>guest reviews</h3>
            <p className="lead" aria-live="polite">
                <span aria-label={`${average} out of 5 stars`} title={`${average} / 5`}>
                    {"\u2605"} {average.toFixed(1)}
                </span>
                <span className="muted"> | {count} review{count === 1 ? "" : "s"}</span>
            </p>
        </div>
    );
}
