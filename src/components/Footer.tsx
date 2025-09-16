import { site } from "@/lib/site";

// Server component – clean, centered, compact
export default function Footer() {
    const IG =
        process.env.INSTAGRAM_PROFILE_URL ?? site.socials.instagram ?? "https://instagram.com/tabledadrian";
    const LI =
        process.env.LINKEDIN_PROFILE_URL ??
        site.socials.linkedin ??
        "https://www.linkedin.com/in/adrian-stefan-badea-82456131b";
    const ACC = process.env.ACCREDITATION_URL ?? site.accreditationUrl;
    const X_URL = process.env.X_PROFILE_URL ?? "https://x.com";
    const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? site.email;
    const PHONE = process.env.NEXT_PUBLIC_CONCIERGE_PHONE ?? site.telephone;

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-wrap">
                    <p className="footer-tagline">
                        Michelin-trained private chef and pharmacist-led concierge shaping villas, yachts, and
                        salons across the Côte d’Azur.
                    </p>

                    <div className="footer-columns" role="presentation">
                        <div className="footer-column">
                            <p className="footer-heading">Concierge</p>
                            <ul className="footer-list">
                                <li>
                                    <a className="footer-link" href={`mailto:${EMAIL}`}>
                                        {EMAIL}
                                    </a>
                                </li>
                                {PHONE ? (
                                    <li>
                                        <a className="footer-link" href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}>
                                            {PHONE}
                                        </a>
                                    </li>
                                ) : null}
                                <li>
                                    <a className="footer-link" href={IG} target="_blank" rel="noreferrer">
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a className="footer-link" href={LI} target="_blank" rel="noreferrer">
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <p className="footer-heading">Service area</p>
                            <ul className="footer-list">
                                {site.serviceArea.map((area) => (
                                    <li key={area}>{area}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="footer-column">
                            <p className="footer-heading">Signature offerings</p>
                            <ul className="footer-list">
                                {site.offerings.map((offering) => (
                                    <li key={offering}>{offering}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <p className="footer-note">
                        Accredited hospitality partners ·{" "}
                        {ACC ? (
                            <a className="footer-link" href={ACC} target="_blank" rel="noreferrer">
                                view certification
                            </a>
                        ) : (
                            "operating to EHL standards"
                        )}
                    </p>

                    <div className="footer-legal">
                        <small>
                            © {new Date().getFullYear()} Table d’Adrian · {site.serviceArea.join(" · ")}
                        </small>
                    </div>

                    <div className="footer-logos" aria-label="Partners and platforms">
                        <a href={IG} target="_blank" rel="noreferrer" aria-label="Instagram">
                            <img src="/brands/instagram-2016-5.svg" alt="Instagram" />
                        </a>
                        <a href={LI} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <img src="/brands/linkedin-logo-icon_svgstack_com_3961757457128.svg" alt="LinkedIn" />
                        </a>
                        <a href="https://stripe.com" target="_blank" rel="noreferrer" aria-label="Stripe">
                            <img src="/brands/stripe-4.svg" alt="Stripe" />
                        </a>
                        <a href="https://www.ehl.edu" target="_blank" rel="noreferrer" aria-label="EHL">
                            <img src="/brands/EHL_idlWUemmCk_1.svg" alt="EHL" />
                        </a>
                        <a href="https://www.visa.com" target="_blank" rel="noreferrer" aria-label="Visa">
                            <img src="/brands/visa-10.svg" alt="Visa" />
                        </a>
                        <a href="https://www.mastercard.com" target="_blank" rel="noreferrer" aria-label="Mastercard">
                            <img src="/brands/mastercard-modern-design-.svg" alt="Mastercard" />
                        </a>
                        <a href="https://www.gronda.eu" target="_blank" rel="noreferrer" aria-label="Gronda">
                            <img src="/brands/gronda-seeklogo.svg" alt="Gronda" />
                        </a>
                        <a href={X_URL} target="_blank" rel="noreferrer" aria-label="X">
                            <img src="/brands/x-2.svg" alt="X" />
                        </a>
                        <a href="https://www.kraken.com" target="_blank" rel="noreferrer" aria-label="Kraken">
                            <img src="/brands/kraken-4.svg" alt="Kraken" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
