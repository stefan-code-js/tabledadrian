import recipes from "../../content/recipes/recipes.json";

export type Recipe = {
    id: string;
    title: string;
    summary: string;
    focus: string;
    ritual: string[];
    pairing: string;
    image: string;
    requiresCollectible: boolean;
    tags: string[];
};

export const curatedRecipes = recipes as Recipe[];
