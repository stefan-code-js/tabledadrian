import { listCollectibleTiers } from "@/lib/collectibles";

export type CollectibleTier = {
    id: string;
    name: string;
    headline: string;
    description: string;
    editionSize: number;
    mintPriceEth: string;
    artwork: string;
    benefits: string[];
};

export async function fetchCollectibleTiers(): Promise<CollectibleTier[]> {
    const tiers = await listCollectibleTiers();
    return tiers.map((tier) => ({
        id: tier.id,
        name: tier.title,
        headline: tier.headline,
        description: tier.description,
        editionSize: tier.editionSize,
        mintPriceEth: tier.mintPriceEth,
        artwork: tier.artwork,
        benefits: tier.perks,
    }));
}
