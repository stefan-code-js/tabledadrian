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
    src: "/placeholder/hero-team.svg",
    alt: "Team preparing ingredients in a calm kitchen with daylight.",
};

const members = [
    {
        name: "Adrian Ștefan Badea",
        role: "Chef & Founder",
        image: "/placeholder/portrait-adrian.svg",
        link: "https://www.linkedin.com/in/adrian-stefan-badea-82456131b",
    },
    {
        name: "Antonia Badea, PharmD",
        role: "Clinical Systems",
        image: "/placeholder/portrait-antonia.svg",
    },
    {
        name: "Claire Dupont",
        role: "Sommelier",
        image: "/placeholder/portrait-claire.svg",
    },
    {
        name: "Julien Marchand",
        role: "Pastry",
        image: "/placeholder/portrait-julien.svg",
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
                        <Link className="btn" href="/book">
                            request a booking
                        </Link>
                        <Link className="btn ghost" href="/membership">
                            explore membership
                        </Link>
                    </div>
                </div>
            </section>
        </article>
    );
}
