import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { unlockMemberAchievement, getMemberAchievements } from "@/lib/database-enhanced";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json() as {
            achievementId: string;
            progress?: number;
            maxProgress?: number;
            pointsEarned?: number;
        };
        const { achievementId, progress, maxProgress, pointsEarned } = body;

        if (!achievementId) {
            return NextResponse.json(
                { error: "Achievement ID is required" },
                { status: 400 }
            );
        }

        unlockMemberAchievement(
            session.user.email,
            achievementId,
            progress || 1,
            maxProgress || 1,
            pointsEarned || 0
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error unlocking achievement:", error);
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

        const achievements = getMemberAchievements(session.user.email);

        return NextResponse.json({ achievements });
    } catch (error) {
        console.error("Error fetching achievements:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
