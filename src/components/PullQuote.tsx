type PullQuoteProps = {
    quote: string;
    attribution?: string;
    role?: string;
    className?: string;
};

export default function PullQuote({ quote, attribution, role, className }: PullQuoteProps) {
    const classes = ["pull-quote", className].filter(Boolean).join(" ");
    return (
        <figure className={classes}>
            <blockquote>
                <p>{quote}</p>
            </blockquote>
            {(attribution || role) && (
                <figcaption>
                    {attribution && <span className="pull-quote__name">{attribution}</span>}
                    {role && <span className="pull-quote__role">{role}</span>}
                </figcaption>
            )}
        </figure>
    );
}
