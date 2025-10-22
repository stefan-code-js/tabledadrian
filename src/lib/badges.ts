import type { BadgeDefinition } from "@/data/badges";

type OpenBadgeClass = {
    "@context": "https://w3id.org/openbadges/v2";
    type: "BadgeClass";
    id: string;
    name: string;
    description: string;
    image: string;
    criteria: {
        narrative: string;
    };
    issuer: {
        id: string;
        type: "Profile";
        name: string;
        url: string;
    };
    tags: string[];
};

const issuerId = process.env.BADGE_ISSUER_ID ?? "https://www.tabledadrian.com/brand-assets#issuer";
const issuerName = process.env.BADGE_ISSUER_NAME ?? "Table d'Adrian Atelier";
const issuerUrl = process.env.BADGE_ISSUER_URL ?? "https://www.tabledadrian.com";

export function buildBadgeClass(definition: BadgeDefinition): OpenBadgeClass {
    return {
        "@context": "https://w3id.org/openbadges/v2" as const,
        type: "BadgeClass",
        id: `${issuerId}/${definition.id}`,
        name: definition.name,
        description: definition.description,
        image: definition.image,
        criteria: {
            narrative: definition.criteria.join("\n"),
        },
        issuer: {
            id: issuerId,
            type: "Profile",
            name: issuerName,
            url: issuerUrl,
        },
        tags: [definition.level, ...definition.perks.map((perk) => perk.toLowerCase())],
    };
}
