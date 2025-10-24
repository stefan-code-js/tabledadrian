import { NextResponse } from "next/server";
import { BigNumber } from "ethers";
import { getCollectibleDrop, getCollectibleChainId } from "@/lib/thirdweb";

type MintWindowResponse = {
    status: "live" | "upcoming" | "unconfigured" | "unavailable";
    window: {
        startTime?: string | null;
        maxPerWallet?: string | null;
        availableSupply?: string | null;
        currentMintSupply?: string | null;
    };
    price: {
        unit: string | null;
        currencyAddress: string | null;
        displayValue: string | null;
        valueWei: string | null;
    };
    supply: {
        claimed: string | null;
        remaining: string | null;
    };
    chainId: number | null;
};

function toIso(value: unknown): string | null {
    if (!value) {
        return null;
    }
    if (value instanceof Date) {
        return value.toISOString();
    }
    if (typeof value === "string" || typeof value === "number") {
        const date = new Date(value);
        return Number.isNaN(date.getTime()) ? null : date.toISOString();
    }
    return null;
}

function normalizeBigNumberish(value: unknown): string | null {
    if (!value && value !== 0) {
        return null;
    }
    if (typeof value === "string") {
        return value;
    }
    if (typeof value === "number") {
        return Number.isFinite(value) ? value.toString() : null;
    }
    if (BigNumber.isBigNumber(value)) {
        return value.toString();
    }
    return null;
}

export async function GET() {
    const chainId = getCollectibleChainId();
    const drop = await getCollectibleDrop();

    if (!drop) {
        const fallback: MintWindowResponse = {
            status: "unconfigured",
            chainId,
            window: {
                startTime: null,
                maxPerWallet: null,
                availableSupply: null,
                currentMintSupply: null,
            },
            price: {
                unit: null,
                currencyAddress: null,
                displayValue: null,
                valueWei: null,
            },
            supply: {
                claimed: null,
                remaining: null,
            },
        };
        return NextResponse.json(fallback);
    }

    try {
        const [condition, claimedSupply, unclaimedSupply] = await Promise.all([
            drop.erc721.claimConditions.getActive().catch(() => null),
            drop.erc721.totalClaimedSupply().catch(() => BigNumber.from(0)),
            drop.erc721.totalUnclaimedSupply().catch(() => BigNumber.from(0)),
        ]);

        if (!condition) {
            const response: MintWindowResponse = {
                status: "unavailable",
                chainId,
                window: {
                    startTime: null,
                    maxPerWallet: null,
                    availableSupply: null,
                    currentMintSupply: null,
                },
                price: {
                    unit: null,
                    currencyAddress: null,
                    displayValue: null,
                    valueWei: null,
                },
                supply: {
                    claimed: normalizeBigNumberish(claimedSupply) ?? "0",
                    remaining: normalizeBigNumberish(unclaimedSupply) ?? "0",
                },
            };
            return NextResponse.json(response);
        }

        const startTimeIso = toIso(condition.startTime);
        const now = Date.now();
        const status: MintWindowResponse["status"] =
            startTimeIso && new Date(startTimeIso).getTime() > now ? "upcoming" : "live";

        const response: MintWindowResponse = {
            status,
            chainId,
            window: {
                startTime: startTimeIso,
                maxPerWallet: condition.maxClaimablePerWallet ?? null,
                availableSupply: condition.availableSupply ?? null,
                currentMintSupply: condition.currentMintSupply ?? null,
            },
            price: {
                unit: condition.currencyMetadata?.symbol ?? null,
                currencyAddress: condition.currencyAddress ?? null,
                displayValue: condition.currencyMetadata?.displayValue ?? null,
                valueWei: normalizeBigNumberish(condition.currencyMetadata?.value),
            },
            supply: {
                claimed: normalizeBigNumberish(claimedSupply) ?? "0",
                remaining: normalizeBigNumberish(unclaimedSupply) ?? "0",
            },
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error("Unable to resolve Thirdweb mint window", error);
        const fallback: MintWindowResponse = {
            status: "unavailable",
            chainId,
            window: {
                startTime: null,
                maxPerWallet: null,
                availableSupply: null,
                currentMintSupply: null,
            },
            price: {
                unit: null,
                currencyAddress: null,
                displayValue: null,
                valueWei: null,
            },
            supply: {
                claimed: null,
                remaining: null,
            },
        };
        return NextResponse.json(fallback, { status: 503 });
    }
}
