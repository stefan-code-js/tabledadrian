'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Sophie L.',
    role: 'Private Event Host',
    quote:
      "An unforgettable evening. The personalized menu and presentation were beyond restaurant quality.",
  },
  {
    name: 'Daniel P.',
    role: 'Corporate Client',
    quote:
      'Our executive dinner was flawless. Professional, discreet, and absolutely delicious.',
  },
  {
    name: 'Amelia R.',
    role: 'Weekly Meal Prep Client',
    quote:
      'Healthy, flavorful meals every week without lifting a finger. Exceptional attention to detail.',
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-bg-primary" aria-label="Client testimonials">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display text-text-primary mb-4">What Clients Say</h2>
          <p className="text-text-secondary">Authentic feedback about our private chef experiences</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide key={idx}>
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="h-full card p-8 border-0"
              >
                <p className="text-lg text-text-primary mb-6 leading-relaxed">"{t.quote}"</p>
                <footer className="text-sm text-text-secondary">
                  <span className="font-semibold text-text-primary">{t.name}</span>
                  {' · '}
                  <span>{t.role}</span>
                </footer>
              </motion.blockquote>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
