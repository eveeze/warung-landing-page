'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useCart } from '@/lib/cart';

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Belanja', href: '#belanja' },
  { label: 'Kontak', href: '#kontak' },
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
              <a
                href="#beranda"
                className="font-heading text-lg md:text-xl text-white tracking-tight hover:opacity-50 transition-opacity"
              >
                Warung Manto®
              </a>
            </div>

            {/* Middle: Quick Links (Desktop only) */}
            <div className="hidden md:flex flex-col col-span-5">
              <span className="text-[10px] font-heading font-bold text-white tracking-wider mb-1">
                Akses Cepat
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] text-text-muted font-heading tracking-wider">
                {navLinks.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                    {i < navLinks.length - 1 ? ',' : ''}
                  </a>
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

              <div className="flex items-center gap-6">
                {/* Cart Button */}
                <button
                  onClick={openCart}
                  className="text-[10px] font-heading font-bold text-white tracking-widest hover:opacity-50 transition-opacity uppercase"
                >
                  Keranjang [{totalItems}]
                </button>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden text-white hover:opacity-50 transition-opacity"
                  aria-label="Toggle Menu"
                >
                  {mobileOpen ? (
                    <X size={20} strokeWidth={1.5} />
                  ) : (
                    <Menu size={20} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - Brutalist Takeover */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-start justify-center px-6 gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  ease: [0.85, 0, 0.15, 1],
                }}
                onClick={() => setMobileOpen(false)}
                className="text-5xl font-heading font-bold text-white hover:text-text-muted transition-colors tracking-tighter uppercase"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
