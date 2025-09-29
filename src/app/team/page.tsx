import { buildMetadataForPath } from "@/lib/metadata";
import TeamPageContent from "@/components/pages/TeamPageContent";

export const metadata = buildMetadataForPath("/team", {
    title: "Team · Private Chef Atelier",
    description:
        "A small atelier led by Chef Adrian with clinical systems by Antonia (PharmD). We shape season, texture, and fragrance into one calm table along the Côte d’Azur.",
    keywords: [
        "private chef team",
        "luxury private dining",
        "Côte d’Azur chef",
        "Cote d’Azur chef",
        "tasting menu",
        "sommelier",
        "pastry",
    ],
});

export default function TeamPage() {
    return <TeamPageContent />;
}
