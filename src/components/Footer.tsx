import Link from "next/link";
import { site } from "@/lib/site";

const partners = [
    { name: "Krug", href: "https://www.krug.com" },
    { name: "EHL Alumni", href: "https://www.ehlalumni.com" },
    { name: "La Liste", href: "https://www.laliste.com" },
    { name: "Gronda", href: "https://gronda.eu" },
    { name: "S.Pellegrino", href: "https://www.sanpellegrino.com" },
    { name: "Atelier Basalte", href: "https://atelierbasalte.com" },
];

const socials = [
    { label: "Instagram", href: site.socials.instagram },
    { label: "LinkedIn", href: site.socials.linkedin },
    { label: "Press", href: "/press" },
].filter((item) => Boolean(item.href));

const manifesto =
    "We design quiet hospitality for households that collect memories, not spectacles. Every engagement is documented so perfection can be repeated.";

export default function Footer() {
    const email = site.email;
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer" role="contentinfo">
            <div className="site-footer__partners" aria-label="Selected partners and collaborators">
                <div className="site-footer__partners-track">
                    {[...partners, ...partners].map((item, index) => {
                        const key = `${item.name}-${index }`;
                        if (item.href) {
                            return (
                                <a
                                    key={key}
                                    className="site-footer__partner"
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item.name}
                                </a>
                            );
                        }
                        return (
                            <span key={key} className="site-footer__partner" tabIndex={0}>
                                {item.name}
                            </span>
                        );
                    })}
                </div>
            </div>

            <div className="site-footer__grid">
                <div className="site-footer__col site-footer__col--contact">
                    <p className="site-footer__wordmark">Table d'Adrian</p>
                    <p className="site-footer__copy">
                        <Link href={`mailto:${email}`}>{email}</Link>
                    </p>
                    <p className="site-footer__copy">Serving {site.serviceArea.join(", ")}</p>
                </div>

                <div className="site-footer__col site-footer__col--manifesto">
                    <p>{manifesto}</p>
                </div>

                <div className="site-footer__col site-footer__col--links">
                    <span className="site-footer__label">Connect</span>
                    <ul className="site-footer__list">
                        {socials.map((item) => (
                            <li key={item.label}>
                                <Link href={item.href!} target={item.href?.startsWith("http") ? "_blank" : undefined} rel={item.href?.startsWith("http") ? "noreferrer" : undefined}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="site-footer__legal">
                <span>© {year} {site.name}</span>
                <Link href="/remove">Data preferences</Link>
            </div>
        </footer>
    );
}
