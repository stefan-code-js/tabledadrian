import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
    title: "Thank you · Table d’Adrian",
    robots: { index: false },
};

import { getOrder } from "@/lib/orders";

async function fetchStripeSummary(sessionId: string) {
    if (!process.env.STRIPE_SECRET_KEY) return null;
    try {
        const response = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
            headers: {
                Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            },
            cache: "no-store",
        });
        if (!response.ok) return null;
        return (await response.json()) as { amount_total?: number; currency?: string };
    } catch {
        return null;
    }
}

type SuccessPageProps = {
    searchParams?: Promise<Record<string, string | string[]>>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
    const resolved = searchParams ? await searchParams : undefined;
    const rawSession = resolved?.session_id;
    const sessionIdValue = Array.isArray(rawSession) ? rawSession[0] : rawSession;
    const sessionId = sessionIdValue ?? undefined;
    const localOrder = sessionId ? getOrder(sessionId) : undefined;
    const stripe = sessionId && !localOrder ? await fetchStripeSummary(sessionId) : null;

    const amount = stripe?.amount_total ? (stripe.amount_total / 100).toLocaleString("en-GB") : undefined;
    const currency = stripe?.currency?.toUpperCase();

    return (
        <section className="section">
            <div className="container container--narrow center-text prose">
                <h1 className="section-title">Merci — we’ll be in touch</h1>
                {localOrder ? (
                    <p className="lead">Order {localOrder.priceId} confirmed.</p>
                ) : amount && currency ? (
                    <p className="lead">Payment of {currency} {amount} confirmed.</p>
                ) : (
                    <p className="lead">Your payment was received. You’ll get an email with intake & scheduling within minutes.</p>
                )}
                <p className="muted">
                    If it doesn’t arrive, write to <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>.
                </p>
            </div>
        </section>
    );
}
