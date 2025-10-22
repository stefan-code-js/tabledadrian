import fs from "node:fs/promises";
import path from "node:path";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { randomUUID } from "node:crypto";

const MEMBERS_PATH = path.join(process.cwd(), "content", "members", "members.json");

export type MemberRecord = {
    id: string;
    email: string;
    fullName: string;
    passwordHash: string;
    walletAddress?: string;
    roles: string[];
    createdAt: string;
};

export type PublicMember = Omit<MemberRecord, "passwordHash">;

async function ensureMembersFile(): Promise<void> {
    try {
        await fs.access(MEMBERS_PATH);
    } catch {
        const seed: MemberRecord[] = [];
        await fs.mkdir(path.dirname(MEMBERS_PATH), { recursive: true });
        await fs.writeFile(MEMBERS_PATH, JSON.stringify(seed, null, 2), "utf-8");
    }
}

export async function loadMembers(): Promise<MemberRecord[]> {
    await ensureMembersFile();
    const buffer = await fs.readFile(MEMBERS_PATH, "utf-8");
    try {
        const parsed = JSON.parse(buffer) as MemberRecord[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export async function saveMembers(members: MemberRecord[]): Promise<void> {
    await fs.writeFile(MEMBERS_PATH, JSON.stringify(members, null, 2), "utf-8");
}

export async function findMemberByEmail(email: string): Promise<MemberRecord | undefined> {
    const members = await loadMembers();
    return members.find((member) => member.email.toLowerCase() === email.toLowerCase());
}

export function sanitizeMember(member: MemberRecord): PublicMember {
    const { passwordHash: _omit, ...rest } = member;
    return rest;
}

export async function authenticateMember(email: string, password: string): Promise<PublicMember | null> {
    const member = await findMemberByEmail(email);
    if (!member) {
        return null;
    }
    const valid = verifyPassword(password, member.passwordHash);
    return valid ? sanitizeMember(member) : null;
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
    const members = await loadMembers();
    members.push(record);
    await saveMembers(members);
    return sanitizeMember(record);
}
