'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
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
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (headerRef.current) {
        tl.from(headerRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.15,
        });
      }

      if (servicesGridRef.current) {
        tl.from(servicesGridRef.current.children, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
        }, '-=0.4');
      }

      if (faqRef.current) {
        tl.from(faqRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
        }, '-=0.2');
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

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


  return (
    <section ref={sectionRef} id="services" className="section-padding bg-bg-primary">
      <div className="container-custom px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-text-primary mb-6">
            What Services Does Our Private Chef Provide?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Discover how our professional private chef services can transform your dining experience. 
            From intimate dinners to corporate events, we deliver culinary excellence tailored to your needs.
            {' '}
            <button
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-accent-primary ml-1 underline hover:no-underline transition-all"
              type="button"
            >
              Learn more about private chef services
            </button>.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesGridRef} className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const color = colorClassByKey[service.color];
            const IconComponent = service.Icon;
            return (
              <article
                key={index}
                className="card p-6 sm:p-8"
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
                <h3 className="text-2xl font-display text-text-primary mb-4" itemProp="name">
                  {service.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed" itemProp="description">
                  {service.description}
                </p>

                {/* Features - OPUS style, no bullets */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-3"
                    >
                      <div className="w-1 h-1 rounded-full bg-accent-primary flex-shrink-0" />
                      <span className="text-text-secondary">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary text-sm"
                  type="button"
                >
                  Learn More →
                </button>
              </article>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div
          ref={faqRef}
          className="mt-12 sm:mt-20 card p-6 sm:p-10"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <h3 className="text-3xl font-display text-text-primary mb-8 text-center">
            Frequently Asked Questions About Private Chef Services
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="transition-transform duration-300 hover:translate-x-1"
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
            </div>

            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="transition-transform duration-300 hover:translate-x-1"
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
            </div>

            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="transition-transform duration-300 hover:translate-x-1"
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
            </div>

            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="transition-transform duration-300 hover:translate-x-1"
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
            </div>

            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="transition-transform duration-300 hover:translate-x-1"
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
            </div>

            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="transition-transform duration-300 hover:translate-x-1"
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
            </div>

            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="transition-transform duration-300 hover:translate-x-1"
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
            </div>

            <div
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              className="transition-transform duration-300 hover:translate-x-1"
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
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <button
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
              type="button"
            >
              Book Your Private Chef Experience
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
