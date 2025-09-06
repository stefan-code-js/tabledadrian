import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastmod = new Date().toISOString().split("T")[0];
    return [
        { url: `${site.url}/`, lastModified: lastmod, changeFrequency: "weekly", priority: 1 },
    ];
}
