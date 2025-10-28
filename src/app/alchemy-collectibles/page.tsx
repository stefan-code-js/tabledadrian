import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/StaticImage";
import { fetchCollectibleTiers, fetchCollectibleSupply } from "@/data/collectibles";
import CollectibleVerifier from "@/components/collectibles/CollectibleVerifier";
import CollectibleMintFeed from "@/components/collectibles/CollectibleMintFeed";
import CollectibleSupplyStatus from "@/components/collectibles/CollectibleSupplyStatus";
import CollectibleMintConsole from "@/components/web3/CollectibleMintConsole";
import MultiChainQuoteWidget from "@/components/web3/MultiChainQuoteWidget";

export const metadata: Metadata = {
    title: "Alchemy Collectibles | Table d'Adrian",
    description:
        "Explore the Alchemy collectible tiers unlocking recipes, salons, and bespoke concierge experiences across the globe.",
};

export default async function AlchemyCollectiblesPage() {
    const [collectibleTiers, supply] = await Promise.all([
        fetchCollectibleTiers(),
        fetchCollectibleSupply(),
    ]);
    return (
        <article className="editorial-page">
            <header className="page-cover">
                <div className="page-cover__body">
                    <span className="page-eyebrow">Alchemy collectibles</span>
                    <h1 className="page-heading">Digital keys to the Table d&apos;Adrian universe</h1>
                    <p className="page-subheading">
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
                </div>
            </header>

            <section className="page-grid page-grid--three">
                {collectibleTiers.map((tier) => (
                    <article key={tier.id} className="page-card page-card--stack collectible-card">
                        <div className="collectible-card__media">
                            <Image
                                src={tier.artwork}
                                alt={tier.name}
                                fill
                                className="collectible-card__image"
                                sizes="(min-width: 1024px) 320px, 100vw"
                                priority={false}
                            />
                        </div>
                        <div className="page-card__meta">
                            <span>Edition of {tier.editionSize}</span>
                            <span>Mint price {tier.mintPriceEth} ETH</span>
                        </div>
                        <h2 className="page-card__title">{tier.name}</h2>
                        <p className="page-card__body">{tier.headline}</p>
                        <div className="collectible-benefits">
                            {tier.benefits.map((benefit) => (
                                <div key={`${tier.id}-${benefit}`} className="collectible-benefit-card">
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </section>

            <div className="page-surface">
                <CollectibleSupplyStatus {...supply} />
            </div>

            <div className="page-surface">
                <CollectibleMintConsole />
            </div>

            <div className="page-surface">
                <CollectibleVerifier />
            </div>

            <div className="page-surface">
                <CollectibleMintFeed />
            </div>

            <div className="page-surface">
                <MultiChainQuoteWidget defaultAmount={45000} />
            </div>

            <section className="page-surface">
                <h2 className="page-card__title">Mint guidance</h2>
                <p className="page-card__body">
                    Mint directly through the concierge desk or connect with our preferred partner desks across Monaco, Dubai,
                    and London. Each collectible is soul-bound for 72 hours after mint to prevent trading during onboarding.
                </p>
                <p className="page-card__body">
                    Need a bespoke briefing?{" "}
                    <Link href="/contact?context=collectibles" className="text-link">
                        Contact the concierge
                    </Link>
                    .
                </p>
            </section>
        </article>
    );
}
