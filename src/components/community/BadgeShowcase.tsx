import React from "react";
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
                            <img src={badge.image} alt={`${badge.name} emblem`} className="h-12 w-12 object-contain" />
                        </div>
                        <div className="text-xs uppercase tracking-[0.3em] text-ink-soft">{levelCopy[badge.level]}</div>
                        <h3 className="text-xl font-serif text-ink">{badge.name}</h3>
                        <p className="text-sm text-ink-soft">{badge.description}</p>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Criteria</p>
                            <ul className="mt-2 space-y-2 text-sm text-ink-soft">
                                {badge.criteria.map((criterion) => (
                                    <li key={`${badge.id}-${criterion}`}>• {criterion}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-ink-soft">Privileges</p>
                            <ul className="mt-2 space-y-2 text-sm text-ink">
                                {badge.perks.map((perk) => (
                                    <li key={`${badge.id}-${perk}`}>• {perk}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
