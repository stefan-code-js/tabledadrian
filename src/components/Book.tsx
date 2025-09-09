'use client';

import Link from 'next/link';
import { site } from '@/lib/site';

const RAW = process.env.NEXT_PUBLIC_CAL_URL ?? 'https://cal.com/adrian-stefan';

function toEmbed(u: string) {
    try {
        const url = new URL(u.replace('www.cal.com', 'cal.com'));
        const parts = url.pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
        // /username  → /embed/username
        // /username/event-slug → /embed/username/event-slug
        if (parts.length === 1) return `https://cal.com/embed/${parts[0]}`;
        if (parts.length >= 2) return `https://cal.com/embed/${parts[0]}/${parts[1]}`;
    } catch { /* noop */ }
    return 'https://cal.com/embed/adrian-stefan';
}

export default function Book() {
    const CAL_URL = RAW;
    const EMBED = toEmbed(RAW);

    return (
        <section className="section" aria-label="Book Table d’Adrian">
            <div className="container container--narrow">
                <div className="prose center-text">
                    <h1 className="title">Book</h1>
                    <p className="lead">
                        Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur.
                        Choose a date and we’ll shape the season to your table.
                    </p>
                    <p style={{ marginTop: 14 }}>
                        <Link href={CAL_URL} className="btn primary" target="_blank" rel="noreferrer">
                            open booking calendar
                        </Link>
                    </p>
                </div>

                <div style={{ marginTop: 24 }}>
                    <iframe
                        title="Booking calendar"
                        src={EMBED}
                        className="embed"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allow="clipboard-write; fullscreen"
                    />
                </div>

                <div className="grid" style={{ marginTop: 24 }}>
                    <article className="card">
                        <h3>what to expect</h3>
                        <p>
                            12–16 courses (Signature). Ingredient-driven menu designed around fragrance,
                            texture, and seasonality. Vegetarian/vegan/gluten-free paths available with notice.
                        </p>
                    </article>
                    <article className="card">
                        <h3>questions</h3>
                        <p>
                            Email <a className="link" href={`mailto:${site.email}`}>{site.email}</a>. For dates beyond Antibes · Cannes · Monaco,
                            include location and guest count.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
