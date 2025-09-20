import { sitePages } from "@/data/siteContent";
import { createPageMetadata } from "@/lib/metadata";
import HomeLuxury from "@/components/HomeLuxury";

const page = sitePages.home;

export const metadata = createPageMetadata(page);

export default function HomePage() {
    return (
        <article className="lux-home">
            <HomeLuxury />
        </article>
    );
}
