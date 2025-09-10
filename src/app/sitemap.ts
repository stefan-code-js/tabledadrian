import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const site = process.env.SITE_URL || "https://tabledadrian.com";
    const lastmod = new Date();
    return [
        { url: `${site}/`, lastModified: lastmod, changeFrequency: "monthly", priority: 1 },
        { url: `${site}/about`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.9 },
        { url: `${site}/menu`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.8 },
        { url: `${site}/team`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.7 },
        { url: `${site}/book`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.9 },
        { url: `${site}/reviews`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.9 },
    ];
}

