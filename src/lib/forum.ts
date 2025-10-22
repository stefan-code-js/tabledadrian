"use server";

import "server-only";

import { getDatabase } from "@/lib/database";

export type ForumPost = {
    id: string;
    authorEmail: string;
    title: string;
    body: string;
    createdAt: string;
    status: string;
};

function mapPost(row: {
    id: string;
    author_email: string;
    title: string;
    body: string;
    created_at: string;
    status: string;
}): ForumPost {
    return {
        id: row.id,
        authorEmail: row.author_email,
        title: row.title,
        body: row.body,
        createdAt: row.created_at,
        status: row.status,
    };
}

export async function listForumHighlights(limit = 3): Promise<ForumPost[]> {
    const db = getDatabase();
    const rows = db
        .prepare(
            `
            SELECT *
            FROM forum_posts
            WHERE status = 'published'
            ORDER BY datetime(created_at) DESC
            LIMIT ?
        `,
        )
        .all(limit) as Array<{
            id: string;
            author_email: string;
            title: string;
            body: string;
            created_at: string;
            status: string;
        }>;
    return rows.map(mapPost);
}
