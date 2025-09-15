import FAQ from './FAQ';

const reasons = [
    'Five-star client ratings',
    'Press features across Europe',
    'Sensible refund policy',
    'Sourcing that respects seasonality',
];

export default function TrustSection() {
    return (
        <section className="section bg-muted">
            <div className="container container--narrow">
                <h2 className="title center-text">Trusted by discerning hosts</h2>
                <ul className="list-disc pl-5 mb-8">
                    {reasons.map((r) => (
                        <li key={r}>{r}</li>
                    ))}
                </ul>
                <h3 className="subtitle">FAQs</h3>
                <FAQ />
            </div>
        </section>
    );
}
