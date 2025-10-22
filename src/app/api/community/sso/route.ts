import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import DiscourseSSO from "discourse-sso";
import { auth } from "@/lib/auth";

const DISCOURSE_SSO_SECRET = process.env.DISCOURSE_SSO_SECRET;
const DISCOURSE_BASE_URL = process.env.DISCOURSE_BASE_URL ?? "https://forum.tabledadrian.com";

function buildRedirectUrl(): NextResponse {
    return NextResponse.json({ message: "SSO not configured" }, { status: 500 });
}

export async function GET(request: NextRequest) {
    if (!DISCOURSE_SSO_SECRET) {
        return buildRedirectUrl();
    }

    const session = await auth();
    if (!session?.user?.email) {
        const callback = encodeURIComponent(`${request.nextUrl.pathname}${request.nextUrl.search}`);
        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${callback}`, request.url));
    }

    const payload = request.nextUrl.searchParams.get("sso");
    const sig = request.nextUrl.searchParams.get("sig");

    if (!payload || !sig) {
        return NextResponse.json({ message: "Missing SSO payload" }, { status: 400 });
    }

    const sso = new DiscourseSSO(DISCOURSE_SSO_SECRET);
    if (!sso.validate(payload, sig)) {
        return NextResponse.json({ message: "Invalid SSO payload" }, { status: 403 });
    }

    const nonce = sso.getNonce(payload);
    const avatarUrl =
        process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
        "https://www.tabledadrian.com";

    const query = sso.buildLoginString({
        nonce,
        email: session.user.email,
        external_id: session.user.id ?? session.user.email ?? "guest",
        name: session.user.name ?? "Table d'Adrian Member",
        avatar_url: `${avatarUrl}/media/branding/logo-mark.svg`,
        username: session.user.email?.split("@")[0],
    });

    const redirectTarget = `${DISCOURSE_BASE_URL.replace(/\/$/, "")}/session/sso_login?${query}`;
    return NextResponse.redirect(redirectTarget);
}
