'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  UtensilsCrossed, 
  Calendar, 
  Star, 
  ChefHat,
  Check 
} from 'lucide-react';

const colorClassByKey: Record<string, { bg: string; text: string }> = {
  primary: { bg: 'bg-accent-primary/10', text: 'text-accent-primary' },
  secondary: { bg: 'bg-hover-state/20', text: 'text-accent-primary' },
  tertiary: { bg: 'bg-accent-dark/10', text: 'text-accent-dark' },
  accent: { bg: 'bg-hover-state/20', text: 'text-accent-primary' },
};

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      Icon: UtensilsCrossed,
      title: 'Custom Menu Planning for Private Events',
      description: 'Transform your home into a fine dining destination. Our private chef services for dinner parties include custom menu creation, ingredient sourcing, professional cooking, elegant plating, and full cleanup.',
      features: ['Custom multi-course menus', 'Wine pairing recommendations', 'Professional service', 'Complete cleanup'],
      color: 'primary',
    },
    {
      Icon: Calendar,
      title: 'Personal Chef for Weekly Meal Preparation',
      description: 'Enjoy restaurant-quality meals every day with our personal chef meal prep services. Perfect for busy professionals, families, and health-conscious individuals seeking nutritious, delicious meals.',
      features: ['Customized weekly menus', 'Fresh ingredient sourcing', 'Portion-controlled meals', 'Dietary accommodations'],
      color: 'secondary',
    },
    {
      Icon: Star,
      title: 'Private Chef for Corporate Functions',
      description: 'Elevate your corporate events with our executive chef services. From board meetings to company celebrations, we deliver sophisticated culinary experiences that impress clients and colleagues.',
      features: ['Business lunch catering', 'Executive dining', 'Corporate events', 'Team building experiences'],
      color: 'tertiary',
    },
    {
      Icon: ChefHat,
      title: 'Special Occasion & Wedding Private Chef Services',
      description: 'Make your celebrations unforgettable with our luxury private chef services. From intimate anniversaries to milestone birthdays, we create bespoke culinary experiences tailored to your event.',
      features: ['Birthday celebrations', 'Anniversary dinners', 'Holiday gatherings', 'Romantic proposals'],
      color: 'accent',
    },
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <section id="services" className="section-padding bg-bg-primary" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-6">
            What Services Does Our Private Chef Provide?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover how our professional private chef services can transform your dining experience. 
            From intimate dinners to corporate events, we deliver culinary excellence tailored to your needs. 
            <a href="#about" className="text-accent-primary ml-1">Learn more about private chef services</a>.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => {
            const color = colorClassByKey[service.color];
            const IconComponent = service.Icon;
            return (
              <motion.article
                key={index}
                variants={itemVariants}
                className="card p-8"
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-md border ${color.bg} ${color.text} border-current/20 mb-6`}>
                  <IconComponent
                    size={32}
                    className={color.text}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-serif text-text-primary mb-4" itemProp="name">
                  {service.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed" itemProp="description">
                  {service.description}
                </p>

                {/* Features - OPUS style, no bullets */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 * featureIndex + 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1 h-1 rounded-full bg-accent-primary flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  whileHover={{ x: 4 }}
                  className="text-accent-primary font-semibold flex items-center gap-2 group"
                >
                  Learn More
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.article>
            );
          })}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-white border border-border-light p-10 rounded-md"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <h3 className="text-3xl font-serif text-text-primary mb-8 text-center">
            Frequently Asked Questions About Private Chef Services
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2" itemProp="name">
                How much does a private chef cost?
              </h4>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  Private chef pricing depends on several factors: menu complexity, number of guests, 
                  service duration, and ingredient costs. Our luxury private chef services typically 
                  range from £150-500+ per event. For weekly meal preparation, we offer subscription-based 
                  pricing models. Compared to dining out at fine restaurants, private chef services 
                  often provide exceptional value, especially for larger groups, while offering 
                  personalized attention and custom menus.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2" itemProp="name">
                Can you accommodate dietary restrictions?
              </h4>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  Absolutely. Our private chefs specialize in vegetarian, vegan, gluten-free, 
                  kosher, halal, and allergy-conscious cuisine. Every menu is customized to 
                  meet your specific dietary needs and preferences. We also accommodate medical 
                  dietary requirements and nutritional wellness goals.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2" itemProp="name">
                How do private chefs plan menus?
              </h4>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  Our private chefs begin with a consultation to understand your preferences, dietary 
                  requirements, and event style. Based on this, we create a customized menu proposal 
                  featuring seasonal ingredients, your favorite cuisines, and any special requests. 
                  Menus are refined through collaboration until they perfectly match your vision.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2" itemProp="name">
                What is the difference between a private chef and a personal chef?
              </h4>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  While the terms are often used interchangeably, a private chef typically works 
                  for one client or family on a regular basis, while a personal chef may serve 
                  multiple clients. At Table d&apos;Adrian, we offer both models: exclusive private 
                  chef services for ongoing meal preparation and personal chef services for 
                  individual events and special occasions.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2" itemProp="name">
                Do private chefs work on weekends?
              </h4>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  Yes, our private chefs are available for weekend events, dinner parties, and 
                  special occasions. Weekend availability is popular for celebrations, so we 
                  recommend booking 2-4 weeks in advance to secure your preferred date.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2" itemProp="name">
                What kitchen equipment does a private chef need?
              </h4>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  A standard home kitchen with basic appliances (stove, oven, refrigerator) is 
                  sufficient. Our private chefs bring specialized tools and equipment needed for 
                  professional cooking. We&apos;ll discuss your kitchen setup during the initial 
                  consultation and can adapt to any space.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2" itemProp="name">
                How far in advance should I book?
              </h4>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  We recommend booking 2-4 weeks in advance for events and special occasions, 
                  and 1 week for regular meal prep services. Last-minute requests may be 
                  accommodated based on chef availability, especially for smaller events.
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h4 className="text-xl font-semibold text-text-primary mb-2" itemProp="name">
                What are the benefits of having a private chef?
              </h4>
              <div itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                <p className="text-text-secondary leading-relaxed" itemProp="text">
                  Benefits include time-saving convenience, personalized nutrition, restaurant-quality 
                  dining at home, dietary accommodation, stress-free entertaining, and the ability 
                  to enjoy special occasions without kitchen work. Our private chefs handle everything 
                  from menu planning to cleanup.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
            >
              Book Your Private Chef Experience
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
