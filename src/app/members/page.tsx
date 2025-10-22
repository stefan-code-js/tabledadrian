import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { walletIsCollectibleHolder } from "@/lib/collectibles";
import { collectibleTiers } from "@/data/collectibles";

export const metadata: Metadata = {
    title: "Member Atelier | Table d'Adrian",
    description: "Your private gateway to recipes, collectibles, and concierge alerts.",
};

export default async function MembersHomePage() {
    const session = await auth();
    const walletAddress = session?.user?.walletAddress ?? null;
    const hasCollectible = await walletIsCollectibleHolder(walletAddress);
    const primaryTier = collectibleTiers[0];

    return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <section className="space-y-6 rounded-3xl border border-[var(--line-hairline)] bg-paper-soft/60 p-8 shadow-lg">
                <h2 className="text-2xl font-serif text-accent">This week&apos;s alchemy brief</h2>
                <p className="text-sm text-ink-soft">
                    Dive into the refreshed recipe vault and claim your collectible privileges. Chef Adrian and Dr. Antonia
                    have designed this week&apos;s menus for circadian realignment and yacht residencies along the Côte d&apos;Azur.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-[var(--line-hairline)] bg-paper/50 p-6">
                        <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">Status</p>
                        <p className="mt-3 text-lg font-semibold text-ink">
                            {hasCollectible ? "Collectible verified" : "Awaiting collectible verification"}
                        </p>
                        <p className="mt-2 text-sm text-ink-soft">
                            {hasCollectible
                                ? "Your wallet unlocks the full recipe vault and salon invitations."
                                : "Verify or mint an Alchemy collectible to open the entire vault."}
                        </p>
                        <Link
                            href="/alchemy-collectibles"
                            className="mt-4 inline-flex items-center rounded-xl border border-[var(--line-soft)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent focus-visible:outline-accent"
                        >
                            View collectibles
                        </Link>
                    </div>
                    <div className="rounded-2xl border border-[var(--line-hairline)] bg-paper/50 p-6">
                        <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">Next experience</p>
                        <p className="mt-3 text-lg font-semibold text-ink">{primaryTier.name}</p>
                        <p className="mt-2 text-sm text-ink-soft">{primaryTier.headline}</p>
                        <ul className="mt-3 space-y-2 text-xs text-ink-soft">
                            {primaryTier.benefits.slice(0, 2).map((benefit) => (
                                <li key={benefit}>• {benefit}</li>
                            ))}
                        </ul>
                        <Link
                            href="/members/recipes"
                            className="mt-4 inline-flex items-center rounded-xl border border-[var(--line-soft)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent focus-visible:outline-accent"
                        >
                            Explore recipes
                        </Link>
                    </div>
                </div>
            </section>
            <aside className="space-y-4 rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-6 shadow">
                <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Concierge alerts</p>
                <div className="space-y-3 text-sm text-ink-soft">
                    <p>
                        • Midnight atelier salon in Monaco, Nov 12 — holders of Noir Constellation unlock a two-seat tasting.
                    </p>
                    <p>• Wellness residency blueprint drop arriving Friday 18:00 CET (Recipes Vault).</p>
                    <p>• Submit concierge briefs via{" "}
                        <Link href="/contact" className="text-accent underline focus-visible:outline-accent">
                            bespoke contact
                        </Link>{" "}
                        for December yacht tours.
                    </p>
                </div>
            </aside>
        </div>
    );
}
