import FAQ from './FAQ';

const trustCopy = [
    'Five-star client ratings and editorial coverage across Europe reaffirm the standard we protect.',
    'Our refund policy stays sensible while sourcing respects seasonality and the people behind each ingredient.',
];

export default function TrustSection() {
    return (
        <section className="section bg-paper-soft">
            <div className="container container--narrow">
                <FAQ />
            </div>
        </section>
    );
}
