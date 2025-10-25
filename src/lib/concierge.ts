import {
    conciergeEmailAllowlist,
    conciergeWalletAllowlist,
    type ConciergeEmailAllowlistRecord,
    type ConciergeWalletAllowlistRecord,
} from "@/data/conciergeAllowlist";

type AllowlistSource = "seed" | "env";

type AllowlistStatus = "vip" | "allowlisted" | "waitlist" | "not_listed";

export type ConciergeAllowlistWalletStatus = {
    address: string;
    status: AllowlistStatus;
    tier: string | null;
    note: string | null;
    source: AllowlistSource | null;
};

export type ConciergeAllowlistEmailStatus = {
    email: string;
    status: AllowlistStatus;
    tier: string | null;
    note: string | null;
    source: AllowlistSource | null;
};

export type ConciergeAllowlistLookupResult = {
    wallet: ConciergeAllowlistWalletStatus | null;
    email: ConciergeAllowlistEmailStatus | null;
    updatedAt: string;
};

function normalizeTier(value: string | null | undefined): string | null {
    if (!value) {
        return null;
    }
    return value.trim();
}

function resolveStatusFromTier(tier: string | null): AllowlistStatus {
    if (!tier) {
        return "allowlisted";
    }
    const normalized = tier.toLowerCase();
    if (normalized.includes("vip") || normalized.includes("concierge")) {
        return "vip";
    }
    if (normalized.includes("wait")) {
        return "waitlist";
    }
    return "allowlisted";
}

function splitAllowlistEntries(value: string | undefined | null): string[] {
    if (!value) {
        return [];
    }
    return value
        .split(/\r?\n|,/)
        .map((entry) => entry.trim())
        .filter(Boolean);
}

function parseWalletEnvRecords(value: string | undefined | null) {
    return splitAllowlistEntries(value)
        .map((entry) => {
            const [identifier, tier, note] = entry.split("|").map((segment) => segment.trim());
            if (!identifier) {
                return null;
            }
            return {
                address: identifier.toLowerCase(),
                tier: tier ?? null,
                note: note ?? null,
                source: "env" as const,
            } satisfies ConciergeWalletAllowlistRecord & { source: AllowlistSource };
        })
        .filter(Boolean) as Array<ConciergeWalletAllowlistRecord & { source: AllowlistSource }>;
}

function parseEmailEnvRecords(value: string | undefined | null) {
    return splitAllowlistEntries(value)
        .map((entry) => {
            const [identifier, tier, note] = entry.split("|").map((segment) => segment.trim());
            if (!identifier) {
                return null;
            }
            return {
                email: identifier.toLowerCase(),
                tier: tier ?? null,
                note: note ?? null,
                source: "env" as const,
            } satisfies ConciergeEmailAllowlistRecord & { source: AllowlistSource };
        })
        .filter(Boolean) as Array<ConciergeEmailAllowlistRecord & { source: AllowlistSource }>;
}

function mergeWalletRecords(): Array<ConciergeWalletAllowlistRecord & { source: AllowlistSource }> {
    const envRecords = parseWalletEnvRecords(
        process.env.CONCIERGE_ALLOWLIST_WALLETS ?? process.env.NEXT_PUBLIC_CONCIERGE_ALLOWLIST_WALLETS ?? null,
    );
    const seen = new Map<string, ConciergeWalletAllowlistRecord & { source: AllowlistSource }>();
    envRecords.forEach((record) => {
        seen.set(record.address.toLowerCase(), record);
    });
    conciergeWalletAllowlist.forEach((record) => {
        const address = record.address.toLowerCase();
        if (!seen.has(address)) {
            seen.set(address, { ...record, address, source: "seed" });
        }
    });
    return Array.from(seen.values());
}

function mergeEmailRecords(): Array<ConciergeEmailAllowlistRecord & { source: AllowlistSource }> {
    const envRecords = parseEmailEnvRecords(
        process.env.CONCIERGE_ALLOWLIST_EMAILS ?? process.env.NEXT_PUBLIC_CONCIERGE_ALLOWLIST_EMAILS ?? null,
    );
    const seen = new Map<string, ConciergeEmailAllowlistRecord & { source: AllowlistSource }>();
    envRecords.forEach((record) => {
        seen.set(record.email.toLowerCase(), record);
    });
    conciergeEmailAllowlist.forEach((record) => {
        const email = record.email.toLowerCase();
        if (!seen.has(email)) {
            seen.set(email, { ...record, email, source: "seed" });
        }
    });
    return Array.from(seen.values());
}

const walletRecordsCache: Array<ConciergeWalletAllowlistRecord & { source: AllowlistSource }> | null = null;
const emailRecordsCache: Array<ConciergeEmailAllowlistRecord & { source: AllowlistSource }> | null = null;

function getWalletRecords() {
    if (!walletRecordsCache) {
        return mergeWalletRecords();
    }
    return walletRecordsCache;
}

function getEmailRecords() {
    if (!emailRecordsCache) {
        return mergeEmailRecords();
    }
    return emailRecordsCache;
}

export function lookupConciergeAllowlist(params: {
    walletAddress?: string | null;
    email?: string | null;
}): ConciergeAllowlistLookupResult {
    const now = new Date().toISOString();
    const walletAddress = params.walletAddress?.toLowerCase?.() ?? null;
    const email = params.email?.toLowerCase?.() ?? null;

    const walletRecords = walletAddress ? getWalletRecords() : [];
    const emailRecords = email ? getEmailRecords() : [];

    const walletRecord = walletAddress
        ? walletRecords.find((record) => record.address === walletAddress)
        : undefined;
    const emailRecord = email ? emailRecords.find((record) => record.email === email) : undefined;

    return {
        wallet: walletAddress
            ? {
                  address: walletAddress,
                  status: walletRecord ? resolveStatusFromTier(normalizeTier(walletRecord.tier ?? null)) : "not_listed",
                  tier: normalizeTier(walletRecord?.tier ?? null),
                  note: walletRecord?.note ?? null,
                  source: walletRecord?.source ?? null,
              }
            : null,
        email: email
            ? {
                  email,
                  status: emailRecord ? resolveStatusFromTier(normalizeTier(emailRecord.tier ?? null)) : "not_listed",
                  tier: normalizeTier(emailRecord?.tier ?? null),
                  note: emailRecord?.note ?? null,
                  source: emailRecord?.source ?? null,
              }
            : null,
        updatedAt: now,
    };
}
