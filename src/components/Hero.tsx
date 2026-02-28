'use client';

import { motion } from 'framer-motion';

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
  { text: '— Sejak 2014, Melayani Sepenuh Hati', type: 'serif' },
];

const MarqueeContent = () => (
  <div className="flex items-center min-w-full shrink-0 justify-around gap-12 px-6">
    {marqueeItems.map((item, i) => (
      <span
        key={i}
        className={
          item.type === 'bold'
            ? 'font-heading font-black uppercase text-2xl md:text-4xl tracking-tighter'
            : 'font-serif italic text-xl md:text-2xl text-text-muted'
        }
      >
        {item.text}
      </span>
    ))}
  </div>
);

export default function Hero({ introComplete }: { introComplete: boolean }) {
  return (
    <section
      id="beranda"
      className="relative pt-32 bg-black overflow-hidden flex flex-col justify-between min-h-screen"
    >
      <div className="w-full px-6 flex-1 flex flex-col justify-center">
        {/* Top 2-Column Section */}
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-0 mt-8 md:mt-16 w-full max-w-[1800px] mx-auto">
          {/* Left Text — smaller, matching reference */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="w-full md:w-7/12 md:pr-12 z-10"
          >
            <h1
              className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-heading font-medium tracking-tight text-gray-400 leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              Belanja Harian Jadi Mudah, <br className="hidden md:block" />
              Harga Grosir untuk <br className="hidden md:block" />
              Semua{' '}
              <span className="font-serif italic text-text-muted font-light tracking-normal">
                Kalangan.
              </span>
            </h1>
          </motion.div>

          {/* Right Image — overlapping the strip like reference */}
          <motion.div
            initial="hidden"
            animate={introComplete ? 'show' : 'hidden'}
            variants={defaultVars}
            className="w-full md:w-5/12 flex md:justify-end z-20 md:mb-[-60px]"
          >
            <div className="w-full max-w-[400px] aspect-[4/5] bg-forest-light rounded-xl overflow-hidden relative border border-border/20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-80" />
            </div>
          </motion.div>
        </div>

        {/* Middle White Grid Bar — image overlaps in front */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={introComplete ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, ease: [1, 0, 0, 1], delay: 0.3 }}
          style={{ originX: 0 }}
          className="w-full bg-white text-black py-3 px-6 mt-16 md:mt-24 mb-12 md:mb-16 grid grid-cols-3 font-heading font-black text-[10px] md:text-sm uppercase tracking-widest text-center relative z-10"
        >
          <span className="text-left">Harga Bersahabat</span>
          <span className="text-center">Buka Setiap Hari</span>
          <span className="text-right">Kualitas Terjamin</span>
        </motion.div>

        {/* Massive Screen-Filling Text — "Manto™" */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={
            introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
          }
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="w-full flex justify-center items-end flex-1 pb-16"
        >
          <h2 className="text-[clamp(6rem,22vw,28rem)] font-heading font-black tracking-tighter uppercase text-white leading-none text-center">
            Manto™
          </h2>
        </motion.div>
      </div>

      {/* Infinite Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={introComplete ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-full border-t border-b border-white py-4 overflow-hidden flex bg-black mt-auto"
      >
        <div className="flex animate-marquee min-w-max">
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </motion.div>
    </section>
  );
}
