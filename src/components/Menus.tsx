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
                    {/* Card 1 */}
                    <article className="card menu-card">
                        <h3 className="menu-title">Signature tasting</h3>

                        <p className="menu-meta">
                            <span className="meta-item"><Icon.Users /> 6–12 guests</span>
                            <span className="meta-sep">·</span>
                            <span className="meta-item"><Icon.Clock /> ~3 hours</span>
                        </p>

                        <p className="menu-desc">
                            Six courses of haute cuisine: clarified broths, cultured creams, warm acidity.
                        </p>

                        <div className="menu-bottom">
                            <p className="menu-price"><strong>Proposal provided after consult</strong></p>
                            <Link href="/book" className="btn" aria-label="Enquire about the Signature tasting">
                                Enquire <Icon.Chevron style={{ marginLeft: 6 }} />
                            </Link>
                        </div>
                    </article>

                    {/* Card 2 */}
                    <article className="card menu-card">
                        <h3 className="menu-title">Performance dinner</h3>

                        <p className="menu-meta">
                            <span className="meta-item"><Icon.Users /> 6–10 guests</span>
                            <span className="meta-sep">·</span>
                            <span className="meta-item"><Icon.Clock /> ~2.5 hours</span>
                        </p>

                        <p className="menu-desc">
                            Longevity-minded arc: ferments, clean carbohydrates, aromatic pairings; light yet complete.
                        </p>

                        <div className="menu-bottom">
                            <p className="menu-price"><strong>Pricing confirmed in brief</strong></p>
                            <Link href="/book" className="btn" aria-label="Enquire about the Performance dinner">
                                Enquire <Icon.Chevron style={{ marginLeft: 6 }} />
                            </Link>
                        </div>
                    </article>

                    {/* Card 3 */}
                    <article className="card menu-card">
                        <h3 className="menu-title">Salon supper</h3>

                        <p className="menu-meta">
                            <span className="meta-item"><Icon.Users /> 8–16 guests</span>
                            <span className="meta-sep">·</span>
                            <span className="meta-item"><Icon.Clock /> ~2 hours</span>
                        </p>

                        <p className="menu-desc">
                            Refined family-style platters for intimate salons. Abundant, shareable, quietly opulent.
                        </p>

                        <div className="menu-bottom">
                            <p className="menu-price"><strong>Investment shared case-by-case</strong></p>
                            <Link href="/book" className="btn" aria-label="Enquire about the Salon supper">
                                Enquire <Icon.Chevron style={{ marginLeft: 6 }} />
                            </Link>
                        </div>
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
