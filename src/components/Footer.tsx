'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedButton from '@/components/ui/AnimatedButton';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-5% 0px' });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref}
      className="relative bg-black text-white pt-24 pb-0 overflow-hidden z-20"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="w-full px-6 flex flex-col items-center max-w-[1800px] mx-auto"
      >
        {/* Centered Descriptive Text */}
        <motion.div
          variants={slideUp}
          className="max-w-[700px] text-center mb-12"
        >
          <p className="font-heading font-medium tracking-tight text-white/90 text-sm md:text-base leading-relaxed">
            Warung Mbah Manto hadir untuk menjadi mitra belanja harian Anda.
            Dari kebutuhan dapur hingga stok usaha, kami pastikan kualitas
            terbaik dengan harga yang selalu bersahabat.
          </p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div variants={slideUp}>
          <AnimatedButton
            onClick={handleScrollToTop}
            fillColor="bg-white"
            className="mb-32 px-6 py-2.5 rounded-full border border-border text-[10px] md:text-xs font-heading font-bold uppercase tracking-[0.1em] hover:border-white hover:text-black transition-colors duration-300"
          >
            Kembali ke Atas
          </AnimatedButton>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          variants={slideUp}
          className="w-full flex justify-between items-end border-b border-border/30 pb-4 mb-4 md:mb-8"
        >
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-white text-[10px] md:text-xs uppercase tracking-widest mb-2">
              Tautan Cepat
            </h4>
            <div className="flex gap-2">
              <a
                href="/#beranda"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Beranda,
              </a>
              <a
                href="/belanja"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Belanja,
              </a>
              <a
                href="/#layanan"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Layanan,
              </a>
              <a
                href="/#kategori"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Kategori,
              </a>
              <a
                href="/#works"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Koleksi,
              </a>
              <a
                href="/#contact"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Kontak
              </a>
            </div>
          </div>

          <div className="flex flex-col text-right">
            <h4 className="font-heading font-bold text-white text-[10px] md:text-xs uppercase tracking-widest mb-1">
              Jejaring Sosial
            </h4>
            <div className="flex gap-2 justify-end">
              <a
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                WhatsApp,
              </a>
              <a
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Instagram,
              </a>
              <a
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-white transition-colors"
              >
                Tokopedia
              </a>
            </div>
          </div>
        </motion.div>

        {/* Massive Copyright Text */}
        <motion.div
          variants={slideUp}
          className="w-full flex justify-center -mb-[2%]"
        >
          <h1 className="text-[clamp(6rem,26vw,32rem)] font-heading font-black tracking-tighter uppercase text-white leading-[0.75] text-center">
            ©2026
          </h1>
        </motion.div>
      </motion.div>
    </footer>
  );
}
