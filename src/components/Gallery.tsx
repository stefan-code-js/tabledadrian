// src/components/Gallery.tsx
export default function Gallery() {
    const shots = [
        {
            src: "/placeholder/gallery-01.svg",
            alt: "Illustration of plated spring greens and herbs.",
        },
        {
            src: "/placeholder/gallery-02.svg",
            alt: "Graphic rendering of a lobster tasting course.",
        },
        {
            src: "/placeholder/gallery-03.svg",
            alt: "Stylised terrace vignette with seasonal arrangements.",
        },
        {
            src: "/placeholder/gallery-04.svg",
            alt: "Illustrated brigade plating at the pass.",
        },
        {
            src: "/placeholder/gallery-05.svg",
            alt: "Handblown coupe filled with jewel-toned reductions.",
        },
        {
            src: "/placeholder/gallery-06.svg",
            alt: "Cocoa husk dessert with citrus accents illustrated.",
        },
    ];

    return (
        <section className="section" aria-labelledby="gallery-title">
            <div className="container">
                <h2 id="gallery-title" className="section-title center-text">Gallery</h2>
                <div className="gallery" role="list">
                    {shots.map((shot, index) => (
                        <figure role="listitem" key={`${shot.src}-${index}`}>
                            <img src={shot.src} alt={shot.alt} loading="lazy" />
                        </figure>
                    ))}
                </div>
            </div>
        </section>

    );
}
