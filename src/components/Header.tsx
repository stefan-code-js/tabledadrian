"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/siteContent";

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="site-header" role="banner">
            <div className="header-inner">
                <Link href="/" className="brand" aria-label="Table d’Adrian — home">
                    Table d’Adrian
                </Link>

                <nav className="primary-nav" aria-label="Primary">
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
            </div>
        </header>
    );
}
