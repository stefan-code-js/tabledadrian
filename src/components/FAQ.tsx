const faqs = [
    { q: 'How do I book a service?', a: 'Choose an offering and complete checkout. We will follow up with scheduling.' },
    { q: 'Do you offer refunds?', a: 'Yes, full refunds are available within 24 hours of purchase.' },
    { q: 'Are ingredients locally sourced?', a: 'Whenever possible we source from local farms and markets.' },
    { q: 'Can you handle dietary restrictions?', a: 'Absolutely, please note them during checkout.' },
    { q: 'Is travel included?', a: 'Travel within Monaco is included; other locations may incur a fee.' },
];

export default function FAQ() {
    return (
        <div className="faq">
            {faqs.map((item) => (
                <details key={item.q} className="lux-details">
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                </details>
            ))}
        </div>
    );
}
