'use client';

import Image from "next/image";
import Link from "next/link";
import { team } from "@/data/team";

export default function Team() {
    return (
        <section className="section" aria-label="Team">
            <div className="container container--narrow">
                <div className="prose center-text">
                    <h1 className="title">Team</h1>
                    <p className="lead">Craft built by specialists — kitchen, cellar, and service in concert.</p>
                </div>

                <div className="grid" style={{ marginTop: 24 }}>
                    {team.map((m) => (
                        <article key={m.slug} className="card">
                            <div className="avatar">
                                <Image
                                    src={m.image}
                                    alt={`${m.name}, ${m.role}`}
                                    width={800}
                                    height={800}
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />
                            </div>
                            <h3 style={{ marginTop: 12 }}>{m.name}</h3>
                            <p style={{ opacity: .8, marginTop: -6 }}>{m.role}</p>
                            <p style={{ marginTop: 10 }}>{m.bio}</p>
                            <div className="tags">
                                {m.specialties.map((s) => <span key={s} className="tag">{s}</span>)}
                            </div>
                            {m.linkedin && (
                                <p style={{ marginTop: 12 }}>
                                    <Link className="link" href={m.linkedin} target="_blank" rel="noreferrer">LinkedIn</Link>
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
