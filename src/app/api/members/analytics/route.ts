import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { recordMemberAnalytics, getMemberAnalytics } from "@/lib/database-enhanced";

export async function POST(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json() as {
            metricName: string;
            metricValue: number;
            metadata?: Record<string, any>;
        };
        const { metricName, metricValue, metadata } = body;

        if (!metricName || typeof metricValue !== "number") {
            return NextResponse.json(
                { error: "Invalid metric data" },
                { status: 400 }
            );
        }

        recordMemberAnalytics(session.user.email, metricName, metricValue, metadata);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error recording analytics:", error);
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
        const metricName = searchParams.get("metric");

        const analytics = getMemberAnalytics(session.user.email, metricName || undefined);

        return NextResponse.json({ analytics });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
