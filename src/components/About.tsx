'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  UtensilsCrossed, 
  Check, 
  ChefHat, 
  Star, 
  Clock, 
  Wine,
  Circle
} from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const chefServices = [
    {
      Icon: UtensilsCrossed,
      title: 'Menu Planning & Customization',
      description: 'Our private chefs create personalized menus tailored to your preferences, dietary needs, and event style. Every dish is carefully curated to match your taste profile.',
    },
    {
      Icon: Check,
      title: 'Grocery Shopping & Ingredient Sourcing',
      description: 'We handle all ingredient sourcing, selecting premium, locally-sourced ingredients to ensure the highest quality for your private dining experience.',
    },
    {
      Icon: ChefHat,
      title: 'Meal Preparation & Cooking',
      description: 'Professional cooking in your kitchen with restaurant-quality techniques. Our private chefs bring all necessary equipment and expertise to your home.',
    },
    {
      Icon: Star,
      title: 'Elegant Presentation & Service',
      description: 'Every dish is plated with artistic precision, creating an elevated dining experience that rivals the finest restaurants.',
    },
    {
      Icon: Clock,
      title: 'Complete Cleanup',
      description: 'After your meal, we handle all cleanup, leaving your kitchen spotless. You simply enjoy the experience without any post-dining chores.',
    },
    {
      Icon: Check,
      title: 'Dietary Accommodation',
      description: 'Specialized expertise in vegetarian, vegan, gluten-free, kosher, halal, and allergy-conscious cuisine. Every menu is customized to your dietary requirements.',
    },
  ];

  return (
    <section id="about" className="section-padding bg-bg-primary" ref={ref}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-serif text-text-primary mb-6"
            >
              What Does a Private Chef Do? <br />
              <span className="text-accent-primary">Understanding Private Chef Services</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary mb-6 leading-relaxed"
            >
              A private chef is a culinary professional who prepares personalized meals in your home, 
              crafting bespoke menus tailored to your tastes, dietary requirements, and lifestyle. 
              Unlike traditional catering, our private chef services offer an intimate, customized 
              dining experience with restaurant-quality cuisine in the comfort of your own space.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-text-secondary mb-8 leading-relaxed"
            >
              Table d&apos;Adrian brings luxury private chef services to discerning clients across 
              London and Europe. Whether you&apos;re hosting an exclusive dinner party, require 
              weekly meal preparation, or celebrating a special occasion, our professional private 
              chefs deliver exceptional culinary experiences tailored to your needs.
            </motion.p>

            <motion.h3
              variants={itemVariants}
              className="text-2xl font-serif text-text-primary mb-6 mt-8"
            >
              What Services Does Our Private Chef Provide?
            </motion.h3>

            {/* Chef Services Grid - OPUS style, no bullets */}
            <motion.div
              variants={containerVariants}
              className="grid gap-6"
            >
              {chefServices.map((service, index) => (
                <motion.article
                  key={index}
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-accent-primary/10 border border-accent-primary/20 rounded-md flex items-center justify-center">
                      <service.Icon size={24} className="text-accent-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      {service.title}
                    </h4>
                    <p className="text-text-secondary leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          {/* Visual Side */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative z-10 bg-accent-primary/5 border border-accent-primary/20 p-12 rounded-md">
              {/* Decorative Icons */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { Icon: ChefHat },
                  { Icon: UtensilsCrossed },
                  { Icon: Wine },
                  { Icon: Circle },
                  { Icon: Star },
                  { Icon: Check }
                ].map(({ Icon }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center h-20 bg-white border border-border-light rounded-md"
                  >
                    <Icon size={32} className="text-accent-primary" strokeWidth={1.5} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-serif text-text-primary mb-4"
          >
            Ready to experience luxury private chef services?
          </motion.h3>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary inline-block"
          >
            Book Your Private Chef Consultation Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
