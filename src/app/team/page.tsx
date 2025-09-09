import type { Metadata } from "next";
import Team from "@/components/Team";
import { site } from "@/lib/site";
import { team } from "@/data/team";

export const metadata: Metadata = {
    title: "Team",
    description: "Table d’Adrian team — craft, technique, and service shaped by the Riviera.",
    alternates: { canonical: `${site.url}/team` },
};

export default function TeamPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: site.name,
        url: `${site.url}/team`,
        sameAs: [site.socials.instagram, site.socials.linkedin].filter(Boolean),
        member: team.map(m => ({
            "@type": "Person",
            name: m.name,
            jobTitle: m.role,
            url: m.linkedin || site.url,
            image: `${site.url}${m.image}`
        })),
    };

    return (
        <>
            <Team />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </>
    );
}
