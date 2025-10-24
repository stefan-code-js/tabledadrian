"use server";

const unlockLockAddress = process.env.UNLOCK_LOCK_ADDRESS ?? process.env.NEXT_PUBLIC_UNLOCK_LOCK ?? null;
const unlockNetwork = process.env.UNLOCK_NETWORK_ID ?? process.env.NEXT_PUBLIC_UNLOCK_NETWORK ?? "1";
const unlockApiKey = process.env.UNLOCK_API_KEY ?? null;

const poapApiKey = process.env.POAP_API_KEY ?? process.env.NEXT_PUBLIC_POAP_KEY ?? null;

export type UnlockStatus = {
    hasKey: boolean;
    expiration?: string | null;
    source: "unlock";
};

export type PoapAttendance = {
    eventId: number;
    eventName: string;
    mintedAt?: string | null;
};

export async function fetchUnlockStatus(walletAddress?: string | null): Promise<UnlockStatus | null> {
    if (!walletAddress || !unlockLockAddress) {
        return null;
    }

    const wallet = walletAddress.toLowerCase();
    const endpoint = new URL(`https://locksmith.unlock-protocol.com/api/key/${unlockLockAddress}/${wallet}`);
    endpoint.searchParams.set("network", unlockNetwork);

    try {
        const response = await fetch(endpoint, {
            headers: unlockApiKey ? { Authorization: `Bearer ${unlockApiKey}` } : undefined,
            next: { revalidate: 120 },
        });
        if (!response.ok) {
            throw new Error(`Unlock response ${response.status}`);
        }
        const payload = (await response.json()) as { valid?: boolean; expiration?: number };
        return {
            hasKey: Boolean(payload.valid),
            expiration: payload.expiration ? new Date(payload.expiration * 1000).toISOString() : null,
            source: "unlock",
        } satisfies UnlockStatus;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Unable to resolve Unlock status", error);
        }
        return {
            hasKey: false,
            expiration: null,
            source: "unlock",
        } satisfies UnlockStatus;
    }
}

export async function fetchPoapAttendances(walletAddress?: string | null): Promise<PoapAttendance[]> {
    if (!walletAddress || !poapApiKey) {
        return [];
    }

    try {
        const response = await fetch(`https://api.poap.tech/actions/scan/${walletAddress.toLowerCase()}`, {
            headers: {
                Accept: "application/json",
                "X-API-Key": poapApiKey,
            },
            next: { revalidate: 120 },
        });
        if (!response.ok) {
            throw new Error(`POAP response ${response.status}`);
        }
        const payload = (await response.json()) as Array<{ event?: { id?: number; name?: string }; created?: string }>;
        if (!Array.isArray(payload)) {
            return [];
        }
        return payload.slice(0, 6).map((entry, index) => ({
            eventId: entry.event?.id ?? index,
            eventName: entry.event?.name ?? "POAP activation",
            mintedAt: entry.created ?? null,
        }));
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
            console.warn("Unable to resolve POAP attendance", error);
        }
        return [];
    }
}
