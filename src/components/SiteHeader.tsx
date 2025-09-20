"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { loadGsap } from "@/lib/motion";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const NAV_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Story" },
    { href: "/experiences", label: "Experiences" },
    { href: "/products", label: "Services" },
    { href: "/membership", label: "Membership" },
    { href: "/consult", label: "Consult" },
    { href: "/pricing-calculator", label: "Pricing" },
    { href: "/gallery", label: "Gallery" },
    { href: "/press", label: "Press" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
];

const FEATURED = [
    { href: "/book", label: "Reserve a private table" },
    { href: "/membership", label: "Begin membership consult" },
    { href: "/consult", label: "Schedule a strategy call" },
];

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
    const lastActiveElementRef = useRef<HTMLElement | null>(null);

    const filteredNavItems = useMemo(() => {
        const value = searchTerm.trim().toLowerCase();
        if (!value) {
            return NAV_ITEMS;
        }
        return NAV_ITEMS.filter((item) => item.label.toLowerCase().includes(value));
    }, [searchTerm]);

    const closeMenuImmediate = useCallback(() => {
        setMenuActive(false);
        setOverlayVisible(false);
        setSearchTerm("");
        document.body.classList.remove("no-scroll");
        if (lastActiveElementRef.current) {
            lastActiveElementRef.current.focus();
            lastActiveElementRef.current = null;
        }
    }, []);

    const animateClose = useCallback(() => {
        if (!overlayRef.current || !panelRef.current) {
            closeMenuImmediate();
            return;
        }

        void loadGsap().then((gsap) => {
            if (!gsap || !overlayRef.current || !panelRef.current) {
                closeMenuImmediate();
                return;
            }

            const overlay = overlayRef.current;
            const panel = panelRef.current;
            const items = overlay.querySelectorAll<HTMLElement>("[data-menu-item]");

            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                onComplete: closeMenuImmediate,
            });

            tl.to(items, { y: -16, autoAlpha: 0, stagger: 0.04, duration: 0.18 }, 0);
            tl.to(panel, { scale: 0.94, autoAlpha: 0, duration: 0.24 }, 0);
            tl.to(overlay, { autoAlpha: 0, duration: 0.2 }, 0);
        });
    }, [closeMenuImmediate]);

    const openMenu = useCallback(() => {
        lastActiveElementRef.current = (document.activeElement as HTMLElement) ?? null;
        setMenuActive(true);
        setOverlayVisible(true);
    }, []);

    const closeMenu = useCallback(() => {
        setMenuActive(false);
        animateClose();
    }, [animateClose]);

    useEffect(() => {
        if (!isOverlayVisible || !overlayRef.current) {
            return;
        }

        const overlay = overlayRef.current;
        document.body.classList.add("no-scroll");

        void loadGsap().then((gsap) => {
            if (!gsap || !overlayRef.current || !panelRef.current) {
                return;
            }
            const panel = panelRef.current;
            const items = overlayRef.current.querySelectorAll<HTMLElement>("[data-menu-item]");

            gsap.set(overlayRef.current, { autoAlpha: 1 });

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.fromTo(panel, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.32 });
            tl.from(items, { y: 18, autoAlpha: 0, stagger: 0.05, duration: 0.28 }, "-=0.16");
        });

        const focusables = () => Array.from(overlay.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

        const firstFocusTarget = overlay.querySelector<HTMLInputElement>("[data-menu-search]") ?? overlay;
        firstFocusTarget.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeMenu();
                return;
            }

            if (event.key === "Tab") {
                const elements = focusables();
                if (elements.length === 0) {
                    return;
                }
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
        return () => {
            overlay.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOverlayVisible, closeMenu]);

    useEffect(() => {
        if (!isOverlayVisible) {
            document.body.classList.remove("no-scroll");
        }
    }, [isOverlayVisible]);

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

    const handleMenuToggle = () => {
        if (isMenuActive || isOverlayVisible) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    return (
        <header className="menu-header">
            <div className="menu-header__inner">
                <Link href="/" className="menu-header__brand">
                    Table d'Adrian
                </Link>
                <button
                    ref={menuButtonRef}
                    type="button"
                    className="menu-header__button"
                    aria-haspopup="dialog"
                    aria-expanded={isMenuActive}
                    onClick={handleMenuToggle}
                >
                    Menu
                </button>
            </div>

            {isOverlayVisible ? (
                <div className="menu-overlay" ref={overlayRef}>
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
                                <span aria-hidden="true">�</span>
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
                                placeholder="Type to filter destinations"
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
                            onClick={() => {
                                trackEvent(ANALYTICS_EVENTS.navClick, { href: item.href, label: item.label, section: "featured" });
                                closeMenu();
                            }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <nav className="menu-overlay__nav" aria-label="Primary">
                            {filteredNavItems.length === 0 ? (
                                <p className="menu-overlay__empty">No matches. Try a different word.</p>
                            ) : (
                                filteredNavItems.map((item) => {
                                    const isActive =
                                        item.href === "/"
                                            ? pathname === "/"
                                            : pathname.startsWith(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            data-menu-item
                                            className={`menu-overlay__link${isActive ? " is-active" : ""}`}
                                            onClick={() => {
                                                trackEvent(ANALYTICS_EVENTS.navClick, { href: item.href, label: item.label, section: "primary" });
                                                closeMenu();
                                            }}
                                        >
                                            <span>{item.label}</span>
                                            <span aria-hidden="true" className="menu-overlay__underline" />
                                        </Link>
                                    );
                                })
                            )}
                        </nav>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
