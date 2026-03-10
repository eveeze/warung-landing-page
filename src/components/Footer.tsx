'use client';

import { useEffect, useState, useRef } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fetchProducts, type Product } from '@/lib/api';
import InfiniteMarquee from '@/lib/infinite-marquee';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeProducts, setMarqueeProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products for the infinite marquee
    fetchProducts({ perPage: 10 })
      .then((res) => {
        setMarqueeProducts(res.products.filter((p) => p.image_url)); // Only show products with images if possible
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let marquee: InfiniteMarquee | null = null;
    if (marqueeProducts.length > 0 && marqueeRef.current) {
      setTimeout(() => {
        if (marqueeRef.current) {
          marquee = new InfiniteMarquee({
            element: marqueeRef.current,
            speed: 1.8,
            direction: 'left-to-right',
            controlsOnHover: true,
          });
        }
      }, 100);
    }
    return () => {
      if (marquee) marquee.destroy();
    };
  }, [marqueeProducts]);

  const handleScrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, {
        duration: 2.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={ref}
      className="relative bg-[var(--color-bg)] text-[var(--color-primary)] transition-colors duration-700 pt-16 pb-0 z-20 overflow-hidden"
    >
      {/* ─── Studio Wrap / Infinite Image Marquee ─── */}
      {marqueeProducts.length > 0 && (
        <div className="w-full relative overflow-hidden mb-24 select-none">
          {/* Removed vignette edges per request */}

          {/* The Marquee Track (Images) */}
          <div className="flex w-full overflow-hidden group">
            <div ref={marqueeRef} className="flex min-w-max items-center">
              {/* Render enough groups to infinitely loop across ultra-wide monitors */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-shrink-0 items-center justify-start gap-4 md:gap-6 pr-4 md:pr-6"
                >
                  {marqueeProducts.map((p, j) => (
                    <div
                      key={`track-${p.id}-${i}-${j}`}
                      className="w-[80px] md:w-[120px] lg:w-[150px] aspect-[4/5] rounded-xl overflow-hidden bg-[var(--color-bg-secondary)] opacity-80 hover:opacity-100 transition-all duration-500 border border-[var(--color-border)] relative cursor-pointer group/item"
                    >
                      <img
                        src={p.image_url || ''}
                        alt={p.name}
                        className="w-full h-full object-cover grayscale opacity-80 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* White Badge Bar (Studio Wrap Reference) - Localized */}
          <div className="w-full px-6 mt-8 md:mt-12 relative z-10 max-w-[1800px] mx-auto">
            <div className="w-full bg-[var(--color-primary)] text-[var(--color-bg)] py-3 md:py-4 px-6 md:px-12 flex justify-between items-center font-heading font-black text-[10px] md:text-sm tracking-widest uppercase">
              <span>Grosir & Eceran</span>
              <span>Harga Bersahabat</span>
              <span className="hidden md:block">Buka Setiap Hari</span>
              <span>Kualitas Terjamin</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Standard Footer Content ─── */}
      <div className="w-full px-6 flex flex-col items-center max-w-[1800px] mx-auto relative z-10">
        {/* Centered Descriptive Text */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-[700px] text-center mb-12"
        >
          <p className="font-heading font-medium tracking-tight text-[var(--color-primary)]/90 transition-colors duration-700 text-sm md:text-base leading-relaxed">
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
            as="button"
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
            className="mb-32 group inline-flex items-center justify-center px-6 py-3 rounded-full border border-[var(--color-primary)]/30 text-[10px] md:text-xs font-heading font-bold uppercase tracking-widest text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-cream transition-all duration-300"
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
          className="w-full flex justify-between items-end border-b border-[var(--color-border)]/30 pb-4 mb-4 md:mb-8"
        >
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-[var(--color-primary)] text-[10px] md:text-xs uppercase tracking-widest mb-2 transition-colors duration-700">
              Tautan Cepat
            </h4>
            <div className="flex gap-2">
              <Link
                href="/#beranda"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
              >
                Beranda,
              </Link>
              <Link
                href="/belanja"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
              >
                Belanja,
              </Link>
              <Link
                href="/#layanan"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
              >
                Layanan,
              </Link>
              <Link
                href="/#kategori"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
              >
                Kategori,
              </Link>
              <Link
                href="/#works"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
              >
                Koleksi,
              </Link>
              <Link
                href="/#contact"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
              >
                Kontak
              </Link>
            </div>
          </div>

          <div className="flex flex-col text-right">
            <h4 className="font-heading font-bold text-[var(--color-primary)] text-[10px] md:text-xs uppercase tracking-widest mb-1 transition-colors duration-700">
              Jejaring Sosial
            </h4>
            <div className="flex gap-2 justify-end">
              <Link
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
              >
                WhatsApp,
              </Link>
              <Link
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
              >
                Instagram,
              </Link>
              <Link
                href="#"
                className="font-serif italic text-text-muted text-[10px] md:text-sm hover:text-[var(--color-primary)] transition-colors duration-700"
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
          <h1 className="text-[clamp(6rem,26vw,32rem)] font-heading font-black tracking-tighter uppercase text-[var(--color-primary)]/[0.05] transition-colors duration-700 leading-[0.75] text-center">
            ©2026
          </h1>
        </motion.div>
      </div>
    </footer>
  );
}
