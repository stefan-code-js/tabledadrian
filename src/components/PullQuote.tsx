type PullQuoteProps = {
    quote: string;
    attribution?: string;
    role?: string;
    className?: string;
};

export default function PullQuote({ quote, attribution, role, className }: PullQuoteProps) {
    const classes = ["pull-quote", className].filter(Boolean).join(" ");
    return (
        <figure className={`${classes} bg-paper-soft py-4 px-6 rounded-md shadow-soft`}>
            <blockquote>
                <p className="text-ink text-lg mb-2">{quote}</p>
            </blockquote>
            {(attribution || role) && (
                <figcaption className="text-bronze mt-2">
                    {attribution && <span className="pull-quote__name font-semibold">{attribution}</span>}
                    {role && <span className="pull-quote__role ml-2">{role}</span>}
                </figcaption>
            )}
        </figure>
    );
}
