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
        <article className="editorial-page">
            <header className="page-cover">
                <div className="page-cover__body">
                    <span className="page-eyebrow">Recipe atelier</span>
                    <h1 className="page-heading">Rituals designed for luminous evenings</h1>
                    <p className="page-subheading">
                        Each preparation balances micronutrient intelligence with sensorial theatre.
                        Members unlock the complete vault, seasonal residencies, and pairing protocols.
                    </p>
                    <div className="page-actions">
                        <Link href="/auth/login" className="btn">
                            Access vault
                        </Link>
                        <Link href="/alchemy-collectibles" className="btn ghost">
                            Verify collectible
                        </Link>
                    </div>
                </div>
            </header>

            <section className="page-grid page-grid--two">
                {selections.length > 0 ? (
                    selections.map((recipe) => (
                        <article key={recipe.id} className="page-card page-card--stack recipe-card">
                            <div className="recipe-card__media">
                                <Image src={recipe.image} alt={recipe.title} fill className="recipe-card__image" />
                            </div>
                            <div className="page-card__meta">
                                <span>{recipe.focus}</span>
                                <span>{recipe.tags.join(" / ")}</span>
                            </div>
                            <h2 className="page-card__title">{recipe.title}</h2>
                            <p className="page-card__body">{recipe.summary}</p>
                            <div className="recipe-step-stack">
                                {recipe.ritual.slice(0, 2).map((step, index) => (
                                    <div key={`${recipe.id}-preview-${index}`} className="recipe-step-card">
                                        <span className="recipe-step-card__index">{index + 1}</span>
                                        <p className="recipe-step-card__text">{step}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="page-card__meta">
                                <span>Pairing</span>
                                <span>{recipe.pairing}</span>
                            </div>
                            <p className="page-section-note">
                                {recipe.requiresCollectible ? "Collectible exclusive" : "Open to all members"}
                            </p>
                        </article>
                    ))
                ) : (
                    <div className="page-card page-card--center">
                        <p className="page-card__body">
                            The vault is being refreshed. Sign in or contact the concierge for bespoke pairings.
                        </p>
                    </div>
                )}
            </section>

            <section className="page-surface page-surface--center">
                <h2 className="page-heading">Savour the complete vault</h2>
                <p className="page-subheading">
                    Link your collectible or membership to access hydration calibrations, post-service recovery menus,
                    and yacht provisioning playbooks tailored to your household&apos;s rhythm.
                </p>
                <div className="page-actions">
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
