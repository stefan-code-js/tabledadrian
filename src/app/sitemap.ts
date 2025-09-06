import { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const lastmod = new Date().toISOString().split("T")[0];
    return [
        { url: `${site.url}/`, lastModified: lastmod, changeFrequency: "weekly", priority: 1 },
        { url: `${site.url}/about`, lastModified: lastmod, changeFrequency: "monthly", priority: 0.7 },
        { url: `${site.url}/menu`, lastModified: lastmod, changeFrequency: "weekly", priority: 0.8 },
        { url: `${site.url}/book`, changeFrequency: "weekly", priority: 0.8 }

    ];
}
