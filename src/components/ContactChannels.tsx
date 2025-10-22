import React from "react";
import Link from "next/link";

const channels = [
    {
        label: "Concierge desk",
        detail: "concierge@tabledadrian.com",
        href: "mailto:concierge@tabledadrian.com",
        description: "24/7 response for active households across Monaco, NYC, Dubai, and London.",
    },
    {
        label: "Residency hotline",
        detail: "+33 4 22 13 92 10",
        href: "tel:+33422139210",
        description: "Expedited logistics for yacht and chalet residencies, available in English and French.",
    },
    {
        label: "Press & collaborations",
        detail: "press@tabledadrian.com",
        href: "mailto:press@tabledadrian.com",
        description: "Interview requests, media kits, and philanthropic collaborations.",
    },
];

const quickLinks = [
    { label: "Book a table", href: "/book" },
    { label: "Review collectibles", href: "/alchemy-collectibles" },
    { label: "Member login", href: "/auth/login" },
    { label: "Request access", href: "/auth/register" },
];

export default function ContactChannels() {
    return (
        <section className="space-y-8 rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-8 text-ink shadow-lg">
            <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Direct concierge lines</p>
                <h2 className="text-2xl font-serif text-accent">Speak with the atelier</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
                {channels.map((channel) => (
                    <div key={channel.label} className="rounded-2xl border border-[var(--line-hairline)] bg-paper/30 p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">{channel.label}</p>
                        <a
                            className="mt-2 block text-lg font-semibold text-ink underline decoration-dotted underline-offset-4 focus-visible:outline-accent"
                            href={channel.href}
                        >
                            {channel.detail}
                        </a>
                        <p className="mt-2 text-sm text-ink-soft">{channel.description}</p>
                    </div>
                ))}
            </div>
            <div className="rounded-2xl border border-[var(--line-hairline)] bg-paper/30 p-6 text-sm text-ink-soft">
                <p className="font-semibold text-ink">Quick links</p>
                <div className="mt-3 flex flex-wrap gap-3">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-2xl border border-[var(--line-soft)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent focus-visible:outline-accent"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
