import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/StaticImage";
import { fetchCollectibleTiers } from "@/data/collectibles";
import CollectibleVerifier from "@/components/collectibles/CollectibleVerifier";

export const metadata: Metadata = {
    title: "Alchemy Collectibles | Table d'Adrian",
    description:
        "Explore the Alchemy collectible tiers unlocking recipes, salons, and bespoke concierge experiences across the globe.",
};

export default async function AlchemyCollectiblesPage() {
    const collectibleTiers = await fetchCollectibleTiers();
    return (
        <article className="space-y-12 pb-16">
            <header className="rounded-[2.75rem] border border-[var(--line-soft)] bg-paper-soft/70 px-10 py-12 shadow-xl">
                <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Alchemy Collectibles</p>
                <h1 className="mt-4 text-4xl font-serif text-accent">Digital keys to the Table d&apos;Adrian universe</h1>
                <p className="mt-3 max-w-3xl text-sm text-ink-soft">
                    Each collectible is a covenant of service—unlocking cinematic menus, yacht residencies, wellness chemistry,
                    and invitations to the Alchemist&apos;s salons hosted across Monaco, Dubai, London, and New York.
                </p>
                <div className="collectible-meta-strip">
                    <span className="collectible-pill">Supply limited · Utility driven</span>
                    <span className="collectible-pill">
                        On-chain at {process.env.ZORA_CONTRACT_ADDRESS ?? "ZORA contract"}
                    </span>
                    <span className="collectible-pill">Royalties power member residencies</span>
                </div>
            </header>

            <section className="grid gap-8 lg:grid-cols-3">
                {collectibleTiers.map((tier) => (
                    <div
                        key={tier.id}
                        className="flex h-full flex-col rounded-3xl border border-[var(--line-hairline)] bg-paper/50 p-6 shadow-lg"
                    >
                        <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-paper/40">
                            <Image
                                src={tier.artwork}
                                alt={tier.name}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 320px, 100vw"
                                priority={false}
                            />
                        </div>
                        <div className="mt-6 flex flex-1 flex-col gap-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Edition of {tier.editionSize}</p>
                            <h2 className="text-2xl font-serif text-ink">{tier.name}</h2>
                            <p className="text-sm text-ink-soft">{tier.headline}</p>
                            <div className="collectible-benefits">
                                {tier.benefits.map((benefit) => (
                                    <div key={`${tier.id}-${benefit}`} className="collectible-benefit-card">
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-auto rounded-2xl border border-[var(--line-hairline)] bg-paper/30 px-4 py-3 text-xs uppercase tracking-[0.3em] text-ink">
                                Mint price {tier.mintPriceEth} ETH
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <CollectibleVerifier />

            <section className="rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-6 text-sm text-ink-soft">
                <p className="font-semibold text-ink">Mint guidance</p>
                <p className="mt-2">
                    Mint directly through the concierge desk or connect with our preferred partner desks across Monaco, Dubai,
                    and London. Each collectible is soul-bound for 72 hours after mint to prevent trading during onboarding.
                </p>
                <p className="mt-4">
                    Need a bespoke briefing?{" "}
                    <Link href="/contact?context=collectibles" className="text-accent underline focus-visible:outline-accent">
                        Contact the concierge
                    </Link>
                    .
                </p>
            </section>
        </article>
    );
}
