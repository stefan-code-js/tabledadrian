import type { Metadata } from "next";
import Link from "next/link";
import Image from "@/components/StaticImage";
import { curatedRecipes } from "@/data/recipes";

export const metadata: Metadata = {
    title: "Recipe Atelier | Table d'Adrian",
    description:
        "Preview signature wellness-forward dishes crafted for Table d'Adrian members and collectible holders.",
};

export default function RecipesPage() {
    const selections = curatedRecipes.slice(0, 4);

    return (
        <article className="space-y-12 pb-20">
            <header className="relative overflow-hidden rounded-[3rem] border border-[var(--line-soft)] bg-paper-soft/80 px-10 py-16 text-center shadow-2xl">
                <div className="mx-auto flex max-w-4xl flex-col items-center gap-6">
                    <span className="text-xs uppercase tracking-[0.45em] text-ink-soft">Recipe Atelier</span>
                    <h1 className="text-4xl font-serif text-accent">
                        Rituals designed for luminous evenings
                    </h1>
                    <p className="text-sm text-ink-soft leading-relaxed">
                        Each preparation balances micronutrient intelligence with sensorial theatre.
                        Members unlock the complete vault, seasonal residencies, and pairing protocols.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/auth/login" className="btn">
                            Access vault
                        </Link>
                        <Link href="/alchemy-collectibles" className="btn ghost">
                            Verify collectible
                        </Link>
                    </div>
                </div>
            </header>

            <section className="grid gap-8 md:grid-cols-2">
                {selections.length > 0 ? (
                    selections.map((recipe) => (
                        <article
                            key={recipe.id}
                            className="flex h-full flex-col gap-5 rounded-3xl border border-[var(--line-hairline)] bg-paper-soft/60 p-6 shadow-lg"
                        >
                            <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-[var(--line-hairline)]">
                                <Image src={recipe.image} alt={recipe.title} fill />
                            </div>
                            <div className="flex flex-wrap items-center justify-between text-xs uppercase tracking-[0.3em] text-ink-soft">
                                <span>{recipe.focus}</span>
                                <span>{recipe.tags.join(" / ")}</span>
                            </div>
                            <h2 className="text-2xl font-serif text-ink">{recipe.title}</h2>
                            <p className="text-sm text-ink-soft">{recipe.summary}</p>
                            <div className="recipe-step-stack">
                                {recipe.ritual.slice(0, 2).map((step, index) => (
                                    <div key={`${recipe.id}-preview-${index}`} className="recipe-step-card">
                                        <span className="recipe-step-card__index">{index + 1}</span>
                                        <p className="recipe-step-card__text">{step}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-ink-soft">
                                <span>Pairing</span>
                                <span>{recipe.pairing}</span>
                            </div>
                            {recipe.requiresCollectible ? (
                                <p className="text-xs uppercase tracking-[0.35em] text-accent">
                                    Collectible exclusive
                                </p>
                            ) : (
                                <p className="text-xs uppercase tracking-[0.35em] text-ink-soft">
                                    Open to all members
                                </p>
                            )}
                        </article>
                    ))
                ) : (
                    <div className="rounded-3xl border border-[var(--line-hairline)] bg-paper/40 p-8 text-center text-sm text-ink-soft md:col-span-2">
                        <p>The vault is being refreshed. Sign in or contact the concierge for bespoke pairings.</p>
                    </div>
                )}
            </section>

            <section className="rounded-[2.5rem] border border-dashed border-[var(--line-hairline)] bg-paper/30 p-10 text-center text-sm text-ink-soft">
                <h2 className="text-2xl font-serif text-ink">Savour the complete vault</h2>
                <p className="mx-auto mt-3 max-w-2xl">
                    Link your collectible or membership to access hydration calibrations, post-service recovery menus,
                    and yacht provisioning playbooks tailored to your household&apos;s rhythm.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Link href="/membership" className="btn">
                        Elevate membership
                    </Link>
                    <Link href="/contact?context=recipes" className="btn ghost">
                        Concierge consultation
                    </Link>
                </div>
            </section>
        </article>
    );
}
