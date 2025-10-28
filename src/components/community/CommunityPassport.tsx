import Link from "next/link";
import type { PassportChannel, PassportStage, PassportTier } from "@/data/communityPassport";

type Props = {
    stages: PassportStage[];
    tiers: PassportTier[];
    channels: PassportChannel[];
};

export default function CommunityPassport({ stages, tiers, channels }: Props) {
    return (
        <section className="community-passport" aria-labelledby="community-passport-heading">
            <header className="community-passport__header">
                <p className="community-passport__eyebrow">Passport</p>
                <h1 id="community-passport-heading" className="community-passport__title">
                    Chart your ascent through the Table d&apos;Adrian guild
                </h1>
                <p className="community-passport__lead">
                    From first contact to concierge command, the passport orients guests, members, and collectors around the
                    rituals, privileges, and touchpoints that define the mastermind community.
                </p>
            </header>

            <div className="community-passport__layout">
                <section className="community-passport__timeline" aria-label="Member journey">
                    <h2 className="community-passport__section-title">Member journey</h2>
                    <ol className="community-passport__stages">
                        {stages.map((stage) => (
                            <li
                                key={stage.id}
                                className="community-passport__stage"
                                data-stage={stage.stage}
                                data-analytics-stage={stage.id}
                            >
                                <span className="community-passport__stage-label">{stage.stage}</span>
                                <div className="community-passport__stage-body">
                                    <h3>{stage.title}</h3>
                                    <p>{stage.summary}</p>
                                    <div className="community-passport__actions">
                                        {stage.actions.map((action) => (
                                            <Link key={action.href} href={action.href} className="btn ghost">
                                                {action.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="community-passport__tiers" aria-label="Tiers">
                    <h2 className="community-passport__section-title">Tiers &amp; privileges</h2>
                    <div className="community-passport__tier-grid">
                        {tiers.map((tier) => (
                            <article key={tier.id} className="community-passport__tier">
                                <header>
                                    <p className="community-passport__tier-qualifier">{tier.qualifier}</p>
                                    <h3>{tier.title}</h3>
                                </header>
                                <p className="community-passport__tier-description">{tier.description}</p>
                                <ul className="community-passport__perk-list">
                                    {tier.perks.map((perk) => (
                                        <li key={perk}>{perk}</li>
                                    ))}
                                </ul>
                                <Link href={tier.cta.href} className="btn">
                                    {tier.cta.label}
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            </div>

            <section className="community-passport__channels" aria-label="Concierge channels">
                <h2 className="community-passport__section-title">Concierge channels</h2>
                <div className="community-passport__channel-grid">
                    {channels.map((channel) => (
                        <div
                            key={channel.id}
                            className={`community-passport__channel${
                                channel.emphasis === "primary" ? " community-passport__channel--primary" : ""
                            }`}
                        >
                            <span className="community-passport__channel-label">{channel.label}</span>
                            {channel.href ? (
                                <Link href={channel.href} className="community-passport__channel-value">
                                    {channel.detail}
                                </Link>
                            ) : (
                                <span className="community-passport__channel-value">{channel.detail}</span>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </section>
    );
}
