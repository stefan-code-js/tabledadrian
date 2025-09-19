import type { Metadata } from "next";
import Book from "@/components/Book";

export const metadata: Metadata = {
    title: "Book",
    description:
        "Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur. Reserve your table.",
    alternates: { canonical: "/book" },
};

export default function BookPage() {
    return <Book />;
}
