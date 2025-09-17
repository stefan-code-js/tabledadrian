import Image from "next/image";
import { motion } from "framer-motion";
import KineticText from "@/components/KineticText";

const GALLERY_SHOTS = [
    { src: "/images/plate-01.jpg", alt: "porcelain, consommé, citrus oil" },
    { src: "/images/plate-02.jpg", alt: "garden herbs, clarified cream" },
    { src: "/images/plate-03.jpg", alt: "glazed root, smoke, broth" },
    { src: "/images/plate-04.jpg", alt: "sea stone, brine, clarified gel" },
    { src: "/images/plate-05.jpg", alt: "glass by flame, soft reductions" },
    { src: "/images/plate-06.jpg", alt: "cocoa husk, citrus peel" },
];

export default function Gallery() {
    return (
        <section className="section" aria-labelledby="gallery-title">
            <div className="container">
                <KineticText as="h2" text="Gallery" className="section-heading" id="gallery-title" />
                <div className="gallery" role="list">
                    {GALLERY_SHOTS.map((shot, index) => (
                        <motion.figure
                            role="listitem"
                            key={shot.src}
                            className="gallery__tile"
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.45 }}
                            transition={{ delay: index * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Image
                                src={shot.src}
                                alt={shot.alt}
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 360px"
                                className="gallery__image"
                                priority={index === 0}
                            />
                        </motion.figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
