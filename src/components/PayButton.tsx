'use client';

import { useState } from 'react';

type Mode = 'payment' | 'subscription';

export default function PayButton({
                                      priceId,
                                      mode,
                                      children,
                                  }: {
    priceId: string;
    mode: Mode;
    children: React.ReactNode;
}) {
    const [busy, setBusy] = useState(false);

    const go = async () => {
        try {
            setBusy(true);
            const r = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId, mode }),
            });
            const { url } = (await r.json()) as { url?: string };
            if (url) window.location.href = url;
            else setBusy(false);
        } catch {
            setBusy(false);
        }
    };

    return (
        <button className="btn" onClick={go} disabled={busy} aria-busy={busy}>
            {busy ? 'redirecting…' : children}
        </button>
    );
}
