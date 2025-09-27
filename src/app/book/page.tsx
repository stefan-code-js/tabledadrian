import Book from "@/components/Book";
import { buildMetadataForPath } from "@/lib/metadata";

export const metadata = buildMetadataForPath("/book", {
    title: "Book",
    description:
        "Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur. Reserve your table.",
});

export default function BookPage() {
    return <Book />;
}
