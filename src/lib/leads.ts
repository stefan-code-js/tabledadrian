export type LeadSignal = "hot" | "warm" | "nurture";

export type LeadInsert = {
    name: string;
    email: string;
    guests: number;
    eventDate: string;
    location?: string;
    budget?: string;
    message?: string;
    signal: LeadSignal;
    phone?: string;
    ip?: string;
};

export type LeadRecord = LeadInsert & {
    id: string;
    createdAt: string;
};

type InsertEnv = {
    TABLEDADRIAN_DB?: D1Database;
};

const memoryLeads: LeadRecord[] = [];

function compileMessage(input: LeadInsert): string | null {
    const sections: string[] = [];

    if (input.message?.trim()) {
        sections.push(input.message.trim());
    }

    const details = [
        input.location ? `Location: ${input.location}` : null,
        input.budget ? `Budget: ${input.budget}` : null,
        input.signal ? `Signal: ${input.signal}` : null,
    ].filter(Boolean) as string[];

    if (details.length) {
        sections.push(details.join("\n"));
    }

    if (sections.length === 0) {
        return null;
    }

    return sections.join("\n\n");
}

function createRecord(input: LeadInsert): LeadRecord {
    const id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const createdAt = new Date().toISOString();
    const message = compileMessage(input) ?? undefined;

    return {
        id,
        createdAt,
        ...input,
        message,
    };
}

export async function insertLead(env: InsertEnv, input: LeadInsert): Promise<LeadRecord> {
    const record = createRecord(input);
    const db = env.TABLEDADRIAN_DB;

    if (!db) {
        memoryLeads.unshift(record);
        return record;
    }

    try {
        await db
            .prepare(
                `INSERT INTO bookings (id, created_at, name, email, phone, guests, date, message, ip)
                 VALUES (?, datetime('now'), ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
                record.id,
                record.name,
                record.email,
                record.phone ?? null,
                record.guests,
                record.eventDate,
                record.message ?? null,
                record.ip ?? null
            )
            .run();
    } catch (error) {
        console.error("lead-insert-error", error);
        memoryLeads.unshift(record);
    }

    return record;
}

export function listLeads(): LeadRecord[] {
    return [...memoryLeads];
}
