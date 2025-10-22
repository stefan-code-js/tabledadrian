import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { walletIsCollectibleHolder, listCollectibleTiers } from "@/lib/collectibles";
import MemberProfileCard from "@/components/members/MemberProfileCard";
import { findMemberByEmail } from "@/lib/members";

export const metadata: Metadata = {
    title: "Member Atelier | Table d'Adrian",
    description: "Your private gateway to recipes, collectibles, and concierge alerts.",
};

export default async function MembersHomePage() {
    const session = await auth();
    const walletAddress = session?.user?.walletAddress ?? null;
    const hasCollectible = await walletIsCollectibleHolder(walletAddress);
    const tiers = await listCollectibleTiers();
    const primaryTier = tiers.length > 0 ? tiers[0] : null;
    const memberRecord = session?.user?.email ? await findMemberByEmail(session.user.email) : undefined;
    const roles = session?.user?.roles ?? memberRecord?.roles ?? ["member"];

    return (
        <div className="space-y-8">
            <MemberProfileCard
                name={session?.user?.name}
                email={session?.user?.email}
                roles={roles}
                createdAt={memberRecord?.createdAt}
                hasCollectible={hasCollectible}
                walletAddress={walletAddress}
            />

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                <section className="space-y-6 rounded-3xl border border-[var(--line-hairline)] bg-paper-soft/60 p-8 shadow-lg">
                    <h2 className="text-2xl font-serif text-accent">This week&apos;s alchemy brief</h2>
                    <p className="text-sm text-ink-soft">
                        Dive into the refreshed recipe vault and claim your collectible privileges. Chef Adrian and Dr. Antonia
                        have designed this week&apos;s menus for circadian realignment and yacht residencies along the Cote d&apos;Azur.
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
                            {primaryTier ? (
                                <>
                                    <p className="mt-3 text-lg font-semibold text-ink">{primaryTier.title}</p>
                                    <p className="mt-2 text-sm text-ink-soft">{primaryTier.headline}</p>
                                    <div className="mt-3 space-y-2">
                                        {primaryTier.perks.slice(0, 2).map((benefit) => (
                                            <div key={benefit} className="member-mini-card">
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="mt-2 text-sm text-ink-soft">
                                    Collectible tiers are calibrating. Consult the concierge for the latest release window.
                                </p>
                            )}
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
                    <div className="space-y-3">
                        <div className="member-alert-card">
                            <p className="member-alert-card__title">Monaco midnight atelier</p>
                            <p className="member-alert-card__body">
                                Holders of Noir Constellation unlock a two-seat tasting on 12 November with restorative nocturnal tonics.
                            </p>
                        </div>
                        <div className="member-alert-card">
                            <p className="member-alert-card__title">Residency blueprint drop</p>
                            <p className="member-alert-card__body">
                                Wellness residency itineraries publish Friday at 18:00 CET inside the recipes vault.
                            </p>
                        </div>
                        <div className="member-alert-card">
                            <p className="member-alert-card__title">December yacht tours</p>
                            <p className="member-alert-card__body">
                                Submit concierge briefs via{" "}
                                <Link href="/contact" className="text-accent underline focus-visible:outline-accent">
                                    bespoke contact
                                </Link>{" "}
                                to secure provisioning windows.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}



