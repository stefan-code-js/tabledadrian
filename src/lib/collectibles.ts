"use server";

import { createPublicClient, http, type PublicClient } from "viem";
import { mainnet } from "viem/chains";
import { getDatabase } from "@/lib/database";

const CONTRACT_ADDRESS = process.env.ZORA_CONTRACT_ADDRESS;
const RPC_URL =
    process.env.COLLECTIBLES_RPC_URL ?? process.env.NEXT_PUBLIC_RPC_URL ?? process.env.ALCHEMY_RPC_URL ?? null;

const ERC721_ABI = [
    {
        constant: true,
        inputs: [{ name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
] as const;

type CollectibleTierRow = {
    id: string;
    tier: string;
    headline: string;
    focus: string;
    perks: string;
    artwork: string;
    mint_price_eth: string;
    edition_size: number;
};

export type CollectibleTier = {
    id: string;
    title: string;
    headline: string;
    description: string;
    perks: string[];
    artwork: string;
    mintPriceEth: string;
    editionSize: number;
};

function readFallbackHolders(): Set<string> {
    const db = getDatabase();
    const rows = db
        .prepare("SELECT wallet_address FROM collectible_holders")
        .all() as Array<{ wallet_address: string }>;
    return new Set(rows.map((row) => row.wallet_address.toLowerCase()));
}

function normalizeAddress(address?: string | null): `0x${string}` | null {
    if (!address) return null;
    if (!address.startsWith("0x") || address.length !== 42) {
        return null;
    }
    return address.toLowerCase() as `0x${string}`;
}

async function createClient(): Promise<PublicClient | null> {
    if (!RPC_URL || !CONTRACT_ADDRESS) {
        return null;
    }
    try {
        return createPublicClient({
            chain: mainnet,
            transport: http(RPC_URL),
        });
    } catch {
        return null;
    }
}

export async function walletIsCollectibleHolder(address?: string | null): Promise<boolean> {
    const normalized = normalizeAddress(address);
    if (!normalized) {
        return false;
    }

    const client = await createClient();
    if (client) {
        try {
            const balance = await client.readContract({
                address: CONTRACT_ADDRESS as `0x${string}`,
                abi: ERC721_ABI,
                functionName: "balanceOf",
                args: [normalized],
            });
            if (typeof balance === "bigint" && balance > BigInt(0)) {
                return true;
            }
        } catch {
            // fall through to static list
        }
    }

    const holders = readFallbackHolders();
    return holders.has(normalized);
}

export async function listCollectibleTiers(): Promise<CollectibleTier[]> {
    const db = getDatabase();
    const rows = db.prepare("SELECT * FROM collectibles ORDER BY tier ASC").all() as CollectibleTierRow[];
    return rows.map((row) => ({
        id: row.id,
        title: row.tier,
        headline: row.headline,
        description: row.focus,
        perks: JSON.parse(row.perks) as string[],
        artwork: row.artwork,
        mintPriceEth: row.mint_price_eth,
        editionSize: row.edition_size,
    }));
}

export async function listCollectibleHolders(): Promise<string[]> {
    const db = getDatabase();
    const rows = db.prepare("SELECT wallet_address FROM collectible_holders").all() as Array<{ wallet_address: string }>;
    return rows.map((row) => row.wallet_address);
}
