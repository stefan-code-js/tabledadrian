import { z } from "zod";
import type { LeadInsert, LeadSignal } from "@/lib/leads";

export const bookingSchema = z.object({
    name: z.string().trim().min(2).max(80),
    email: z.string().trim().email(),
    guests: z.coerce.number().int().min(1).max(120),
    eventDate: z.string().trim().min(4),
    location: z.string().trim().max(120).optional(),
    budget: z.string().trim().max(120).optional(),
    message: z.string().trim().max(1600).optional(),
    company: z.string().optional(),
});

export type BookingPayload = z.infer<typeof bookingSchema>;

export function safeParseBooking(data: unknown) {
    return bookingSchema.safeParse(data);
}



export function classifySignal(eventDate: string, budget?: string): LeadSignal {
    const now = Date.now();
    const time = Date.parse(eventDate);
    if (!Number.isNaN(time)) {
        const diffDays = Math.round((time - now) / (1000 * 60 * 60 * 24));
        if (diffDays <= 14) return "hot";
        if (diffDays <= 45) return "warm";
    }
    if (budget) {
        const normalized = budget.toLowerCase();
        const hotTokens = ["\u20ac", "eur", "10k", "20k", "30k", "40k", "50k"];
        if (hotTokens.some((token) => normalized.includes(token))) {
            return "hot";
        }
    }
    return "nurture";
}

export function buildLeadFromBooking(data: BookingPayload): LeadInsert {
    const { name, email, guests, eventDate, location, budget, message } = data;
    return {
        name,
        email,
        guests,
        eventDate,
        location: location?.trim() ? location : undefined,
        budget: budget?.trim() ? budget : undefined,
        message: message?.trim() ? message : undefined,
        signal: classifySignal(eventDate, budget),
    };
}







