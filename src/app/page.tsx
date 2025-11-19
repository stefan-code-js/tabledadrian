'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Credentials from '@/components/Credentials';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content" role="main" aria-label="Table d'Adrian - Luxury Private Chef Services">
        <Hero />
        <About />
        <Credentials />
        <Services />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      
      {/* LocalBusiness Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Table d'Adrian",
            "description": "Luxury private chef services for personalized dining experiences. Professional private chef for events, weekly meal prep, and bespoke culinary journeys.",
            "url": "https://tabledadrian.com",
            "priceRange": "$$$",
            "serviceArea": {
              "@type": "City",
              "name": "London"
            },
            "areaServed": ["UK", "France", "Europe"],
            "telephone": "+33615963046",
            "email": "adrian@tabledadrian.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "GB",
              "addressRegion": "England",
              "addressLocality": "London"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "47"
            },
            "sameAs": [
              "https://instagram.com/tabledadrian",
              "https://twitter.com/tabledadrian",
              "https://www.linkedin.com/in/adrian-stefan-badea-82456131b/"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Private Chef Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Private Events & Dinner Parties",
                    "description": "Bespoke culinary experiences for your special occasions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Weekly Meal Preparation",
                    "description": "Personal chef services for health-conscious meal planning"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Corporate Culinary Services",
                    "description": "Executive chef services for corporate functions"
                  }
                }
              ]
            }
          })
        }}
      />

      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://tabledadrian.com/"
              }
            ]
          })
        }}
      />

      {/* FAQPage Structured Data (key questions) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does a private chef cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Private chef pricing depends on several factors: menu complexity, number of guests, service duration, and ingredient costs. Our luxury private chef services typically range from £150-500+ per event. For weekly meal preparation, we offer subscription-based pricing models. Compared to dining out at fine restaurants, private chef services often provide exceptional value, especially for larger groups."
                }
              },
              {
                "@type": "Question",
                "name": "What does a private chef do?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A private chef is a culinary professional who prepares personalized meals in your home. Services include menu planning and customization, grocery shopping and ingredient sourcing, professional meal preparation and cooking, elegant presentation and service, complete cleanup, and dietary accommodation. Our private chefs handle everything from planning to cleanup."
                }
              },
              {
                "@type": "Question",
                "name": "How do I hire a private chef?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The process begins with an initial consultation to understand your needs and preferences. We then create a customized menu proposal, confirm details and logistics, handle all preparation and execution, and follow up for feedback and future bookings. Contact us to start your private chef experience."
                }
              },
              {
                "@type": "Question",
                "name": "Can you accommodate dietary restrictions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. Our private chefs specialize in vegetarian, vegan, gluten-free, kosher, halal, and allergy-conscious cuisine. Every menu is customized to meet your specific dietary needs and preferences. We also accommodate medical dietary requirements and nutritional wellness goals."
                }
              },
              {
                "@type": "Question",
                "name": "How do private chefs plan menus?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our private chefs begin with a consultation to understand your preferences, dietary requirements, and event style. Based on this, we create a customized menu proposal featuring seasonal ingredients, your favorite cuisines, and any special requests. Menus are refined through collaboration until they perfectly match your vision."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between a private chef and a personal chef?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "While the terms are often used interchangeably, a private chef typically works for one client or family on a regular basis, while a personal chef may serve multiple clients. At Table d'Adrian, we offer both models: exclusive private chef services for ongoing meal preparation and personal chef services for individual events and special occasions."
                }
              },
              {
                "@type": "Question",
                "name": "Do private chefs work on weekends?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, our private chefs are available for weekend events, dinner parties, and special occasions. Weekend availability is popular for celebrations, so we recommend booking 2-4 weeks in advance to secure your preferred date."
                }
              },
              {
                "@type": "Question",
                "name": "What kitchen equipment does a private chef need?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A standard home kitchen with basic appliances (stove, oven, refrigerator) is sufficient. Our private chefs bring specialized tools and equipment needed for professional cooking. We'll discuss your kitchen setup during the initial consultation and can adapt to any space."
                }
              },
              {
                "@type": "Question",
                "name": "What are the benefits of having a private chef?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Benefits include time-saving convenience, personalized nutrition, restaurant-quality dining at home, dietary accommodation, stress-free entertaining, and the ability to enjoy special occasions without kitchen work. Our private chefs handle everything from menu planning to cleanup."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
