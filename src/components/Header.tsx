import Link from "next/link";
import { navLinks } from "@/data/siteContent";

export default function Header() {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link href="/" className="site-header__brand" aria-label="Table d’Adrian — home">
                    Table d’Adrian
                </Link>
                <nav className="site-nav" aria-label="Primary">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
