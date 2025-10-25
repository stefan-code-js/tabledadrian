"use server";

import { fetchPoapAttendances, fetchUnlockStatus } from "@/lib/access";
import { getCollectibleChainId, getCollectibleDrop } from "@/lib/thirdweb";

type HealthStatus = {
    configured: boolean;
    healthy: boolean;
    reason: string | null;
    detail: string | null;
};

type ThirdwebHealthStatus = HealthStatus & {
    contractAddress: string | null;
    chainId: number | null;
};

function getUnlockTestWallet() {
    return (
        process.env.UNLOCK_HEALTH_WALLET ??
        process.env.NEXT_PUBLIC_UNLOCK_HEALTH_WALLET ??
        "0x0000000000000000000000000000000000000000"
    );
}

function getPoapTestWallet() {
    return (
        process.env.POAP_HEALTH_WALLET ??
        process.env.NEXT_PUBLIC_POAP_HEALTH_WALLET ??
        "0x0000000000000000000000000000000000000000"
    );
}

function hasValue(value: string | null | undefined): value is string {
    return Boolean(value && value.trim().length > 0);
}

export async function checkUnlockHealth(): Promise<HealthStatus> {
    const unlockLockAddress = process.env.UNLOCK_LOCK_ADDRESS ?? process.env.NEXT_PUBLIC_UNLOCK_LOCK ?? null;
    const unlockNetwork = process.env.UNLOCK_NETWORK_ID ?? process.env.NEXT_PUBLIC_UNLOCK_NETWORK ?? "1";

    if (!hasValue(unlockLockAddress)) {
        return { configured: false, healthy: false, reason: "Unlock lock address not configured.", detail: null };
    }

    try {
        const status = await fetchUnlockStatus(getUnlockTestWallet());
        if (status?.hasKey === false || status?.hasKey === true) {
            return { configured: true, healthy: true, reason: null, detail: "Locksmith reachable" };
        }

        // fetchUnlockStatus returned null because key is missing. Attempt direct call to detect connectivity.
        const testWallet = getUnlockTestWallet();
        const endpoint = new URL(`https://locksmith.unlock-protocol.com/api/key/${unlockLockAddress}/${testWallet}`);
        endpoint.searchParams.set("network", unlockNetwork);
        const response = await fetch(endpoint, {
            headers: hasValue(process.env.UNLOCK_API_KEY)
                ? { Authorization: `Bearer ${process.env.UNLOCK_API_KEY}` }
                : undefined,
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error(`Unlock responded with status ${response.status}`);
        }
        await response.json().catch(() => null);
        return { configured: true, healthy: true, reason: null, detail: "Locksmith reachable" };
    } catch (error) {
        const reason = error instanceof Error ? error.message : "Unlock connectivity error.";
        return { configured: true, healthy: false, reason, detail: null };
    }
}

export async function checkPoapHealth(): Promise<HealthStatus> {
    const poapApiKey = process.env.POAP_API_KEY ?? process.env.NEXT_PUBLIC_POAP_KEY ?? null;

    if (!hasValue(poapApiKey)) {
        return { configured: false, healthy: false, reason: "POAP API key not configured.", detail: null };
    }

    try {
        const attendances = await fetchPoapAttendances(getPoapTestWallet());
        if (Array.isArray(attendances)) {
            return { configured: true, healthy: true, reason: null, detail: "POAP API reachable" };
        }
        throw new Error("Unexpected POAP response payload.");
    } catch (error) {
        const reason = error instanceof Error ? error.message : "POAP connectivity error.";
        return { configured: true, healthy: false, reason, detail: null };
    }
}

export async function checkThirdwebHealth(): Promise<ThirdwebHealthStatus> {
    const contractAddress = process.env.ZORA_CONTRACT_ADDRESS ?? process.env.NEXT_PUBLIC_COLLECTIBLES_CONTRACT ?? null;
    const chainId = getCollectibleChainId();

    if (!hasValue(contractAddress)) {
        return {
            configured: false,
            healthy: false,
            reason: "Collectible contract address not configured.",
            detail: null,
            contractAddress: null,
            chainId,
        };
    }

    try {
        const drop = await getCollectibleDrop();
        if (!drop) {
            throw new Error("Thirdweb SDK unable to resolve drop contract.");
        }
        const metadata = await drop.metadata.get();
        if (!metadata?.name) {
            throw new Error("Thirdweb metadata unavailable.");
        }
        return {
            configured: true,
            healthy: true,
            reason: null,
            detail: metadata.name ?? null,
            contractAddress,
            chainId,
        };
    } catch (error) {
        const reason = error instanceof Error ? error.message : "Thirdweb connectivity error.";
        return { configured: true, healthy: false, reason, detail: null, contractAddress, chainId };
    }
}

export type ConciergeIntegrationHealth = {
    unlock: HealthStatus;
    poap: HealthStatus;
    thirdweb: ThirdwebHealthStatus;
    updatedAt: string;
};

export async function resolveIntegrationHealth(): Promise<ConciergeIntegrationHealth> {
    const [unlock, poap, thirdweb] = await Promise.all([
        checkUnlockHealth(),
        checkPoapHealth(),
        checkThirdwebHealth(),
    ]);

    return {
        unlock,
        poap,
        thirdweb,
        updatedAt: new Date().toISOString(),
    };
}
