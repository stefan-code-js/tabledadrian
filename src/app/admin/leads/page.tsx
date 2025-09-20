import { cookies, headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const EMPTY = "--";
const MAX_ROWS = 200;

type BookingRecord = {
    id: string;
    created_at: string;
    name: string;
    email: string | null;
    phone: string | null;
    guests: number;
    date: string;
    message: string | null;
    ip: string | null;
};

function getProcessEnv(key: string): string | undefined {
    if (typeof process === "undefined" || typeof process.env === "undefined") {
        return undefined;
    }
    const value = process.env[key as keyof NodeJS.ProcessEnv];
    return typeof value === "string" ? value : undefined;
}

let cachedEnv: Record<string, unknown> | undefined;

function getEnv(): Record<string, unknown> | undefined {
    if (cachedEnv !== undefined) {
        return cachedEnv;
    }
    try {
        cachedEnv = getRequestContext().env as Record<string, unknown>;
    } catch {
        cachedEnv = undefined;
    }
    return cachedEnv;
}

function resolveAdminToken(): string | undefined {
    const env = getEnv();
    return (env?.ADMIN_TOKEN as string | undefined) ?? getProcessEnv("ADMIN_TOKEN");
}

function maskEmail(email: string | null | undefined): string {
    if (!email) return EMPTY;
    const [local, domain] = email.split("@");
    if (!local || !domain) return EMPTY;
    const maskedLocal = `${local[0]}***`;
    const maskedDomain = `${domain[0]}***`;
    return `${maskedLocal}@${maskedDomain}`;
}

function formatDateTime(value: string | null | undefined): string {
    if (!value) return EMPTY;
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) {
        return value;
    }
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(timestamp));
}

function formatMessage(message: string | null | undefined): string {
    if (!message) return EMPTY;
    return message;
}

async function fetchBookings(): Promise<BookingRecord[]> {
    const env = getEnv();
    const db = env?.TABLEDADRIAN_DB as D1Database | undefined;
    if (!db) {
        return [];
    }

    try {
        const query = `SELECT id, created_at, name, email, phone, guests, date, message, ip FROM bookings ORDER BY created_at DESC LIMIT ${MAX_ROWS}`;
        const result = await db.prepare(query).all<BookingRecord>();
        return result.results ?? [];
    } catch {
        return [];
    }
}

function unauthorized(): never {
    throw new Response("Unauthorized", {
        status: 401,
        headers: { "Cache-Control": "no-store" },
    });
}

async function ensureAuthorized(): Promise<void> {
    const expected = resolveAdminToken();
    if (!expected) {
        unauthorized();
    }

    const [headerStore, cookieStore] = await Promise.all([headers(), cookies()]);
    const provided =
        headerStore.get("x-admin-token") ||
        cookieStore.get("ADMIN_TOKEN")?.value ||
        "";

    if (provided !== expected) {
        unauthorized();
    }
}

export default async function AdminLeadsPage() {
    noStore();
    await ensureAuthorized();
    const bookings = await fetchBookings();

    return (
        <main className="admin-leads">
            <header className="admin-leads__header">
                <h1>Recent bookings</h1>
                <p className="muted">Showing the latest {bookings.length} submissions.</p>
            </header>
            <div className="admin-leads__table">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Guests</th>
                            <th scope="col">Event date</th>
                            <th scope="col">Message</th>
                            <th scope="col">Submitted</th>
                            <th scope="col">IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan={8}>{EMPTY}</td>
                            </tr>
                        ) : (
                            bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>{booking.name}</td>
                                    <td>{maskEmail(booking.email)}</td>
                                    <td>{booking.phone ?? EMPTY}</td>
                                    <td>{booking.guests}</td>
                                    <td>{booking.date || EMPTY}</td>
                                    <td style={{ whiteSpace: "pre-wrap" }}>{formatMessage(booking.message)}</td>
                                    <td>{formatDateTime(booking.created_at)}</td>
                                    <td>{booking.ip ?? EMPTY}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
