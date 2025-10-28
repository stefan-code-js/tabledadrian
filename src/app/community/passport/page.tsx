import type { Metadata } from "next";
import CommunityPassport from "@/components/community/CommunityPassport";
import { passportChannels, passportStages, passportTiers } from "@/data/communityPassport";

export const metadata: Metadata = {
    title: "Community Passport | Table d'Adrian",
    description:
        "Navigate the Table d'Adrian community passport to understand guest, member, and collector privileges alongside concierge channels and next-step actions.",
};

export default function CommunityPassportPage() {
    return (
        <article className="editorial-page">
            <section className="page-surface">
                <CommunityPassport stages={passportStages} tiers={passportTiers} channels={passportChannels} />
            </section>
        </article>
    );
}
