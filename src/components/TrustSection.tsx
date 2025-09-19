import FAQ from './FAQ';

const trustCopy = [
    'Five-star client ratings and editorial coverage across Europe reaffirm the standard we protect.',
    'Our refund policy stays sensible while sourcing respects seasonality and the people behind each ingredient.',
];

export default function TrustSection() {
    return (
        <section className="section bg-muted">
            <div className="container container--narrow">
                <h2 className="title center-text">Trusted by discerning hosts</h2>
                {trustCopy.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
                <h3 className="subtitle">FAQs</h3>
                <FAQ />
            </div>
        </section>
    );
}
