"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    type ChangeEvent,
    type ElementType,
    type FocusEvent,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { serif, sans } from "@/lib/fonts";
import CommandPalette from "./CommandPalette";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const INDICATOR_TRANSITION = { duration: 0.2, ease: [0.16, 0.84, 0.44, 1] };

type NavItem = {
    label: string;
    href: string;
};

type NavGroup = {
    id: string;
    label: string;
    summary: string;
    links: NavItem[];
};

export type { NavGroup, NavItem };
export const navGroups: NavGroup[] = [
    {
        id: "studio",
        label: "Studio",
        summary: "Origins, team, and press releases",
        links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Team", href: "/team" },
            { label: "Press", href: "/press" },
        ],
    },
    {
        id: "experiences",
        label: "Experiences",
        summary: "Immersive tasting journeys and gallery",
        links: [
            { label: "Experiences", href: "/experiences" },
            { label: "Gallery", href: "/gallery" },
            { label: "Reviews", href: "/reviews" },
        ],
    },
    {
        id: "services",
        label: "Services",
        summary: "Private consulting, memberships, and tools",
        links: [
            { label: "Services", href: "/services" },
            { label: "Consult", href: "/consult" },
            { label: "Membership", href: "/membership" },
            { label: "Pricing Calculator", href: "/pricing-calculator" },
        ],
    },
    {
        id: "visit",
        label: "Plan your visit",
        summary: "Secure your table and stay in touch",
        links: [
            { label: "Book", href: "/book" },
            { label: "Contact", href: "/contact" },
            { label: "Success", href: "/success" },
            { label: "Cancel", href: "/cancel" },
        ],
    },
    {
        id: "members",
        label: "Members",
        summary: "Access the vault, collectibles, and community",
        links: [
            { label: "Member Overview", href: "/members" },
            { label: "Recipes Vault", href: "/members/recipes" },
            { label: "Alchemy Collectibles", href: "/alchemy-collectibles" },
            { label: "Community Hub", href: "/community" },
            { label: "Community Charter", href: "/community/charter" },
            { label: "Login", href: "/auth/login" },
            { label: "Register", href: "/auth/register" },
        ],
    },
];

const ctaLink: NavItem = { label: "Book a Table", href: "/book" };

import { useRouter } from "next/navigation";

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [paletteQuery, setPaletteQuery] = useState("");
    const handlePaletteNavigate = (href: string) => {
        router.push(href);
        setPaletteOpen(false);
        setPaletteQuery("");
    };
    const prefersReducedMotion = usePrefersReducedMotion();
    const [motionLib, setMotionLib] = useState<typeof import("framer-motion") | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeGroup, setActiveGroup] = useState<string | null>(null);
    const [highlight, setHighlight] = useState<string | null>(null);
    const groupRefs = useRef(new Map<string, HTMLButtonElement>());
    const desktopNavRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const toggleRef = useRef<HTMLButtonElement | null>(null);
    const focusableRef = useRef<HTMLElement[]>([]);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [indicatorState, setIndicatorState] = useState({ left: 0, width: 0, visible: false });

    useEffect(() => {
        let mounted = true;
        import("framer-motion").then((mod) => {
            if (mounted) {
                setMotionLib(mod);
            }
        });
        return () => {
            mounted = false;
        };
    }, []);

    const allLinks = useMemo(() => navGroups.flatMap((group) => group.links), []);
    const searchResults = useMemo(() => {
        const q = paletteQuery.trim().toLowerCase();
        if (!q) return allLinks;
        return allLinks.filter((link) => link.label.toLowerCase().includes(q));
    }, [allLinks, paletteQuery]);

    const activeHref = useMemo(() => {
        if (!pathname) return "/";
        const direct = allLinks.find((link) => link.href === pathname);
        if (direct) return direct.href;
        const nested = allLinks.find((link) => pathname.startsWith(`${link.href}/`));
        return nested ? nested.href : "/";
    }, [allLinks, pathname]);

    const defaultGroup = useMemo(() => {
        return navGroups.find((group) =>
            group.links.some((link) => link.href === activeHref)
        )?.id;
    }, [activeHref]);

    const handlePaletteClose = useCallback(() => {
        setPaletteOpen(false);
        setPaletteQuery("");
    }, []);

    const handleSearchFocus = useCallback(() => {
        if (!paletteOpen) {
            setPaletteOpen(true);
        }
    }, [paletteOpen]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPaletteQuery(value);
        if (!paletteOpen) {
            setPaletteOpen(true);
        }
    };

    const handleSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const first = searchResults[0];
            if (first) {
                event.preventDefault();
                handlePaletteNavigate(first.href);
            }
        }
        if (event.key === "Escape") {
            event.preventDefault();
            handlePaletteClose();
            searchInputRef.current?.blur();
        }
    };

    useEffect(() => {
        setHighlight(defaultGroup ?? null);
        setActiveGroup(defaultGroup ?? null);
    }, [defaultGroup]);

    const setGroupNode = useCallback((id: string, node: HTMLButtonElement | null) => {
        if (node) {
            groupRefs.current.set(id, node);
        } else {
            groupRefs.current.delete(id);
        }
    }, []);

    const updateIndicator = useCallback(
        (groupId: string | null) => {
            if (!desktopNavRef.current || !groupId) {
                setIndicatorState({ left: 0, width: 0, visible: false });
                return;
            }
            const node = groupRefs.current.get(groupId);
            if (!node) {
                setIndicatorState({ left: 0, width: 0, visible: false });
                return;
            }
            const parentRect = desktopNavRef.current.getBoundingClientRect();
            const rect = node.getBoundingClientRect();
            setIndicatorState({
                left: rect.left - parentRect.left,
                width: rect.width,
                visible: true,
            });
        },
        []
    );

    useLayoutEffect(() => {
        updateIndicator(highlight);
    }, [highlight, updateIndicator]);

    useEffect(() => {
        const handleResize = () => updateIndicator(highlight);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [highlight, updateIndicator]);

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
        setMobileOpen(false);
    }, [pathname]);

    const MotionDiv = (motionLib?.motion.div ?? "div") as ElementType;
    const MotionSpan = (motionLib?.motion.span ?? "span") as ElementType;
    const MotionNav = (motionLib?.motion.nav ?? "nav") as ElementType;
    const MotionSection = (motionLib?.motion.section ?? "section") as ElementType;
    const AnimatePresence = motionLib?.AnimatePresence;

    const indicatorProps = motionLib
        ? {
              initial: false,
              animate: {
                  x: indicatorState.left,
                  width: indicatorState.visible ? indicatorState.width : 0,
                  opacity: indicatorState.visible ? 1 : 0,
              },
              transition: prefersReducedMotion ? { duration: 0 } : INDICATOR_TRANSITION,
          }
        : {
              style: {
                  transform: `translateX(${indicatorState.left}px)`,
                  width: indicatorState.width,
                  opacity: indicatorState.visible ? 1 : 0,
              },
          };

    const handleToggle = () => setMobileOpen((prev) => !prev);

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    const mobileBody = (
        <div className="nav-mobile__body">
            <p id="mobile-navigation-title" className={`nav-mobile__title ${sans.className}`}>
                Navigation
            </p>
            {navGroups.map((group) => (
                <div key={`mobile-${group.id}`} className="nav-mobile__group">
                    <p className={`nav-mobile__heading ${sans.className}`}>{group.label}</p>
                    <p className="nav-mobile__summary">{group.summary}</p>
                    <ul>
                        {group.links.map((link) => (
                            <li key={`mobile-${group.id}-${link.href}`}>
                                <Link
                                    href={link.href}
                                    className={`nav-mobile__link ${serif.className}`}
                                    onClick={closeMobile}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <Link
                href={ctaLink.href}
                className={`nav-mobile__cta ${serif.className}`}
                onClick={closeMobile}
            >
                {ctaLink.label}
            </Link>
        </div>
    );

    const handleGroupBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }
        setActiveGroup(defaultGroup ?? null);
        setHighlight(defaultGroup ?? null);
    };

    return (
        <>
            <header className="nav-shell">
            <div className="nav-shell__inner">
                <Link href="/" className={`nav-brand ${serif.className}`}>
                    Table d'Adrian
                </Link>

                <MotionNav
                    className="nav-desktop"
                    aria-label="Primary"
                    ref={desktopNavRef}
                >
                    <div className="nav-desktop__wrap">
                        {navGroups.map((group) => {
                            const panelId = `nav-panel-${group.id}`;
                            const labelId = `nav-group-label-${group.id}`;
                            const isActive = activeGroup === group.id;
                            const panelContent = (
                                <>
                                    <p className="nav-panel__summary">{group.summary}</p>
                                    <ul className="nav-panel__links">
                                        {group.links.map((link) => (
                                            <li key={link.href}>
                                                <Link
                                                    href={link.href}
                                                    className={`nav-panel__link ${serif.className}`}
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            );

                            return (
                                <div
                                    key={group.id}
                                    className="nav-group"
                                    onMouseEnter={() => {
                                        setActiveGroup(group.id);
                                        setHighlight(group.id);
                                    }}
                                    onMouseLeave={() => {
                                        setActiveGroup(defaultGroup ?? null);
                                        setHighlight(defaultGroup ?? null);
                                    }}
                                    onFocus={() => {
                                        setActiveGroup(group.id);
                                        setHighlight(group.id);
                                    }}
                                    onBlur={handleGroupBlur}
                                >
                                    <button
                                        id={labelId}
                                        ref={(node) => setGroupNode(group.id, node)}
                                        type="button"
                                        className={`nav-group__label ${sans.className}`}
                                        aria-expanded={isActive ? "true" : "false"}
                                        aria-controls={panelId}
                                        aria-haspopup="true"
                                    >
                                        <span>{group.label}</span>
                                    </button>
                                    {AnimatePresence ? (
                                        <AnimatePresence>
                                            {isActive && (
                                                <MotionSection
                                                    key={group.id}
                                                    id={panelId}
                                                    aria-labelledby={labelId}
                                                    role="group"
                                                    className="nav-panel"
                                                    initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={
                                                        prefersReducedMotion
                                                            ? { opacity: 0, transitionEnd: { pointerEvents: "none" } }
                                                            : {
                                                                  opacity: 0,
                                                                  y: 6,
                                                                  transitionEnd: { pointerEvents: "none" },
                                                              }
                                                    }
                                                    transition={{
                                                        duration: prefersReducedMotion ? 0 : 0.24,
                                                        ease: [0.16, 0.84, 0.44, 1],
                                                    }}
                                                >
                                                    {panelContent}
                                                </MotionSection>
                                            )}
                                        </AnimatePresence>
                                    ) : (
                                        isActive && (
                                            <section
                                                id={panelId}
                                                aria-labelledby={labelId}
                                                role="group"
                                                className="nav-panel"
                                            >
                                                {panelContent}
                                            </section>
                                        )
                                    )}
                                </div>
                            );
                        })}
                        {indicatorState.visible && (
                            <MotionSpan className="nav-indicator" {...indicatorProps} />
                        )}
                    </div>
                </MotionNav>

                <div id="site-search" className="nav-search" role="search">
                    <input
                        ref={searchInputRef}
                        type="search"
                        className="nav-search__field"
                        placeholder="Search the atelier..."
                        value={paletteQuery}
                        onFocus={handleSearchFocus}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
                        aria-label="Search Table d'Adrian navigation"
                    />
                    <div className="nav-search__actions">
                        <Link href="/auth/login" className="nav-search__link">
                            Login
                        </Link>
                        <Link href="/auth/register" className="nav-search__link">
                            Register
                        </Link>
                    </div>
                </div>

                <Link href={ctaLink.href} className={`nav-cta ${serif.className}`}>
                    {ctaLink.label}
                </Link>

                <button
                    ref={toggleRef}
                    type="button"
                    className={`nav-toggle ${sans.className}${mobileOpen ? " is-open" : ""}`}
                    aria-expanded={mobileOpen ? "true" : "false"}
                    aria-controls="mobile-navigation"
                    aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
                    onClick={handleToggle}
                >
                    <span className="nav-toggle__label">Menu</span>
                    <span aria-hidden="true" className="nav-toggle__arrow" />
                </button>
                <button
                    type="button"
                    className="nav-command-palette-btn"
                    aria-label="Open command palette"
                    aria-keyshortcuts="Control+K"
                    title="Open command palette (Ctrl+K)"
                    onClick={() => {
                        setPaletteQuery("");
                        setPaletteOpen(true);
                    }}
                >
                    <span className="nav-command-palette-icon">{"Ctrl\u2009K"}</span>
                </button>
            </div>

            {AnimatePresence ? (
                <AnimatePresence>
                    {mobileOpen && (
                        <MotionDiv
                            ref={overlayRef}
                            id="mobile-navigation"
                            className="nav-mobile"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="mobile-navigation-title"
                            initial={prefersReducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
                        >
                            {mobileBody}
                        </MotionDiv>
                    )}
                </AnimatePresence>
            ) : (
                mobileOpen && (
                    <div
                        ref={overlayRef}
                        id="mobile-navigation"
                        className="nav-mobile"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mobile-navigation-title"
                    >
                        {mobileBody}
                    </div>
                )
            )}

        </header>
            <CommandPalette open={paletteOpen} query={paletteQuery} onQueryChange={setPaletteQuery} onClose={handlePaletteClose} onNavigate={handlePaletteNavigate} />
        </>
    );
}





