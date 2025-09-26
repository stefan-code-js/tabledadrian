type Fact = {
    label: string;
    value: string;
};

type FactRowProps = {
    facts: Fact[];
    className?: string;
};

export default function FactRow({ facts, className }: FactRowProps) {
    if (facts.length === 0) return null;
    const classes = ["fact-row", className].filter(Boolean).join(" ");

    return (
        <dl className={`${classes} bg-paper-soft py-3 px-4 rounded-md shadow-soft grid gap-3`}>
            {facts.map((fact) => (
                <div key={fact.label} className="fact-row__item flex gap-2 items-center">
                    <dt className="text-ink-soft font-medium">{fact.label}</dt>
                    <dd className="text-ink font-semibold">{fact.value}</dd>
                </div>
            ))}
        </dl>
    );
}
