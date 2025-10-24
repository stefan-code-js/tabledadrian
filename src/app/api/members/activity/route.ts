import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { recordMemberActivity, getMemberActivity } from "@/lib/database-enhanced";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json() as {
            activityType: string;
            activityData: Record<string, any>;
            metadata?: Record<string, any>;
        };
        const { activityType, activityData, metadata } = body;

        if (!activityType || !activityData) {
            return NextResponse.json(
                { error: "Activity type and data are required" },
                { status: 400 }
            );
        }

        recordMemberActivity(session.user.email, activityType, activityData, metadata);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error recording activity:", error);
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

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "50");

        const activities = getMemberActivity(session.user.email, limit);

        return NextResponse.json({ activities });
    } catch (error) {
        console.error("Error fetching activities:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
