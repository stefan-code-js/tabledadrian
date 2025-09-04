import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Press & Media | Table d’Adrian",
  description:
    "Download our media kit, high‑resolution photos and talking points. Table d’Adrian crafts plant‑based haute cuisine with a focus on longevity and ritual.",
};

export default function PressPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "96px" }}>
        <div className="container">
          <h1>Press &amp; Media</h1>
          <p className="sub" style={{ marginBottom: "1.5rem" }}>
            Below you’ll find a concise boilerplate, downloadable assets and contact
            information for press requests. We welcome conversations about
            longevity, biotech, multi‑sensory dining and plant‑based ritual.
          </p>
          <h2>Boilerplate</h2>
          <p>
            Table d’Adrian is a Michelin‑trained private chef service based on the
            Côte d’Azur. Specialising in plant‑based haute cuisine with a focus
            on cognitive clarity and calm, Adrian crafts multi‑course rituals
            using fermented and cultivated proteins, seasonal produce and
            innovative techniques. Service areas include Antibes, Cannes, Monaco
            and the French Riviera. Each dinner is bespoke, quiet and
            performance‑orientated, drawing on longevity science and sensory
            research.
          </p>
          <h2>Downloads</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link href="/media-kit.pdf" target="_blank" rel="noreferrer">
                <strong>Media Kit (PDF)</strong>
              </Link>
              – one page with story outline, quick facts and contact.
            </li>
            <li>
              <Link href="/press-images.zip" target="_blank" rel="noreferrer">
                <strong>Photography Pack (ZIP)</strong>
              </Link>
              – six high‑resolution images in landscape, portrait and square.
            </li>
          </ul>
          <h2>Talking Points</h2>
          <ul>
            <li>Longevity as quiet luxury: food as preventive medicine.</li>
            <li>Fermented &amp; cultivated proteins replacing meat and fish.</li>
            <li>Designing calm and clarity through multi‑sensory dining.</li>
            <li>The future of private hospitality: bespoke rituals in homes.</li>
          </ul>
          <h2>Press Contact</h2>
          <p>
            For interviews, image requests or more information, please email
            <a href="mailto:press@tabledadrian.com"> press@tabledadrian.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}