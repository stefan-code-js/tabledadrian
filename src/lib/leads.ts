export type Lead = {
    id: string;
    name: string;
    email: string;
    guests: number;
    eventDate: string;
    location?: string;
    budget?: string;
    message?: string;
    createdAt: number;
    signal: "hot" | "warm" | "nurture";
};

const leads: Lead[] = [];

export function addLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
    const entry: Lead = {
        ...lead,
        id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
        createdAt: Date.now(),
    };
    leads.unshift(entry);
    return entry;
}

export function listLeads(): Lead[] {
    return [...leads];
}

export function seedLead(sample: Lead) {
    const exists = leads.find((lead) => lead.id === sample.id);
    if (!exists) {
        leads.unshift(sample);
    }
}

export function clearLeads() {
    leads.length = 0;
}
