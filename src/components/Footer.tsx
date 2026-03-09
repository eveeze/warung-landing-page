'use client';

import { useRef } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref}
      className="relative bg-forest-deep text-text-primary transition-colors duration-700 pt-24 pb-0 z-20"
    >
      <div className="w-full px-6 flex flex-col items-center max-w-[1800px] mx-auto">
        {/* Centered Descriptive Text */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-[700px] text-center mb-12"
        >
          <p className="font-heading font-medium tracking-tight text-text-primary/90 transition-colors duration-700 text-sm md:text-base leading-relaxed">
            Warung Mbah Manto hadir untuk menjadi mitra belanja harian Anda.
            Dari kebutuhan dapur hingga stok usaha, kami pastikan kualitas
            terbaik dengan harga yang selalu bersahabat.
          </p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.1,
          }}
        >
          <AnimatedButton
            onClick={handleScrollToTop}
            fillColor="bg-forest"
            iconRight={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-1"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            }
            className="mb-32 group inline-flex items-center justify-center px-6 py-3 rounded-full border border-forest/30 text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-text-primary hover:border-forest hover:text-cream transition-all duration-300"
          >
            Kembali ke Atas
          </AnimatedButton>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.2,
          }}
          className="w-full flex justify-between items-end border-b border-border/30 pb-4 mb-4 md:mb-8"
        >
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-text-primary text-[10px] md:text-xs uppercase tracking-widest mb-2 transition-colors duration-700">
              Tautan Cepat
            </h4>
            <div className="flex gap-2">
              <Link
                href="/#beranda"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                Beranda,
              </Link>
              <Link
                href="/belanja"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                Belanja,
              </Link>
              <Link
                href="/#layanan"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                Layanan,
              </Link>
              <Link
                href="/#kategori"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                Kategori,
              </Link>
              <Link
                href="/#works"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                Koleksi,
              </Link>
              <Link
                href="/#contact"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                Kontak
              </Link>
            </div>
          </div>

          <div className="flex flex-col text-right">
            <h4 className="font-heading font-bold text-text-primary text-[10px] md:text-xs uppercase tracking-widest mb-1 transition-colors duration-700">
              Jejaring Sosial
            </h4>
            <div className="flex gap-2 justify-end">
              <Link
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                WhatsApp,
              </Link>
              <Link
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                Instagram,
              </Link>
              <Link
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-text-primary transition-colors duration-700"
              >
                Tokopedia
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Massive Copyright Text */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1] as const,
            delay: 0.3,
          }}
          className="w-full flex justify-center -mb-[2%]"
        >
          <h1 className="text-[clamp(6rem,26vw,32rem)] font-heading font-black tracking-tighter uppercase text-text-primary/10 transition-colors duration-700 leading-[0.75] text-center">
            ©2026
          </h1>
        </motion.div>
      </div>
    </footer>
  );
}
