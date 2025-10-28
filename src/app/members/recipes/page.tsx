import type { Metadata } from "next";
import Image from "@/components/StaticImage";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { walletIsCollectibleHolder } from "@/lib/collectibles";
import { curatedRecipes } from "@/data/recipes";

export const metadata: Metadata = {
    title: "Recipes Vault | Table d'Adrian",
    description:
        "Immersive, wellness-driven recipes crafted by Chef Adrian and Dr. Antonia for the private member circle.",
};

export default async function MemberRecipesPage() {
    const session = await auth();
    const walletAddress = session?.user?.walletAddress ?? null;
    const hasCollectible = await walletIsCollectibleHolder(walletAddress);

    const availableRecipes = hasCollectible
        ? curatedRecipes
        : curatedRecipes.filter((recipe) => !recipe.requiresCollectible);

    const lockedCount = curatedRecipes.length - availableRecipes.length;

    return (
        <article className="editorial-page">
            <section className="page-surface">
                <div className="page-card page-card--stack">
                    <header>
                        <h2 className="page-card__title">Member recipe vault</h2>
                        <p className="page-card__body">
                            Each ritual balances flavour, performance, and wellness. Holders of Alchemy collectibles enjoy the full
                            rotation, including seasonal residencies and yacht provisions.
                        </p>
                    </header>

                    {!hasCollectible ? (
                        <div className="page-card page-card--stack">
                            <p className="page-card__body">
                                Unlock {lockedCount} additional recipes by{" "}
                                <Link href="/alchemy-collectibles" className="text-link">
                                    verifying an Alchemy collectible
                                </Link>{" "}
                                or linking your wallet inside your{" "}
                                <Link href="/auth/register" className="text-link">
                                    profile
                                </Link>
                                .
                            </p>
                        </div>
                    ) : null}

                    <div className="page-grid page-grid--two">
                        {availableRecipes.map((recipe) => (
                            <article key={recipe.id} className="page-card page-card--stack recipe-card">
                                <div className="recipe-card__media">
                                    <Image
                                        src={recipe.image}
                                        alt={recipe.title}
                                        fill
                                        className="recipe-card__image"
                                        sizes="(min-width: 1024px) 384px, 100vw"
                                        priority={false}
                                    />
                                </div>
                                <div className="page-card__meta">
                                    <span>{recipe.focus}</span>
                                    <span>{recipe.tags.join(" / ")}</span>
                                </div>
                                <h3 className="page-card__title">{recipe.title}</h3>
                                <p className="page-card__body">{recipe.summary}</p>
                                <div className="recipe-step-stack">
                                    {recipe.ritual.slice(0, 3).map((step, index) => (
                                        <div key={`${recipe.id}-ritual-${index}`} className="recipe-step-card">
                                            <span className="recipe-step-card__index">{index + 1}</span>
                                            <p className="recipe-step-card__text">{step}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="page-card__meta">
                                    <span>Pairing</span>
                                    <span>{recipe.pairing}</span>
                                </div>
                            </article>
                        ))}
                    </div>

                    {lockedCount > 0 && hasCollectible === false ? (
                        <div className="page-card page-card--center">
                            <p className="page-card__body">
                                {lockedCount} additional recipes await once your collectible is verified.{" "}
                                <Link href="/alchemy-collectibles#verify" className="text-link">
                                    Verify now
                                </Link>
                                .
                            </p>
                        </div>
                    ) : null}
                </div>
            </section>
        </article>
    );
}
