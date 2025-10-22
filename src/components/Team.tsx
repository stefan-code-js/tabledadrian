import Image from "@/components/StaticImage";

export default function Team() {
    const people = [
        {
            name: "Adrian Stefan",
            role: "Chef-Founder",
            skills: ["fragrance design", "fermentation", "menu architecture"],
            img: "/images/team/adrian.jpg",
        },
        {
            name: "Maison Service Collective",
            role: "Service",
            skills: ["wine pacing", "ritual service"],
            img: "/images/team/blank.jpg",
        },
    ];

    return (
        <section className="section">
            <div className="container container--narrow">
                <h2 className="title center-text">Team</h2>
                <div className="team-grid">
                    {people.map((person) => (
                        <article className="team-card card" key={person.name}>
                            <Image
                                className="avatar avatar--sm"
                                src={person.img}
                                alt={person.name}
                                width={72}
                                height={72}
                            />
                            <div>
                                <h3 className="m-0">{person.name}</h3>
                                <p className="mt-1 mb-2 opacity-80">{person.role}</p>
                                <div className="tags">
                                    {person.skills.map((skill) => (
                                        <span className="tag" key={skill}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
