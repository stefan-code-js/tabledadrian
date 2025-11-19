'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import Image from 'next/image';

// Gallery images - filter out HEIC files as they're not supported in browsers
const galleryImages = [
  { 
    src: '/gallery/342c54e9-5624-467a-9164-148dc320f9e1.JPG',
    title: 'Gourmet Tasting Menu',
    description: 'Multi-course tasting menu prepared by our private chef'
  },
  { 
    src: '/gallery/3762EAA0-8664-4618-A8DB-252894F7826C.jpg',
    title: 'Fresh Ingredients',
    description: 'Locally sourced organic ingredients for private chef meals'
  },
  { 
    src: '/gallery/6BCDCDFA-C3F0-47CE-9D7D-65EFF165C477.jpg',
    title: 'Private Event Setup',
    description: 'Elegant table setting for private chef dinner party'
  },
  { 
    src: '/gallery/94D42B06-08D2-4D78-BDB0-38E7A46699F0.JPG',
    title: 'Plated Dessert',
    description: 'Artistically plated dessert by professional private chef'
  },
  { 
    src: '/gallery/BEDA7101-2E3C-4782-AFB9-39BC510D2922.jpg',
    title: 'Wine Pairing',
    description: 'Curated wine selection for private dining experience'
  },
  { 
    src: '/gallery/C08F22A1-6389-47DA-B1B3-5585F8205F1A.JPG',
    title: 'Chef at Work',
    description: 'Professional private chef preparing gourmet meal'
  },
  { 
    src: '/gallery/IMG_0367.jpg',
    title: 'Culinary Artistry',
    description: 'Exquisite presentation of fine dining dishes'
  },
  { 
    src: '/gallery/IMG_0841.jpg',
    title: 'Elegant Presentation',
    description: 'Beautifully arranged plates showcasing culinary excellence'
  },
  { 
    src: '/gallery/IMG_0847.JPG',
    title: 'Fine Dining Experience',
    description: 'Luxury private chef service for special occasions'
  },
  { 
    src: '/gallery/IMG_0852.JPG',
    title: 'Gourmet Cuisine',
    description: 'Premium ingredients crafted into exceptional dishes'
  },
  { 
    src: '/gallery/IMG_0928.jpg',
    title: 'Private Dining',
    description: 'Intimate dining experience in your home'
  },
  { 
    src: '/gallery/IMG_1178.jpg',
    title: 'Artisanal Cooking',
    description: 'Handcrafted meals with attention to detail'
  },
  { 
    src: '/gallery/IMG_1179.jpg',
    title: 'Culinary Excellence',
    description: 'Professional chef services for discerning clients'
  },
  { 
    src: '/gallery/IMG_1180.JPG',
    title: 'Bespoke Menus',
    description: 'Customized menus tailored to your preferences'
  },
  { 
    src: '/gallery/IMG_1181.jpg',
    title: 'Luxury Service',
    description: 'Premium private chef experience'
  },
  { 
    src: '/gallery/IMG_1242.jpg',
    title: 'Gourmet Dishes',
    description: 'Restaurant-quality meals in your home'
  },
  { 
    src: '/gallery/IMG_1274.JPG',
    title: 'Elegant Cuisine',
    description: 'Sophisticated dishes for special events'
  },
  { 
    src: '/gallery/IMG_1310.JPG',
    title: 'Fine Dining',
    description: 'Exquisite culinary creations by professional chefs'
  },
  { 
    src: '/gallery/IMG_1484.JPG',
    title: 'Culinary Mastery',
    description: 'Expertly prepared meals with premium ingredients'
  },
  { 
    src: '/gallery/IMG_1763.JPG',
    title: 'Private Chef Service',
    description: 'Personalized dining experiences in your home'
  },
  { 
    src: '/gallery/IMG_1832.jpg',
    title: 'Gourmet Experience',
    description: 'Luxury private chef services for special occasions'
  },
  { 
    src: '/gallery/IMG_1894.JPG',
    title: 'Artisanal Cuisine',
    description: 'Handcrafted dishes with exceptional presentation'
  },
  { 
    src: '/gallery/IMG_3135.jpg',
    title: 'Fine Dining Menu',
    description: 'Multi-course tasting experience'
  },
  { 
    src: '/gallery/IMG_3136.jpg',
    title: 'Culinary Art',
    description: 'Beautifully presented gourmet dishes'
  },
  { 
    src: '/gallery/IMG_4576_jpg.jpg',
    title: 'Private Event',
    description: 'Elegant dining setup for special occasions'
  },
  { 
    src: '/gallery/IMG_6560_Original.jpg',
    title: 'Gourmet Presentation',
    description: 'Exquisite plating and presentation'
  },
  { 
    src: '/gallery/IMG_6562_Original.jpg',
    title: 'Culinary Excellence',
    description: 'Professional chef services'
  },
  { 
    src: '/gallery/IMG_7551 2.jpg',
    title: 'Fine Dining',
    description: 'Luxury private chef experience'
  },
];

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showAll, setShowAll] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 3);
  const hasMoreImages = galleryImages.length > 3;

  const handleImageClick = (index: number) => {
    if (clickedIndex === index) {
      setClickedIndex(null);
    } else {
      setClickedIndex(index);
    }
  };

  const handleShowLess = () => {
    setShowAll(false);
    setClickedIndex(null);
    // Scroll to gallery section
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="gallery" className="section-padding bg-bg-primary" ref={ref as any}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-6">
            Culinary Excellence in Every Detail
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of exquisite dishes and elegant private dining experiences 
            crafted by Table d&apos;Adrian&apos;s professional chefs.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {displayedImages.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isClicked = clickedIndex === index;
            const showOverlay = isHovered || isClicked;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleImageClick(index)}
              >
                {/* Image Card */}
                <div className="relative overflow-hidden rounded-md bg-white border border-border-light aspect-[4/3]">
                  {/* Image */}
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Overlay for hover/click - shows title and description */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-accent-dark/95 via-accent-dark/80 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showOverlay ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: showOverlay ? 0 : 20, opacity: showOverlay ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl font-display mb-2 text-white"
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: showOverlay ? 0 : 20, opacity: showOverlay ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="text-sm leading-relaxed text-white"
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </motion.div>
                </div>

                {/* Title and Description - Always visible below image on desktop, hidden on mobile when clicked */}
                <div className={`mt-4 ${clickedIndex === index ? 'hidden md:block' : 'block'}`}>
                  <h3 className="text-lg font-display text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Show More Button */}
        {hasMoreImages && !showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Show More
            </motion.button>
          </motion.div>
        )}

        {/* Show Less Button (when all images are shown) */}
        {showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={handleShowLess}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Show Less
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
