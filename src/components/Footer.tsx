"use client";
import Link from "next/link";
import { site } from "@/lib/site";
import { useRef, useEffect } from "react";

const partners = [
    { name: "Krug", href: "https://www.krug.com" },
    { name: "EHL Alumni", href: "https://www.ehlalumni.com" },
    { name: "La Liste", href: "https://www.laliste.com" },
    { name: "Gronda", href: "https://gronda.eu" },
    { name: "S.Pellegrino", href: "https://www.sanpellegrino.com" },
    { name: "Atelier Basalte", href: "https://atelierbasalte.com" },
];

const socials = [
    { label: "Instagram", href: site.socials.instagram },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Press", href: "/press" },
].filter((item) => Boolean(item.href));

const manifesto =
    "We design quiet hospitality for households that collect memories, not spectacles. Every engagement is documented so perfection can be repeated.";

export default function Footer() {
    const email = site.email;
    const year = new Date().getFullYear();
    const trackRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number | null>(null);
    const paused = useRef(false);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        let pos = 0;
        const speed = 0.5; // px per frame
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
        <footer className="bg-cream-soft text-ink mt-space-7 pt-space-5 border-t border-ink-muted/20" role="contentinfo">
            <div className="overflow-hidden mx-gutter mb-space-5 rounded-md bg-ink/5" aria-label="Selected partners and collaborators">
                <div
                    className="flex gap-space-4 w-max p-space-2"
                    ref={trackRef}
                    tabIndex={0}
                    onMouseEnter={handlePause}
                    onMouseLeave={handleResume}
                    onFocus={handlePause}
                    onBlur={handleResume}
                    aria-label="Partner logos auto-scroll; pause on hover or focus"
                    style={{ willChange: 'transform' }}
                >
                    {[...partners, ...partners].map((item, index) => {
                        const key = `${item.name}-${index}`;
                        if (item.href) {
                            return (
                                <a
                                    key={key}
                                    className="font-serif tracking-widest uppercase text-sm text-ink-muted whitespace-nowrap transition-colors duration-150 ease-in-out hover:text-forest focus-visible:text-forest outline-none"
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
                            <span key={key} className="font-serif tracking-widest uppercase text-sm text-ink-muted whitespace-nowrap" tabIndex={0}>
                                {item.name}
                            </span>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-5 items-start max-w-measure mx-auto px-gutter my-space-5">
                <div className="text-ink">
                    <p className="font-serif text-fluid-lg tracking-wider uppercase mb-space-2">Table d'Adrian</p>
                    <p className="mb-space-1">
                        <Link href={`mailto:${email}`} className="text-accent underline focus-visible:outline-accent">{email}</Link>
                    </p>
                    <p className="text-ink-soft">Serving {site.serviceArea.join(", ")}</p>
                </div>

                <div className="text-ink-muted text-center italic text-fluid-lg leading-relaxed">
                    <p>{manifesto}</p>
                </div>

                <div className="text-ink">
                    <span className="font-semibold mb-space-2 block">Connect</span>
                    <ul className="list-none p-0 m-0">
                        {socials.map((item) => (
                            <li key={item.label} className="mb-space-1">
                                <Link href={item.href!} target={item.href?.startsWith("http") ? "_blank" : undefined} rel={item.href?.startsWith("http") ? "noreferrer" : undefined} className="text-accent underline focus-visible:outline-accent">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="text-ink text-sm flex justify-between items-center border-t border-ink-muted/20 pt-space-3 mt-space-3 px-gutter">
                <span>© {year} {site.name}</span>
                <Link href="/remove" className="text-accent underline focus-visible:outline-accent" style={{textDecoration: 'underline'}}>Data preferences</Link>
            </div>
        </footer>
    );
}
