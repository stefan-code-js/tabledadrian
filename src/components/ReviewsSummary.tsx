'use client';

import React from 'react';

export default function ReviewsSummary() {
    const [count, setCount] = React.useState<number>(0);
    const [avg, setAvg] = React.useState<number>(0);

    React.useEffect(() => {
        let alive = true;
        fetch('/api/reviews/stats', { cache: 'no-store' })
            .then(r => r.json())
            .then(d => { if (alive) { setCount(d.count || 0); setAvg(d.avg || 0); } })
            .catch(() => { /* ignore */ });
        return () => { alive = false; };
    }, []);

    return (
        <div className="card center-text">
            <h3>guest reviews</h3>
            <p className="lead" aria-live="polite">
        <span aria-label={`${avg} out of 5 stars`} title={`${avg} / 5`}>
          ★ {avg.toFixed(1)}
        </span>
                <span className="muted"> · {count} review{count === 1 ? '' : 's'}</span>
            </p>
        </div>
    );
}
