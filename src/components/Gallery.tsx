'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { 
  Circle,
  UtensilsCrossed,
  Star,
  ChefHat,
  Wine,
  Check,
  Calendar
} from 'lucide-react';

const gradientClasses = [
  'from-accent-primary to-accent-primary/50',
  'from-accent-primary to-hover-state',
  'from-accent-dark to-accent-primary/70',
] as const;

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Placeholder images with descriptions for SEO
  const galleryItems = [
    {
      id: 1,
      title: 'Gourmet Tasting Menu',
      description: 'Multi-course tasting menu prepared by our private chef',
      category: 'Fine Dining',
      size: 'large',
    },
    {
      id: 2,
      title: 'Fresh Ingredients',
      description: 'Locally sourced organic ingredients for private chef meals',
      category: 'Ingredients',
      size: 'medium',
    },
    {
      id: 3,
      title: 'Private Event Setup',
      description: 'Elegant table setting for private chef dinner party',
      category: 'Events',
      size: 'medium',
    },
    {
      id: 4,
      title: 'Plated Dessert',
      description: 'Artistically plated dessert by professional private chef',
      category: 'Desserts',
      size: 'small',
    },
    {
      id: 5,
      title: 'Wine Pairing',
      description: 'Curated wine selection for private dining experience',
      category: 'Beverages',
      size: 'small',
    },
    {
      id: 6,
      title: 'Chef at Work',
      description: 'Professional private chef preparing gourmet meal',
      category: 'Behind the Scenes',
      size: 'large',
    },
  ];

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="gallery" className="section-padding bg-bg-primary" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">
            Culinary Excellence in Every Detail
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of exquisite dishes and elegant private dining experiences 
            crafted by Table d&apos;Adrian&apos;s professional chefs.
          </p>
        </motion.div>

        {/* Bento Grid Gallery */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[200px]"
        >
          {galleryItems.map((item, index) => {
            const gridClass = 
              item.size === 'large' ? 'col-span-2 row-span-2' :
              item.size === 'medium' ? 'col-span-2 md:col-span-1 row-span-2' :
              'col-span-1 row-span-1';

            const gradient = gradientClasses[index % gradientClasses.length];

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`${gridClass} relative overflow-hidden border border-border-light bg-white group rounded-md`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Placeholder Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}>
                  {/* Decorative Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    {(() => {
                      const iconSize = item.size === 'large' ? 120 : item.size === 'medium' ? 80 : 60;
                      const IconComponent = 
                        item.category === 'Fine Dining' ? Circle :
                        item.category === 'Ingredients' ? UtensilsCrossed :
                        item.category === 'Events' ? Star :
                        item.category === 'Desserts' ? ChefHat :
                        item.category === 'Beverages' ? Wine :
                        Check;
                      return <IconComponent size={iconSize} className="text-text-primary/20" strokeWidth={1} />;
                    })()}
                  </div>
                </div>

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-accent-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                >
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredIndex === index ? 0 : 20, opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-semibold mb-1 text-hover-state"
                    >
                      {item.category}
                    </motion.p>
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredIndex === index ? 0 : 20, opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-xl font-serif mb-2"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredIndex === index ? 0 : 20, opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-sm text-white/80"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </motion.div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '500+', label: 'Private Events', Icon: Calendar },
            { number: '15+', label: 'Years Experience', Icon: Star },
            { number: '50+', label: 'Five-Star Reviews', Icon: Check },
            { number: '1000+', label: 'Satisfied Clients', Icon: ChefHat },
          ].map((stat, index) => {
            const IconComponent = stat.Icon;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index + 0.5 }}
              className="text-center"
            >
              <div className="inline-flex mb-4">
                <div className="w-12 h-12 bg-accent-primary/10 border border-accent-primary/20 rounded-md flex items-center justify-center">
                  <IconComponent size={24} className="text-accent-primary" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-3xl font-serif text-text-primary mb-2">{stat.number}</h3>
              <p className="text-text-secondary">{stat.label}</p>
            </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary"
          >
            View Full Portfolio
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
