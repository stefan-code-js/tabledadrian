'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Coin from '@/components/Coin';

export default function CoinPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" role="main" aria-label="Table d'Adrian Coin - Official Token">
        <Coin />
      </main>
      <Footer />
    </>
  );
}

