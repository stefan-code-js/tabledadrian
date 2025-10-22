"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { createPublicClient, http, type PublicClient } from "viem";
import { mainnet } from "viem/chains";

const HOLDERS_PATH = path.join(process.cwd(), "content", "collectibles", "holders.json");
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

async function readFallbackHolders(): Promise<Set<string>> {
    try {
        const buffer = await fs.readFile(HOLDERS_PATH, "utf-8");
        const parsed = JSON.parse(buffer) as string[];
        return new Set(parsed.map((value) => value.toLowerCase()));
    } catch {
        return new Set();
    }
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

    const holders = await readFallbackHolders();
    return holders.has(normalized);
}
