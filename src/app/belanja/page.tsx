'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants, LayoutGroup } from 'framer-motion';
import { fetchProducts, fetchCategories, formatRupiah } from '@/lib/api';
import type { Product, Category } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/lib/cart';
import { Search, X, ChevronDown } from 'lucide-react';

// ─── Design threshold: ≤8 categories = pill row, >8 = scrollable dropdown ───
const PILL_THRESHOLD = 8;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
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
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function Belanja() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCart();

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(cats || []))
      .catch(() => setCategories([]));
  }, []);

  // Fetch products when category or search changes
  const loadProducts = useCallback(() => {
    setIsLoading(true);
    fetchProducts({
      perPage: 50,
      categoryId: activeCategoryId || undefined,
      search: searchQuery || undefined,
    })
      .then((res) => {
        setProducts(res.products);
        setIsLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setIsLoading(false);
      });
  }, [activeCategoryId, searchQuery]);

  useEffect(() => {
    const debounce = setTimeout(loadProducts, 300);
    return () => clearTimeout(debounce);
  }, [loadProducts]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const activeCategoryName = activeCategoryId
    ? categories.find((c) => c.id === activeCategoryId)?.name || 'Filter'
    : 'Semua Produk';

  const usePillDesign = categories.length <= PILL_THRESHOLD;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white pt-32 pb-40">
        <div className="w-full px-6 max-w-[1600px] mx-auto">
          {/* ─── Header Section ─── */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-border/30 pb-12">
            <div>
              <h1 className="font-heading font-medium text-[clamp(4rem,10vw,8rem)] leading-[0.85] tracking-tighter mb-4">
                Katalog
                <br />
                Belanja
              </h1>
              <p className="font-serif text-text-muted text-base max-w-md">
                Koleksi lengkap kebutuhan harian dan pasokan bisnis dengan
                standar kualitas terbaik Warung Mbah Manto.
                <br />
                <br />
                <span className="text-white/80 bg-white/10 px-3 py-2 rounded border border-white/20 inline-block text-sm">
                  💡 <strong>Simulasi Belanja:</strong> Pemesanan asli akan
                  diarahkan ke WhatsApp <strong>0882‑003‑310‑360</strong>.
                </span>
              </p>
            </div>
            <div className="text-[10px] font-heading font-bold uppercase tracking-widest text-text-muted text-right">
              <span>Menampilkan {products.length} Produk</span>
              <br />
              <span>(WM™ — 04)</span>
            </div>
          </div>

          {/* ─── Search + Filter Bar ─── */}
          <div className="mb-16 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                placeholder="Cari produk…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.03] border border-border/30 rounded-full pl-12 pr-12 py-4 text-sm font-heading font-medium text-white placeholder:text-text-muted focus:outline-none focus:border-white/50 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <LayoutGroup>
                {usePillDesign ? (
                  /* ─── Design A: Pill Row (≤8 categories) ─── */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap gap-2"
                  >
                    {/* "Semua" pill */}
                    <button
                      onClick={() => setActiveCategoryId(null)}
                      className="relative px-5 py-2.5 rounded-full text-[11px] font-heading font-bold uppercase tracking-widest transition-colors duration-300"
                    >
                      {activeCategoryId === null && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-white rounded-full"
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 ${activeCategoryId === null ? 'text-black' : 'text-text-muted hover:text-white'}`}
                      >
                        Semua
                      </span>
                    </button>

                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() =>
                          setActiveCategoryId(
                            cat.id === activeCategoryId ? null : cat.id,
                          )
                        }
                        className="relative px-5 py-2.5 rounded-full text-[11px] font-heading font-bold uppercase tracking-widest transition-colors duration-300"
                      >
                        {activeCategoryId === cat.id && (
                          <motion.div
                            layoutId="activePill"
                            className="absolute inset-0 bg-white rounded-full"
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                        <span
                          className={`relative z-10 ${activeCategoryId === cat.id ? 'text-black' : 'text-text-muted hover:text-white'}`}
                        >
                          {cat.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  /* ─── Design B: Dropdown + Horizontal Scroll (>8 categories) ─── */
                  <div className="flex flex-col gap-4">
                    {/* Top row: Dropdown selector + Quick pills on desktop */}
                    <div className="flex items-center gap-4">
                      {/* Dropdown */}
                      <div ref={dropdownRef} className="relative">
                        <button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="flex items-center gap-2 px-5 py-3 rounded-full border border-border/50 bg-white/[0.03] text-sm font-heading font-bold text-white hover:border-white/50 transition-colors"
                        >
                          <span>{activeCategoryName}</span>
                          <motion.span
                            animate={{ rotate: dropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={14} />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.95 }}
                              transition={{
                                duration: 0.25,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="absolute left-0 top-full mt-2 w-72 max-h-80 overflow-y-auto bg-[#111] border border-border/30 rounded-xl shadow-2xl z-40 custom-scrollbar"
                            >
                              {/* "Semua" option */}
                              <button
                                onClick={() => {
                                  setActiveCategoryId(null);
                                  setDropdownOpen(false);
                                }}
                                className={`w-full text-left px-5 py-3 text-sm font-heading font-medium transition-colors ${
                                  activeCategoryId === null
                                    ? 'bg-white text-black font-bold'
                                    : 'text-text-muted hover:text-white hover:bg-white/5'
                                }`}
                              >
                                Semua Produk
                              </button>

                              {categories.map((cat) => (
                                <button
                                  key={cat.id}
                                  onClick={() => {
                                    setActiveCategoryId(cat.id);
                                    setDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-5 py-3 text-sm font-heading font-medium transition-colors ${
                                    activeCategoryId === cat.id
                                      ? 'bg-white text-black font-bold'
                                      : 'text-text-muted hover:text-white hover:bg-white/5'
                                  }`}
                                >
                                  {cat.name}
                                  {cat.description && (
                                    <span className="block text-[10px] text-text-muted mt-0.5 font-normal">
                                      {cat.description}
                                    </span>
                                  )}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Clear filter button */}
                      {activeCategoryId && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => setActiveCategoryId(null)}
                          className="text-[10px] text-text-muted hover:text-white font-heading font-bold uppercase tracking-widest transition-colors flex items-center gap-1"
                        >
                          <X size={12} />
                          Hapus Filter
                        </motion.button>
                      )}
                    </div>

                    {/* Horizontal scrollable quick-access pills */}
                    <div className="overflow-x-auto flex gap-2 pb-2 -mx-6 px-6 scrollbar-hide">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() =>
                            setActiveCategoryId(
                              cat.id === activeCategoryId ? null : cat.id,
                            )
                          }
                          className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-heading font-bold uppercase tracking-widest border transition-all duration-300 ${
                            activeCategoryId === cat.id
                              ? 'bg-white text-black border-white'
                              : 'bg-transparent text-text-muted border-border/30 hover:border-white/50 hover:text-white'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </LayoutGroup>
            )}
          </div>

          {/* ─── Loading Skeleton ─── */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col animate-pulse">
                  <div className="w-full aspect-[4/5] bg-white/[0.03] rounded mb-4" />
                  <div className="h-4 bg-white/[0.05] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-white/[0.03] rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* ─── Empty State ─── */}
          {!isLoading && products.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-20 h-20 rounded-full border border-border/30 flex items-center justify-center mb-8">
                <Search size={28} className="text-text-muted" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-white mb-3">
                Produk Tidak Ditemukan
              </h3>
              <p className="font-serif text-text-muted text-sm max-w-md mb-8">
                {searchQuery
                  ? `Tidak ada produk yang cocok dengan "${searchQuery}". Coba kata kunci lain.`
                  : 'Tidak ada produk dalam kategori ini.'}
              </p>
              {(searchQuery || activeCategoryId) && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategoryId(null);
                  }}
                  className="text-[10px] font-heading font-bold uppercase tracking-widest border-b border-white pb-1 hover:opacity-70 transition-opacity"
                >
                  Reset Semua Filter
                </button>
              )}
            </motion.div>
          )}

          {/* ─── Staggered Product Grid ─── */}
          {!isLoading && products.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategoryId}-${searchQuery}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    layout
                    className="group flex flex-col cursor-pointer"
                  >
                    {/* Image Container */}
                    <Link
                      href={`/belanja/${product.id}`}
                      className="block w-full aspect-[4/5] bg-[#0a0a0a] overflow-hidden relative mb-4"
                    >
                      {product.image_url ? (
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          src={product.image_url}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
                          <span className="font-heading font-black text-4xl text-white/10">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      {/* Category badge on card */}
                      {product.category && (
                        <span className="absolute top-3 left-3 text-[8px] font-heading font-bold bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full uppercase tracking-widest">
                          {product.category.name}
                        </span>
                      )}
                      {/* Grosir badge */}
                      {product.pricing_tiers &&
                        product.pricing_tiers.length > 0 && (
                          <span className="absolute top-3 right-3 text-[8px] font-heading font-bold bg-white/90 text-black px-3 py-1 rounded-full uppercase tracking-widest">
                            Grosir
                          </span>
                        )}
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
                        <span
                          className="font-heading font-medium text-text-muted text-xs"
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="font-serif text-sm text-text-muted">
                        {product.base_price > 0
                          ? `${formatRupiah(product.base_price)} / ${product.unit}`
                          : 'Harga belum tersedia'}
                      </span>

                      {/* Quick Add Button */}
                      {product.base_price > 0 && (
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
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
