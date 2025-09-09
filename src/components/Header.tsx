'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const el = document.documentElement;
        if (open) el.classList.add('no-scroll');
        else el.classList.remove('no-scroll');
        return () => el.classList.remove('no-scroll');
    }, [open]);

    const links = [
        { href: '/', label: 'home' },
        { href: '/about', label: 'about' },
        { href: '/menu', label: 'menu' },
        { href: '/team', label: 'team' },
        { href: '/book', label: 'book' },
    ];

    return (
        <div className="header-inner">
            <Link href="/" className="logo" aria-label="Table d’Adrian">Table d’Adrian</Link>

            {/* Desktop nav */}
            <nav className="nav nav--desktop" aria-label="Primary">
                {links.map((l) => (
                    <Link key={l.href} href={l.href}>{l.label}</Link>
                ))}
            </nav>

            {/* Burger button (mobile/tablet) */}
            <button
                className="burger"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
            >
        <span className="burger__box">
          <span className="burger__line" />
          <span className="burger__line" />
          <span className="burger__line" />
        </span>
            </button>

            {/* Drawer */}
            <div className={`drawer ${open ? 'is-open' : ''}`} id="mobile-menu">
                <button className="drawer__scrim" aria-label="Close menu" onClick={() => setOpen(false)} />
                <div className="drawer__panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
                    <nav className="drawer__nav" onClick={() => setOpen(false)}>
                        {links.map((l) => (
                            <Link key={l.href} href={l.href}>{l.label}</Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
