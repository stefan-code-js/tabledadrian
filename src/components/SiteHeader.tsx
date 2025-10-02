"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    { href: "/membership", label: "Plan a membership" },
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
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);
    const lastFocusRef = useRef<HTMLElement | null>(null);
    const lastPathnameRef = useRef<string | null>(pathname ?? null);

    const filteredNavItems = useMemo(() => {
        const value = searchTerm.trim().toLowerCase();
        if (!value) return NAV_ITEMS;
        return NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(value));
    }, [searchTerm]);

    const closeMenu = useCallback((trackEventOnClose = true) => {
        setMenuOpen((prev) => {
            if (prev && trackEventOnClose) {
                trackEvent(ANALYTICS_EVENTS.menuToggle, { state: "close" });
            }
            return false;
        });
    }, []);

    useEffect(() => {
        return () => document.body.classList.remove("no-scroll");
    }, []);

    useEffect(() => {
        if (!isMenuOpen) {
            document.body.classList.remove("no-scroll");
            setSearchTerm("");
            const node = lastFocusRef.current;
            if (node) {
                window.requestAnimationFrame(() => node.focus());
                lastFocusRef.current = null;
            }
            return;
        }

        document.body.classList.add("no-scroll");
        const overlay = overlayRef.current;
        if (!overlay) return;

        const focusables = () => Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
        const preferred = overlay.querySelector<HTMLInputElement>("[data-menu-search]") ?? overlay;
        window.requestAnimationFrame(() => preferred.focus());

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu(false);
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
    }, [isMenuOpen, closeMenu]);

    useEffect(() => {
        const previous = lastPathnameRef.current;
        if (pathname && previous !== pathname && isMenuOpen) {
            closeMenu(false);
        }
        lastPathnameRef.current = pathname;
    }, [pathname, isMenuOpen, closeMenu]);

    const handleToggle = () => {
        setMenuOpen((prev) => {
            if (prev) {
                trackEvent(ANALYTICS_EVENTS.menuToggle, { state: "close" });
                return false;
            }
            lastFocusRef.current = (document.activeElement as HTMLElement) ?? null;
            trackEvent(ANALYTICS_EVENTS.menuToggle, { state: "open" });
            return true;
        });
    };

    const handleNavClick = (href: string, label: string, section: "primary" | "featured") => {
        trackEvent(ANALYTICS_EVENTS.navClick, { href, label, section });
        closeMenu();
    };

    const handlePrimaryNavClick = useCallback((href: string, label: string) => {
        trackEvent(ANALYTICS_EVENTS.navClick, { href, label, section: "inline" });
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
                    <button
                        ref={menuButtonRef}
                        type="button"
                        className="menu-header__button"
                        aria-haspopup="dialog"
                        aria-controls="site-menu"
                        aria-expanded={isMenuOpen ? "true" : "false"}
                        onClick={handleToggle}
                    >
                        <Menu aria-hidden="true" size={18} />
                        <span>Menu</span>
                    </button>
                </div>
            </div>

            {isMenuOpen ? (
                <div id="site-menu" className="menu-overlay" ref={overlayRef}>
                    <div className="menu-overlay__panel" role="dialog" aria-modal="true" aria-label="Site menu" data-menu-panel ref={panelRef}>
                        <div className="menu-overlay__top">
                            <span className="menu-overlay__label">Navigation</span>
                            <button
                                ref={closeButtonRef}
                                type="button"
                                className="menu-overlay__close"
                                onClick={() => closeMenu()}
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
