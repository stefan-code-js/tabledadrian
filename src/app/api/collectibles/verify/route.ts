import { NextResponse } from "next/server";
import { z } from "zod";
import { walletIsCollectibleHolder } from "@/lib/collectibles";

const schema = z.object({
    walletAddress: z
        .string()
        .min(1, "Provide a wallet address.")
        .regex(/^0x[a-fA-F0-9]{40}$/, "Wallet address must be a 42-character hex string."),
});

export async function POST(request: Request) {
    try {
        const payload = await request.json();
        const { walletAddress } = schema.parse(payload);
        const eligible = await walletIsCollectibleHolder(walletAddress);
        return NextResponse.json({ eligible });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Invalid payload", issues: error.flatten() }, { status: 400 });
        }
        console.error("Collectible verification failed", error);
        return NextResponse.json({ message: "Unable to verify collectible status" }, { status: 500 });
    }
}
