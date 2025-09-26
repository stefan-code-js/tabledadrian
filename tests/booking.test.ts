import { describe, it, expect } from 'vitest';
import { buildLeadFromBooking, safeParseBooking, classifySignal } from '../src/lib/booking';
import { clearLeads, listLeads } from '../src/lib/leads';
import { POST } from '../src/app/api/contact/route';

const soonEventDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const basePayload = {
    name: 'Elena',
    email: 'elena@example.com',
    guests: 12,
    eventDate: soonEventDate,
    location: 'Cap d\'Antibes',
    budget: 'approved high-priority spend',
    message: 'Celebration dinner following board meeting.',
    company: '',
};

function createContext() {
    return {
        env: {},
        params: Promise.resolve({}),
    } as any;
}

describe('booking validation', () => {
    it('parses valid payloads and classifies signals', () => {
        clearLeads();
        const parsed = safeParseBooking(basePayload);
        expect(parsed.success).toBe(true);
        if (!parsed.success) return;
        const lead = buildLeadFromBooking(parsed.data);
        expect(lead.signal).toBe('hot');
        const warmDate = new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString();
        expect(classifySignal(warmDate, undefined)).toBe('warm');
    });

    it('rejects invalid payloads', () => {
        const parsed = safeParseBooking({ ...basePayload, email: 'not-an-email' });
        expect(parsed.success).toBe(false);
    });
});

describe('contact API integration', () => {
    it('stores a valid booking', async () => {
        clearLeads();
        const response = await POST(
            new Request('http://localhost/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(basePayload),
            }),
            createContext()
        );
        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data.ok).toBe(true);
        expect(listLeads().length).toBe(1);
    });

    it('returns errors for invalid input', async () => {
        clearLeads();
        const response = await POST(
            new Request('http://localhost/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'bad' }),
            }),
            createContext()
        );
        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.ok).toBe(false);
        expect(Array.isArray(data.errors)).toBe(true);
    });
});
