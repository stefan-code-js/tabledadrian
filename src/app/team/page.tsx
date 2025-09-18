import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Team · Private Chef Atelier",
    description:
        "A small atelier led by Chef Adrian with clinical systems by Antonia (PharmD). We shape season, texture, and fragrance into one calm table along the Côte d’Azur.",
    alternates: { canonical: "/team" },
    keywords: [
        "private chef team",
        "luxury private dining",
        "Côte d’Azur chef",
        "tasting menu",
        "sommelier",
        "pastry",
    ],
};

const heroImage = {
    src: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?fm=webp&w=2400&h=1600&fit=crop&q=85",
    alt: "Team preparing ingredients in a calm kitchen with daylight.",
};

const members = [
    {
        name: "Adrian Ștefan Badea",
        role: "Chef & Founder",
        image: "https://images.unsplash.com/photo-1541547412749-1e04c89c3562?fm=webp&w=900&h=1200&fit=crop&q=85",
        link: "https://www.linkedin.com/in/adrian-stefan-badea-82456131b",
    },
    {
        name: "Antonia Badea, PharmD",
        role: "Clinical Systems",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?fm=webp&w=900&h=1200&fit=crop&q=85",
    },
    {
        name: "Claire Dupont",
        role: "Sommelier",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fm=webp&w=900&h=1200&fit=crop&q=85",
    },
    {
        name: "Julien Marchand",
        role: "Pastry",
        image: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?fm=webp&w=900&h=1200&fit=crop&q=85",
    },
];

export default function TeamPage() {
    return (
        <article className="editorial-page">
            <section className="editorial-hero">
                <figure className="full-bleed hero-figure">
                    <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="100vw" className="hero-figure__image" />
                </figure>
                <div className="editorial-container hero-copy">
                    <h1>Team</h1>
                    <p className="lead">
                        A compact group shaping season, texture, and fragrance into one calm service. Technical where needed, restrained where it matters.
                    </p>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container">
                    <div className="section-heading">
                        <h2>Atelier leads</h2>
                    </div>
                    <div className="team-layout">
                        {members.map((member) => (
                            <article key={member.name} className="team-profile">
                                <div className="team-avatar">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 900px) 100vw, 320px"
                                        loading="lazy"
                                        className="team-avatar__image"
                                    />
                                </div>
                                <h3>{member.name}</h3>
                                <p className="muted">{member.role}</p>
                                {member.link ? (
                                    <p>
                                        <a href={member.link} target="_blank" rel="noreferrer">
                                            view profile
                                        </a>
                                    </p>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </div>
                <hr className="separator" />
            </section>

            <section className="editorial-section">
                <div className="editorial-container final-call">
                    <h2>Meet us at the table</h2>
                    <p>
                        Explore current menus or request a date—we’ll respond with a plan that holds to your standards and keeps the room composed.
                    </p>
                    <div className="cta-row">
                        <Link className="btn" href="/menu">
                            view menu
                        </Link>
                        <Link className="btn ghost" href="/book">
                            request a date
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
