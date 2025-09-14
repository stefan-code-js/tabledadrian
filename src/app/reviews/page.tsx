import type { Metadata } from "next";
import { headers } from "next/headers";
import ReviewsClient, { Review } from "@/components/ReviewsClient";
import type { CSSProperties } from "react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Reviews · Table d’Adrian",
    description:
        "Notes from guests. Public, human, and visible to everyone — elegant and verified.",
    alternates: { canonical: "/reviews" },
};

type ApiShape = { items?: Review[]; count?: number; avg?: number };

async function absolute(path: string) {
    const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
    if (configured) return configured.replace(/\/$/, "") + path;

    // Edge-safe headers()
    const h = await headers();
    const proto = h.get("x-forwarded-proto") || "https";
    const host = h.get("host") || "localhost:3000";
    return `${proto}://${host}${path}`;
}

async function getInitial(): Promise<Review[]> {
    const url = await absolute("/api/reviews?limit=24");
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as ApiShape;
    return data.items ?? [];
}

async function getStats(): Promise<{ count: number; avg: number }> {
    const url = await absolute("/api/reviews?stats=1");
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return { count: 0, avg: 0 };
    const data = (await res.json()) as ApiShape;
    return { count: data.count ?? 0, avg: data.avg ?? 0 };
}

export default async function ReviewsPage() {
    const [items, stats] = await Promise.all([getInitial(), getStats()]);

    return (
        <main className="section reviews-page">
            <div className="container container--narrow">
                <p className="kicker center-text">guest notes · public</p>
                <h1 className="title center-text">Reviews</h1>
                <p className="lead center-text">
                    Notes from guests. Public, human, and visible to everyone.
                </p>

                <div className="center" style={{ marginTop: 8, marginBottom: 14 }}>
                    <div className="summary reveal" style={delay(40)}>
            <span className="stars-display" aria-hidden="true">
              <span className="stars-back">★★★★★</span>
              <span
                  className="stars-front"
                  style={{ width: `${(Math.max(0, Math.min(5, stats.avg)) / 5) * 100}%` }}
              >
                ★★★★★
              </span>
            </span>
                        <span className="summary-text">
              {stats.avg.toFixed(1)} <span className="muted">·</span> {stats.count}{" "}
                            review{stats.count === 1 ? "" : "s"}
            </span>
                    </div>
                </div>

                <ReviewsClient initialItems={items} />
            </div>
        </main>
    );
}

function delay(ms: number): CSSProperties {
    return { "--d": `${ms}ms` } as CSSProperties;
}
