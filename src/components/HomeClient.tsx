'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedWorks from '@/components/FeaturedWorks';
import Contact from '@/components/Contact';
import Categories from '@/components/Categories';
import HowToOrder from '@/components/HowToOrder';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import IntroLoader from '@/components/IntroLoader';

export default function HomeClient() {
  // 3-State logic to perfectly handle hydration without visually flashing the UI
  const [introState, setIntroState] = useState<'pending' | 'playing' | 'done'>(
    'pending',
  );

  useEffect(() => {
    // Only run physically in the browser
    const hasPlayed = sessionStorage.getItem('introPlayed');
    if (hasPlayed) {
      setIntroState('done'); // Skip intro gracefully
    } else {
      setIntroState('playing'); // Start intro
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('introPlayed', 'true');
    setIntroState('done');
  }, []);

  return (
    <>
      {/* Intro Overlay Manager */}
      <AnimatePresence>
        {introState === 'pending' && (
          <motion.div
            key="pending"
            className="fixed inset-0 z-[100] bg-forest-deep"
          />
        )}
        {introState === 'playing' && (
          <IntroLoader key="intro-loader" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {/* Main Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introState === 'done' ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Navbar />
        <main>
          <Hero introComplete={introState === 'done'} />
          <About />
          <Categories />
          <FeaturedWorks />
          <HowToOrder />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
      </motion.div>
    </>
  );
}
