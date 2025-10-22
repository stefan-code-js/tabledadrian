import "server-only";

import { randomUUID } from "node:crypto";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { getDatabase } from "@/lib/database";

export type MemberRecord = {
    id: string;
    email: string;
    fullName: string;
    passwordHash: string;
    walletAddress?: string | null;
    roles: string[];
    createdAt: string;
};

export type PublicMember = Omit<MemberRecord, "passwordHash">;

function mapRowToMember(row: {
    id: string;
    email: string;
    full_name: string;
    password_hash: string;
    wallet_address: string | null;
    roles: string;
    created_at: string;
}): MemberRecord {
    return {
        id: row.id,
        email: row.email,
        fullName: row.full_name,
        passwordHash: row.password_hash,
        walletAddress: row.wallet_address ?? undefined,
        roles: JSON.parse(row.roles) as string[],
        createdAt: row.created_at,
    };
}

export async function loadMembers(): Promise<MemberRecord[]> {
    const db = getDatabase();
    const rows = db.prepare("SELECT * FROM members ORDER BY datetime(created_at) DESC").all() as Array<{
        id: string;
        email: string;
        full_name: string;
        password_hash: string;
        wallet_address: string | null;
        roles: string;
        created_at: string;
    }>;
    return rows.map(mapRowToMember);
}

export async function findMemberByEmail(email: string): Promise<MemberRecord | undefined> {
    const db = getDatabase();
    const row = db
        .prepare("SELECT * FROM members WHERE email = ?")
        .get(email.toLowerCase()) as
        | {
                id: string;
                email: string;
                full_name: string;
                password_hash: string;
                wallet_address: string | null;
                roles: string;
                created_at: string;
          }
        | undefined;
    return row ? mapRowToMember(row) : undefined;
}

export function sanitizeMember(member: MemberRecord): PublicMember {
    const { passwordHash: _discard, ...rest } = member;
    return rest;
}

export async function authenticateMember(email: string, password: string): Promise<PublicMember | null> {
    const record = await findMemberByEmail(email);
    if (!record) {
        return null;
    }
    const valid = verifyPassword(password, record.passwordHash);
    return valid ? sanitizeMember(record) : null;
}

export async function createMember(input: {
    email: string;
    fullName: string;
    password: string;
    walletAddress?: string;
    roles?: string[];
}): Promise<PublicMember> {
    const existing = await findMemberByEmail(input.email);
    if (existing) {
        throw new Error("Member already exists");
    }

    const db = getDatabase();
    const timestamp = new Date().toISOString();
    const record: MemberRecord = {
        id: randomUUID(),
        email: input.email.toLowerCase(),
        fullName: input.fullName,
        passwordHash: hashPassword(input.password),
        walletAddress: input.walletAddress ? input.walletAddress.toLowerCase() : undefined,
        roles: input.roles && input.roles.length > 0 ? input.roles : ["member"],
        createdAt: timestamp,
    };

    db.prepare(
        `
        INSERT INTO members (id, email, full_name, password_hash, wallet_address, roles, created_at)
        VALUES (@id, @email, @fullName, @passwordHash, @walletAddress, @roles, @createdAt)
    `,
    ).run({
        id: record.id,
        email: record.email,
        fullName: record.fullName,
        passwordHash: record.passwordHash,
        walletAddress: record.walletAddress ?? null,
        roles: JSON.stringify(record.roles),
        createdAt: record.createdAt,
    });

    return sanitizeMember(record);
}
