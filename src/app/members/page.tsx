import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { walletIsCollectibleHolder, listCollectibleTiers } from "@/lib/collectibles";
import { fetchPoapAttendances, fetchUnlockStatus } from "@/lib/access";
import MemberProfileCard from "@/components/members/MemberProfileCard";
import ConciergeBriefForm from "@/components/members/ConciergeBriefForm";
import WalletConnectControl from "@/components/web3/WalletConnectControl";
import { findMemberByEmail } from "@/lib/members";

export const metadata: Metadata = {
    title: "Member Atelier | Table d'Adrian",
    description: "Your private gateway to recipes, collectibles, and concierge alerts.",
};

function formatUnlockExpiration(expiration?: string | null): string | null {
    if (!expiration) {
        return null;
    }
    const date = new Date(expiration);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

function formatPoapDate(value?: string | null): string | null {
    if (!value) {
        return null;
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

export default async function MembersHomePage() {
    const session = await auth();
    const walletAddress = session?.user?.walletAddress ?? null;
    const hasCollectible = await walletIsCollectibleHolder(walletAddress);
    const [tiers, unlockStatus, poapAttendances] = await Promise.all([
        listCollectibleTiers(),
        fetchUnlockStatus(walletAddress),
        fetchPoapAttendances(walletAddress),
    ]);
    const primaryTier = tiers.length > 0 ? tiers[0] : null;
    const memberRecord = session?.user?.email ? await findMemberByEmail(session.user.email) : undefined;
    const roles = session?.user?.roles ?? memberRecord?.roles ?? ["member"];
    const unlockExpiryLabel = formatUnlockExpiration(unlockStatus?.expiration);

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
                            <div className="member-wallet-inline">
                                <WalletConnectControl className="member-wallet-inline__button" />
                            </div>
                            {unlockStatus ? (
                                <div
                                    className={`member-access-chip${unlockStatus.hasKey ? " member-access-chip--active" : ""}`}
                                >
                                    {unlockStatus.hasKey
                                        ? `Unlock key active${unlockExpiryLabel ? ` · until ${unlockExpiryLabel}` : ""}`
                                        : "Unlock key pending"}
                                </div>
                            ) : null}
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
                    {poapAttendances.length > 0 ? (
                        <div className="member-poap">
                            <p className="member-poap__title">POAP activations</p>
                            <ul className="member-poap__list">
                                {poapAttendances.map((poap) => {
                                    const mintedLabel = formatPoapDate(poap.mintedAt);
                                    return (
                                        <li key={`${poap.eventId}-${poap.eventName}`} className="member-poap__item">
                                            <span className="member-poap__event">{poap.eventName}</span>
                                            {mintedLabel ? (
                                                <span className="member-poap__date">{mintedLabel}</span>
                                            ) : null}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : null}
                </aside>
            </div>

            <div className="page-surface">
                <ConciergeBriefForm />
            </div>
        </div>
    );
}



