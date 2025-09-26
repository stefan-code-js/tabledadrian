"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadGsap } from "@/lib/motion";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import { site } from "@/lib/site";

const NAV_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Story" },
    { href: "/experiences", label: "Experiences" },
    { href: "/services", label: "Services" },
    { href: "/membership", label: "Membership" },
    { href: "/consult", label: "Consult" },
    { href: "/pricing-calculator", label: "Pricing" },
    { href: "/gallery", label: "Gallery" },
    { href: "/press", label: "Press" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
] as const;

const FEATURED = [
    { href: "/contact", label: "Book a table" },
    { href: "/membership", label: "Begin membership consult" },
    { href: "/consult", label: "Schedule a strategy call" },
] as const;

const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "textarea",
    "input",
    "select",
    '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function SiteHeader() {
    const pathname = usePathname();
    const [isMenuActive, setMenuActive] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const lastFocusRef = useRef<HTMLElement | null>(null);

    const filteredNavItems = useMemo(() => {
        const value = searchTerm.trim().toLowerCase();
        if (!value) return NAV_ITEMS;
        return NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(value));
    }, [searchTerm]);

    const closeMenuImmediate = useCallback(() => {
        setOverlayVisible(false);
        setSearchTerm("");
        document.body.classList.remove("no-scroll");
        const last = lastFocusRef.current;
        if (last) {
            window.requestAnimationFrame(() => last.focus());
            lastFocusRef.current = null;
        }
    }, []);

    const closeMenu = useCallback(() => {
        if (!isOverlayVisible) {
            setMenuActive(false);
            return;
        }

        trackEvent(ANALYTICS_EVENTS.menuToggle, { state: "close" });
        setMenuActive(false);

        const overlay = overlayRef.current;
        const panel = panelRef.current;
        if (!overlay || !panel) {
            closeMenuImmediate();
            return;
        }

        void loadGsap().then((gsap) => {
            if (!gsap || !overlayRef.current || !panelRef.current) {
                closeMenuImmediate();
                return;
            }
            const items = overlayRef.current.querySelectorAll<HTMLElement>("[data-menu-item]");
            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                onComplete: closeMenuImmediate,
            });
            tl.to(items, { y: -16, autoAlpha: 0, stagger: 0.04, duration: 0.18 }, 0);
            tl.to(panelRef.current, { scale: 0.94, autoAlpha: 0, duration: 0.24 }, 0);
            tl.to(overlayRef.current, { autoAlpha: 0, duration: 0.2 }, 0);
        });
    }, [isOverlayVisible, closeMenuImmediate]);

    const openMenu = useCallback(() => {
        lastFocusRef.current = (document.activeElement as HTMLElement) ?? null;
        setMenuActive(true);
        setOverlayVisible(true);
        trackEvent(ANALYTICS_EVENTS.menuToggle, { state: "open" });
    }, []);

    useEffect(() => {
        if (!isOverlayVisible) {
            document.body.classList.remove("no-scroll");
            return;
        }
        document.body.classList.add("no-scroll");

        void loadGsap().then((gsap) => {
            if (!gsap || !overlayRef.current || !panelRef.current) {
                return;
            }
            const items = overlayRef.current.querySelectorAll<HTMLElement>("[data-menu-item]");
            gsap.set(overlayRef.current, { autoAlpha: 1 });
            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.fromTo(panelRef.current, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.32 });
            tl.from(items, { y: 18, autoAlpha: 0, stagger: 0.05, duration: 0.28 }, "-=0.16");
        });

        const overlay = overlayRef.current;
        if (!overlay) return;

        const focusables = () => Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        const preferred = overlay.querySelector<HTMLInputElement>("[data-menu-search]") ?? overlay;
        window.requestAnimationFrame(() => preferred.focus());

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu();
                return;
            }
            if (event.key === "Tab") {
                const elements = focusables();
                if (elements.length === 0) return;
                const first = elements[0];
                const last = elements[elements.length - 1];
                if (event.shiftKey) {
                    if (document.activeElement === first) {
                        event.preventDefault();
                        last.focus();
                    }
                } else if (document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        overlay.addEventListener("keydown", handleKeyDown);
        return () => overlay.removeEventListener("keydown", handleKeyDown);
    }, [isOverlayVisible, closeMenu]);

    useEffect(() => {
        if (!isOverlayVisible) {
            setSearchTerm("");
        }
    }, [isOverlayVisible]);

    useEffect(() => {
        if (pathname && isOverlayVisible) {
            closeMenuImmediate();
        }
    }, [pathname, isOverlayVisible, closeMenuImmediate]);

    const handleToggle = () => {
        if (isMenuActive || isOverlayVisible) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    const handleNavClick = (href: string, label: string, section: "primary" | "featured") => {
        trackEvent(ANALYTICS_EVENTS.navClick, { href, label, section });
        closeMenu();
    };

    const handlePrimaryNavClick = useCallback((href: string, label: string) => {
        trackEvent(ANALYTICS_EVENTS.navClick, { href, label, section: "inline" });
    }, []);

    const handleCtaClick = useCallback(() => {
        trackEvent(ANALYTICS_EVENTS.bookingCta, { location: "header" });
    }, []);

    return (
        <header className="menu-header">
            <div className="menu-header__inner">
                <Link href="/" className="menu-header__brand">
                    {site.shortName}
                </Link>
                <nav className="menu-header__nav" aria-label="Primary">
                    {NAV_ITEMS.map((item) => {
                        const isActive =
                            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`menu-header__link${isActive ? " is-active" : ""}`}
                                onClick={() => handlePrimaryNavClick(item.href, item.label)}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="menu-header__actions">
                    <Link className="menu-header__cta" href="/contact" onClick={handleCtaClick}>
                        Book a table
                    </Link>
                    <button
                        ref={menuButtonRef}
                        type="button"
                        className="menu-header__button"
                        aria-haspopup="dialog"
                        aria-controls="site-menu"
                        aria-expanded={isMenuActive}
                        onClick={handleToggle}
                    >
                        <Menu aria-hidden="true" size={18} />
                        <span>Menu</span>
                    </button>
                </div>
            </div>

            {isOverlayVisible ? (
                <div id="site-menu" className="menu-overlay" ref={overlayRef}>
                    <div className="menu-overlay__panel" role="dialog" aria-modal="true" aria-label="Site menu" data-menu-panel ref={panelRef}>
                        <div className="menu-overlay__top">
                            <span className="menu-overlay__label">Navigation</span>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                className="menu-overlay__close"
                                onClick={closeMenu}
                                aria-label="Close menu"
                            >
                                <X aria-hidden="true" size={18} />
                            </button>
                        </div>
                        <div className="menu-overlay__search">
                            <label className="sr-only" htmlFor="menu-search">
                                Search menu
                            </label>
                            <input
                                id="menu-search"
                                data-menu-search
                                type="search"
                                placeholder="Filter destinations"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                autoComplete="off"
                            />
                        </div>
                        <div className="menu-overlay__featured" aria-label="Featured actions">
                            {FEATURED.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="menu-overlay__featured-link"
                                    data-menu-item
                                    onClick={() => handleNavClick(item.href, item.label, "featured")}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <nav className="menu-overlay__nav" aria-label="Primary">
                            {filteredNavItems.length === 0 ? (
                                <p className="menu-overlay__empty">No matches. Try another cue.</p>
                            ) : (
                                filteredNavItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        data-menu-item
                                        className={`menu-overlay__link${pathname.startsWith(item.href) ? " is-active" : ""}`}
                                        onClick={() => handleNavClick(item.href, item.label, "primary")}
                                    >
                                        <span>{item.label}</span>
                                        <span aria-hidden="true" className="menu-overlay__underline" />
                                    </Link>
                                ))
                            )}
                        </nav>
                    </div>
                </div>
            ) : null}
        </header>
    );
}

