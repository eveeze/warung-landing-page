'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fetchProducts } from '@/lib/api';
import type { Product } from '@/lib/api';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function FeaturedWorks() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts({ perPage: 3 })
      .then((res) => setProducts(res.products.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <section
      id="works"
      className="relative w-full bg-black pt-32 pb-40 overflow-hidden"
    >
      <div className="w-full px-6 mb-16">
        {/* Meta Header */}
        <div className="flex justify-between items-center text-text-muted font-heading font-bold text-[10px] uppercase tracking-widest border-b border-border/30 pb-4">
          <span>© PRODUK ANDALAN</span>
          <span className="hidden md:block">(WM™ — 03)</span>
          <span>PILIHAN TERBAIK</span>
        </div>
      </div>

      {/* Infinite Marquee Heading */}
      <div className="w-full relative flex items-center overflow-hidden mb-24 select-none">
        <div className="flex flex-shrink-0 animate-marquee-slow font-heading font-black text-[clamp(6rem,20vw,25rem)] leading-[0.8] tracking-tighter text-white whitespace-nowrap">
          <span className="pr-16">Produk Pilihan©</span>
          <span className="pr-16">Produk Pilihan©</span>
          <span className="pr-16">Produk Pilihan©</span>
          <span className="pr-16">Produk Pilihan©</span>
        </div>
        <div className="flex flex-shrink-0 animate-marquee-slow font-heading font-black text-[clamp(6rem,20vw,25rem)] leading-[0.8] tracking-tighter text-white whitespace-nowrap">
          <span className="pr-16">Produk Pilihan©</span>
          <span className="pr-16">Produk Pilihan©</span>
          <span className="pr-16">Produk Pilihan©</span>
          <span className="pr-16">Produk Pilihan©</span>
        </div>
      </div>

      {/* Content & Bento Grid Grid */}
      <div className="w-full px-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative">
        {/* Left Column: Text + Product 0 */}
        <div className="flex flex-col gap-24">
          {/* Context Text & Button */}
          <div className="max-w-md">
            <p className="font-serif text-base text-text-muted leading-relaxed mb-8">
              Setiap produk kami seleksi langsung dari pemasok terpercaya. Dari{' '}
              <strong className="text-white font-medium">
                bahan pokok, bumbu dapur, hingga kebutuhan rumah tangga
              </strong>{' '}
              — semua tersedia dengan harga transparan dan kualitas yang
              konsisten.
            </p>
            <Link href="/belanja" className="inline-block">
              <AnimatedButton
                as="span"
                fillColor="bg-white"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white text-white font-heading font-bold text-xs uppercase tracking-widest hover:border-white hover:text-black transition-colors duration-300"
              >
                Jelajahi Katalog →
              </AnimatedButton>
            </Link>
          </div>

          {/* Product 0: Large Square */}
          {products[0] && (
            <div className="w-full xl:w-[90%] group cursor-pointer flex flex-col">
              <div className="w-full aspect-square bg-[#0a0a0a] rounded-2xl md:rounded-[2rem] overflow-hidden relative mb-4">
                {products[0].image_url ? (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    src={products[0].image_url}
                    alt={products[0].name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#111]" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="font-heading font-bold text-white text-sm md:text-base tracking-tight">
                  {products[0].name}
                </span>
                <span className="font-heading font-medium text-text-muted text-xs">
                  (01)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Product 1 (Top/Right) & Product 2 (Bottom/Center) */}
        <div className="flex flex-col gap-16 lg:gap-32 lg:pt-12">
          {/* Product 1: Wide Rectangle */}
          {products[1] && (
            <div className="w-full md:w-[80%] lg:w-[95%] xl:w-[85%] self-end group cursor-pointer flex flex-col">
              <div className="w-full aspect-[4/3] bg-[#0a0a0a] rounded-2xl md:rounded-[2rem] overflow-hidden relative mb-4">
                {products[1].image_url ? (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    src={products[1].image_url}
                    alt={products[1].name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#111]" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="font-heading font-bold text-white text-sm md:text-base tracking-tight">
                  {products[1].name}
                </span>
                <span className="font-heading font-medium text-text-muted text-xs">
                  (02)
                </span>
              </div>
            </div>
          )}

          {/* Product 2: Tall Rectangle */}
          {products[2] && (
            <div className="w-full md:w-[70%] lg:w-[80%] lg:-ml-12 group cursor-pointer flex flex-col">
              <div className="w-full aspect-[3/4] bg-[#0a0a0a] rounded-2xl md:rounded-[2rem] overflow-hidden relative mb-4">
                {products[2].image_url ? (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    src={products[2].image_url}
                    alt={products[2].name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#111]" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </div>
              <div className="flex justify-between items-center px-2">
                <span className="font-heading font-bold text-white text-sm md:text-base tracking-tight">
                  {products[2].name}
                </span>
                <span className="font-heading font-medium text-text-muted text-xs">
                  (03)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
