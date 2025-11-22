'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// OPUS-style animated text for navigation
const AnimatedNavText = ({ text, className }: { text: string; className?: string }) => {
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
    }, 80); // OPUS: Slower, more refined timing

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayedText.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.23, 1, 0.32, 1], // OPUS easing
            delay: index * 0.05 
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          className="inline-block w-0.5 h-5 bg-accent-primary ml-1"
        />
      )}
    </span>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about', isHash: true },
    { name: 'Services', href: '#services', isHash: true },
    { name: 'Gallery', href: '#gallery', isHash: true },
    { name: 'Contact', href: '#contact', isHash: true },
    { name: 'Coin', href: '/coin', isHash: false },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-bg-primary/90 backdrop-blur-soft shadow-lg py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand Name with OPUS Animation */}
        <motion.a
          href="#"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="relative flex items-center"
          aria-label="Table d'Adrian Home"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-2xl md:text-3xl font-display text-text-primary tracking-tight">
            <AnimatedNavText text="Table d'Adrian" />
          </h1>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => {
            if (item.isHash) {
              return (
                <a
                  key={item.name}
                  href={pathname === '/' ? item.href : `/${item.href}`}
                  onClick={(e) => {
                    if (pathname === '/') {
                      handleNavClick(e, item.href);
                    }
                  }}
                  className="text-sm font-medium text-text-primary hover:text-white/80 transition-colors duration-300 uppercase tracking-wide"
                >
                  {item.name}
                </a>
              );
            }
            return (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-text-primary hover:text-white/80 transition-colors duration-300 uppercase tracking-wide"
              >
                {item.name}
              </Link>
            );
          })}
          <button
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-sm px-6 py-2.5"
          >
            Book Chef
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-50"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu-panel"
        >
          <motion.div
            animate={isMobileMenuOpen ? 'open' : 'closed'}
            className="w-6 h-6 flex flex-col justify-center"
          >
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6 },
              }}
              className="w-6 h-0.5 bg-text-primary block"
            />
            <motion.span
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              className="w-6 h-0.5 bg-text-primary block my-1.5"
            />
            <motion.span
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6 },
              }}
              className="w-6 h-0.5 bg-text-primary block"
            />
          </motion.div>
        </button>

        {/* Mobile Menu - Fixed to show completely on screen */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-accent-dark/50 backdrop-blur-sm z-40 md:hidden"
              />
              {/* Menu Panel */}
              <motion.div
                id="mobile-menu-panel"
                initial={{ opacity: 0, y: '-100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed top-0 left-0 right-0 bg-bg-primary z-50 md:hidden shadow-xl overflow-y-auto max-h-screen"
                role="dialog"
                aria-modal="true"
              >
                <div className="container-custom py-8 min-h-screen flex flex-col items-center justify-center space-y-8">
                  {navItems.map((item, index) => {
                    if (item.isHash) {
                      return (
                        <motion.a
                          key={item.name}
                          href={pathname === '/' ? item.href : `/${item.href}`}
                          onClick={(e) => {
                            if (pathname === '/') {
                              handleNavClick(e, item.href);
                            }
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-2xl sm:text-3xl font-display text-text-primary hover:text-white/80 transition-colors duration-300"
                        >
                          {item.name}
                        </motion.a>
                      );
                    }
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="text-2xl sm:text-3xl font-display text-text-primary hover:text-white/80 transition-colors duration-300"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn-primary text-lg sm:text-xl px-8 py-4"
                  >
                    Book Chef
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
