"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { TimelineInstance } from "gsap";
import {
    type ElementType,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { serif, sans } from "@/lib/fonts";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type NavLink = {
    label: string;
    href: string;
    type: "link" | "cta";
};

const navLinks: NavLink[] = [
    { label: "Home", href: "/", type: "link" },
    { label: "About", href: "/about", type: "link" },
    { label: "Experiences", href: "/experiences", type: "link" },
    { label: "Products & Services", href: "/products", type: "link" },
    { label: "Gallery", href: "/gallery", type: "link" },
    { label: "Press & Testimonials", href: "/press", type: "link" },
    { label: "Reviews", href: "/reviews", type: "link" },
    { label: "Membership", href: "/membership", type: "link" },
    { label: "Consult", href: "/consult", type: "link" },
    { label: "Pricing Calculator", href: "/pricing-calculator", type: "link" },
    { label: "Contact / Booking", href: "/contact", type: "link" },
    { label: "Book a Table", href: "/contact", type: "cta" },
];

const INDICATOR_TRANSITION = { duration: 0.18, ease: [0.25, 0.8, 0.45, 1] };

export default function NavBar() {
    const pathname = usePathname();
    const prefersReducedMotion = usePrefersReducedMotion();
    const [motion, setMotion] = useState<typeof import("framer-motion") | null>(null);
    const gsapRef = useRef<typeof import("gsap") | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [atTop, setAtTop] = useState(true);
    const [highlight, setHighlight] = useState<string | null>(null);
    const [indicatorState, setIndicatorState] = useState({ width: 0, left: 0, visible: false });
    const desktopLinksRef = useRef<HTMLDivElement | null>(null);
    const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);
    const focusableRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        let mounted = true;
        import("framer-motion").then((mod) => {
            if (mounted) {
                setMotion(mod);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    const activeLink = useMemo(() => {
        if (!pathname) return navLinks[0]?.href ?? null;
        const exact = navLinks.find((item) => item.href === pathname);
        if (exact) return exact.href;
        const partial = navLinks.find((item) =>
            item.href !== "/" && pathname.startsWith(`${item.href}/`)
        );
        return partial ? partial.href : "/";
    }, [pathname]);

    useEffect(() => {
        setHighlight(activeLink);
    }, [activeLink]);

    const setLinkNode = useCallback((href: string, node: HTMLAnchorElement | null) => {
        if (node) {
            linkRefs.current.set(href, node);
        } else {
            linkRefs.current.delete(href);
        }
    }, []);

    const updateIndicator = useCallback(
        (key: string | null) => {
            if (!desktopLinksRef.current || !key) {
                setIndicatorState({ width: 0, left: 0, visible: false });
                return;
            }

            const node = linkRefs.current.get(key);
            if (!node) {
                return;
            }
            const parentRect = desktopLinksRef.current.getBoundingClientRect();
            const rect = node.getBoundingClientRect();
            setIndicatorState({
                width: rect.width,
                left: rect.left - parentRect.left,
                visible: true,
            });
        },
        []
    );

    useLayoutEffect(() => {
        updateIndicator(highlight);
    }, [highlight, updateIndicator]);

    useEffect(() => {
        const handleResize = () => {
            updateIndicator(highlight);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [highlight, updateIndicator]);

    useEffect(() => {
        const handler = () => {
            setAtTop(window.scrollY < 4);
        };
        handler();
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useEffect(() => {
        if (!mobileOpen) {
            document.body.classList.remove("no-scroll");
            focusableRef.current = [];
            return;
        }
        document.body.classList.add("no-scroll");

        const overlay = overlayRef.current;
        const focusables: HTMLElement[] = [];
        if (toggleRef.current) {
            focusables.push(toggleRef.current);
        }
        if (overlay) {
            focusables.push(
                ...Array.from(
                    overlay.querySelectorAll<HTMLElement>(
                        "a[href], button:not([disabled])"
                    )
                )
            );
        }
        focusableRef.current = focusables;
        const firstFocusable = focusables[1] ?? focusables[0];
        if (firstFocusable) {
            requestAnimationFrame(() => firstFocusable.focus());
        }
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [mobileOpen]);

    useEffect(() => {
        if (!mobileOpen) {
            return;
        }

        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setMobileOpen(false);
                toggleRef.current?.focus();
                return;
            }
            if (event.key !== "Tab" || !focusableRef.current.length) {
                return;
            }
            const elements = focusableRef.current;
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (event.shiftKey) {
                if (document.activeElement === first || !document.activeElement) {
                    event.preventDefault();
                    last.focus();
                }
            } else if (document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [mobileOpen]);

    useEffect(() => {
        if (!mobileOpen || prefersReducedMotion) {
            return;
        }
        let cancelled = false;
        let timeline: TimelineInstance | null = null;
        const animatePanel = async () => {
            if (!gsapRef.current) {
                const mod = await import("gsap");
                if (cancelled) return;
                gsapRef.current = mod;
            }
            const gsap = gsapRef.current?.gsap;
            if (!gsap || !overlayRef.current) {
                return;
            }
            timeline = gsap
                .timeline()
                .fromTo(
                    overlayRef.current,
                    { opacity: 0.8, y: -12 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.28,
                        ease: "power2.out",
                        clearProps: "all",
                    }
                );
        };
        animatePanel();
        return () => {
            cancelled = true;
            timeline?.kill();
        };
    }, [mobileOpen, prefersReducedMotion]);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const MotionDiv = (motion?.motion.div ?? "div") as ElementType;
    const MotionNav = (motion?.motion.nav ?? "nav") as ElementType;
    const MotionUl = (motion?.motion.ul ?? "ul") as ElementType;
    const MotionLi = (motion?.motion.li ?? "li") as ElementType;
    const MotionSpan = (motion?.motion.span ?? "span") as ElementType;
    const AnimatePresence = motion?.AnimatePresence;

    const desktopLinks = navLinks.filter((item) => item.type === "link");
    const primaryLink = navLinks.find((item) => item.type === "cta") ?? navLinks[navLinks.length - 1];

    const handleToggle = () => setMobileOpen((prev) => !prev);
    const closeMobile = useCallback(() => setMobileOpen(false), []);

    const indicatorProps = motion
        ? {
              initial: false,
              animate: {
                  width: indicatorState.visible ? indicatorState.width : 0,
                  x: indicatorState.left,
                  opacity: indicatorState.visible ? 1 : 0,
              },
              transition: prefersReducedMotion ? { duration: 0 } : INDICATOR_TRANSITION,
          }
        : {
              style: {
                  width: `${indicatorState.width}px`,
                  transform: `translateX(${indicatorState.left}px)`,
                  opacity: indicatorState.visible ? 1 : 0,
              },
          };

    return (
        <header
            className={`navbar${atTop ? "" : " navbar--scrolled"}`}
            data-transparent={atTop}
        >
            <div className="navbar__inner">
                <Link href="/" className={`navbar__logo ${serif.className}`} aria-label="Table d’Adrian home">
                    Table d’Adrian
                </Link>

                <MotionNav
                    className="navbar__desktop"
                    aria-label="Primary"
                    onMouseLeave={() => setHighlight(activeLink)}
                >
                    <div className="navbar__links" ref={desktopLinksRef}>
                        {desktopLinks.map((link) => (
                            <div key={link.href} className="navbar__item">
                                <Link
                                    href={link.href}
                                    ref={(node) => setLinkNode(link.href, node)}
                                    className={`navbar__link ${serif.className}`}
                                    data-active={highlight === link.href}
                                    onFocus={() => setHighlight(link.href)}
                                    onMouseEnter={() => setHighlight(link.href)}
                                >
                                    <span>{link.label}</span>
                                </Link>
                            </div>
                        ))}
                        {indicatorState.visible && (
                            motion ? (
                                <MotionSpan
                                    className="navbar__indicator"
                                    {...indicatorProps}
                                />
                            ) : (
                                <span className="navbar__indicator" {...indicatorProps} />
                            )
                        )}
                    </div>
                </MotionNav>

                <Link
                    href={primaryLink.href}
                    className={`navbar__cta ${serif.className}`}
                >
                    {primaryLink.label}
                </Link>

                <button
                    ref={toggleRef}
                    type="button"
                    className={`navbar__toggle ${sans.className}${mobileOpen ? " is-open" : ""}`}
                    onClick={handleToggle}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-navigation"
                    aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                >
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </button>
            </div>

            {AnimatePresence ? (
                <AnimatePresence>
                    {mobileOpen && (
                        <MotionDiv
                            ref={overlayRef}
                            id="mobile-navigation"
                            className="navbar__mobile"
                            role="dialog"
                            aria-modal="true"
                            initial={prefersReducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                        >
                            <MotionUl
                                className="navbar__mobile-list"
                                initial={prefersReducedMotion ? false : "hidden"}
                                animate="visible"
                                exit="hidden"
                                variants={
                                    prefersReducedMotion
                                        ? undefined
                                        : {
                                              hidden: {},
                                              visible: {
                                                  transition: {
                                                      delayChildren: 0.08,
                                                      staggerChildren: 0.06,
                                                  },
                                              },
                                          }
                                }
                            >
                                {navLinks.map((link) => (
                                    <MotionLi
                                        key={`${link.type}-${link.href}`}
                                        className={`navbar__mobile-item${
                                            link.type === "cta" ? " navbar__mobile-item--cta" : ""
                                        }`}
                                        variants={
                                            prefersReducedMotion
                                                ? undefined
                                                : {
                                                      hidden: { opacity: 0, y: 12 },
                                                      visible: {
                                                          opacity: 1,
                                                          y: 0,
                                                          transition: { duration: 0.28, ease: [0.25, 0.8, 0.45, 1] },
                                                      },
                                                  }
                                        }
                                    >
                                        <Link
                                            href={link.href}
                                            className={`navbar__mobile-link ${
                                                link.type === "cta"
                                                    ? "navbar__mobile-link--cta"
                                                    : ""
                                            } ${serif.className}`.trim()}
                                            onClick={closeMobile}
                                        >
                                            {link.label}
                                        </Link>
                                    </MotionLi>
                                ))}
                            </MotionUl>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            ) : (
                mobileOpen && (
                    <div
                        ref={overlayRef}
                        id="mobile-navigation"
                        className="navbar__mobile"
                        role="dialog"
                        aria-modal="true"
                    >
                        <ul className="navbar__mobile-list">
                            {navLinks.map((link) => (
                                <li
                                    key={`${link.type}-${link.href}`}
                                    className={`navbar__mobile-item${
                                        link.type === "cta" ? " navbar__mobile-item--cta" : ""
                                    }`}
                                >
                                    <Link
                                        href={link.href}
                                        className={`navbar__mobile-link ${
                                            link.type === "cta"
                                                ? "navbar__mobile-link--cta"
                                                : ""
                                        } ${serif.className}`.trim()}
                                        onClick={closeMobile}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </header>
    );
}
