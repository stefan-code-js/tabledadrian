import { addLead } from "@/lib/leads";
import { buildLeadFromBooking, safeParseBooking } from "@/lib/booking";

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
    try {
        const raw = await req.json();
        const parsed = safeParseBooking(raw);
        if (!parsed.success) {
            return Response.json(
                { ok: false, errors: parsed.error.issues.map((issue) => issue.message) },
                { status: 400 }
            );
        }

        if (parsed.data.company && parsed.data.company.trim().length > 0) {
            // Honeypot triggered — pretend success
            return Response.json({ ok: true, ignored: true });
        }

        const lead = addLead(buildLeadFromBooking(parsed.data));
        return Response.json({ ok: true, lead });
    } catch (error) {
        return Response.json({ ok: false, errors: ["invalid_payload"] }, { status: 400 });
    }
}
