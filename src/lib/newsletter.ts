"use server";

import "server-only";

import { randomUUID } from "node:crypto";
import { getDatabase } from "@/lib/database";

export type NewsletterSubscriber = {
    id: string;
    email: string;
    createdAt: string;
};

function mapSubscriber(row: { id: string; email: string; created_at: string }): NewsletterSubscriber {
    return {
        id: row.id,
        email: row.email,
        createdAt: row.created_at,
    };
}

export async function addSubscriber(email: string): Promise<NewsletterSubscriber> {
    const normalized = email.trim().toLowerCase();
    if (!normalized) {
        throw new Error("Email is required");
    }
    const db = getDatabase();
    const existing = db
        .prepare("SELECT * FROM newsletter_subscribers WHERE email = ?")
        .get(normalized) as { id: string; email: string; created_at: string } | undefined;

    if (existing) {
        return mapSubscriber(existing);
    }

    const record = {
        id: randomUUID(),
        email: normalized,
        createdAt: new Date().toISOString(),
    };

    db.prepare("INSERT INTO newsletter_subscribers (id, email, created_at) VALUES (@id, @email, @createdAt)").run(
        record,
    );

    return record;
}

export async function listRecentSubscribers(limit = 12): Promise<NewsletterSubscriber[]> {
    const db = getDatabase();
    const rows = db
        .prepare("SELECT * FROM newsletter_subscribers ORDER BY datetime(created_at) DESC LIMIT ?")
        .all(limit) as Array<{ id: string; email: string; created_at: string }>;
    return rows.map(mapSubscriber);
}
