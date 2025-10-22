import { describe, expect, it } from "vitest";
import { walletIsCollectibleHolder } from "@/lib/collectibles";

describe("collectible verification", () => {
    it("recognizes fallback holder addresses", async () => {
        const eligible = await walletIsCollectibleHolder("0x9E8aA5728B2CbA33f8a7d1A31CcAa6B9c39F5c12");
        expect(eligible).toBe(true);
    });

    it("rejects addresses outside registry", async () => {
        const eligible = await walletIsCollectibleHolder("0x1111111111111111111111111111111111111111");
        expect(eligible).toBe(false);
    });

    it("handles malformed addresses", async () => {
        const eligible = await walletIsCollectibleHolder("not-a-wallet");
        expect(eligible).toBe(false);
    });
});
