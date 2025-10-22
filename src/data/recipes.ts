import { getDatabase } from "@/lib/database";

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

function fetchRecipes(): Recipe[] {
    const db = getDatabase();
    const recipeRows = db
        .prepare("SELECT * FROM recipes ORDER BY title ASC")
        .all() as Array<{
            id: string;
            title: string;
            summary: string;
            focus: string;
            tags: string;
            image: string;
            pairing: string;
            requires_collectible: number;
        }>;

    const stepRows = db
        .prepare(
            "SELECT recipe_id, step_order, description FROM recipe_steps ORDER BY recipe_id ASC, step_order ASC",
        )
        .all() as Array<{ recipe_id: string; step_order: number; description: string }>;

    const stepMap = new Map<string, string[]>();
    for (const step of stepRows) {
        if (!stepMap.has(step.recipe_id)) {
            stepMap.set(step.recipe_id, []);
        }
        stepMap.get(step.recipe_id)!.push(step.description);
    }

    return recipeRows.map((row) => ({
        id: row.id,
        title: row.title,
        summary: row.summary,
        focus: row.focus,
        ritual: stepMap.get(row.id) ?? [],
        pairing: row.pairing,
        image: row.image,
        requiresCollectible: row.requires_collectible === 1,
        tags: JSON.parse(row.tags) as string[],
    }));
}

export const curatedRecipes = fetchRecipes();
