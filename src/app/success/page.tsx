import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Thank you · Table d’Adrian',
    robots: { index: false },
};

export default function SuccessPage() {
    return (
        <section className="section">
            <div className="container container--narrow center-text prose">
                <h1 className="section-title">Merci — we’ll be in touch</h1>
                <p className="lead">
                    Your payment was received. You’ll get an email with intake & scheduling within minutes.
                </p>
                <p className="muted">If it doesn’t arrive, write to <a href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>.</p>
            </div>
        </section>
    );
}
