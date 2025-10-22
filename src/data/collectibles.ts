import tiers from "../../content/collectibles/tiers.json";

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

export const collectibleTiers = tiers as CollectibleTier[];
