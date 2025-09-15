import type { Metadata } from "next";
import { sitePages } from "@/data/siteContent";
import {
    PageHero,
    PageQuickNav,
    ValueSection,
    IncludedSection,
    ProcessSection,
    PricingSection,
    TestimonialsSection,
    FinalCtaSection,
} from "@/components/StructuredPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
    title: "Products & Services",
    description: "Current offerings from Table d’Adrian",
    alternates: { canonical: "/products" },
    openGraph: {
        title: "Products & Services",
        description: "Current offerings from Table d’Adrian",
        url: `${site.url}/products`,
    },
    twitter: {
        title: "Products & Services",
        description: "Current offerings from Table d’Adrian",
    },
};

export default function ProductsPage() {
    const page = sitePages.products;
    return (
        <section className="section structured-page">
            <div className="container container--narrow prose">
                <PageHero page={page} />
                <PageQuickNav page={page} />
                <ValueSection page={page} />
                <IncludedSection page={page} />
                <ProcessSection page={page} />
                <PricingSection page={page} />
                <TestimonialsSection page={page} />
                <FinalCtaSection page={page} />
            </div>
        </section>
    );
}
