import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = site.url || process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.tabledadrian.com";
  return {
    rules: [
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
