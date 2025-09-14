/* eslint-disable @next/next/no-img-element */
export default function Team() {
    const people = [
        {
            name: 'Adrian Stefan',
            role: 'Chef-Founder',
            skills: ['fragrance design', 'fermentation', 'menu architecture'],
            img: '/images/team/adrian.jpg',
        },
        {
            name: '…',
            role: 'Service',
            skills: ['wine pacing', 'ritual service'],
            img: '/images/team/blank.jpg',
        },
    ];

    return (
        <section className="section">
            <div className="container container--narrow">
                <h2 className="title center-text">Team</h2>
                <div className="team-grid">
                    {people.map((p) => (
                        <article className="team-card card" key={p.name}>
                            <img className="avatar avatar--sm" src={p.img} alt={p.name} />
                            <div>
                                <h3 style={{ margin: 0 }}>{p.name}</h3>
                                <p style={{ margin: '2px 0 6px', opacity: 0.8 }}>{p.role}</p>
                                <div className="tags">
                                    {p.skills.map((s) => (
                                        <span className="tag" key={s}>{s}</span>
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
