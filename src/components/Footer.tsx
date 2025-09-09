// Server component – clean, centered, compact
export default function Footer() {
    const IG = process.env.INSTAGRAM_PROFILE_URL ?? "https://instagram.com/tabledadrian";
    const LI =
        process.env.LINKEDIN_PROFILE_URL ??
        "https://www.linkedin.com/in/adrian-stefan-badea-82456131b";
    const ACC =
        process.env.ACCREDITATION_URL ??
        "https://eu.badgr.com/public/badges/soyVM0MMRr2r33z69W8oNQ";
    const X_URL = process.env.X_PROFILE_URL ?? "https://x.com";
    const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "adrian@tabledadrian.com";

    return (
        <footer className="footer">
            <div className="container">
                {/* One-line nav: Experience • Accreditation • instagram • linkedin • email */}
                <nav className="footer-navline" aria-label="Footer quick links">
                    <a href={LI} target="_blank" rel="noreferrer" className="u-underline">Experience</a>
                    <span className="footer-bullet">•</span>
                    <a href={ACC} target="_blank" rel="noreferrer" className="u-underline">Accreditation</a>
                    <span className="footer-bullet">•</span>
                    <a href={IG} target="_blank" rel="noreferrer" className="u-underline">instagram</a>
                    <span className="footer-bullet">•</span>
                    <a href={LI} target="_blank" rel="noreferrer" className="u-underline">linkedin</a>
                    <span className="footer-bullet">•</span>
                    <a href={`mailto:${EMAIL}`} className="u-underline">{EMAIL}</a>
                </nav>

                {/* Copyright line */}
                <div className="footer-legal">
                    <small>© 2025 Table d’Adrian</small>
                </div>

                {/* Brand logo strip (colored originals expected in /public/brands) */}
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
        </footer>
    );
}
