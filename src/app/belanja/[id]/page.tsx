'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  fetchProductById,
  fetchProducts,
  calculatePrice,
  formatRupiah,
} from '@/lib/api';
import type { Product } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/lib/cart';
import AnimatedButton from '@/components/ui/AnimatedButton';
import InfiniteMarquee from '@/lib/infinite-marquee';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect for the large image
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (id && typeof id === 'string') {
      fetchProductById(id)
        .then((res: Product) => {
          setProduct(res);
          setLoading(false);
        })
        .catch((err: Error) => {
          console.error(err);
          setLoading(false);
        });

      // Fetch related products
      fetchProducts({ perPage: 10 })
        .then((res) => {
          // Exclude current product from related list
          setRelatedProducts(
            res.products.filter((p: Product) => p.id !== id).slice(0, 4),
          );
        })
        .catch(() => {});
    }
  }, [id]);

  useEffect(() => {
    let marquee: InfiniteMarquee | null = null;
    if (relatedProducts.length > 0 && marqueeRef.current) {
      setTimeout(() => {
        if (marqueeRef.current) {
          marquee = new InfiniteMarquee({
            element: marqueeRef.current,
            speed: 2,
            direction: 'left-to-right',
            controlsOnHover: false,
          });
        }
      }, 100);
    }
    return () => {
      if (marquee) marquee.destroy();
    };
  }, [relatedProducts]);

  // Calculate live price based on quantity
  const livePrice = product
    ? calculatePrice(
        {
          base_price: product.base_price,
          pricing_tiers: product.pricing_tiers,
        },
        quantity,
      )
    : { pricePerUnit: 0, tierName: 'Harga Dasar' };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center text-[var(--color-primary)] gap-6">
        <h1 className="font-heading font-bold text-4xl">
          Produk Tidak Ditemukan
        </h1>
        <Link
          href="/belanja"
          className="text-text-muted hover:text-[var(--color-primary)] transition-colors border-b border-white pb-1"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const isPriceUnavailable = product.base_price === 0;

  return (
    <>
      <Navbar />
      <main className="bg-[var(--color-bg)] text-[var(--color-primary)] relative">
        {/* Split Screen: Image + Details */}
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Left Side: Massive Edge-to-Edge Image with Parallax */}
          <div className="w-full md:w-1/2 h-[70vh] md:h-screen sticky top-0 bg-[var(--color-bg-secondary)] overflow-hidden">
            {product.image_url ? (
              <motion.img
                style={{ y: yImage, scale: scaleImage }}
                src={product.image_url}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-forest-light via-black to-forest-mid flex items-center justify-center">
                <span className="font-heading font-black text-[8rem] text-[var(--color-primary)]/10 uppercase">
                  {product.name.charAt(0)}
                </span>
              </div>
            )}
            {/* Subtle vignette/overlay */}
            <div className="absolute inset-0 bg-[var(--color-bg)]/10 pointer-events-none" />

            {/* Back Button (Absolute over image) */}
            <Link
              href="/belanja"
              className="absolute top-32 left-6 z-10 text-[10px] bg-[var(--color-bg)]/50 backdrop-blur-md px-4 py-2 rounded-full font-heading font-bold tracking-widest uppercase hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-contrast)] transition-colors"
            >
              ← Kembali
            </Link>
          </div>

          {/* Right Side: Product Info from Real API Data */}
          <div className="w-full md:w-1/2 px-6 md:px-16 lg:px-24 pt-12 md:pt-[30vh] pb-32 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              {/* Meta breadcrumb + Category badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] text-text-muted font-heading font-bold uppercase tracking-widest">
                  Katalog {`//`} {product.id.slice(0, 8)}
                </span>
                {product.category && (
                  <span className="text-[9px] font-heading font-bold bg-[var(--color-accent)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full uppercase tracking-widest border border-[var(--color-primary)]/20">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1
                className="font-heading font-medium text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.9] tracking-tighter mb-6 break-words"
                style={{ textWrap: 'balance' }}
              >
                {product.name}
              </h1>

              {/* Unit badge */}
              <div className="text-[10px] text-text-muted font-heading font-bold uppercase tracking-widest mb-8">
                Dijual per{' '}
                <span className="text-[var(--color-primary)]">
                  {product.unit}
                </span>
              </div>

              {/* Description (only if available) */}
              {product.description && product.description.trim() !== '' && (
                <p className="font-serif text-lg md:text-xl text-text-muted leading-relaxed mb-12 max-w-lg">
                  {product.description}
                </p>
              )}

              {/* Price + Add to Cart */}
              <div className="flex flex-col gap-6 border-t border-[var(--color-border)]/30 pt-8 mb-12">
                {isPriceUnavailable ? (
                  <span className="font-heading font-bold text-2xl text-text-muted">
                    Harga belum tersedia
                  </span>
                ) : (
                  <>
                    <div className="flex items-end gap-4 flex-wrap">
                      <span className="font-heading font-bold text-3xl md:text-4xl">
                        {formatRupiah(livePrice.pricePerUnit)}
                      </span>
                      <span className="text-text-muted font-heading text-sm mb-1 whitespace-nowrap">
                        / {product.unit}
                      </span>
                      {livePrice.tierName !== 'Harga Dasar' && (
                        <span className="text-[9px] font-heading font-bold text-[var(--color-accent-contrast)] bg-[var(--color-accent)] px-2 py-1 rounded-full uppercase tracking-widest mb-1 whitespace-nowrap">
                          {livePrice.tierName}
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="flex items-center border border-[var(--color-border)]">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-[var(--color-primary)] transition-colors disabled:opacity-30 font-heading font-bold"
                        >
                          −
                        </button>
                        <span
                          className="w-12 text-center font-heading font-bold text-[var(--color-primary)] text-sm"
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-[var(--color-primary)] transition-colors font-heading font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-heading text-sm text-text-muted">
                        Subtotal:{' '}
                        <span className="text-[var(--color-primary)] font-bold">
                          {formatRupiah(livePrice.pricePerUnit * quantity)}
                        </span>
                      </span>
                    </div>

                    <AnimatedButton
                      onClick={() => {
                        addItem(
                          {
                            productId: product.id,
                            name: product.name,
                            basePrice: product.base_price,
                            imageUrl: product.image_url,
                            unit: product.unit,
                            pricingTiers: product.pricing_tiers,
                          },
                          quantity,
                        );
                        openCart();
                      }}
                      className="group w-full sm:w-auto px-10 py-5 rounded-full bg-transparent border border-[var(--color-primary)]/20 text-[var(--color-primary)] font-heading font-bold text-xs uppercase tracking-widest hover:border-[var(--color-primary)] hover:text-cream transition-colors duration-500 flex items-center justify-center"
                      fillColor="bg-[var(--color-primary)]"
                    >
                      {`+ Tambah ${quantity > 1 ? `${quantity} ` : ''}ke Keranjang`}
                    </AnimatedButton>
                  </>
                )}
              </div>

              {/* Pricing Tiers Table (only if tiers exist) */}
              {product.pricing_tiers && product.pricing_tiers.length > 0 && (
                <div className="border-t border-[var(--color-border)]/30 pt-8 mb-12">
                  <h3 className="text-[10px] text-text-muted font-heading font-bold uppercase tracking-widest mb-6">
                    Harga Grosir Bertingkat
                  </h3>
                  <div className="space-y-3">
                    {product.pricing_tiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between py-3 px-4 rounded-lg transition-colors ${
                          quantity >= tier.min_quantity &&
                          (tier.max_quantity === null ||
                            quantity <= tier.max_quantity)
                            ? 'bg-[var(--color-accent)]/10 border border-[var(--color-primary)]/20'
                            : 'bg-[var(--color-accent)]/[0.03]'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-heading font-bold text-sm text-[var(--color-primary)]">
                            {tier.name || `Tier ${idx + 1}`}
                          </span>
                          <span className="text-[10px] text-text-muted font-heading tracking-wider">
                            Beli {tier.min_quantity}
                            {tier.max_quantity
                              ? `–${tier.max_quantity}`
                              : '+'}{' '}
                            {product.unit}
                          </span>
                        </div>
                        <span className="font-heading font-bold text-[var(--color-primary)] text-sm whitespace-nowrap">
                          {formatRupiah(tier.price)} / {product.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Specs Grid — Real data only */}
              <div className="grid grid-cols-2 gap-y-8 border-t border-[var(--color-border)]/30 pt-8 text-xs font-heading tracking-widest uppercase">
                <div>
                  <span className="block text-text-muted mb-2">Satuan</span>
                  <span className="font-bold break-words">{product.unit}</span>
                </div>
                {product.category && (
                  <div>
                    <span className="block text-text-muted mb-2">Kategori</span>
                    <span className="font-bold break-words">
                      {product.category.name}
                    </span>
                  </div>
                )}
                <div>
                  <span className="block text-text-muted mb-2">
                    Harga Dasar
                  </span>
                  <span className="font-bold">
                    {isPriceUnavailable
                      ? '—'
                      : formatRupiah(product.base_price)}
                  </span>
                </div>
                <div>
                  <span className="block text-text-muted mb-2">
                    Opsi Grosir
                  </span>
                  <span className="font-bold">
                    {product.pricing_tiers && product.pricing_tiers.length > 0
                      ? `${product.pricing_tiers.length} tier tersedia`
                      : 'Hanya eceran'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products Section GSAP Marquee (Framer vibes) */}
        {relatedProducts.length > 0 && (
          <section className="w-full relative pt-24 pb-40 overflow-hidden border-t border-[var(--color-border)]/30 bg-[var(--color-bg)] mt-12 md:mt-0">
            {/* GSAP Marquee Header */}
            <div className="w-full relative flex items-center overflow-hidden mb-16 md:mb-24 select-none opacity-90 h-auto py-4">
              <div
                ref={marqueeRef}
                className="flex flex-nowrap min-w-max items-center"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex items-center pr-16 font-heading font-black text-[clamp(4rem,10vw,16rem)] leading-none tracking-tighter whitespace-nowrap text-[var(--color-primary)]"
                  >
                    © PRODUK LAINNYA
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-[1800px] mx-auto px-4 md:px-6 relative z-10">
              {/* Ultra Clean Brutalist Bento Grid - Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((rp, index) => (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group h-full"
                  >
                    <Link href={`/belanja/${rp.id}`} className="block h-full">
                      <div className="w-full h-full flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden transition-all duration-700 hover:border-[var(--color-primary)]">
                        {/* Image Box */}
                        <div className="w-full aspect-[4/3] bg-[var(--color-bg-secondary)] relative overflow-hidden border-b border-[var(--color-border)]">
                          {rp.image_url ? (
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              src={rp.image_url}
                              alt={rp.name}
                              className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-heading font-black text-6xl text-[var(--color-primary)]/10 uppercase">
                                {rp.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Meta Box */}
                        <div className="p-4 md:p-6 flex flex-col justify-between flex-1 gap-4 md:gap-8">
                          <h3 className="font-heading font-bold text-lg md:text-xl leading-tight tracking-tight text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2">
                            {rp.name}
                          </h3>
                          <div className="flex justify-between items-end border-t border-[var(--color-border)]/50 pt-4 mt-auto">
                            <span className="font-serif italic text-xs md:text-sm text-text-muted">
                              {rp.base_price > 0
                                ? formatRupiah(rp.base_price)
                                : 'N/A'}
                            </span>
                            <span className="font-heading font-black text-[10px] md:text-xs tracking-widest text-[var(--color-primary)] flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-500">
                              VIEW{' '}
                              <span className="text-[8px] md:text-[10px]">
                                ↗
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
