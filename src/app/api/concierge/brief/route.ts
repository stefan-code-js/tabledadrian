import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";

const requestSchema = z.object({
    occasion: z.string().min(1, "Share the occasion we are designing for."),
    guests: z.union([z.string(), z.number()]).optional(),
    preferences: z.string().optional(),
    location: z.string().optional(),
});

const openaiKey = process.env.OPENAI_API_KEY;

function buildPrompt({ occasion, guests, preferences, location }: z.infer<typeof requestSchema>): string {
    const guestLine = guests ? `Guest count: ${guests}.` : "Guest count: bespoke.";
    const preferenceLine = preferences ? `Preferences: ${preferences}.` : "Preferences provided on call.";
    const locationLine = location ? `Destination: ${location}.` : "Destination: multi-region (Monaco, NYC, Dubai).";
    return `You are the concierge for Table d'Adrian, an ultra-luxury private chef atelier. Craft a short personalization brief
for the culinary team.

Occasion: ${occasion}.
${guestLine}
${locationLine}
${preferenceLine}

Respond with 3 sections: Atmosphere, Culinary Arc, and Web3 Utility. Each section should be 2 sentences, highlight luxury
 touches, and reference collectible unlocks or token-gated perks when relevant.`;
}

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const parsed = requestSchema.parse(payload);

        if (!openaiKey) {
            return NextResponse.json({
                brief:
                    "Atmosphere: Candlelit Riviera-inspired salon with Guerlain florals and curated playlists synchronized to your collectible tier.\nCulinary Arc: Five-course tasting anchored in seasonal Mediterranean produce, caviar accoutrements, and tableside pastry theatrics.\nWeb3 Utility: Unlock Noir Constellation for yacht provisioning protocols and token-gated sommelier pairings delivered post-event.",
                fallback: true,
            });
        }

        const client = new OpenAI({ apiKey: openaiKey });
        const response = await client.responses.create({
            model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
            input: buildPrompt(parsed),
            max_output_tokens: 400,
        });
        const brief = response.output_text?.trim();

        if (!brief) {
            throw new Error("Empty completion");
        }

        return NextResponse.json({ brief });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Invalid concierge brief", issues: error.flatten() }, { status: 400 });
        }
        console.error("Concierge brief failed", error);
        return NextResponse.json(
            {
                message: "Unable to craft personalization at this time.",
                brief:
                    "Atmosphere: Riviera salon lighting with Lalique crystal and bespoke fragrance mists.\nCulinary Arc: Progression of raw bar, fire, and patisserie signatures choreographed with live plating.\nWeb3 Utility: Token-gated vault release featuring residency itineraries and sommelier pairings post-event.",
                fallback: true,
            },
            { status: 500 },
        );
    }
}
