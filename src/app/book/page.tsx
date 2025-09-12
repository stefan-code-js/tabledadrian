import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book",
    description:
        "Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur. Reserve your table.",
    alternates: { canonical: "/book" },
};

export default function BookPage() {
    return (
        <main className="section">
            <div className="container container--narrow center-text">
                <h1 className="title">Book</h1>
                <p className="lead">
                    Seasonal tasting menus for private villas, yachts, and salons along the Côte d’Azur.
                    Choose a date — we’ll shape the season to your table.
                </p>

                <p style={{ marginTop: 8 }}>
                    <a className="btn" href="https://cal.com/adrian-stefan" target="_blank" rel="noreferrer">
                        open booking calendar
                    </a>
                </p>

                {/* Compact embed — height controlled by .embed (420px) */}
                <div className="container" style={{ marginTop: 16 }}>
                    <iframe
                        className="embed"
                        src="https://cal.com/adrian-stefan?embed=1&theme=light"
                        title="Cal — Table d’Adrian"
                        allow="fullscreen; geolocation *; microphone *; camera *"
                        loading="lazy"
                    />
                </div>

                <div className="container grid-2" style={{ marginTop: 20, textAlign: "left" }}>
                    <article>
                        <h3 style={{ margin: 0 }}>what to expect</h3>
                        <p style={{ marginTop: 8 }}>
                            12–16 courses (Signature). Ingredient-driven menu designed around fragrance, texture,
                            and seasonality. Vegetarian/vegan/gluten-free paths available with notice.
                        </p>
                    </article>
                    <article>
                        <h3 style={{ margin: 0 }}>questions</h3>
                        <p style={{ marginTop: 8 }}>
                            Email <a className="link" href="mailto:adrian@tabledadrian.com">adrian@tabledadrian.com</a>.
                            For dates beyond Antibes · Cannes · Monaco, include location and guest count.
                        </p>
                    </article>
                </div>
            </div>
        </main>
    );
}
