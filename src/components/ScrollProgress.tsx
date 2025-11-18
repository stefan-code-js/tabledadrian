'use client';

import { useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 120, damping: 20, mass: 0.2 });
  const width = useTransform(spring, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      raw.set(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [raw]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
      <motion.div
        className="h-1 bg-accent-primary"
        style={{ width }}
      />
    </div>
  );
};

export default ScrollProgress;
