"use client";

import { useState } from "react";
import type { PriceKey } from "@/lib/pricing";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

type Props = {
    priceHandle: PriceKey;
    children: React.ReactNode;
};

export default function PayButton({ priceHandle, children }: Props) {
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const go = async () => {
        try {
            setBusy(true);
            setError(null);
            trackEvent(ANALYTICS_EVENTS.bookingCta, { priceHandle });

            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceHandle }),
            });

            const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
            if (!response.ok || !data.url) {
                setError(data.error ?? "Unable to start checkout. Please try again.");
                setBusy(false);
                return;
            }

            trackEvent(ANALYTICS_EVENTS.checkoutSuccess, { priceHandle, redirect: data.url });
            window.location.href = data.url;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unexpected error. Please retry.");
            setBusy(false);
        }
    };

    return (
        <div className="pay-button">
            <button className="btn" onClick={go} disabled={busy} aria-busy={busy}>
                {busy ? "redirecting..." : children}
            </button>
            {error ? (
                <p className="error" role="alert">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
