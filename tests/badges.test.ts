import { describe, expect, it } from "vitest";
import { badgeDefinitions } from "@/data/badges";
import { buildBadgeClass } from "@/lib/badges";

describe("badge builder", () => {
    it("creates open badge class with issuer defaults", () => {
        const badge = buildBadgeClass(badgeDefinitions[0]);
        expect(badge["@context"]).toBe("https://w3id.org/openbadges/v2");
        expect(badge.name).toBe(badgeDefinitions[0].name);
        expect(badge.criteria.narrative).toContain("Host three Table d'Adrian salons");
        expect(badge.issuer.name).toBeDefined();
    });
});
