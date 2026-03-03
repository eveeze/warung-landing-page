'use client';

import { useRef, useEffect, useState } from 'react';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref}
      className="relative pt-24 pb-0 z-20"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="w-full px-6 flex flex-col items-center max-w-[1800px] mx-auto">
        <div
          className="max-w-[700px] text-center mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <p
            className="font-heading font-medium tracking-tight text-sm md:text-base leading-relaxed"
            style={{ color: 'var(--color-text-body)' }}
          >
            Warung Mbah Manto hadir untuk menjadi mitra belanja harian Anda.
            Dari kebutuhan dapur hingga stok usaha, kami pastikan kualitas
            terbaik dengan harga yang selalu bersahabat.
          </p>
        </div>

        <div
          className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <AnimatedButton
            onClick={handleScrollToTop}
            fillColor="bg-[var(--color-accent)]"
            className="mb-32 px-6 py-2.5 rounded-full text-[10px] md:text-xs font-heading font-bold uppercase tracking-[0.1em] transition-colors duration-300"
            style={{
              border: '1px solid var(--color-border-strong)',
              color: 'var(--color-text-heading)',
            }}
          >
            Kembali ke Atas
          </AnimatedButton>
        </div>

        <div
          className="w-full flex justify-between items-end pb-4 mb-4 md:mb-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-200"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
            opacity: isVisible ? 1 : 0,
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="flex flex-col">
            <h4
              className="font-heading font-bold text-[10px] md:text-xs uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-text-heading)' }}
            >
              Tautan Cepat
            </h4>
            <div className="flex gap-2">
              {[
                { href: '/#beranda', label: 'Beranda,' },
                { href: '/belanja', label: 'Belanja,' },
                { href: '/#layanan', label: 'Layanan,' },
                { href: '/#kategori', label: 'Kategori,' },
                { href: '/#works', label: 'Koleksi,' },
                { href: '/#contact', label: 'Kontak' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-serif italic text-[10px] md:text-sm transition-colors hover:opacity-70"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col text-right">
            <h4
              className="font-heading font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1"
              style={{ color: 'var(--color-text-heading)' }}
            >
              Jejaring Sosial
            </h4>
            <div className="flex gap-2 justify-end">
              {['WhatsApp,', 'Instagram,', 'Tokopedia'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="font-serif italic text-[10px] md:text-sm transition-colors hover:opacity-70"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className="w-full flex justify-center -mb-[2%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-300"
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
            opacity: isVisible ? 1 : 0,
          }}
        >
          <h1
            className="text-[clamp(6rem,26vw,32rem)] font-heading font-black tracking-tighter uppercase leading-[0.75] text-center"
            style={{ color: 'var(--color-text-heading)' }}
          >
            ©2026
          </h1>
        </div>
      </div>
    </footer>
  );
}
