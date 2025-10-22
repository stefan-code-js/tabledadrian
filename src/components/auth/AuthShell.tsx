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
                <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Account Access</p>
                <h1 className="text-4xl font-serif text-accent">{title}</h1>
                <p className="mx-auto max-w-2xl text-sm text-ink-soft">{subtitle}</p>
            </div>
            <div className="grid gap-8 justify-items-center lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:justify-items-start">
                <div className="space-y-6 w-full max-w-xl">{children}</div>
                <aside className="hidden rounded-3xl border border-[var(--line-hairline)] bg-gradient-to-b from-paper/60 to-paper-soft/20 p-8 text-left lg:block">
                    <p className="text-xs uppercase tracking-[0.3em] text-ink-soft mb-3">Privileges</p>
                    <div className="space-y-3 text-sm leading-relaxed text-ink-soft">
                        <div className="auth-privilege-card">Personalized menu briefs archived for your household.</div>
                        <div className="auth-privilege-card">Concierge follow-ups and wellness-focused pairing notes.</div>
                        <div className="auth-privilege-card">Priority scheduling across Monaco, New York, Dubai, and London.</div>
                        <div className="auth-privilege-card">Secure itinerary history and billing confirmations.</div>
                    </div>
                    <p className="mt-6 text-xs uppercase tracking-[0.35em] text-accent">Status</p>
                    <p className="mt-2 text-lg font-semibold text-ink">{accent === "vip" ? "VIP Patron" : "Circle Member"}</p>
                </aside>
            </div>
        </motion.section>
    );
}
