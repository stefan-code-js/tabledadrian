/* eslint-disable @next/next/no-img-element */
// src/components/Gallery.tsx
export default function Gallery() {
    const shots = [
        { src: "/images/plate-01.jpg", alt: "porcelain, consommé, citrus oil" },
        { src: "/images/plate-02.jpg", alt: "garden herbs, clarified cream" },
        { src: "/images/plate-03.jpg", alt: "glazed root, smoke, broth" },
        { src: "/images/plate-04.jpg", alt: "sea stone, brine, clarified gel" },
        { src: "/images/plate-05.jpg", alt: "glass by flame, soft reductions" },
        { src: "/images/plate-06.jpg", alt: "cocoa husk, citrus peel" },
    ];

    return (
        <section className="section" aria-labelledby="gallery-title">
            <div className="container">
                <h2 id="gallery-title" className="section-title center-text">Gallery</h2>
    <div className="gallery" role="list">
            {shots.map((s, i) => (
                <figure role="listitem" key={i}>
                    <img src={s.src} alt={s.alt} loading="lazy" />
                </figure>
            ))}
        </div>
            </div>
        </section>

    );
}
