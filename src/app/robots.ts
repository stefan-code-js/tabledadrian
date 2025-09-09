import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const site = process.env.SITE_URL || "https://tabledadrian.com";
    return {
        rules: [{ userAgent: "*", allow: "/" }],
        sitemap: `${site}/sitemap.xml`,
        host: site.replace(/^https?:\/\//, ""),
    };
}
