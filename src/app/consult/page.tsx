import type { Metadata } from 'next';
import PayButton from '@/components/PayButton';
import { priceCatalog } from '@/data/siteContent';

export const metadata: Metadata = {
    title: 'Consult',
    description:
        'Pharmacist-led wellness and private-chef consulting by Antonia & Adrian. From focused intakes to 12-week concierge seasons for villas and yachts.',
    alternates: { canonical: '/consult' },
};

export default function ConsultPage() {
    const PRICES = {
        intake90: priceCatalog.consultIntake90.id,
        reset4w: priceCatalog.reset4Week.id,
        concierge12w: priceCatalog.concierge12Week.id,
    };

    return (
        <section className="section consult-page">
            <div className="container container--narrow prose">

                {/* Intro */}
                <header className="center-text">
                    <p className="kicker">pharmacist-led · chef-driven</p>
                    <h1 className="title">Private Wellness & Culinary Consult</h1>
                    <p className="lead">
                        Antonia (clinical pharmacist) and Adrian (private chef) build
                        systems that protect energy, cognition, and joy—at home, on charter,
                        and in your villas. Clear steps, measured feedback, beautiful food.
                    </p>
                </header>

                {/* ── Top row: What we solve / How it works ───────────────────────── */}
                <div className="consult-grid top" style={{ marginTop: 18 }}>
                    <article className="lux-card reveal">
                        <h2 className="lux-h">What we solve</h2>
                        <div className="lux-body">
                            <ul className="lux-list">
                                <li>Post-meal fatigue, reactive snacking, poor sleep</li>
                                <li>Glycemic volatility & lipid risk without food anxiety</li>
                                <li>GI sensitivities (FODMAP, histamine) made livable</li>
                                <li>Travel & hosting routines that keep you steady</li>
                                <li>Staff/crew training so standards hold when you’re away</li>
                            </ul>
                        </div>
                    </article>

                    <article className="lux-card reveal" style={{ ['--d' as any]: '80ms' }}>
                        <h2 className="lux-h">How it works</h2>
                        <div className="lux-body">
                            <ol className="lux-steps">
                                <li>90-minute intake (Antonia) + culinary mapping (Adrian)</li>
                                <li>Kitchen mise, grocery standards, menu rhythm</li>
                                <li>Weekly adjustments; light labs with your physician</li>
                                <li>Teach your team: provisioning, prep lists, service flow</li>
                                <li>Refine and document—so the system survives busy weeks</li>
                            </ol>
                        </div>
                    </article>
                </div>

                {/* ── Second row: three service tiers, aligned CTAs ───────────────── */}
                <div className="consult-grid tiers">
                    {/* 90-minute intake */}
                    <article className="lux-card reveal">
                        <h2 className="lux-h">90-Minute Intake</h2>
                        <div className="lux-body">
                            <p className="lux-price">€650</p>
                            <ul className="lux-list">
                                <li>Medical & lifestyle review with Antonia (PharmD)</li>
                                <li>Food history & tolerances; supplement sanity check</li>
                                <li>Initial culinary plan + mise & grocery framework</li>
                            </ul>
                            <details className="lux-details">
                                <summary>How it works</summary>
                                <p>
                                    Video session (or on-site with service). You receive a precise
                                    one-pager—kitchen setup, menu rhythm, and measurable next
                                    steps to de-stress daily eating.
                                </p>
                            </details>
                        </div>
                        <div className="lux-cta">
                            <PayButton priceId={PRICES.intake90} mode="payment">
                                reserve consult
                            </PayButton>
                        </div>
                    </article>

                    {/* 4-Week Reset */}
                    <article className="lux-card reveal" style={{ ['--d' as any]: '60ms' }}>
                        <h2 className="lux-h">4-Week Reset</h2>
                        <div className="lux-body">
                            <p className="lux-price">€2,400</p>
                            <ul className="lux-list">
                                <li>Intake + weekly check-ins (Antonia & Adrian)</li>
                                <li>Chef playbook: stocks, sauces, dressings, condiments</li>
                                <li>Breakfast/lunch/dinner frameworks crew can repeat</li>
                                <li>Optional CGM coaching; pragmatic, not obsessive</li>
                            </ul>
                            <details className="lux-details">
                                <summary>What you receive</summary>
                                <p>
                                    A living kit: shopping lists, mise charts, and seasonal menus
                                    aligned to lab trends and how you feel. The goal is fluency,
                                    not restriction.
                                </p>
                            </details>
                        </div>
                        <div className="lux-cta">
                            <PayButton priceId={PRICES.reset4w} mode="payment">
                                start 4-week reset
                            </PayButton>
                        </div>
                    </article>

                    {/* 12-Week Concierge */}
                    <article className="lux-card reveal" style={{ ['--d' as any]: '120ms' }}>
                        <h2 className="lux-h">12-Week Concierge</h2>
                        <div className="lux-body">
                            <p className="lux-price">€7,500</p>
                            <ul className="lux-list">
                                <li>Physician coordination & sensible lab cadence</li>
                                <li>Villa/yacht provisioning & crew training</li>
                                <li>On-call adjustments through travel & hosting</li>
                                <li>Seasonal menu book tailored to your properties</li>
                            </ul>
                            <details className="lux-details">
                                <summary>Scope & logistics</summary>
                                <p>
                                    Bespoke season management with discreet coordination across
                                    physicians, captains, and staff. We set standards, coach
                                    teams, and keep the system steady as your calendar moves.
                                </p>
                            </details>
                        </div>
                        <div className="lux-cta">
                            <PayButton priceId={PRICES.concierge12w} mode="payment">
                                begin concierge
                            </PayButton>
                        </div>
                    </article>
                </div>

                {/* ── FAQ (wide; matches card width) ─────────────────────────────── */}
                <section className="consult-faq reveal">
                    <h2 className="lux-h">FAQs</h2>

                    <details className="lux-details">
                        <summary>Is pharmacist input useful if I already have a doctor?</summary>
                        <p>
                            Yes. Antonia complements your physician by translating medical
                            goals into daily systems, screening interactions, and proposing a
                            sensible lab cadence to discuss with your doctor. You always
                            remain under your physician’s care.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>Do I need a CGM?</summary>
                        <p>
                            Not required. When used, we apply it short-term to learn your
                            personal response and build a routine you can live with—no gadgets
                            necessary long-term.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>Remote or on-site?</summary>
                        <p>
                            Intakes and resets run beautifully via video. Concierge work is
                            hybrid with on-site periods for provisioning, crew coaching, and
                            service standards across villas or charters.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>Can you train our household or yacht crew?</summary>
                        <p>
                            Yes. We document prep lists, station setup, and service flow, then
                            train to that standard. The aim is consistency when you’re not in
                            the room.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>What about supplements and interactions?</summary>
                        <p>
                            Antonia provides pragmatic guidance and checks interactions. Any
                            changes are coordinated with your physician; we avoid the “supplement
                            drawer” problem.
                        </p>
                    </details>

                    <details className="lux-details">
                        <summary>Do you handle special diets?</summary>
                        <p>
                            We make FODMAP, histamine, or lipid-focused patterns elegant and
                            repeatable without food anxiety—grounded in clinical sense and
                            excellent cooking.
                        </p>
                    </details>
                </section>
            </div>
        </section>
    );
}
