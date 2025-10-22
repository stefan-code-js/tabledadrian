import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "@/lib/auth/password";

describe("auth password helpers", () => {
    it("hashes password with random salt", () => {
        const hashA = hashPassword("culinary-muse");
        const hashB = hashPassword("culinary-muse");
        expect(hashA).not.toEqual("culinary-muse");
        expect(hashB).not.toEqual("culinary-muse");
        expect(hashA).not.toEqual(hashB);
        expect(hashA.split(":")).toHaveLength(2);
    });

    it("verifies correct password", () => {
        const stored = hashPassword("alchemy-access");
        expect(verifyPassword("alchemy-access", stored)).toBe(true);
    });

    it("rejects incorrect password", () => {
        const stored = hashPassword("alchemy-access");
        expect(verifyPassword("wrong-pass", stored)).toBe(false);
        expect(verifyPassword("alchemy-access", "bad-format")).toBe(false);
    });
});
