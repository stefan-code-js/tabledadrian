import type { Metadata } from 'next';
import PayButton from '@/components/PayButton';
import { priceCatalog } from '@/data/siteContent';

export const metadata: Metadata = {
    title: 'Membership',
    description:
        'Member programs by Antonia (PharmD) & Adrian (private chef). Quarterly to premier plans with pharmacist oversight, menu systems, and hosted dinners.',
    alternates: { canonical: '/membership' },
};

export default function MembershipPage() {
    // Stripe Price IDs (subscriptions)
    const PRICES = {
        essential: priceCatalog.membershipEssential.id,
        studio: priceCatalog.membershipStudio.id,
        patron: priceCatalog.membershipPatron.id,
    };

    return (
        <section className="section membership-page">
            <div className="container container--narrow prose">

                {/* Intro */}
                <header className="center-text">
                    <p className="kicker">membership · pharmacist & chef</p>
                    <h1 className="title">Membership</h1>
                    <p className="lead">
                        Designed for leaders who protect energy and attention. Antonia (PharmD)
                        translates medical goals into daily systems; Adrian engineers the food,
                        mise, and menus your team can repeat. Membership adds continuity,
                        hosted dinners, and priority access.
                    </p>
                </header>

                {/* Top row: two wide informational cards */}
                <div className="member-grid top" style={{ marginTop: 18 }}>
                    <article className="lux-card reveal">
                        <h2 className="lux-h">What members receive</h2>
                        <div className="lux-body">
                            <ul className="lux-list">
                                <li>Pharmacist oversight for routines & sensible lab cadence</li>
                                <li>Seasonal menu systems & mise charts your staff can follow</li>
                                <li>Priority access for dates, revisions, and hosted dinners</li>
                                <li>Clear documentation so standards hold when you’re busy</li>
                                <li>Discreet coordination with your home team as needed</li>
                            </ul>
                        </div>
                    </article>

                    <article className="lux-card reveal">
                        <h2 className="lux-h">How membership works</h2>
                        <div className="lux-body">
                            <ol className="lux-steps">
                                <li>Annual or quarterly cycle with pharmacist–chef leadership</li>
                                <li>Kickoff review + menu book aligned to your targets</li>
                                <li>Monthly/weekly adjustments based on how you feel & labs</li>
                                <li>Hosted dinners included per plan; dates booked by request</li>
                                <li>Everything documented so your team can repeat it well</li>
                            </ol>
                        </div>
                    </article>
                </div>

                {/* Tiers: three aligned cards with pinned CTA/price */}
                <div className="member-grid tiers">
                    {/* Essential */}
                    <article className="lux-card reveal">
                        <h2 className="lux-h">Essential</h2>
                        <div className="lux-body">
                            <p className="lux-price">€650 / month</p>
                            <ul className="lux-list">
                                <li>Quarterly pharmacist review & culinary rewrite</li>
                                <li>Seasonal menu book + grocery & mise standards</li>
                                <li>2 hosted dinners / year (home, up to 10 guests)</li>
                                <li>Priority booking window (7 days)</li>
                                <li>Private message line (business hours)</li>
                            </ul>
                            <details className="lux-details">
                                <summary>Who it’s for</summary>
                                <p>
                                    Busy founders & professionals who want continuity, two elegant
                                    dinners each year, and a system that stays stable when the week
                                    gets loud.
                                </p>
                            </details>
                        </div>
                        <div className="lux-cta">
                            <PayButton priceId={PRICES.essential} mode="subscription">
                                join essential
                            </PayButton>
                        </div>
                    </article>

                    {/* Studio */}
                    <article className="lux-card reveal">
                        <h2 className="lux-h">Studio</h2>
                        <div className="lux-body">
                            <p className="lux-price">€1,350 / month</p>
                            <ul className="lux-list">
                                <li>Monthly pharmacist check-in & menu refinement</li>
                                <li>Expanded menu library & pantry audits</li>
                                <li>Up to 18 hosted dinners / year (curated gatherings)</li>
                                <li>Priority booking window (14 days)</li>
                                <li>Signal/WhatsApp line with 24-hour response</li>
                            </ul>
                            <details className="lux-details">
                                <summary>Signature value</summary>
                                <p>
                                    A standing cadence and meaningful hospitality. You’ll always
                                    have a dinner on the calendar, menus evolve with you, and the
                                    household runs smoother every quarter.
                                </p>
                            </details>
                        </div>
                        <div className="lux-cta">
                            <PayButton priceId={PRICES.studio} mode="subscription">
                                join studio
                            </PayButton>
                        </div>
                    </article>

                    {/* Patron */}
                    <article className="lux-card reveal">
                        <h2 className="lux-h">Patron</h2>
                        <div className="lux-body">
                            <p className="lux-price">€3,500 / month</p>
                            <ul className="lux-list">
                                <li>Weekly pharmacist/chef touchpoint & rapid refinements</li>
                                <li>Executive menu book with unlimited revisions</li>
                                <li>Up to 50 hosted dinners / year (intimate to celebratory)</li>
                                <li>Priority booking window (30 days) & first holds</li>
                                <li>On-call line (6-hour response); discreet coordination</li>
                            </ul>
                            <details className="lux-details">
                                <summary>For high-output seasons</summary>
                                <p>
                                    When the calendar is relentless, we maintain standards,
                                    manage momentum, and keep joy in the room. Your routine and
                                    your tables become an asset to performance.
                                </p>
                            </details>
                        </div>
                        <div className="lux-cta">
                            <PayButton priceId={PRICES.patron} mode="subscription">
                                join patron
                            </PayButton>
                        </div>
                    </article>
                </div>

                {/* FAQ (wide) */}
                <section className="membership-faq reveal">
                    <h2 className="lux-h">FAQs</h2>

                    <details className="lux-details">
                        <summary>Are hosted dinners truly included?</summary>
                        <p>
                            Yes—each plan includes the stated number of hosted dinners per
                            membership year. Dates are subject to availability and booked via
                            your priority window. Groceries/wine are billed at cost if you
                            request rare products.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>Is membership a medical service?</summary>
                        <p>
                            Membership is lifestyle & culinary consulting with pharmacist
                            oversight. It does not replace your physician. Any medical
                            decisions are made with your doctor; we coordinate where helpful.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>Can we pause or upgrade mid-year?</summary>
                        <p>
                            You can upgrade at any time; the difference is prorated. Pauses
                            are available for travel or life events—unused hosted dinners roll
                            forward within the same year whenever possible.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>How far ahead should we book?</summary>
                        <p>
                            Essential has a 7-day priority window, Studio 14-day, and Patron
                            30-day with first holds. We recommend reserving your recurring
                            evenings each quarter for smooth planning.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>Do you support dietary constraints?</summary>
                        <p>
                            Yes. We design elegant, repeatable menus for FODMAP, histamine,
                            lipid-sensitive, and gluten-free patterns—without food anxiety.
                        </p>
                    </details>
                </section>
            </div>
        </section>
    );
}
