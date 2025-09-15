// src/app/page.tsx
import type { Metadata } from "next";

import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import MenuPreview from "@/components/MenuPreview";
import Testimonials from "@/components/Testimonials";
import NewsletterSignup from "@/components/NewsletterSignup";
import TrustSection from "@/components/TrustSection";

export const metadata: Metadata = {
  title: "Table d’Adrian",
  description:
      "Ingredient-driven cuisine with ritual, aroma, and texture at the center. Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur.",
  alternates: { canonical: "https://tabledadrian.com/" },
};

export default function HomePage() {
  return (
      <>
        <Hero />

        <section className="section">
          <div className="container container--narrow center-text">
            <h2 className="title">Menus</h2>
            <MenuPreview />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Gallery />
          </div>
        </section>

        <section className="section">
          <div className="container container--narrow">
            <Testimonials />
          </div>
        </section>

        <TrustSection />

        <section className="section">
          <div className="container container--narrow center-text">
            <NewsletterSignup />
          </div>
        </section>
      </>
  );
}
