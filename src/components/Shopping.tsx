'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { fetchProducts, fetchCategories, formatRupiah } from '@/lib/api';
import type { Product, Category } from '@/lib/api';
import { useCart } from '@/lib/cart';
import AnimatedButton from '@/components/ui/AnimatedButton';

function ProductSkeleton() {
  return (
    <div className="bg-transparent border border-border p-4">
      <div className="aspect-[4/3] bg-forest-mid animate-pulse mb-6" />
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="h-4 w-2/3 bg-border animate-pulse" />
          <div className="h-4 w-1/4 bg-border animate-pulse" />
        </div>
        <div className="h-3 w-1/3 bg-border/50 animate-pulse" />
      </div>
    </div>
  );
}

import ProductCard from '@/components/ui/ProductCard';

export default function Shopping() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  const perPage = 12;

  const loadProducts = useCallback(
    async (p: number, reset = false) => {
      try {
        if (reset) setLoading(true);
        else setLoadingMore(true);

        const data = await fetchProducts({
          search,
          categoryId: activeCategory,
          page: p,
          perPage,
        });

        if (reset) {
          setProducts(data.products);
        } else {
          setProducts((prev) => [...prev, ...data.products]);
        }
        setTotal(data.total);
        setPage(p);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [search, activeCategory],
  );

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
    loadProducts(1, true);
  }, [loadProducts]);

  useEffect(() => {
    loadProducts(1, true);
  }, [activeCategory, loadProducts]);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    const t = setTimeout(() => {
      loadProducts(1, true);
    }, 400);
    setSearchTimeout(t);
  };

  const hasMore = products.length < total;

  return (
    <section
      ref={ref}
      id="belanja"
      className="relative py-24 md:py-32 border-t border-[var(--color-primary)]"
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 xl:px-20">
        {/* Massive Typography Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 flex flex-col"
        >
          <div className="flex items-center gap-6 mb-8">
            <span className="w-12 h-[1px] bg-[var(--color-accent)]"></span>
            <span className="font-heading font-black text-xs uppercase tracking-[0.3em] text-text-muted">
              ( COLLECTION )
            </span>
          </div>
          <h2 className="font-heading font-black text-[clamp(4rem,10vw,12rem)] leading-[0.8] tracking-tighter uppercase ">
            Katalog{' '}
            <span className="font-serif italic font-light text-text-muted">
              Produk
            </span>
          </h2>
        </motion.div>

        {/* Structural Filters & Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.85, 0, 0.15, 1] }}
          className="flex flex-col border border-border mb-16 md:mb-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border">
            {/* Elegant Search Input */}
            <div className="col-span-1 lg:col-span-1 relative flex items-center ">
              <input
                type="text"
                placeholder="Cari produk…"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-transparent pl-4 pr-12 py-4 md:py-6 text-sm md:text-base font-heading font-bold uppercase placeholder:text-text-muted focus:outline-none focus:bg-[var(--color-accent)] focus:text-[var(--color-accent-contrast)] transition-colors duration-500 rounded-none peer"
              />
              <Search
                size={16}
                strokeWidth={2}
                className="absolute right-4 text-text-muted peer-focus:text-[var(--color-accent-contrast)] pointer-events-none transition-colors duration-500"
              />
            </div>

            {/* Category Links (Scrollable Pill List for Scalability) */}
            <div className="col-span-1 lg:col-span-3 flex items-center overflow-x-auto px-6 py-4 md:py-6 gap-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <AnimatedButton
                onClick={() => setActiveCategory('')}
                fillColor={
                  activeCategory === '' ? undefined : 'bg-[var(--color-accent)]'
                }
                className={`shrink-0 px-6 py-2.5 rounded-full border text-xs font-heading font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeCategory === ''
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]'
                    : 'border-border text-text-muted hover:border-[var(--color-accent)] hover:text-[var(--color-accent-contrast)]'
                }`}
              >
                Semua Koleksi
              </AnimatedButton>
              {categories.map((cat) => (
                <AnimatedButton
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  fillColor={
                    activeCategory === cat.id
                      ? undefined
                      : 'bg-[var(--color-accent)]'
                  }
                  className={`shrink-0 px-6 py-2.5 rounded-full border text-xs font-heading font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-accent-contrast)]'
                      : 'border-border text-text-muted hover:border-[var(--color-accent)] hover:text-[var(--color-accent-contrast)]'
                  }`}
                >
                  {cat.name}
                </AnimatedButton>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border border-border">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-40 text-center border border-border"
          >
            <p className="font-heading font-black text-4xl uppercase tracking-tighter">
              Koleksi Kosong
            </p>
            <p className="text-xs text-text-muted mt-4 font-heading font-bold uppercase tracking-widest">
              Nihil Produk
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-t border-l border-border [&>div]:border-r [&>div]:border-b [&>div]:border-t-0 [&>div]:border-l-0"
            >
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Brutalist Load More */}
            {hasMore && (
              <div className="flex justify-center mt-20">
                {loadingMore ? (
                  <button
                    disabled
                    className="w-full md:w-auto px-12 py-6 border border-[var(--color-primary)] font-heading font-bold text-xs uppercase tracking-[0.2em] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] transition-colors duration-500 disabled:opacity-50 flex items-center justify-center gap-4"
                  >
                    <Loader2 size={16} className="animate-spin" /> Sedang
                    Memuat…
                  </button>
                ) : (
                  <AnimatedButton
                    onClick={() => loadProducts(page + 1)}
                    fillColor="bg-forest"
                    className="w-full md:w-auto px-12 py-6 rounded-full border border-[var(--color-primary)]/30 font-heading font-bold text-xs uppercase tracking-[0.2em] hover:border-[var(--color-primary)] hover:text-cream transition-colors duration-500 flex items-center justify-center"
                  >
                    Muat Lebih Banyak
                  </AnimatedButton>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
