import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { getSeoEntry } from "@/data/seo";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") ?? "/";
    const entry = getSeoEntry(path);

    const title = entry?.title ?? site.name;
    const description = entry?.description ?? site.description;

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #0f1311 0%, #1d211f 55%, #2f332f 100%)",
                    color: "#f7f3ed",
                    padding: "72px",
                    fontFamily: "Inter, \"Helvetica Neue\", sans-serif",
                }}
            >
                <div style={{ fontSize: 42, textTransform: "uppercase", letterSpacing: 6, color: "#b18a5b" }}>
                    {site.name}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <h1 style={{ fontSize: 72, lineHeight: 1.1, margin: 0 }}>{title}</h1>
                    <p style={{ fontSize: 32, lineHeight: 1.4, maxWidth: "80%", margin: 0 }}>{description}</p>
                </div>
                <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#cbb79d" }}>
                    {site.url.replace(/^https?:\/\//, "")}
                </div>
            </div>
        ),
        { ...size }
    );
}


