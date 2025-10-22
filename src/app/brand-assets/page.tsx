import type { Metadata } from "next";
import Link from "next/link";

const assets = [
    {
        label: "Primary wordmark",
        description: "Full lockup in nocturne palette for hero placements and print collateral.",
        file: "/media/branding/logo-primary.svg",
    },
    {
        label: "Gilded monogram",
        description: "Radial monogram for avatars, wax seals, and mobile favicons.",
        file: "/media/branding/logo-mark.svg",
    },
    {
        label: "Minimal initials",
        description: "TDA condensed mark for embroidery, plating, and etched crystalware.",
        file: "/media/branding/logo-monogram.svg",
    },
];

const palette = [
    { name: "Nocturne", hex: "#10131A", usage: "Backgrounds, text overlays" },
    { name: "Linen", hex: "#F5F0E8", usage: "Typography, contrast layers" },
    { name: "Champagne Gold", hex: "#D4AF37", usage: "Accents, dividers, calls-to-action" },
    { name: "Soft Graphite", hex: "#5A6072", usage: "Supporting copy, borders" },
];

export const metadata: Metadata = {
    title: "Brand Assets | Table d'Adrian",
    description:
        "Download Table d'Adrian logos, palette, and usage guidance for press features, partners, and collectors.",
};

export default function BrandAssetsPage() {
    return (
        <article className="space-y-10 rounded-[2.75rem] border border-[var(--line-soft)] bg-paper-soft/70 px-10 py-12 shadow-xl">
            <header className="space-y-3">
                <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Brand stewardship</p>
                <h1 className="text-4xl font-serif text-accent">Table d&apos;Adrian brand assets</h1>
                <p className="max-w-3xl text-sm text-ink-soft">
                    Download the official marks and palette for editorial placements, private club partnerships, and
                    collectible marketplaces. Please keep the gold accents pristine—no gradients or drop shadows beyond those
                    provided here.
                </p>
            </header>

            <section className="grid gap-6 md:grid-cols-3">
                {assets.map((asset) => (
                    <div
                        key={asset.file}
                        className="flex h-full flex-col justify-between rounded-3xl border border-[var(--line-hairline)] bg-paper/50 p-6"
                    >
                        <div>
                            <h2 className="text-lg font-semibold text-ink">{asset.label}</h2>
                            <p className="mt-2 text-sm text-ink-soft">{asset.description}</p>
                        </div>
                        <a
                            className="mt-4 inline-flex items-center rounded-2xl border border-[var(--line-soft)] px-4 py-2 text-xs uppercase tracking-[0.3em] text-accent focus-visible:outline-accent"
                            href={asset.file}
                            download
                        >
                            Download SVG
                        </a>
                    </div>
                ))}
            </section>

            <section className="rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-6">
                <h2 className="text-lg font-semibold text-ink">Palette</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-4">
                    {palette.map((tone) => (
                        <div key={tone.hex} className="space-y-3 rounded-2xl border border-[var(--line-hairline)] p-4 text-sm">
                            <div className="h-16 w-full rounded-xl" style={{ backgroundColor: tone.hex }} />
                            <p className="font-semibold text-ink">{tone.name}</p>
                            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">{tone.hex}</p>
                            <p className="text-xs text-ink-soft">{tone.usage}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl border border-dashed border-[var(--line-hairline)] bg-paper/30 p-6 text-sm text-ink-soft">
                <p className="font-semibold text-ink">Usage etiquette</p>
                <ul className="mt-2 list-disc space-y-2 pl-4">
                    <li>Maintain clear space equal to the width of the “T” around every logo.</li>
                    <li>Pair typography with Inter or Times New Roman to mirror the atelier&apos;s identity.</li>
                    <li>Never recolor the gold accent—use Champagne Gold (#D4AF37) for digital and Pantone 871 C for print.</li>
                </ul>
                <p className="mt-4">
                    Require bespoke adaptations?{" "}
                    <Link href="/contact?context=brand" className="text-accent underline focus-visible:outline-accent">
                        Speak with the brand concierge
                    </Link>
                    .
                </p>
            </section>
        </article>
    );
}
