import type { Metadata } from "next";
import Image from "next/image";
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
        <article className="space-y-8 rounded-3xl border border-[var(--line-hairline)] bg-paper-soft/60 p-8 shadow-lg">
            <header className="space-y-2">
                <h2 className="text-3xl font-serif text-accent">Member recipe vault</h2>
                <p className="max-w-3xl text-sm text-ink-soft">
                    Each ritual balances flavour, performance, and wellness. Holders of Alchemy collectibles enjoy the full
                    rotation, including seasonal residencies and yacht provisions.
                </p>
            </header>

            {!hasCollectible ? (
                <div className="rounded-2xl border border-[var(--line-hairline)] bg-paper/40 px-5 py-4 text-xs text-ink-soft">
                    Unlock {lockedCount} additional recipes by{" "}
                    <Link href="/alchemy-collectibles" className="text-accent underline focus-visible:outline-accent">
                        verifying an Alchemy collectible
                    </Link>{" "}
                    or linking your wallet inside your{" "}
                    <Link href="/auth/register" className="text-accent underline focus-visible:outline-accent">
                        profile
                    </Link>
                    .
                </div>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2">
                {availableRecipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="flex h-full flex-col overflow-hidden rounded-3xl border border-[var(--line-hairline)] bg-paper/40"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={recipe.image}
                                alt={recipe.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 384px, 100vw"
                                priority={false}
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-4 p-6">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-ink-soft">
                                <span>{recipe.focus}</span>
                                <span>{recipe.tags.join(" / ")}</span>
                            </div>
                            <h3 className="text-2xl font-serif text-ink">{recipe.title}</h3>
                            <p className="text-sm text-ink-soft">{recipe.summary}</p>
                            <div className="space-y-2 rounded-2xl border border-[var(--line-hairline)] bg-paper/30 p-4 text-xs text-ink-soft">
                                {recipe.ritual.slice(0, 3).map((step, index) => (
                                    <p key={`${recipe.id}-ritual-${index}`}>• {step}</p>
                                ))}
                            </div>
                            <p className="text-xs uppercase tracking-[0.3em] text-accent">Pairing</p>
                            <p className="text-sm text-ink">{recipe.pairing}</p>
                        </div>
                    </div>
                ))}
            </div>

            {lockedCount > 0 && hasCollectible === false ? (
                <div className="rounded-3xl border border-dashed border-[var(--line-hairline)] bg-paper/30 p-6 text-center text-sm text-ink-soft">
                    {lockedCount} additional recipes await once your collectible is verified.{" "}
                    <Link href="/alchemy-collectibles#verify" className="text-accent underline focus-visible:outline-accent">
                        Verify now
                    </Link>
                    .
                </div>
            ) : null}
        </article>
    );
}
