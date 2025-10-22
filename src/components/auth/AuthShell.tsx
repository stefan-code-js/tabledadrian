"use client";

import React from "react";
import { motion } from "framer-motion";

type AuthShellProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    accent?: string;
};

export default function AuthShell({ title, subtitle, children, accent = "member" }: AuthShellProps) {
    return (
        <motion.section
            className="relative mx-auto flex w-full max-w-4xl flex-col gap-10 rounded-[2.75rem] border border-[var(--line-soft)] bg-paper-soft/80 px-10 py-12 text-ink shadow-2xl backdrop-blur"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="space-y-4 text-center">
                <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Alchemy Access</p>
                <h1 className="text-4xl font-serif text-accent">{title}</h1>
                <p className="mx-auto max-w-2xl text-sm text-ink-soft">{subtitle}</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-6">{children}</div>
                <aside className="hidden rounded-3xl border border-[var(--line-hairline)] bg-gradient-to-b from-paper/60 to-paper-soft/20 p-8 text-left lg:block">
                    <p className="text-xs uppercase tracking-[0.3em] text-ink-soft mb-3">Privileges</p>
                    <ul className="space-y-3 text-sm leading-relaxed text-ink-soft">
                        <li>✔ Recipes curated for wellness-forward private dining.</li>
                        <li>✔ Invitations to alchemical salons and vault tastings.</li>
                        <li>✔ Badge progression to unlock bespoke concierge rituals.</li>
                        <li>✔ First access to collectible drops and seasonal voyages.</li>
                    </ul>
                    <p className="mt-6 text-xs uppercase tracking-[0.35em] text-accent">Status</p>
                    <p className="mt-2 text-lg font-semibold text-ink">{accent === "vip" ? "VIP Patron" : "Circle Member"}</p>
                </aside>
            </div>
        </motion.section>
    );
}
