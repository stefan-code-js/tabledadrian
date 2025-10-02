const faqs = [
    {
        q: "How do I book a service?",
        a: "Select the experience, membership program, or consult tier that suits your household. Complete checkout and we will confirm a discovery call within one business day to align on timing and particulars.",
    },
    {
        q: "Do you offer refunds?",
        a: "Full refunds are available within twenty-four hours of purchase. After that window we credit any changes toward future dates so planning and staffing remain uninterrupted.",
    },
    {
        q: "Are ingredients locally sourced?",
        a: "Seasonal produce and seafood are sourced directly from Riviera partners and supplemented with preserved elements from our studio pantry to maintain continuity when markets shift.",
    },
    {
        q: "Can you handle dietary restrictions?",
        a: "Yes. Pharmacist-led intake captures allergies, sensitivities, and supplementation routines so our menus, beverage pairings, and provisioning respect every constraint without compromising flavor.",
    },
    {
        q: "Is travel included?",
        a: "Travel within Monaco and Antibes is included. For Cannes, Saint-Tropez, or international engagements we add transparent travel days and logistics to the proposal before collecting payment.",
    },
    {
        q: "What happens after checkout?",
        a: "You receive an email with intake materials, a link to schedule your strategy call, and a secure workspace where itineraries, invoices, and post-service reports live for continued reference.",
    },
    {
        q: "Can you coordinate with our household staff?",
        a: "We brief household managers and stewards on mise en place, rentals, and service choreography, then leave behind standard operating procedures so the cadence continues after we depart.",
    },
    {
        q: "Do you support yacht charters?",
        a: "Yes. We adapt menus for galley constraints, coordinate provisioning with your broker, and provide contingency plans for weather shifts or customs requirements.",
    },
    {
        q: "How far ahead should we book?",
        a: "Peak summer weekends fill six to eight weeks in advance. Shoulder season engagements can usually be confirmed within a fortnight, though membership patrons receive priority scheduling.",
    },
    {
        q: "Can you collaborate with our medical team?",
        a: "Absolutely. We translate the pharmacist intake into documentation your physicians can review, then incorporate feedback so nutrition, supplementation, and recovery protocols stay aligned.",
    },
    {
        q: "Do you design wine pairings?",
        a: "Our sommelier partners build pairings that complement the menu architecture. We can work with your cellar, source specific vintages, or curate non-alcoholic flights that mirror the structure of the evening.",
    },
    {
        q: "What support do membership patrons receive between events?",
        a: "Membership programs grant messaging access for pantry and wellness questions, quarterly planning sessions, and priority booking for seasonal engagements so the experience extends well beyond dinner service.",
    },
];

export default function FAQ() {
    return (
        <div className="faq-list">
            {faqs.map((item) => (
                <details key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                </details>
            ))}
        </div>
    );
}
