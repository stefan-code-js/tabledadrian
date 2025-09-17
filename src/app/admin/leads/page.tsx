import { sitePages } from "@/data/siteContent";
import {
    PageHero,
    ValueSection,
    IncludedSection,
    ProcessSection,
    PricingSection,
    TestimonialsSection,
    FinalCtaSection,
    PageStructuredData,
} from "@/components/StructuredPage";
import { listLeads, seedLead } from "@/lib/leads";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const runtime = "edge";

const page = sitePages.adminLeads;

export const metadata: Metadata = {
    ...createPageMetadata(page),
    robots: { index: false },
};

const sampleLeads = [
    {
        id: "seed_hot",
        name: "Elena M.",
        email: "elena@monaco.family",
        guests: 16,
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Cap d’Antibes",
        budget: "€12k",
        message: "Celebration dinner following board meeting.",
        signal: "hot" as const,
        createdAt: Date.now() - 4 * 60 * 60 * 1000,
    },
    {
        id: "seed_warm",
        name: "James M.",
        email: "jm@investment.group",
        guests: 12,
        eventDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Cannes",
        budget: "€8k",
        message: "Quarterly leadership supper, prefer pescatarian leaning.",
        signal: "warm" as const,
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    },
    {
        id: "seed_nurture",
        name: "Laura M.",
        email: "laura@press.eu",
        guests: 20,
        eventDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Paris",
        budget: "press feature",
        message: "Considering profile in autumn issue.",
        signal: "nurture" as const,
        createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    },
];

sampleLeads.forEach(seedLead);

function formatDate(value: string) {
    const dt = Date.parse(value);
    if (Number.isNaN(dt)) return value;
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(dt);
}

export default function AdminLeadsPage() {
    const leads = listLeads();

    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageStructuredData page={page} />
                <PageHero page={page} />
                <ValueSection page={page} />
                <IncludedSection page={page} />
                <ProcessSection page={page} />
                <PricingSection page={page} />
                <TestimonialsSection page={page} />
                <section className="structured-section" id={`${page.slug}-leads`}>
                    <h2 className="lux-h center-text">Live leads</h2>
                    <div className="lead-table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Guests</th>
                                    <th scope="col">Event date</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">Budget</th>
                                    <th scope="col">Signal</th>
                                    <th scope="col">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id}>
                                        <td>{lead.name}</td>
                                        <td>{lead.guests}</td>
                                        <td>{formatDate(lead.eventDate)}</td>
                                        <td>{lead.location || "—"}</td>
                                        <td>{lead.budget || "—"}</td>
                                        <td className={`signal-${lead.signal}`}>{lead.signal}</td>
                                        <td>{lead.message || "—"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <FinalCtaSection page={page} />
            </div>
        </section>
    );
}
