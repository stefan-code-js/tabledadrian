"use client";

import { useState } from "react";
import Link from "next/link";
import { navGroups } from "@/data/siteContent";

export default function Header() {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen((prev) => !prev);
    const close = () => setOpen(false);

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link
                    href="/"
                    className="site-header__brand"
                    aria-label="Table d’Adrian — home"
                    onClick={close}
                >
                    Table d’Adrian
                </Link>
                <button
                    type="button"
                    className={`site-nav__toggle${open ? " is-open" : ""}`}
                    aria-expanded={open}
                    aria-controls="primary-navigation"
                    onClick={toggle}
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span aria-hidden="true" />
                </button>
                <nav
                    id="primary-navigation"
                    className={`site-nav${open ? " is-open" : ""}`}
                    aria-label="Primary"
                >
                    {navGroups.map((group) => (
                        <div key={group.label} className="site-nav__group">
                            <Link
                                href={group.href}
                                className="site-nav__group-link"
                                onClick={close}
                            >
                                {group.label}
                            </Link>
                            <p className="site-nav__group-copy">{group.description}</p>
                            <ul className="site-nav__sublinks">
                                {group.links.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} onClick={close}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </header>
    );
}
