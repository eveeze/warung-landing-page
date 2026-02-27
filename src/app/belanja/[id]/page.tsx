'use client';

import { useEffect, useState } from 'react';
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

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

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
      fetchProducts({ perPage: 5 })
        .then((res) => {
          // Exclude current product from related list
          setRelatedProducts(
            res.products.filter((p: Product) => p.id !== id).slice(0, 4),
          );
        })
        .catch(() => {});
    }
  }, [id]);

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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-6">
        <h1 className="font-heading font-bold text-4xl">
          Produk Tidak Ditemukan
        </h1>
        <Link
          href="/belanja"
          className="text-text-muted hover:text-white transition-colors border-b border-white pb-1"
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
      <main className="bg-black text-white relative">
        {/* Split Screen: Image + Details */}
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Left Side: Massive Edge-to-Edge Image with Parallax */}
          <div className="w-full md:w-1/2 h-[70vh] md:h-screen sticky top-0 bg-[#0a0a0a] overflow-hidden">
            {product.image_url ? (
              <motion.img
                style={{ y: yImage, scale: scaleImage }}
                src={product.image_url}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-forest-light via-black to-forest-mid flex items-center justify-center">
                <span className="font-heading font-black text-[8rem] text-white/10 uppercase">
                  {product.name.charAt(0)}
                </span>
              </div>
            )}
            {/* Subtle vignette/overlay */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            {/* Back Button (Absolute over image) */}
            <Link
              href="/belanja"
              className="absolute top-32 left-6 z-10 text-[10px] bg-black/50 backdrop-blur-md px-4 py-2 rounded-full font-heading font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
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
                  <span className="text-[9px] font-heading font-bold bg-white/10 text-white px-3 py-1 rounded-full uppercase tracking-widest border border-white/20">
                    {product.category.name}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1
                className="font-heading font-medium text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-tighter mb-6"
                style={{ textWrap: 'balance' as const }}
              >
                {product.name}
              </h1>

              {/* Unit badge */}
              <div className="text-[10px] text-text-muted font-heading font-bold uppercase tracking-widest mb-8">
                Dijual per <span className="text-white">{product.unit}</span>
              </div>

              {/* Description (only if available) */}
              {product.description && product.description.trim() !== '' && (
                <p className="font-serif text-lg md:text-xl text-text-muted leading-relaxed mb-12 max-w-lg">
                  {product.description}
                </p>
              )}

              {/* Price + Add to Cart */}
              <div className="flex flex-col gap-6 border-t border-border/30 pt-8 mb-12">
                {isPriceUnavailable ? (
                  <span className="font-heading font-bold text-2xl text-text-muted">
                    Harga belum tersedia
                  </span>
                ) : (
                  <>
                    <div className="flex items-end gap-4">
                      <span className="font-heading font-bold text-3xl md:text-4xl">
                        {formatRupiah(livePrice.pricePerUnit)}
                      </span>
                      <span className="text-text-muted font-heading text-sm mb-1">
                        / {product.unit}
                      </span>
                      {livePrice.tierName !== 'Harga Dasar' && (
                        <span className="text-[9px] font-heading font-bold text-black bg-white px-2 py-1 rounded-full uppercase tracking-widest mb-1">
                          {livePrice.tierName}
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-white transition-colors disabled:opacity-30 font-heading font-bold"
                        >
                          −
                        </button>
                        <span
                          className="w-12 text-center font-heading font-bold text-white text-sm"
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-white transition-colors font-heading font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-heading text-sm text-text-muted">
                        Subtotal:{' '}
                        <span className="text-white font-bold">
                          {formatRupiah(livePrice.pricePerUnit * quantity)}
                        </span>
                      </span>
                    </div>

                    <button
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
                      className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-heading font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
                    >
                      + Tambah {quantity > 1 ? `${quantity} ` : ''}ke Keranjang
                    </button>
                  </>
                )}
              </div>

              {/* Pricing Tiers Table (only if tiers exist) */}
              {product.pricing_tiers && product.pricing_tiers.length > 0 && (
                <div className="border-t border-border/30 pt-8 mb-12">
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
                            ? 'bg-white/10 border border-white/20'
                            : 'bg-white/[0.03]'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-heading font-bold text-sm text-white">
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
                        <span className="font-heading font-bold text-white text-sm">
                          {formatRupiah(tier.price)} / {product.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Product Specs Grid — Real data only */}
              <div className="grid grid-cols-2 gap-y-8 border-t border-border/30 pt-8 text-xs font-heading tracking-widest uppercase">
                <div>
                  <span className="block text-text-muted mb-2">Satuan</span>
                  <span className="font-bold">{product.unit}</span>
                </div>
                {product.category && (
                  <div>
                    <span className="block text-text-muted mb-2">Kategori</span>
                    <span className="font-bold">{product.category.name}</span>
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

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="w-full bg-black border-t border-border/30 pt-24 pb-32 px-6">
            <div className="max-w-[1600px] mx-auto">
              {/* Section Header */}
              <div className="flex justify-between items-end mb-16">
                <div>
                  <span className="text-[10px] text-text-muted font-heading font-bold uppercase tracking-widest block mb-3">
                    Produk Lainnya
                  </span>
                  <h2 className="font-heading font-medium text-[clamp(2rem,4vw,3.5rem)] tracking-tighter leading-[0.9]">
                    Jelajahi Lebih Banyak
                  </h2>
                </div>
                <Link
                  href="/belanja"
                  className="text-[10px] font-heading font-bold uppercase tracking-widest text-text-muted hover:text-white transition-colors border-b border-border/50 pb-1"
                >
                  Lihat Semua →
                </Link>
              </div>

              {/* Related Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {relatedProducts.map((rp, index) => (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group"
                  >
                    <Link href={`/belanja/${rp.id}`} className="block">
                      <div className="w-full aspect-[4/5] bg-[#050505] rounded-[2rem] overflow-hidden relative mb-6 border border-white/5 shadow-lg group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-shadow duration-700">
                        {rp.image_url ? (
                          <motion.img
                            whileHover={{ scale: 1.08 }}
                            transition={{
                              duration: 1.2,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            src={rp.image_url}
                            alt={rp.name}
                            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-700"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                            <span className="font-heading font-black text-4xl text-white/5 group-hover:text-white/20 transition-colors duration-700">
                              {rp.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      </div>
                      <div className="flex justify-between items-start gap-4 px-2">
                        <div className="flex flex-col gap-1">
                          <span className="font-heading font-bold text-base leading-tight tracking-tight group-hover:text-text-muted transition-colors">
                            {rp.name}
                          </span>
                          <span className="font-serif italic text-sm text-text-muted mt-1">
                            {rp.base_price > 0
                              ? `${formatRupiah(rp.base_price)} / ${rp.unit}`
                              : 'Harga belum tersedia'}
                          </span>
                        </div>
                        <span
                          className="font-heading font-bold text-text-muted/30 text-xs mt-0.5"
                          style={{ fontVariantNumeric: 'tabular-nums' }}
                        >
                          ({String(index + 1).padStart(2, '0')})
                        </span>
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
