import { z } from "zod";
import { addLead } from "@/lib/leads";

export const runtime = "edge";

const schema = z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email(),
    guests: z.coerce.number().int().min(1).max(120),
    eventDate: z.string().trim().min(4),
    location: z.string().trim().max(120).optional(),
    budget: z.string().trim().max(120).optional(),
    message: z.string().trim().max(1600).optional(),
    company: z.string().optional(),
});

function computeSignal(eventDate: string, budget?: string): "hot" | "warm" | "nurture" {
    const now = Date.now();
    const time = Date.parse(eventDate);
    if (!Number.isNaN(time)) {
        const diffDays = Math.round((time - now) / (1000 * 60 * 60 * 24));
        if (diffDays <= 14) return "hot";
        if (diffDays <= 45) return "warm";
    }
    if (budget && /\b(€|eur|10k|20k|30k|40k|50k)\b/i.test(budget)) {
        return "hot";
    }
    return "nurture";
}

export async function POST(req: Request): Promise<Response> {
    try {
        const raw = await req.json();
        const parsed = schema.safeParse(raw);
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

        const { name, email, guests, eventDate, location, budget, message } = parsed.data;
        const signal = computeSignal(eventDate, budget);
        const lead = addLead({ name, email, guests, eventDate, location, budget, message, signal });
        return Response.json({ ok: true, lead });
    } catch (error) {
        return Response.json({ ok: false, errors: ["invalid_payload"] }, { status: 400 });
    }
}
