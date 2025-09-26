import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { seoEntries } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = site.url.replace(/\/$/, "");
    const lastModified = new Date();

    return seoEntries
        .filter((entry) => entry.indexable !== false)
        .map((entry) => ({
            url: `${base}${entry.path}`,
            lastModified,
            changeFrequency: entry.changeFrequency ?? "monthly",
            priority: entry.priority ?? 0.6,
        }));
}
