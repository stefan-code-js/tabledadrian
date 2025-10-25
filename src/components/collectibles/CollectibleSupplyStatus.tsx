import type { CollectibleSupply } from "@/data/collectibles";

function formatNumber(value: number): string {
    return new Intl.NumberFormat("en", { maximumFractionDigits: 0 }).format(value);
}

export default function CollectibleSupplyStatus({ minted, totalEditionSize }: CollectibleSupply) {
    const clampedTotal = totalEditionSize > 0 ? totalEditionSize : minted;
    const progress = clampedTotal > 0 ? Math.min(100, Math.round((minted / clampedTotal) * 100)) : 0;
    const mintedLabel = formatNumber(minted);
    const totalLabel = formatNumber(clampedTotal);
    const statusLabel = progress >= 100 ? "Fully allocated" : `${progress}% allocated`;

    return (
        <section className="collectible-supply">
            <div className="collectible-supply__header">
                <span className="page-eyebrow">Mint status</span>
                <h2 className="page-heading">Alchemy drop progress</h2>
                <p className="page-subheading">
                    Allocation across Aurum, Noir, and Celeste tiers updates from on-chain data every few minutes.
                </p>
            </div>
            <div className="collectible-supply__meter" role="img" aria-label={`Minted ${mintedLabel} of ${totalLabel}`}>
                <div className="collectible-supply__meter-track">
                    <div className="collectible-supply__meter-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>
            <dl className="collectible-supply__stats">
                <div>
                    <dt>Minted</dt>
                    <dd>{mintedLabel}</dd>
                </div>
                <div>
                    <dt>Edition size</dt>
                    <dd>{totalLabel}</dd>
                </div>
                <div>
                    <dt>Status</dt>
                    <dd>{statusLabel}</dd>
                </div>
            </dl>
            <p className="collectible-supply__note">
                Data provided by Alchemy. Supply falls back to concierge registry when blockchain access is unavailable.
            </p>
        </section>
    );
}
