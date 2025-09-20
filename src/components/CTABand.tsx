import Link from "next/link";

type CTA = { label: string; href: string };

type CTABandProps = {
    title: string;
    description: string;
    primary: CTA;
    secondary?: CTA;
    className?: string;
};

export default function CTABand({ title, description, primary, secondary, className }: CTABandProps) {
    const classes = ["cta-band", className].filter(Boolean).join(" ");
    return (
        <section className={classes}>
            <div className="cta-band__inner">
                <div className="cta-band__copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                <div className="cta-band__actions">
                    <Link className="cta-band__button cta-band__button--primary" href={primary.href}>
                        {primary.label}
                    </Link>
                    {secondary ? (
                        <Link className="cta-band__button cta-band__button--secondary" href={secondary.href}>
                            {secondary.label}
                        </Link>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
