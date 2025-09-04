import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consult | Table d’Adrian",
  description:
    "Schedule a complimentary 15‑minute discovery call with Adrian to discuss your upcoming dinner or membership. Available in English and French.",
};

export default function ConsultPage() {
  // Use Cal.com embed script via data attributes. The link is configured via
  // NEXT_PUBLIC_CAL_USERNAME. Because env variables are evaluated at build time,
  // you can set NEXT_PUBLIC_CAL_USERNAME in your Cloudflare environment to
  // embed a scheduling page. If not set, fall back to a placeholder message.
  const calUser = process.env.NEXT_PUBLIC_CAL_USERNAME;
  const calLink = calUser ? `https://cal.com/${calUser}/15min` : '';
  return (
    <>
      <Header />
      <main style={{ paddingTop: "96px" }}>
        <div className="container">
          <h1>Consult</h1>
          <p className="sub">
            Let’s chat about your vision. Book a complimentary 15‑minute call to
            explore menus, logistics and how we can craft a ritual tailored to
            you.
          </p>
          {calUser ? (
            <div style={{ marginTop: 24 }}>
              <iframe
                src={`${calLink}?embed=true`}
                style={{ width: "100%", height: "700px", border: 0 }}
                allow="camera; microphone;"
                title="Cal.com scheduling"
              />
            </div>
          ) : (
            <p>
              Scheduling is currently unavailable. Please email us at
              <a href="mailto:adrian@tabledadrian.com"> adrian@tabledadrian.com</a>
              .
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}