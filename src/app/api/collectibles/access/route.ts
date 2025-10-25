import { NextResponse } from "next/server";
import { fetchPoapAttendances, fetchUnlockStatus } from "@/lib/access";

export const dynamic = "force-dynamic";

function envFlag(value: string | null | undefined): boolean {
    return Boolean(value && value.trim().length > 0);
}

function resolveEnvironmentFlags() {
    const unlockConfigured = envFlag(process.env.UNLOCK_LOCK_ADDRESS ?? process.env.NEXT_PUBLIC_UNLOCK_LOCK);
    const poapConfigured = envFlag(process.env.POAP_API_KEY ?? process.env.NEXT_PUBLIC_POAP_KEY);
    const thirdwebConfigured =
        envFlag(process.env.ZORA_CONTRACT_ADDRESS ?? process.env.NEXT_PUBLIC_COLLECTIBLES_CONTRACT) &&
        envFlag(
            process.env.THIRDWEB_CLIENT_ID ??
                process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ??
                process.env.THIRDWEB_SECRET_KEY ??
                process.env.COLLECTIBLES_RPC_URL ??
                process.env.NEXT_PUBLIC_RPC_URL ??
                process.env.ALCHEMY_RPC_URL ??
                process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
        );
    return {
        unlockConfigured,
        poapConfigured,
        thirdwebConfigured,
    } as const;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet") ?? url.searchParams.get("walletAddress");

    if (!wallet) {
        return NextResponse.json(
            { message: "Provide a wallet address to resolve concierge access credentials." },
            { status: 400 },
        );
    }

    const [unlock, poaps] = await Promise.all([
        fetchUnlockStatus(wallet),
        fetchPoapAttendances(wallet),
    ]);

    return NextResponse.json(
        {
            wallet: {
                address: wallet,
                unlock,
                poaps,
            },
            environment: resolveEnvironmentFlags(),
            updatedAt: new Date().toISOString(),
        },
        { status: 200 },
    );
}
