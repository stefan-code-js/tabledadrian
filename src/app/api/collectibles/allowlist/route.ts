import { NextResponse } from "next/server";
import { lookupConciergeAllowlist } from "@/lib/concierge";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const wallet = url.searchParams.get("wallet") ?? url.searchParams.get("walletAddress");
    const email = url.searchParams.get("email") ?? url.searchParams.get("mail");

    if (!wallet && !email) {
        return NextResponse.json(
            { message: "Provide a wallet or email to check concierge allowlist status." },
            { status: 400 },
        );
    }

    const result = lookupConciergeAllowlist({ walletAddress: wallet, email });
    return NextResponse.json(result, { status: 200 });
}
