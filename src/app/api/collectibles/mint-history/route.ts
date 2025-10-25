import { NextResponse } from "next/server";
import { z } from "zod";
import {
    FALLBACK_MINTS,
    mapAlchemyCollectibleRecord,
    type CollectibleMint,
} from "@/data/collectibles";
import { listCollectibleHolders } from "@/lib/collectibles";

const alchemyKey =
    process.env.ALCHEMY_NFT_API_KEY ?? process.env.ALCHEMY_API_KEY ?? process.env.NEXT_PUBLIC_ALCHEMY_KEY ?? null;
const alchemyNetwork = process.env.ALCHEMY_NETWORK ?? process.env.NEXT_PUBLIC_ALCHEMY_NETWORK ?? "eth-mainnet";
const collectibleContract = process.env.ZORA_CONTRACT_ADDRESS ?? process.env.NEXT_PUBLIC_COLLECTIBLES_CONTRACT ?? null;

type MintHistoryToken = {
    tokenId: string;
    name: string;
    image: string;
    mintedAt?: string | null;
};

type MintHistoryResponse = {
    tokens: MintHistoryToken[];
    total: number;
    source: "live" | "fallback";
};

const querySchema = z.object({
    walletAddress: z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/, "Wallet address must be a 42-character hex string."),
});

function toHistoryToken(record: CollectibleMint): MintHistoryToken {
    return {
        tokenId: record.tokenId,
        name: record.name,
        image: record.image,
        mintedAt: record.mintedAt,
    } satisfies MintHistoryToken;
}

async function fallbackResponseForWallet(walletAddress: string): Promise<MintHistoryResponse> {
    const normalized = walletAddress.toLowerCase();
    const fallbackMatches = FALLBACK_MINTS.filter((mint) => mint.owner.toLowerCase() === normalized).map(toHistoryToken);

    if (fallbackMatches.length > 0) {
        return { tokens: fallbackMatches, total: fallbackMatches.length, source: "fallback" } satisfies MintHistoryResponse;
    }

    try {
        const holders = await listCollectibleHolders();
        const hasRegistryRecord = holders.some((holder) => holder.toLowerCase() === normalized);
        if (hasRegistryRecord) {
            return {
                tokens: [
                    {
                        tokenId: "registry",
                        name: "Concierge registry access key",
                        image: "/media/chapter-atelier.svg",
                        mintedAt: null,
                    },
                ],
                total: 1,
                source: "fallback",
            } satisfies MintHistoryResponse;
        }
    } catch (error) {
        console.warn("Unable to load concierge registry fallback", error);
    }

    return { tokens: [], total: 0, source: "fallback" } satisfies MintHistoryResponse;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const walletParam = url.searchParams.get("walletAddress");

    if (!walletParam) {
        return NextResponse.json({ tokens: [], total: 0, source: "fallback" } satisfies MintHistoryResponse);
    }

    const parsed = querySchema.safeParse({ walletAddress: walletParam });
    if (!parsed.success) {
        return NextResponse.json({ message: "Invalid wallet address." }, { status: 400 });
    }

    const walletAddress = parsed.data.walletAddress;

    if (!alchemyKey || !collectibleContract) {
        const fallback = await fallbackResponseForWallet(walletAddress);
        return NextResponse.json(fallback);
    }

    const endpoint = new URL(`https://${alchemyNetwork}.g.alchemy.com/nft/v3/${alchemyKey}/getNFTs`);
    endpoint.searchParams.set("owner", walletAddress);
    endpoint.searchParams.append("contractAddresses[]", collectibleContract);
    endpoint.searchParams.set("withMetadata", "true");
    endpoint.searchParams.set("pageSize", "12");

    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: { Accept: "application/json" },
            next: { revalidate: 30 },
        });

        if (!response.ok) {
            throw new Error(`Alchemy response ${response.status}`);
        }

        const payload = (await response.json()) as {
            ownedNfts?: Record<string, unknown>[];
            nfts?: Record<string, unknown>[];
            totalCount?: number;
        };

        const records = Array.isArray(payload.ownedNfts)
            ? payload.ownedNfts
            : Array.isArray(payload.nfts)
              ? payload.nfts
              : [];

        const tokens = records
            .map((record) => mapAlchemyCollectibleRecord(record))
            .filter((mint): mint is CollectibleMint => Boolean(mint))
            .map(toHistoryToken);

        if (tokens.length === 0) {
            const fallback = await fallbackResponseForWallet(walletAddress);
            return NextResponse.json(fallback);
        }

        const totalCount =
            typeof payload.totalCount === "number" && Number.isFinite(payload.totalCount)
                ? Math.max(tokens.length, Math.floor(payload.totalCount))
                : tokens.length;

        return NextResponse.json({ tokens, total: totalCount, source: "live" } satisfies MintHistoryResponse);
    } catch (error) {
        console.error("Unable to load mint history", error);
        const fallback = await fallbackResponseForWallet(walletAddress);
        const status = fallback.tokens.length > 0 ? 200 : 503;
        return NextResponse.json(fallback, { status });
    }
}
