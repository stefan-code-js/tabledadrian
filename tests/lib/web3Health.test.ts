import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import {
    checkPoapHealth,
    checkThirdwebHealth,
    checkUnlockHealth,
    resolveIntegrationHealth,
} from "@/lib/web3Health";
import { fetchPoapAttendances, fetchUnlockStatus } from "@/lib/access";
import { getCollectibleDrop, getCollectibleChainId } from "@/lib/thirdweb";

vi.mock("@/lib/access", () => ({
    fetchUnlockStatus: vi.fn(),
    fetchPoapAttendances: vi.fn(),
}));

vi.mock("@/lib/thirdweb", () => ({
    getCollectibleDrop: vi.fn(),
    getCollectibleChainId: vi.fn(() => 1),
}));

const originalEnv = { ...process.env };

beforeEach(() => {
    Object.assign(process.env, originalEnv);
    vi.mocked(fetchUnlockStatus).mockReset();
    vi.mocked(fetchPoapAttendances).mockReset();
    vi.mocked(getCollectibleDrop).mockReset();
    vi.mocked(getCollectibleChainId).mockReturnValue(1);
});

afterEach(() => {
    Object.assign(process.env, originalEnv);
    vi.restoreAllMocks();
});

describe("web3 health checks", () => {
    it("marks unlock as unconfigured when no lock is provided", async () => {
        delete process.env.UNLOCK_LOCK_ADDRESS;
        delete process.env.NEXT_PUBLIC_UNLOCK_LOCK;
        const result = await checkUnlockHealth();
        expect(result.configured).toBe(false);
        expect(result.healthy).toBe(false);
    });

    it("reports unlock as healthy when the locksmith returns a status", async () => {
        process.env.UNLOCK_LOCK_ADDRESS = "0x1234";
        delete process.env.NEXT_PUBLIC_UNLOCK_LOCK;
        vi.mocked(fetchUnlockStatus).mockResolvedValue({ hasKey: false, source: "unlock" });

        const result = await checkUnlockHealth();

        expect(result.configured).toBe(true);
        expect(result.healthy).toBe(true);
    });

    it("marks POAP as unconfigured without an API key", async () => {
        delete process.env.POAP_API_KEY;
        delete process.env.NEXT_PUBLIC_POAP_KEY;

        const result = await checkPoapHealth();
        expect(result.configured).toBe(false);
        expect(result.healthy).toBe(false);
    });

    it("returns Thirdweb metadata health when the drop resolves", async () => {
        process.env.ZORA_CONTRACT_ADDRESS = "0x987654321";
        vi.mocked(getCollectibleDrop).mockResolvedValue({
            metadata: {
                get: vi.fn().mockResolvedValue({ name: "Alchemy Key" }),
            },
        } as unknown as Awaited<ReturnType<typeof getCollectibleDrop>>);

        const result = await checkThirdwebHealth();
        expect(result.configured).toBe(true);
        expect(result.healthy).toBe(true);
        expect(result.detail).toBe("Alchemy Key");
    });

    it("aggregates health results", async () => {
        process.env.UNLOCK_LOCK_ADDRESS = "0x123";
        delete process.env.NEXT_PUBLIC_UNLOCK_LOCK;
        process.env.POAP_API_KEY = "test";
        delete process.env.NEXT_PUBLIC_POAP_KEY;
        process.env.ZORA_CONTRACT_ADDRESS = "0xabc";
        delete process.env.NEXT_PUBLIC_COLLECTIBLES_CONTRACT;

        vi.mocked(fetchUnlockStatus).mockResolvedValue({ hasKey: true, source: "unlock" });
        vi.mocked(fetchPoapAttendances).mockResolvedValue([]);
        vi.mocked(getCollectibleDrop).mockResolvedValue({
            metadata: { get: vi.fn().mockResolvedValue({ name: "Alchemy Key" }) },
        } as unknown as Awaited<ReturnType<typeof getCollectibleDrop>>);

        const result = await resolveIntegrationHealth();

        expect(result.unlock.healthy).toBe(true);
        expect(result.poap.healthy).toBe(true);
        expect(result.thirdweb.healthy).toBe(true);
        expect(typeof result.updatedAt).toBe("string");
    });
});
