import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Payment canceled · Table d\u2019Adrian',
    robots: { index: false },
    alternates: { canonical: '/cancel' },
};

export default function CancelPage() {
    return (
        <section className="section">
            <div className="container container--narrow center-text prose">
                <h1 className="section-title">Payment canceled</h1>
                <p className="lead">No charges were made. You can return to our offerings at any time.</p>
            </div>
        </section>
    );
}
