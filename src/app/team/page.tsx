import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

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

type Member = {
    name: string;
    role: string;
    img: string;       // /public/images/team/...
    link?: string;
};

const team: Member[] = [
    {
        name: "Adrian Ștefan Badea",
        role: "Chef & Founder",
        img: "/images/team/adrian.jpg",
        link: "https://www.linkedin.com/in/adrian-stefan-badea-82456131b",
    },
    {
        name: "Antonia Badea, PharmD",
        role: "Clinical Systems",
        img: "/images/team/antonia.jpg",
    },

];

export default function TeamPage() {
    return (
        <main className="section">
            <div className="container container--narrow">
                <p className="kicker center-text">atelier</p>
                <h1 className="title center-text">Team</h1>
                <p
                    className="lead center-text"
                    style={{ maxWidth: "60ch", marginInline: "auto" }}
                >
                    A compact group shaping season, texture, and fragrance into one calm
                    service. Technical where needed, restrained where it matters.
                </p>

                <section className="section" style={{ paddingTop: 16 }}>
                    <div className="team-grid">
                        {team.map((m, i) => (
                            <article
                                key={m.name}
                                className="team-card lux-card reveal"
                                style={delay(i * 90)}
                            >
                                <div className="avatar">
                                    <Image
                                        src={m.img}
                                        alt={m.name}
                                        width={640}
                                        height={800}
                                        sizes="(max-width: 900px) 100vw, 320px"
                                        priority={i === 0}
                                    />
                                </div>

                                <h3 style={{ margin: "8px 0 2px" }}>{m.name}</h3>
                                <p className="role">{m.role}</p>

                                {m.link ? (
                                    <p style={{ marginTop: 10 }}>
                                        <a
                                            className="link"
                                            href={m.link}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            view profile
                                        </a>
                                    </p>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </section>

                <div className="center" style={{ marginTop: 18, gap: 10 }}>
                    <Link className="btn" href="/menu">
                        view menu
                    </Link>
                    <Link className="btn ghost" href="/book">
                        request a date
                    </Link>
                </div>
            </div>
        </main>
    );
}

function delay(ms: number): CSSProperties {
    return { "--d": `${ms}ms` } as CSSProperties;
}
