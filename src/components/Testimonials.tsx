// src/components/Testimonials.tsx
export default function Testimonials() {
    const quotes = [
        {
            q: "Precision that reads like poetry. Aroma leads; texture stays.",
            c: "villa host — cap d’antibes",
        },
        {
            q: "Service that disappears. Plates that arrive like small rituals.",
            c: "yacht charter — cannes",
        },
        {
            q: "A menu that remembers the landscape and the sea in equal measure.",
            c: "private salon — monaco",
        },
    ];

    return (
        <div className="quotes">
            <section className="section" aria-labelledby="testimonials-title">
                <div className="container">
                    <h2 id="testimonials-title" className="section-title center-text">Testimonials</h2>
            {quotes.map((x, i) => (
                <blockquote key={i} className="quote card">
                    <p>“{x.q}”</p>
                    <cite>— {x.c}</cite>
                </blockquote>
            ))}
                </div>
            </section>
        </div>
    );
}
