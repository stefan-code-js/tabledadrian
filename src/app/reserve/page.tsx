import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteBuilder from "@/components/QuoteBuilder";

export const metadata = {
  title: "Request a Private Dinner | Table d’Adrian",
  description:
    "Design your plant‑based experience on the Côte d’Azur. Our quote builder helps you refine date, guest count, mood and budget before confirming your reservation.",
};

export default function ReservePage() {
  return (
    <>
      <Header />
      <main>
        {/* Quote builder serves as a guided multi‑step form for capturing dinner details. */}
        <QuoteBuilder />
      </main>
      <Footer />
    </>
  );
}