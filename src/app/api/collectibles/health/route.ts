import { NextResponse } from "next/server";
import { resolveIntegrationHealth } from "@/lib/web3Health";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const payload = await resolveIntegrationHealth();
        return NextResponse.json(payload, { status: 200 });
    } catch (error) {
        console.error("Unable to resolve concierge integration health", error);
        return NextResponse.json(
            { message: "Unable to resolve concierge integration health" },
            { status: 500 },
        );
    }
}
