import React from "react";
import Image from "@/components/StaticImage";
import type { BadgeDefinition } from "@/data/badges";

type Props = {
    badges: BadgeDefinition[];
};

const levelCopy: Record<BadgeDefinition["level"], string> = {
    circle: "Circle distinction",
    guild: "Guild distinction",
    constellation: "Constellation distinction",
};

export default function BadgeShowcase({ badges }: Props) {
    return (
        <section className="rounded-[2.5rem] border border-[var(--line-soft)] bg-paper-soft/60 p-8 shadow-lg">
            <p className="text-xs uppercase tracking-[0.45em] text-ink-soft">Recognition</p>
            <h2 className="mt-2 text-3xl font-serif text-accent">Collectible badge constellation</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
                {badges.map((badge) => (
                    <article
                        key={badge.id}
                        className="flex h-full flex-col gap-4 rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-6"
                    >
                        <div className="h-16 w-16 rounded-2xl border border-[var(--line-hairline)] bg-paper flex items-center justify-center">
                            <Image src={badge.image} alt={`${badge.name} emblem`} width={48} height={48} />
                        </div>
                        <div className="text-xs uppercase tracking-[0.3em] text-ink-soft">{levelCopy[badge.level]}</div>
                        <h3 className="text-xl font-serif text-ink">{badge.name}</h3>
                        <p className="text-sm text-ink-soft">{badge.description}</p>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Criteria</p>
                            <div className="badge-stacked">
                                {badge.criteria.map((criterion) => (
                                    <div key={`${badge.id}-${criterion}`} className="badge-detail-card">
                                        {criterion}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Privileges</p>
                            <div className="badge-stacked">
                                {badge.perks.map((perk) => (
                                    <div key={`${badge.id}-${perk}`} className="badge-detail-card badge-detail-card--accent">
                                        {perk}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
