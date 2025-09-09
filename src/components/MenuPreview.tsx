// src/components/MenuPreview.tsx
import Link from "next/link";

export default function MenuPreview() {
    return (
        <div className="grid-3 menu-preview">
            <article className="card">
                <h3>signature</h3>
                <p>12–16 courses. Fragrance, texture, and seasonality.</p>
                <Link href="/menu" className="btn">view menus</Link>
            </article>

            <article className="card">
                <h3>garden</h3>
                <p>Produce-forward compositions. Riviera orchards and herbs.</p>
                <Link href="/menu" className="btn">view menus</Link>
            </article>

            <article className="card">
                <h3>salon</h3>
                <p>For private villas and yachts. Pacing built for conversation.</p>
                <Link href="/menu" className="btn">view menus</Link>
            </article>
        </div>
    );
}
