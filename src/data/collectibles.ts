import { cache } from "react";
import { listCollectibleTiers } from "@/lib/collectibles";

const alchemyKey =
    process.env.ALCHEMY_NFT_API_KEY ?? process.env.ALCHEMY_API_KEY ?? process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? null;
const alchemyNetwork = process.env.ALCHEMY_NETWORK ?? process.env.NEXT_PUBLIC_ALCHEMY_NETWORK ?? "eth-mainnet";
const collectibleContract = process.env.ZORA_CONTRACT_ADDRESS ?? process.env.NEXT_PUBLIC_COLLECTIBLES_CONTRACT ?? null;

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

export type CollectibleMint = {
    tokenId: string;
    owner: string;
    image: string;
    name: string;
    mintedAt?: string | null;
};

export const FALLBACK_MINTS: CollectibleMint[] = [
    {
        tokenId: "88",
        owner: "0x9e8aa5728b2cba33f8a7d1a31ccaa6b9c39f5c12",
        image: "/media/chapter-atelier.svg",
        name: "Aurum Sigil #88",
        mintedAt: "2024-10-04T19:22:00Z",
    },
    {
        tokenId: "21",
        owner: "0x1f2aa3d0e2cd0f2c0d0b9a566a0634eb77a4243f",
        image: "/media/chapter-salon.svg",
        name: "Noir Constellation #21",
        mintedAt: "2024-09-18T11:09:00Z",
    },
    {
        tokenId: "07",
        owner: "0x0000a975a9e0ddec9dce78bb1e05f87362f4af11",
        image: "/media/chapter-table.svg",
        name: "Celeste Codex #07",
        mintedAt: "2024-08-29T08:45:00Z",
    },
];

export function mapAlchemyCollectibleRecord(item: Record<string, unknown>): CollectibleMint | null {
    const tokenId = typeof item.tokenId === "string" ? item.tokenId : typeof item.id === "string" ? item.id : null;
    const owner = typeof item.owner === "string" ? item.owner : typeof item.ownerAddress === "string" ? item.ownerAddress : null;
    const metadataSource = item as {
        metadata?: { image?: string; name?: string };
        rawMetadata?: { image?: string; name?: string };
    };
    const metadata = metadataSource.metadata ?? metadataSource.rawMetadata;
    const media = (item as { media?: Array<{ gateway?: string }> }).media;
    let image = typeof metadata?.image === "string" ? metadata.image : undefined;
    if (!image && Array.isArray(media) && typeof media[0]?.gateway === "string") {
        image = media[0].gateway;
    }
    if (image && image.startsWith("ipfs://")) {
        image = `https://ipfs.io/ipfs/${image.slice(7)}`;
    }
    let title: string | undefined = typeof metadata?.name === "string" ? metadata.name : undefined;
    if (!title && typeof (item as { name?: unknown }).name === "string") {
        title = (item as { name?: string }).name!;
    }
    if (!title && typeof (item as { title?: unknown }).title === "string") {
        title = (item as { title?: string }).title!;
    }
    if (!title && tokenId) {
        title = `Collectible #${tokenId}`;
    }
    if (!title) {
        title = "Collectible";
    }
    const mintedAt = (() => {
        const timestamp = (item as { timeLastUpdated?: string }).timeLastUpdated ??
            (item as { mintInfo?: { blockTimestamp?: string } }).mintInfo?.blockTimestamp ??
            (item as { mintedAt?: string }).mintedAt;
        if (typeof timestamp === "string") {
            return timestamp;
        }
        return null;
    })();

    if (!tokenId || !owner) {
        return null;
    }

    return {
        tokenId,
        owner,
        image: image ?? "/media/chapter-atelier.svg",
        name: title,
        mintedAt,
    };
}

export const fetchRecentCollectibleMints = cache(async (limit = 6): Promise<CollectibleMint[]> => {
    if (!alchemyKey || !collectibleContract) {
        return FALLBACK_MINTS.slice(0, limit);
    }

    const endpoint = new URL(`https://${alchemyNetwork}.g.alchemy.com/nft/v3/${alchemyKey}/getNFTsForCollection`);
    endpoint.searchParams.set("contractAddress", collectibleContract);
    endpoint.searchParams.set("withMetadata", "true");
    endpoint.searchParams.set("startToken", "0");
    endpoint.searchParams.set("limit", String(Math.max(1, Math.min(limit, 20))));

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: { Accept: "application/json" },
            next: { revalidate: 120 },
        });
        if (!response.ok) {
            throw new Error(`Unexpected response ${response.status}`);
        }
        const payload = (await response.json()) as { nfts?: Record<string, unknown>[] };
        const records = Array.isArray(payload.nfts) ? payload.nfts : [];
        const mapped = records
            .map((item) => mapAlchemyCollectibleRecord(item))
            .filter((mint): mint is CollectibleMint => Boolean(mint));
        if (mapped.length === 0) {
            return FALLBACK_MINTS.slice(0, limit);
        }
        return mapped.slice(0, limit);
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Unable to fetch collectible mints", error);
        }
        return FALLBACK_MINTS.slice(0, limit);
    }
});

export type CollectibleSupply = {
    minted: number;
    totalEditionSize: number;
};

function resolveFallbackSupply(totalEditionSize: number): CollectibleSupply {
    const normalizedTotal = totalEditionSize > 0 ? totalEditionSize : FALLBACK_MINTS.length;
    const fallbackMinted = Math.min(FALLBACK_MINTS.length, normalizedTotal);
    return {
        minted: fallbackMinted,
        totalEditionSize: normalizedTotal,
    } satisfies CollectibleSupply;
}

export const fetchCollectibleSupply = cache(async (): Promise<CollectibleSupply> => {
    const tiers = await listCollectibleTiers();
    const totalEditionSize = tiers.reduce((sum, tier) => sum + tier.editionSize, 0);
    const fallbackSupply = resolveFallbackSupply(totalEditionSize);

    if (!alchemyKey || !collectibleContract) {
        return fallbackSupply;
    }

    const endpoint = new URL(`https://${alchemyNetwork}.g.alchemy.com/nft/v3/${alchemyKey}/getNFTsForCollection`);
    endpoint.searchParams.set("contractAddress", collectibleContract);
    endpoint.searchParams.set("withMetadata", "false");
    endpoint.searchParams.set("startToken", "0");
    endpoint.searchParams.set("limit", "1");

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: { Accept: "application/json" },
            next: { revalidate: 180 },
        });

        if (!response.ok) {
            throw new Error(`Unexpected response ${response.status}`);
        }

        const payload = (await response.json()) as { totalCount?: number };
        const mintedCount =
            typeof payload.totalCount === "number" && Number.isFinite(payload.totalCount)
                ? Math.max(0, Math.floor(payload.totalCount))
                : fallbackSupply.minted;
        const total = fallbackSupply.totalEditionSize > 0
            ? Math.max(fallbackSupply.totalEditionSize, mintedCount)
            : Math.max(mintedCount, fallbackSupply.totalEditionSize);

        return {
            minted: mintedCount,
            totalEditionSize: total > 0 ? total : mintedCount || fallbackSupply.totalEditionSize,
        } satisfies CollectibleSupply;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Unable to fetch collectible supply", error);
        }
        return fallbackSupply;
    }
});
