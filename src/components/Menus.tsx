import Link from "next/link";

const menus = [
    {
        id: "signature",
        title: "Signature tasting",
        summary:
            "Twelve courses written for villas and salons. Aroma-led aperitif through warm, composed desserts with seamless pacing.",
        body: [
            "Clarified broths, cultured creams, and charcoal-kissed mains move quietly so conversation leads while the experience feels precise.",
            "Crew manages rentals, lighting, and discreet resets. Documentation stays behind so your household can repeat the rhythm when we depart.",
        ],
        note: "Best for 6–12 guests · deposit confirms date",
    },
    {
        id: "performance",
        title: "Performance dinner",
        summary:
            "Pharmacist and chef design a longevity-minded arc that protects cognition and energy without sacrificing joy.",
        body: [
            "Ferments, luminous carbohydrates, and measured protein keep guests buoyant. Service includes supplementation guidance and pantry prep for the next day.",
            "Ideal for leadership teams balancing demanding calendars with disciplined nutrition cues.",
        ],
        note: "Best for 6–10 guests · includes intake with Antonia",
    },
    {
        id: "salon",
        title: "Salon supper",
        summary:
            "Family-style ritual for conversations that stretch late. Warm abundance, refined plating, and attentive pacing.",
        body: [
            "Seasonal platters arrive in waves with quiet annotations from the crew. Wine pairing and florals are coordinated as required.",
            "Designed for private galleries and penthouse salons where ease matters more than theatre.",
        ],
        note: "Best for 8–16 guests · documentation for household crew provided",
    },
];

export default function Menus() {
    return (
        <section className="editorial-section" id="menu">
            <div className="editorial-container">
                <div className="section-heading">
                    <h2>Menus</h2>
                    <p>
                        Every service is choreographed for the venue. Choose the arc that fits your guests, then we tailor the
                        menu after a private intake.
                    </p>
                </div>
                <div className="two-column">
                    {menus.map((menu) => (
                        <article key={menu.id} className="narrative-block">
                            <h3>{menu.title}</h3>
                            <p>{menu.summary}</p>
                            {menu.body.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                            <p className="muted small">{menu.note}</p>
                            <div className="cta-row">
                                <Link className="btn" href="/book">
                                    request a booking
                                </Link>
                                <Link className="btn ghost" href="/membership">
                                    explore membership
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
                <p className="muted note">
                    Looking for a longer cadence? Membership locks in hosted dinners and pharmacist oversight across the
                    season.
                </p>
            </div>
            <hr className="separator" />
        </section>
    );
}
