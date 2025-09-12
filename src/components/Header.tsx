"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
    { href: "/", label: "home" },
    { href: "/about", label: "about" },
    { href: "/menu", label: "menu" },
    { href: "/team", label: "team" },
    { href: "/book", label: "book" },
    { href: "/membership", label: "membership" },
    { href: "/consult", label: "consult" },

];

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Close on route change & lock body scroll when open
    useEffect(() => setOpen(false), [pathname]);
    useEffect(() => {
        if (open) document.body.classList.add("no-scroll");
        else document.body.classList.remove("no-scroll");
    }, [open]);

    // ESC to close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <>
            <header className="header">
                <div className="inner">
                    <Link href="/" className="logo" aria-label="Table d’Adrian — home">
                        Table d’Adrian
                    </Link>

                    {/* Desktop nav (under the logo) */}
                    <nav className="nav desktop-nav" aria-label="Primary">
                        {LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                aria-current={pathname === l.href ? "page" : undefined}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile burger (top-right, small & quiet) */}
                    <button
                        type="button"
                        className={`burger ${open ? "is-open" : ""}`}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span className="burger-icon" aria-hidden="true" />
                    </button>
                </div>
            </header>

            {/* Mobile overlay */}
            <div
                id="mobile-menu"
                className={`menu-drawer ${open ? "is-open" : ""}`}
                onClick={(e) => {
                    // click backdrop closes; clicks inside panel do not
                    if (e.target === e.currentTarget) setOpen(false);
                }}
            >
                <div className="menu-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
                    <nav className="mobile-nav" aria-label="Mobile">
                        {LINKS.map((l) => (
                            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                                {l.label}
                            </Link>
                        ))}
                        <Link href="/book" className="btn" onClick={() => setOpen(false)}>
                            book a table
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}
