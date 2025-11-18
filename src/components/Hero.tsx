'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Stranger Things-style letter animation component
const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 50 + delay * 10); // Stagger speed

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText.split('').map((char, index) => {
        // Add glitch effect to random letters
        const shouldGlitch = !isComplete && Math.random() > 0.95;
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: shouldGlitch ? [1, 0.3, 1] : 1,
              color: shouldGlitch ? ['#2B2520', '#0F4C81', '#2B2520'] : undefined,
            }}
            transition={{
              duration: 0.1,
              repeat: shouldGlitch ? 2 : 0,
            }}
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      })}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block w-0.5 h-6 md:h-8 bg-accent-primary ml-1"
        />
      )}
    </span>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading with OPUS Animation */}
          <h1 className="text-5xl md:text-6xl font-serif text-text-primary mb-8 font-bold tracking-tight">
            <AnimatedText text="Luxury Private Chef Services" delay={0} />
            <br />
            <span className="text-accent-primary">
              <AnimatedText text="Personalized Culinary Excellence" delay={30} />
            </span>
          </h1>

          {/* Subtitle with Primary Keywords */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-lg md:text-xl text-text-secondary mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Experience personalized culinary excellence with Table d&apos;Adrian.
            <br className="hidden md:block" />
            Professional private chef for exclusive events, dinner parties, and weekly meal preparation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              Book Your Private Chef
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              Explore Services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
