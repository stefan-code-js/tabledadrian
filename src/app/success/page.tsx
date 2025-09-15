import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thank you · Table d’Adrian',
    robots: { index: false },
};

import { getOrder } from '@/lib/orders';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
    const params = await searchParams;
    const order = params.session_id ? getOrder(params.session_id) : undefined;
    return (
        <section className="section">
            <div className="container container--narrow center-text prose">
                <h1 className="section-title">Merci — we’ll be in touch</h1>
                {order ? (
                    <p className="lead">Order {order.priceId} confirmed.</p>
                ) : (
                    <p className="lead">Your payment was received. You’ll get an email with intake & scheduling within minutes.</p>
                )}
                <p className="muted">If it doesn’t arrive, write to <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>.</p>
            </div>
        </section>
    );
}
