'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import InfiniteMarquee from '@/lib/infinite-marquee';

const defaultVars = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const marqueeItems = [
  { text: 'WARUNG MBAH MANTO™', type: 'bold' },
  { text: '— Grosir & Eceran Terpercaya', type: 'serif' },
  { text: 'BUKA SETIAP HARI', type: 'bold' },
  { text: '— Sejak 2005, Melayani Sepenuh Hati', type: 'serif' },
];

export default function Hero({ introComplete }: { introComplete: boolean }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let marquee: InfiniteMarquee | null = null;
    if (introComplete && marqueeRef.current) {
      // give Framer Motion time to mount/animate before measuring
      setTimeout(() => {
        if (marqueeRef.current) {
          marquee = new InfiniteMarquee({
            element: marqueeRef.current,
            speed: 1.5,
            direction: 'left-to-right',
            controlsOnHover: false,
          });
        }
      }, 500);
    }
    return () => {
      if (marquee) marquee.destroy();
    };
  }, [introComplete]);

  return (
    <section
      id="beranda"
      className="relative pt-32 bg-forest-deep transition-colors duration-700 overflow-hidden flex flex-col justify-between min-h-screen"
    >
      <div className="w-full px-6 flex-1 flex flex-col justify-center">
        {/* Top 2-Column Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-0 mt-8 md:mt-16 w-full max-w-[1800px] mx-auto">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="w-full md:w-7/12 md:pr-12"
          >
            <h1
              className="text-[clamp(2.5rem,5vw,5rem)] font-heading font-medium tracking-tight text-text-primary leading-[1.05] transition-colors duration-700"
              style={{ textWrap: 'balance' }}
            >
              Belanja Harian Jadi Mudah, <br className="hidden md:block" />
              Harga Grosir untuk <br className="hidden md:block" />
              Semua{' '}
              <span className="font-serif italic text-text-muted font-light tracking-normal transition-colors duration-700">
                Kalangan
              </span>
            </h1>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial="hidden"
            animate={introComplete ? 'show' : 'hidden'}
            variants={defaultVars}
            className="w-full md:w-5/12 flex md:justify-end"
          >
            <div className="w-full max-w-[400px] aspect-[4/5] bg-forest-light rounded-xl overflow-hidden relative border border-border/20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-80" />
            </div>
          </motion.div>
        </div>

        {/* Middle White Grid Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={introComplete ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [1, 0, 0, 1] as const, delay: 0.5 }}
          style={{ originX: 0 }}
          className="w-full bg-forest text-cream transition-colors duration-700 py-3 px-6 mt-16 md:mt-24 mb-12 md:mb-16 grid grid-cols-3 font-heading font-black text-[10px] md:text-sm uppercase tracking-widest text-center"
        >
          <span className="text-left">Harga Bersahabat</span>
          <span className="text-center">Buka Setiap Hari</span>
          <span className="text-right">Kualitas Terjamin</span>
        </motion.div>

        {/* Massive Screen-Filling Text */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={
            introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
          }
          transition={{
            duration: 1.5,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.2,
          }}
          className="w-full flex justify-center items-end flex-1 pb-16"
        >
          <h2 className="text-[clamp(6rem,22vw,28rem)] font-heading font-black tracking-tighter uppercase text-text-primary transition-colors duration-700 leading-none text-center">
            Manto™
          </h2>
        </motion.div>
      </div>

      {/* GSAP Infinite Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="w-full border-t border-b border-border transition-colors duration-700 py-4 overflow-hidden flex bg-forest-deep mt-auto"
      >
        <div ref={marqueeRef} className="flex min-w-max items-center">
          {/* Render enough children so GSAP can loop seamlessly */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-around gap-12 px-6"
            >
              {marqueeItems.map((item, j) => (
                <span
                  key={`${i}-${j}`}
                  className={
                    item.type === 'bold'
                      ? 'font-heading font-black uppercase text-2xl md:text-4xl tracking-tighter whitespace-nowrap'
                      : 'font-serif italic text-xl md:text-2xl text-text-muted whitespace-nowrap'
                  }
                >
                  {item.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
