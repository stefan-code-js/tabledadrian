"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    label: string;
    href: string;
};

type Props = {
    items: NavItem[];
};

export default function MemberNav({ items }: Props) {
    const pathname = usePathname();
    return (
        <nav className="flex flex-wrap gap-2 rounded-2xl border border-[var(--line-hairline)] bg-paper/50 p-2">
            {items.map((item) => {
                const active = pathname === item.href || (item.href !== "/members" && pathname?.startsWith(item.href));
                const base =
                    "rounded-2xl px-4 py-2 text-xs uppercase tracking-[0.3em] transition-colors focus-visible:outline-accent";
                const palette = active ? "bg-accent text-paper" : "text-ink-soft hover:text-ink";
                return (
                    <Link key={item.href} href={item.href} className={`${base} ${palette}`}>
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
