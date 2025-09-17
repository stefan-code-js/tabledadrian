'use client';

import Link from 'next/link';
import Script from 'next/script';
import { site } from '@/lib/site';

/**
 * Use a Cal "link", not a dashboard URL.
 * Examples:
 *   adrian-stefan                         → profile (all event types)
 *   adrian-stefan/signature-tasting      → a single event
 *
 * Set this in .env.local and Cloudflare Pages → Environment Variables:
 *   NEXT_PUBLIC_CAL_LINK=adrian-stefan
 */
const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK || 'adrian-stefan';

export default function Book() {
    const publicUrl = `https://cal.com/${CAL_LINK}`;

    return (
        <section className="section" aria-label="Book Table d’Adrian">
            {/* Cal embed script (loads once, safe to keep here) */}
            <Script src="https://cal.com/embed.js" strategy="lazyOnload" />

            <div className="container container--narrow">
                <div className="prose center-text">
                    <h1 className="title">Book</h1>
                    <p className="lead">
                        Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur.
                        Choose a date and we’ll shape the season to your table.
                    </p>

                    <p style={{ marginTop: 14 }}>
                        <Link href={publicUrl} className="btn btn--primary" target="_blank" rel="noreferrer">
                            open booking calendar
                        </Link>
                    </p>
                </div>

                {/* Inline Cal profile/event. If your link exists, this will not 404. */}
                <div className="cal-wrapper" style={{ marginTop: 24 }}>
                    {/* React passes attributes through to custom elements; kebab-case is correct. */}
                    {/* @ts-expect-error: web component not in TS JSX types */}
                    <cal-inline cal-link={CAL_LINK} class="cal-inline"></cal-inline>
                    <noscript>
                        <p>
                            JavaScript is required to load the calendar. Open it{' '}
                            <a className="link" href={publicUrl} rel="noreferrer" target="_blank">here</a>.
                        </p>
                    </noscript>
                </div>

                <div className="grid" style={{ marginTop: 24 }}>
                    <article className="card">
                        <h3>what to expect</h3>
                        <p>
                            12–16 courses (Signature). Ingredient-driven menu designed around fragrance, texture, and seasonality.
                            Vegetarian/vegan/gluten-free paths available with notice.
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
