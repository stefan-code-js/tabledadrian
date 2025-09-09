'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { site } from '@/lib/site';

type Item = { href: string; label: string };

const nav: Item[] = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/menu', label: 'menu' },
    { href: '/book', label: 'book' },
    { href: '/team', label: 'team' },
    // add later: { href: '/journal', label: 'journal' }, { href:'/members', label:'members' }
];

export default function Header() {
    const pathname = usePathname();

    return (
        <motion.header
            className="header"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            <div className="container" style={{ textAlign: 'center' }}>
                <Link href="/" aria-label={`${site.name} — home`} className="logo">
                    {site.shortName}
                </Link>

                <nav className="nav" aria-label="Main">
                    {nav.map((item) => {
                        const active =
                            item.href === '/'
                                ? pathname === '/'
                                : pathname?.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                            >
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </motion.header>
    );
}
