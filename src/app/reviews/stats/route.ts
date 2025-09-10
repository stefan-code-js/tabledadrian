import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface Stats { count: number; sum: number; avg: number; }
interface KVNamespaceLite {
    get(key: string): Promise<string | null>;
}

export async function GET() {
    const { env } = getRequestContext();
    const kv = (env as unknown as { REVIEWS?: KVNamespaceLite }).REVIEWS;

    const empty: Stats = { count: 0, sum: 0, avg: 0 };
    if (!kv) return NextResponse.json(empty);

    const raw = await kv.get('stats');
    const stats = raw ? (JSON.parse(raw) as Stats) : empty;
    return NextResponse.json({ count: stats.count, avg: stats.avg });
}
