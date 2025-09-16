import Link from "next/link";
import Image from "next/image";
import { footerLinks } from "@/data/siteContent";

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
                {/* One-line nav for site sections */}
                <nav className="footer-navline" aria-label="Footer quick links">
                    {footerLinks.map((link, index) => (
                        <span key={link.href} className="footer-link">
                            <Link href={link.href} className="u-underline">
                                {link.label}
                            </Link>
                            {index < footerLinks.length - 1 ? <span className="footer-bullet">•</span> : null}
                        </span>
                    ))}
                </nav>

                <nav className="footer-navline" aria-label="External references">
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
                        <Image src="/brands/instagram-2016-5.svg" alt="Instagram" width={80} height={24} />
                    </a>
                    <a href={LI} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <Image
                            src="/brands/linkedin-logo-icon_svgstack_com_3961757457128.svg"
                            alt="LinkedIn"
                            width={80}
                            height={24}
                        />
                    </a>
                    <a href="https://stripe.com" target="_blank" rel="noreferrer" aria-label="Stripe">
                        <Image src="/brands/stripe-4.svg" alt="Stripe" width={80} height={24} />
                    </a>
                    <a href="https://www.ehl.edu" target="_blank" rel="noreferrer" aria-label="EHL">
                        <Image src="/brands/EHL_idlWUemmCk_1.svg" alt="EHL" width={80} height={24} />
                    </a>
                    <a href="https://www.visa.com" target="_blank" rel="noreferrer" aria-label="Visa">
                        <Image src="/brands/visa-10.svg" alt="Visa" width={80} height={24} />
                    </a>
                    <a href="https://www.mastercard.com" target="_blank" rel="noreferrer" aria-label="Mastercard">
                        <Image src="/brands/mastercard-modern-design-.svg" alt="Mastercard" width={80} height={24} />
                    </a>
                    <a href="https://www.gronda.eu" target="_blank" rel="noreferrer" aria-label="Gronda">
                        <Image src="/brands/gronda-seeklogo.svg" alt="Gronda" width={80} height={24} />
                    </a>
                    <a href={X_URL} target="_blank" rel="noreferrer" aria-label="X">
                        <Image src="/brands/x-2.svg" alt="X" width={80} height={24} />
                    </a>
                    <a href="https://www.kraken.com" target="_blank" rel="noreferrer" aria-label="Kraken">
                        <Image src="/brands/kraken-4.svg" alt="Kraken" width={80} height={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
