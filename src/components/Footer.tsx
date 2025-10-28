"use client";
import Link from "next/link";
import { site } from "@/lib/site";
import { useRef, useEffect } from "react";
import { useCookieConsent } from "@/components/CookieConsent";
import { getLegalNavigation } from "@/lib/legal-docs";

const partners = [
    { name: "Krug", href: "https://www.krug.com" },
    { name: "EHL Alumni", href: "https://www.ehlalumni.com" },
    { name: "La Liste", href: "https://www.laliste.com" },
    { name: "Gronda", href: "https://gronda.eu" },
    { name: "S.Pellegrino", href: "https://www.sanpellegrino.com" },
    { name: "Atelier Basalte", href: "https://atelierbasalte.com" },
    { name: "Bitcoin Network", href: "https://bitcoin.org" },
    { name: "Ethereum Foundation", href: "https://ethereum.org" },
    { name: "Solana Collective", href: "https://solana.com" },
    { name: "Binance Labs", href: "https://www.binance.com" },
];

const socials = [
    { label: "Instagram", href: site.socials.instagram },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Community", href: "/community" },
    { label: "Forum", href: "/forum" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Recipes", href: "/recipes" },
    { label: "Collectibles", href: "/alchemy-collectibles" },
    { label: "Press", href: "/press" },
    { label: "Login", href: "/auth/login" },
    { label: "Register", href: "/auth/register" },
    { label: "Search", href: "/#site-search" },
].filter((item) => Boolean(item.href));

const manifesto =
    "We design quiet hospitality for households that collect memories, not spectacles. Every engagement is documented so perfection can be repeated.";

export default function Footer() {
    const email = site.email;
    const year = new Date().getFullYear();
    const trackRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number | null>(null);
    const paused = useRef(false);
    const { openPreferences } = useCookieConsent();
    const legalLinks = getLegalNavigation();

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let pos = 0;
        const speed = 0.5;
        function step() {
            if (!paused.current && track) {
                pos -= speed;
                if (track.scrollWidth > track.clientWidth && Math.abs(pos) > track.scrollWidth / 2) {
                    pos = 0;
                }
                track.style.transform = `translateX(${pos}px)`;
            }
            animRef.current = window.requestAnimationFrame(step);
        }
        animRef.current = window.requestAnimationFrame(step);
        return () => {
            if (animRef.current) window.cancelAnimationFrame(animRef.current);
        };
    }, []);

    const handlePause = () => { paused.current = true; };
    const handleResume = () => { paused.current = false; };

    return (
        <footer className="site-footer bg-paper-soft text-ink" role="contentinfo" style={{ borderTop: "1px solid var(--line-hairline)", marginTop: "4rem", paddingTop: "2.5rem" }}>
            <div className="site-footer__partners" aria-label="Strategic partners and digital alliances">
                <div
                    className="site-footer__partners-track"
                    ref={trackRef}
                    tabIndex={0}
                    onMouseEnter={handlePause}
                    onMouseLeave={handleResume}
                    onFocus={handlePause}
                    onBlur={handleResume}
                    aria-label="Partner and alliance names auto-scroll; pause on hover or focus"
                    style={{ display: "flex", gap: "2.5rem", willChange: "transform" }}
                >
                    {[...partners, ...partners].map((item, index) => {
                        const key = `${item.name}-${index}`;
                        if (item.href) {
                            return (
                                <a
                                    key={key}
                                    className="site-footer__partner"
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    tabIndex={0}
                                >
                                    {item.name}
                                </a>
                            );
                        }
                        return (
                            <span key={key} className="site-footer__partner" tabIndex={0}>
                                {item.name}
                            </span>
                        );
                    })}
                </div>
            </div>

            <div className="site-footer__grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1.6fr 1fr 1fr", gap: "2.5rem", alignItems: "start", margin: "2.5rem 0" }}>
                <div className="site-footer__col site-footer__col--contact" style={{ color: "var(--color-ink)" }}>
                    <p className="site-footer__wordmark text-lg font-bold mb-2">Table d&apos;Adrian</p>
                    <p className="site-footer__copy mb-1">
                        <Link href={`mailto:${email}`} className="text-accent underline focus-visible:outline-accent">{email}</Link>
                    </p>
                    <p className="site-footer__copy text-ink-soft">Serving {site.serviceArea.join(", ")}</p>
                </div>

                <div className="site-footer__col site-footer__col--manifesto" style={{ color: "var(--color-ink-muted)", textAlign: "center", fontStyle: "italic", fontSize: "1.08rem", lineHeight: 1.6 }}>
                    <p>{manifesto}</p>
                </div>

                <div className="site-footer__col site-footer__col--links" style={{ color: "var(--color-ink)" }}>
                    <span className="site-footer__label font-semibold mb-2 block">Connect</span>
                    <div className="site-footer__link-cards">
                        {socials.map((item) => (
                            <div key={item.label} className="site-footer__link-card">
                                <Link
                                    href={item.href!}
                                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                                    rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                                    className="site-footer__link-anchor"
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="site-footer__col site-footer__col--legal" style={{ color: "var(--color-ink)" }}>
                    <span className="site-footer__label font-semibold mb-2 block">Legal</span>
                    <div className="site-footer__link-cards">
                        {legalLinks.map((link) => (
                            <div key={link.href} className="site-footer__link-card">
                                <Link href={link.href} className="site-footer__link-anchor">
                                    {link.label}
                                </Link>
                            </div>
                        ))}
                        <div className="site-footer__link-card">
                            <Link href="/privacy/requests?type=object" className="site-footer__link-anchor">
                                Do Not Sell or Share My Personal Information
                            </Link>
                        </div>
                        <div className="site-footer__link-card">
                            <button
                                type="button"
                                onClick={openPreferences}
                                className="site-footer__link-anchor site-footer__link-anchor--button"
                            >
                                Cookie preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="site-footer__legal" style={{ color: "var(--color-ink-muted)", fontSize: "0.98rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line-hairline)", paddingTop: "1.2rem", marginTop: "1.2rem" }}>
                <span>&copy; {year} {site.name}</span>
                <Link href="/privacy" className="text-accent underline focus-visible:outline-accent">Privacy Center</Link>
            </div>
        </footer>
    );
}
