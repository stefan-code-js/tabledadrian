import { NextRequest, NextResponse } from "next/server";
import { getCommunityLeaderboard, updateMemberLeaderboard } from "@/lib/database-enhanced";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get("limit") || "20");

        const leaderboard = getCommunityLeaderboard(limit);

        return NextResponse.json({ leaderboard });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json() as {
            points: number;
            level: number;
            achievementsCount?: number;
            recipesViewed?: number;
            forumPosts?: number;
            hasCollectible?: boolean;
            badges?: string[];
        };
        const { 
            points, 
            level, 
            achievementsCount, 
            recipesViewed, 
            forumPosts, 
            hasCollectible, 
            badges 
        } = body;

        if (typeof points !== "number" || typeof level !== "number") {
            return NextResponse.json(
                { error: "Points and level are required" },
                { status: 400 }
            );
        }

        updateMemberLeaderboard(
            session.user.email,
            points,
            level,
            achievementsCount || 0,
            recipesViewed || 0,
            forumPosts || 0,
            hasCollectible || false,
            badges
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating leaderboard:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
