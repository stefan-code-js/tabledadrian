import Image from "@/components/StaticImage";
import { fetchRecentCollectibleMints } from "@/data/collectibles";

function maskAddress(address: string): string {
    if (address.length <= 10) {
        return address;
    }
    return `${address.slice(0, 6)}···${address.slice(-4)}`;
}

function formatMintedAt(value?: string | null): string {
    if (!value) {
        return "Mint time confidential";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "Mint time confidential";
    }
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
    }).format(date);
}

export default async function CollectibleMintFeed() {
    const mints = await fetchRecentCollectibleMints(6);

    if (mints.length === 0) {
        return null;
    }

    return (
        <section className="collectible-mint-feed">
            <div className="collectible-mint-feed__header">
                <span className="page-eyebrow">Live ledger</span>
                <h2 className="page-heading">Recent Alchemy mints</h2>
                <p className="page-subheading">
                    Transparency from atelier to chain—verify the newest keys unlocking member residencies, tasting salons, and
                    web3 concierge rituals.
                </p>
            </div>
            <div className="collectible-mint-feed__grid">
                {mints.map((mint) => (
                    <article key={`${mint.tokenId}-${mint.owner}`} className="collectible-mint-card">
                        <div className="collectible-mint-card__media">
                            <Image
                                src={mint.image}
                                alt={mint.name}
                                fill
                                className="collectible-mint-card__image"
                                sizes="(min-width: 1024px) 320px, 100vw"
                            />
                        </div>
                        <div className="collectible-mint-card__meta">
                            <span className="collectible-mint-card__token">Token #{mint.tokenId}</span>
                            <span className="collectible-mint-card__owner">{maskAddress(mint.owner)}</span>
                        </div>
                        <h3 className="collectible-mint-card__title">{mint.name}</h3>
                        <p className="collectible-mint-card__timestamp">{formatMintedAt(mint.mintedAt)}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
