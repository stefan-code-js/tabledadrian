import { NextResponse } from "next/server";
import { z } from "zod";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { createHash } from "node:crypto";
import { getLegalContactDetails } from "@/lib/legal";

export const runtime = "nodejs";

const schema = z.object({
    email: z.string().email(),
    requestType: z.enum(["access", "erase", "rectify", "export", "object"]),
    details: z.string().min(20).max(2000),
    country: z.string().min(2).max(120),
});

type RequestPayload = z.infer<typeof schema>;

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

if (MAILCHIMP_API_KEY) {
    const [, server] = MAILCHIMP_API_KEY.split("-");
    if (server) {
        mailchimp.setConfig({
            apiKey: MAILCHIMP_API_KEY,
            server,
        });
    }
}

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

async function subscribeToMailchimp(payload: RequestPayload, ticketId: string) {
    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) return;
    try {
        const hash = createHash("md5").update(payload.email.toLowerCase()).digest("hex");
        await mailchimp.lists.setListMember(
            MAILCHIMP_LIST_ID,
            hash,
            {
                email_address: payload.email,
                status_if_new: "pending",
                merge_fields: {
                    COUNTRY: payload.country,
                    REQUEST: payload.requestType,
                    TICKET: ticketId,
                },
            },
        );
        const tags = [
            { name: "dsar", status: "active" as const },
            { name: `dsar-${payload.requestType.toLowerCase()}`, status: "active" as const },
        ];
        await mailchimp.lists.updateListMemberTags(MAILCHIMP_LIST_ID, hash, { tags });
    } catch (error) {
        console.error("Mailchimp tagging failed", error);
    }
}

function buildAdminEmail(payload: RequestPayload, ticketId: string): string {
    return `
        <p>A new data rights request requires attention.</p>
        <p><strong>Ticket:</strong> ${ticketId}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Request type:</strong> ${payload.requestType}</p>
        <p><strong>Country:</strong> ${payload.country}</p>
        <p><strong>Details:</strong></p>
        <p>${payload.details.replace(/\n/g, "<br/>")}</p>
    `;
}

function buildUserEmail(payload: RequestPayload, ticketId: string): string {
    return `
        <p>Thank you for contacting the Table d'Adrian privacy team.</p>
        <p>Your request is logged under ticket <strong>${ticketId}</strong>. We will respond within 30 days.</p>
        <p>If you need to share more context, simply reply to this message from the same email address (${payload.email}).</p>
    `;
}

async function sendEmails(payload: RequestPayload, ticketId: string) {
    if (!resend) return;
    const contact = getLegalContactDetails();
    try {
        await resend.emails.send({
            from: "Table d'Adrian Privacy <no-reply@tabledadrian.com>",
            to: contact.email,
            subject: `DSAR Ticket ${ticketId}`,
            html: buildAdminEmail(payload, ticketId),
        });
        await resend.emails.send({
            from: "Table d'Adrian Privacy <no-reply@tabledadrian.com>",
            to: payload.email,
            subject: `Your Data Request Received - Ticket ${ticketId}`,
            html: buildUserEmail(payload, ticketId),
        });
    } catch (error) {
        console.error("Email dispatch failed", error);
    }
}

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const payload = schema.parse(json);
        const ticketId = uuidv4();
        await Promise.all([
            subscribeToMailchimp(payload, ticketId),
            sendEmails(payload, ticketId),
        ]);
        return NextResponse.json({ ticketId });
    } catch (error) {
        console.error("Failed to process privacy request", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Invalid request payload", issues: error.issues }, { status: 400 });
        }
        return NextResponse.json({ message: "Unable to process request" }, { status: 500 });
    }
}
