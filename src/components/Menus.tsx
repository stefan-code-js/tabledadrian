'use client';

import Link from 'next/link';

const Icon = {
    Users: (props: React.SVGProps<SVGSVGElement>) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 3.13a3 3 0 0 1 0 5.75" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    Clock: (props: React.SVGProps<SVGSVGElement>) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    ),
    Chevron: (props: React.SVGProps<SVGSVGElement>) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
};

export default function Menus() {
    return (
        <section className="section menu" id="menu">
            <div className="container">
                <div className="prose center-text">
                    <h1 className="title">Menus</h1>
                    <p className="sub">Fixed offerings — precise pacing, calm service, ingredient-driven cuisine.</p>
                </div>

                <div className="grid-3" style={{ marginTop: 24 }}>
                    <article className="card">
                        <h3>Signature Tasting</h3>
                        <p><Icon.Users /> 6–12 guests · <Icon.Clock /> ~3 hours</p>
                        <p>Six courses of haute cuisine: clarified broths, cultured creams, warm acidity.</p>
                        <p><strong>From €180 per guest</strong></p>
                        <Link href="/book" className="btn" aria-label="Enquire about the Signature Tasting">
                            Enquire <Icon.Chevron style={{ marginLeft: 6 }} />
                        </Link>
                    </article>

                    <article className="card">
                        <h3>Performance Dinner</h3>
                        <p><Icon.Users /> 6–10 guests · <Icon.Clock /> ~2.5 hours</p>
                        <p>Longevity-minded arc: ferments, clean carbohydrates, aromatic pairings; light yet complete.</p>
                        <p><strong>From €220 per guest</strong></p>
                        <Link href="/book" className="btn" aria-label="Enquire about the Performance Dinner">
                            Enquire <Icon.Chevron style={{ marginLeft: 6 }} />
                        </Link>
                    </article>

                    <article className="card">
                        <h3>Salon Supper</h3>
                        <p><Icon.Users /> 8–16 guests · <Icon.Clock /> ~2 hours</p>
                        <p>Refined family-style platters for intimate salons. Abundant, shareable, quietly opulent.</p>
                        <p><strong>From €120 per guest</strong></p>
                        <Link href="/book" className="btn" aria-label="Enquire about the Salon Supper">
                            Enquire <Icon.Chevron style={{ marginLeft: 6 }} />
                        </Link>
                    </article>
                </div>

                <p className="menu-note prose" style={{ marginTop: 24 }}>
                    Dietary notes: omnivore by default; vegetarian, vegan, and gluten-free paths available with notice (72h+).
                    We design around fragrance, texture, and seasonality; final compositions may vary.
                </p>
            </div>
        </section>
    );
}
