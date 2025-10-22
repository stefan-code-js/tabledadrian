import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MemberNav from "@/components/members/MemberNav";
import SignOutButton from "@/components/auth/SignOutButton";

const navItems = [
    { label: "Overview", href: "/members" },
    { label: "Recipes Vault", href: "/members/recipes" },
    { label: "Alchemy Collectibles", href: "/alchemy-collectibles" },
    { label: "Brand Assets", href: "/brand-assets" },
];

export default async function MembersLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const headersList = await headers();
    const rawUrl = headersList.get("next-url") ?? "/members";
    let callbackUrl = "/members";
    try {
        const parsed = new URL(rawUrl, "https://example.org");
        callbackUrl = parsed.pathname + parsed.search;
    } catch {
        callbackUrl = rawUrl.startsWith("/") ? rawUrl : "/members";
    }

    if (!session?.user?.email) {
        redirect(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    }

    const firstName = session.user?.name?.split(" ")[0] ?? "Member";

    return (
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 text-ink lg:px-0">
            <header className="space-y-6 rounded-[2.75rem] border border-[var(--line-soft)] bg-paper-soft/70 px-10 py-10 shadow-xl">
                <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Welcome back</p>
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-serif text-accent">Bonjour, {firstName}</h1>
                        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
                            Your culinary alchemy dossier is refreshed with new recipes, collectible tiers, and concierge
                            intel curated for the week&apos;s engagements.
                        </p>
                    </div>
                    <SignOutButton className="btn ghost text-xs uppercase tracking-[0.35em]" />
                </div>
                <MemberNav items={navItems} />
            </header>
            <div>{children}</div>
        </section>
    );
}
