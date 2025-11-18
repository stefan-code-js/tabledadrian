'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { 
  UtensilsCrossed, 
  Check, 
  ChefHat, 
  Star, 
  Clock
} from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (headingRef.current) {
        tl.from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
        });
      }

      if (contentRef.current) {
        tl.from(contentRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.2,
        }, '-=0.4');
      }

      if (servicesRef.current) {
        tl.from(servicesRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
        }, '-=0.3');
      }

      if (ctaRef.current) {
        tl.from(ctaRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
        }, '-=0.2');
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

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
    <section ref={sectionRef} id="about" className="section-padding bg-bg-primary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Content Side */}
          <div>
            <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-display text-text-primary mb-6">
              What Does a Private Chef Do? <br />
              <span className="text-accent-primary">Understanding Private Chef Services</span>
            </h2>

            <div ref={contentRef}>
              <p className="text-base sm:text-lg text-text-secondary mb-6 leading-relaxed">
                A private chef is a culinary professional who prepares personalized meals in your home, 
                crafting bespoke menus tailored to your tastes, dietary requirements, and lifestyle. 
                Unlike traditional catering, our private chef services offer an intimate, customized 
                dining experience with restaurant-quality cuisine in the comfort of your own space.
              </p>

              <p className="text-base sm:text-lg text-text-secondary mb-8 leading-relaxed">
                Table d&apos;Adrian brings luxury private chef services to discerning clients across 
                London and Europe. Whether you&apos;re hosting an exclusive dinner party, require 
                weekly meal preparation, or celebrating a special occasion, our professional private 
                chefs deliver exceptional culinary experiences tailored to your needs.
              </p>

              <h3 className="text-xl sm:text-2xl font-display text-text-primary mb-6 mt-8">
                What Services Does Our Private Chef Provide?
              </h3>
            </div>

            {/* Chef Services Grid - OPUS style, no bullets */}
            <div ref={servicesRef} className="grid gap-6">
              {chefServices.map((service, index) => (
                <article
                  key={index}
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
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="text-center mt-12 sm:mt-16 px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-display text-text-primary mb-4">
            Ready to experience luxury private chef services?
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-block"
            type="button"
          >
            Book Your Private Chef Consultation Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
