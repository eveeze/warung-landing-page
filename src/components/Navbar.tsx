'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart';
import AnimatedButton from '@/components/ui/AnimatedButton';

const navLinks = [
  { label: 'Beranda', href: '/#beranda' },
  { label: 'Belanja', href: '/belanja' },
  { label: 'Layanan', href: '/#layanan' },
  { label: 'Kategori', href: '/#kategori' },
  { label: 'Koleksi', href: '/#works' },
  { label: 'Kontak', href: '/#contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-border"
      >
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 xl:px-20 py-6">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 items-start">
            {/* Left: Brand */}
            <div className="col-span-1 md:col-span-3">
              <Link
                href="/"
                className="font-heading text-lg md:text-xl text-white tracking-tight hover:opacity-50 transition-opacity relative z-50"
                onClick={() => setMobileOpen(false)}
              >
                Warung Manto®
              </Link>
            </div>

            {/* Middle: Quick Links (Desktop only) */}
            <div className="hidden md:flex flex-col col-span-5">
              <span className="text-[10px] font-heading font-bold text-white tracking-wider mb-1">
                Akses Cepat
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] text-text-muted font-heading tracking-wider">
                {navLinks.map((link, i) => (
                  <AnimatedButton
                    key={link.href}
                    href={link.href}
                    as="a"
                    className="hover:text-white transition-colors flex"
                  >
                    {link.label + (i < navLinks.length - 1 ? ',' : '')}
                  </AnimatedButton>
                ))}
              </div>
            </div>

            {/* Right: Info & Cart */}
            <div className="col-span-1 md:col-span-4 flex justify-end md:justify-between items-start">
              {/* Meta Info (Desktop only) */}
              <div className="hidden md:flex flex-col">
                <span className="text-[10px] font-heading font-bold text-white tracking-wider mb-1">
                  Berbasis di Indonesia
                </span>
                <span className="text-[10px] text-text-muted font-heading tracking-wider">
                  Grosir + Eceran
                </span>
              </div>

              <div className="flex items-center gap-6 relative z-50">
                {/* Cart Button */}
                <AnimatedButton
                  onClick={openCart}
                  className="text-[10px] font-heading font-bold text-white tracking-widest hover:opacity-100 transition-opacity uppercase flex"
                >
                  {`Keranjang [${totalItems}]`}
                </AnimatedButton>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center gap-[6px] group"
                  aria-label="Toggle Menu"
                >
                  <motion.div
                    animate={{
                      rotate: mobileOpen ? 45 : 0,
                      y: mobileOpen ? 8 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-6 h-[2px] bg-white rounded-full origin-center"
                  />
                  <motion.div
                    animate={{
                      opacity: mobileOpen ? 0 : 1,
                      x: mobileOpen ? 20 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-6 h-[2px] bg-white rounded-full"
                  />
                  <motion.div
                    animate={{
                      rotate: mobileOpen ? -45 : 0,
                      y: mobileOpen ? -8 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-6 h-[2px] bg-white rounded-full origin-center"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Framer Glassmorphic Vibes */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(30px)' }}
            exit={{
              opacity: 0,
              backdropFilter: 'blur(0px)',
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              },
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-black/80 flex flex-col justify-between px-6 pt-32 pb-12"
          >
            <div className="flex flex-col gap-6 mt-12 md:mt-20">
              {navLinks.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    initial={{ y: '150%', rotate: 5, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    exit={{
                      y: '150%',
                      rotate: -5,
                      opacity: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: (navLinks.length - 1 - i) * 0.05,
                      },
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.1 + i * 0.08,
                    }}
                    onClick={() => setMobileOpen(false)}
                    className="block text-6xl sm:text-7xl font-heading font-black text-white hover:text-text-muted transition-colors tracking-tighter uppercase leading-[0.85]"
                  >
                    {link.label}
                  </motion.a>
                </div>
              ))}
            </div>

            {/* Footer-like element inside the mobile menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex justify-between items-end border-t border-white/20 pt-6 mt-8"
            >
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted font-heading font-bold uppercase tracking-widest mb-1">
                  Lokasi
                </span>
                <span className="font-serif italic text-sm text-white">
                  Indonesia
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-text-muted font-heading font-bold uppercase tracking-widest mb-1">
                  Kontak
                </span>
                <span className="font-serif italic text-sm text-white">
                  WhatsApp
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
