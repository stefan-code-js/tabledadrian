import Image from "next/image";

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
        <footer className="site-footer">
            <div className="container site-footer__inner">
                <p className="site-footer__mark">Table d’Adrian</p>
                <p className="site-footer__tagline">
                    Côte d’Azur atelier for cinematic dining, wellness-driven hospitality, and private members.
                </p>

                <div className="site-footer__meta">
                    <a href={`mailto:${EMAIL}`} className="u-underline">
                        {EMAIL}
                    </a>
                    <span aria-hidden>•</span>
                    <a href={ACC} target="_blank" rel="noreferrer" className="u-underline">
                        accreditation
                    </a>
                    <span aria-hidden>•</span>
                    <a href={IG} target="_blank" rel="noreferrer" className="u-underline">
                        instagram
                    </a>
                    <span aria-hidden>•</span>
                    <a href={LI} target="_blank" rel="noreferrer" className="u-underline">
                        linkedin
                    </a>
                    <span aria-hidden>•</span>
                    <a href={X_URL} target="_blank" rel="noreferrer" className="u-underline">
                        x / threads
                    </a>
                </div>

                <div className="site-footer__logos" aria-label="Partners and platforms">
                    <a href="https://stripe.com" target="_blank" rel="noreferrer" aria-label="Stripe">
                        <Image src="/brands/stripe-4.svg" alt="Stripe" width={88} height={28} />
                    </a>
                    <a href="https://www.ehl.edu" target="_blank" rel="noreferrer" aria-label="EHL">
                        <Image src="/brands/EHL_idlWUemmCk_1.svg" alt="EHL" width={88} height={28} />
                    </a>
                    <a href="https://www.visa.com" target="_blank" rel="noreferrer" aria-label="Visa">
                        <Image src="/brands/visa-10.svg" alt="Visa" width={88} height={28} />
                    </a>
                    <a href="https://www.mastercard.com" target="_blank" rel="noreferrer" aria-label="Mastercard">
                        <Image src="/brands/mastercard-modern-design-.svg" alt="Mastercard" width={88} height={28} />
                    </a>
                    <a href="https://www.gronda.eu" target="_blank" rel="noreferrer" aria-label="Gronda">
                        <Image src="/brands/gronda-seeklogo.svg" alt="Gronda" width={88} height={28} />
                    </a>
                    <a href="https://www.kraken.com" target="_blank" rel="noreferrer" aria-label="Kraken">
                        <Image src="/brands/kraken-4.svg" alt="Kraken" width={88} height={28} />
                    </a>
                </div>

                <p className="site-footer__legal">© 2025 Table d’Adrian. Crafted for the Côte d’Azur.</p>
            </div>
        </footer>
    );
}
