import { headers } from "next/headers";
import {
    PageHero,
    ValueSection,
    IncludedSection,
    ProcessSection,
    PricingSection,
    TestimonialsSection,
    FinalCtaSection,
    PageStructuredData,
} from "@/components/StructuredPage";
import { sitePages } from "@/data/siteContent";
import ReviewsClient, { Review } from "@/components/ReviewsClient";
import { createPageMetadata } from "@/lib/metadata";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const page = sitePages.reviews;

export const metadata = createPageMetadata(page);

type ApiShape = { items?: Review[]; count?: number; avg?: number };

async function absolute(path: string) {
    const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
    if (configured) return configured.replace(/\/$/, "") + path;

    const h = await headers();
    const proto = h.get("x-forwarded-proto") || "https";
    const host = h.get("host") || "localhost:3000";
    return `${proto}://${host}${path}`;
}

async function safeFetch(url: string) {
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return null;
        return (await res.json()) as ApiShape;
    } catch {
        return null;
    }
}

async function getInitial(): Promise<Review[]> {
    const url = await absolute("/api/reviews?limit=24");
    const data = await safeFetch(url);
    return data?.items ?? [];
}

async function getStats(): Promise<{ count: number; avg: number }> {
    const url = await absolute("/api/reviews?stats=1");
    const data = await safeFetch(url);
    return { count: data?.count ?? 0, avg: data?.avg ?? 0 };
}

export default async function ReviewsPage() {
    const [items, stats] = await Promise.all([getInitial(), getStats()]);
    const avgDisplay = stats.count ? stats.avg.toFixed(1) : "5.0";

    return (
        <article className="editorial-page">
            <PageStructuredData page={page} />
            <PageHero page={page} />
            <ValueSection page={page} />
            <IncludedSection page={page} />
            <ProcessSection page={page} />
            <PricingSection page={page} />
            <TestimonialsSection page={page} />
            <section className="editorial-section" id={`${page.slug}-reviews`}>
                <div className="editorial-container">
                    <div className="section-heading">
                        <h2>Latest notes</h2>
                        <div className="review-summary" role="presentation">
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
                                {avgDisplay} <span className="muted">·</span> {stats.count} review{stats.count === 1 ? "" : "s"}
                            </span>
                        </div>
                    </div>
                    {items.length === 0 ? (
                        <p className="muted">Reviews will appear here as soon as guests share them.</p>
                    ) : null}
                    <ReviewsClient initialItems={items} initialCount={stats.count} initialAvg={stats.avg} />
                </div>
                <hr className="separator" />
            </section>
            <FinalCtaSection page={page} />
        </article>
    );
}
