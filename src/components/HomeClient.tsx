'use client';

import { useState, useCallback } from 'react';
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
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/* Intro Loader */}
      <AnimatePresence>
        {!introComplete && <IntroLoader onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Navbar />
        <main>
          <Hero introComplete={introComplete} />
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
