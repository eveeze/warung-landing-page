'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { fetchProducts } from '@/lib/api';
import type { Product } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/lib/cart';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // Custom premium ease (Bézier)
    },
  },
};

export default function Belanja() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, openCart } = useCart();

  useEffect(() => {
    fetchProducts({ perPage: 20 })
      .then((res) => setProducts(res.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-40">
        <div className="w-full px-6 max-w-[1600px] mx-auto">
          {/* Header Section */}
          <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-border/30 pb-12">
            <div>
              <h1 className="font-heading font-medium text-[clamp(4rem,10vw,8rem)] leading-[0.85] tracking-tighter mb-4">
                Katalog
                <br />
                Belanja
              </h1>
              <p className="font-serif text-text-muted text-base max-w-md">
                Koleksi lengkap kebutuhan harian dan pasokan bisnis dengan
                standar kualitas terbaik Warung Mbah Manto.
              </p>
            </div>
            <div className="text-[10px] font-heading font-bold uppercase tracking-widest text-text-muted text-right">
              <span>Menampilkan {products.length} Produk</span>
              <br />
              <span>(WM™ — 04)</span>
            </div>
          </div>

          {/* Staggered Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group flex flex-col cursor-pointer"
              >
                {/* Image Container - Flush Edge */}
                <Link
                  href={`/belanja/${product.id}`}
                  className="block w-full aspect-[4/5] bg-[#0a0a0a] overflow-hidden relative mb-4"
                >
                  {product.image_url ? (
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      src={product.image_url}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#111]" />
                  )}
                  {/* Subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>

                {/* Product Metadata */}
                <div className="flex flex-col gap-1 px-1">
                  <div className="flex justify-between items-start">
                    <Link
                      href={`/belanja/${product.id}`}
                      className="font-heading font-bold text-base tracking-tight hover:opacity-70 transition-opacity"
                    >
                      {product.name}
                    </Link>
                    <span className="font-heading font-medium text-text-muted text-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="font-serif text-sm text-text-muted">
                    Rp {product.base_price.toLocaleString('id-ID')}
                  </span>

                  {/* Quick Add Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addItem(
                        {
                          productId: product.id,
                          name: product.name,
                          basePrice: product.base_price,
                          imageUrl: product.image_url,
                          unit: product.unit,
                          pricingTiers: product.pricing_tiers,
                        },
                        1,
                      );
                      openCart();
                    }}
                    className="mt-4 self-start text-[10px] font-heading font-bold uppercase tracking-widest border-b border-border/50 pb-1 hover:border-white transition-colors"
                  >
                    + Keranjang
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
