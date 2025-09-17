"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/siteContent";

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => setOpen(false), [pathname]);
    useEffect(() => {
        if (open) document.body.classList.add("no-scroll");
        else document.body.classList.remove("no-scroll");
    }, [open]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <header className="site-header">
            <div className="container site-header__inner">
                <Link href="/" className="site-logo" aria-label="Table d’Adrian — home">
                    Table d’Adrian
                </Link>

                <nav className="site-nav" aria-label="Primary">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={pathname === link.href ? "page" : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <button
                    type="button"
                    className={`site-menu ${open ? "is-open" : ""}`}
                    aria-label={open ? "Close navigation" : "Open navigation"}
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    onClick={() => setOpen((value) => !value)}
                >
                    <span aria-hidden className="site-menu__icon" />
                </button>
            </div>

            <div
                id="mobile-menu"
                className={`site-drawer ${open ? "is-open" : ""}`}
                onClick={(event) => {
                    if (event.target === event.currentTarget) setOpen(false);
                }}
            >
                <div className="site-drawer__panel" role="dialog" aria-modal="true" aria-label="Primary navigation">
                    <nav className="site-drawer__nav">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/contact" className="btn" onClick={() => setOpen(false)}>
                            book a table
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
