import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const site = process.env.SITE_URL || "https://www.tabledadrian.com";
    const lastmod = new Date();
    const entries: MetadataRoute.Sitemap = [
        { url: `${site}/`, lastModified: lastmod, changeFrequency: "monthly", priority: 1 },
        { url: `${site}/about`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.9 },
        { url: `${site}/experiences`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.85 },
        { url: `${site}/products`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.8 },
        { url: `${site}/contact`, lastModified: lastmod, changeFrequency: "weekly", priority: 0.95 },
        { url: `${site}/gallery`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.7 },
        { url: `${site}/press`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.7 },
        { url: `${site}/reviews`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.8 },
        { url: `${site}/pricing-calculator`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.75 },
        { url: `${site}/admin/leads`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.2 },
        { url: `${site}/consult`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.8 },
        { url: `${site}/membership`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.8 },
        { url: `${site}/menu`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.6 },
        { url: `${site}/book`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.6 },
        { url: `${site}/team`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.5 },
        { url: `${site}/cancel`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.2 },
        { url: `${site}/remove`, lastModified: lastmod, changeFrequency: "yearly", priority: 0.4 },
    ];
    return entries;
}

