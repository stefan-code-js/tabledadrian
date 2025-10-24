import { NextRequest, NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";
import { Resend } from "resend";
import { resolveCfEnv } from "@/lib/cloudflare";

type Env = { RESEND_API_KEY?: string };

export const runtime = "nodejs";

function resolveResendApiKey(env?: Env): string | undefined {
    const direct = env?.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
    return typeof direct === "string" && direct.trim().length ? direct.trim() : undefined;
}

function buildEmailBody(sessionId: string, order?: ReturnType<typeof getOrder>): string {
    const lines: string[] = [
        `Stripe session: ${sessionId}`,
        `Mode: ${order?.mode ?? "unknown"}`,
    ];

    if (order?.priceId) {
        lines.push(`Price ID: ${order.priceId}`);
    }

    if (order?.amount && order.currency) {
        lines.push(`Amount: ${order.amount.toLocaleString("en-GB", { style: "currency", currency: order.currency })}`);
    } else if (order?.amount) {
        lines.push(`Amount: ${order.amount}`);
    }

    if (order?.metadata && Object.keys(order.metadata).length > 0) {
        lines.push("Metadata:");
        for (const [key, value] of Object.entries(order.metadata)) {
            lines.push(`  ${key}: ${value}`);
        }
    }

    return lines.join("\n");
}

function buildMailtoRedirect(sessionId: string, body: string): string {
    const subject = encodeURIComponent(`Payment confirmed - session ${sessionId}`);
    const encodedBody = encodeURIComponent(body);
    return `mailto:adrian@tabledadrian.com?subject=${subject}&body=${encodedBody}`;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    const url = request.nextUrl;
    const sessionId = url.searchParams.get("session_id");
    const origin = `${url.protocol}//${url.host}`;

    if (!sessionId) {
        return NextResponse.redirect(`${origin}/?payment=missing_session`, { status: 303 });
    }

    const order = getOrder(sessionId);
    const emailBody = buildEmailBody(sessionId, order);

    const resendApiKey = resolveResendApiKey(resolveCfEnv<Env>());

    if (resendApiKey) {
        try {
            const resend = new Resend(resendApiKey);
            await resend.emails.send({
                from: "Table d'Adrian <no-reply@tabledadrian.com>",
                to: ["adrian@tabledadrian.com"],
                subject: `Payment confirmed - session ${sessionId}`,
                text: emailBody,
            });
        } catch (error) {
            console.error("Failed to send payment confirmation email", error);
        }
    } else {
        console.warn("RESEND_API_KEY is not configured; skipping payment confirmation email.");
    }

    const mailtoRedirect = buildMailtoRedirect(sessionId, emailBody);
    return NextResponse.redirect(mailtoRedirect, { status: 302 });
}
