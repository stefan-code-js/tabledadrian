import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createMemberRecommendation, getMemberRecommendations } from "@/lib/database-enhanced";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json() as {
            recommendationType: string;
            title: string;
            description: string;
            actionText?: string;
            actionHref?: string;
            priority?: string;
        };
        const { 
            recommendationType, 
            title, 
            description, 
            actionText, 
            actionHref, 
            priority 
        } = body;

        if (!recommendationType || !title || !description) {
            return NextResponse.json(
                { error: "Recommendation type, title, and description are required" },
                { status: 400 }
            );
        }

        createMemberRecommendation(
            session.user.email,
            recommendationType,
            title,
            description,
            actionText,
            actionHref,
            priority || "medium"
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error creating recommendation:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const recommendations = getMemberRecommendations(session.user.email);

        return NextResponse.json({ recommendations });
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
