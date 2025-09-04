import Image from 'next/image';
import Reveal from './Reveal';

// Array of gallery images. Replace these placeholder filenames with your own
// high‑quality photographs later. The blurDataURL uses a small 10px blur file for
// progressive loading.
const gallery = [
  {
    src: '/images/gallery/plate01.jpg',
    lqip: '/images/gallery/lqip/plate01.jpg',
    alt: 'Dish 1: signature plating',
  },
  {
    src: '/images/gallery/plate02.jpg',
    lqip: '/images/gallery/lqip/plate02.jpg',
    alt: 'Dish 2: seasonal produce',
  },
  {
    src: '/images/gallery/plate03.jpg',
    lqip: '/images/gallery/lqip/plate03.jpg',
    alt: 'Dish 3: texture interplay',
  },
  {
    src: '/images/gallery/plate04.jpg',
    lqip: '/images/gallery/lqip/plate04.jpg',
    alt: 'Dish 4: culinary architecture',
  },
  {
    src: '/images/gallery/plate05.jpg',
    lqip: '/images/gallery/lqip/plate05.jpg',
    alt: 'Dish 5: forest flavours',
  },
  {
    src: '/images/gallery/plate06.jpg',
    lqip: '/images/gallery/lqip/plate06.jpg',
    alt: 'Dish 6: sweet serenity',
  },
];

export default function Gallery() {
  return (
    <section className="section" id="gallery">
      <div className="container">
        <h2>Gallery</h2>
        <p className="sub">Placeholders now — swap with high‑class photographs.</p>
        <div className="gallery" style={{ marginTop: 18 }}>
          {gallery.map((g) => (
            <Reveal key={g.src}>
              <figure>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 900px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={g.lqip}
                  style={{ objectFit: 'cover' }}
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}