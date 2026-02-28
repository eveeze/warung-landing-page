'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  // Track scroll: 0 when footer top meets viewport bottom, 1 when footer top is at 60% of viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.4'],
  });

  // Map scroll → smooth slide up/down
  const y1 = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const y2 = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const y3 = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="relative bg-black text-white pt-24 pb-0 z-20">
      <div className="w-full px-6 flex flex-col items-center max-w-[1800px] mx-auto">
        {/* Centered Descriptive Text */}
        <motion.div
          style={{ y: y1, opacity: opacity1 }}
          className="max-w-[700px] text-center mb-12"
        >
          <p className="font-heading font-medium tracking-tight text-white/90 text-sm md:text-base leading-relaxed">
            Warung Mbah Manto hadir untuk menjadi mitra belanja harian Anda.
            Dari kebutuhan dapur hingga stok usaha, kami pastikan kualitas
            terbaik dengan harga yang selalu bersahabat.
          </p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div style={{ y: y1, opacity: opacity1 }}>
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
          style={{ y: y2, opacity: opacity2 }}
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
          style={{ y: y3, opacity: opacity3 }}
          className="w-full flex justify-center -mb-[2%]"
        >
          <h1 className="text-[clamp(6rem,26vw,32rem)] font-heading font-black tracking-tighter uppercase text-white leading-[0.75] text-center">
            ©2026
          </h1>
        </motion.div>
      </div>
    </footer>
  );
}
