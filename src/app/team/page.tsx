import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Team | Table d’Adrian",
    description: "The atelier behind the table — compact profiles, crafted for quiet excellence.",
    alternates: { canonical: "/team" },
};

type Member = {
    name: string;
    role: string;
    img: string;       // place files in /public/images/team/...
    tags?: string[];
    link?: string;
};

export default function TeamPage() {
    const team: Member[] = [
        {
            name: "Adrian Ștefan Badea",
            role: "Chef & Founder",
            img: "/images/team/adrian.jpg",
            tags: ["Côte d’Azur", "12–16 courses", "seasonality"],
            link: process.env.LINKEDIN_PROFILE_URL || "https://www.linkedin.com/in/adrian-stefan-badea-82456131b",
        },
        {
            name: "Aurélie M.",
            role: "Pastry · Ferments",
            img: "/images/team/aurelie.jpg",
            tags: ["cultured cream", "clarity", "stone fruit"],
        },
        {
            name: "Marc R.",
            role: "Sommelier",
            img: "/images/team/marc.jpg",
            tags: ["aroma", "minerality", "low intervention"],
        },
    ];

    return (
        <main className="section">
            <div className="container container--narrow">
                <h1 className="title center-text">Team</h1>
                <p className="lead center-text">
                    A small atelier shaping season, texture, and fragrance into a single table.
                </p>

                <section className="section" style={{ paddingTop: 16 }}>
                    <div className="grid-3 team-grid">
                        {team.map((m) => (
                            <article key={m.name} className="team-card">
                                <div className="avatar">
                                    <img src={m.img} alt={m.name} loading="lazy" />
                                </div>
                                <h3>{m.name}</h3>
                                <p className="role">{m.role}</p>

                                {m.tags?.length ? (
                                    <div className="tags" aria-label={`${m.name} focus`}>
                                        {m.tags.map((t) => (
                                            <span key={t} className="tag">{t}</span>
                                        ))}
                                    </div>
                                ) : null}

                                {m.link ? (
                                    <p style={{ marginTop: 8 }}>
                                        <a className="link" href={m.link} target="_blank" rel="noreferrer">
                                            view profile
                                        </a>
                                    </p>
                                ) : null}
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
