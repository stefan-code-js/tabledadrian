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
        <dl className={classes}>
            {facts.map((fact) => (
                <div key={fact.label} className="fact-row__item">
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                </div>
            ))}
        </dl>
    );
}
