import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(plain: string): string {
    const salt = randomBytes(16).toString("hex");
    const derived = scryptSync(plain, salt, KEY_LENGTH).toString("hex");
    return `${salt}:${derived}`;
}

export function verifyPassword(plain: string, stored: string): boolean {
    if (!stored.includes(":")) {
        return false;
    }
    const [salt, hash] = stored.split(":");
    const derived = scryptSync(plain, salt, KEY_LENGTH);
    const hashBuffer = Buffer.from(hash, "hex");
    if (hashBuffer.length !== derived.length) {
        return false;
    }
    return timingSafeEqual(hashBuffer, derived);
}
