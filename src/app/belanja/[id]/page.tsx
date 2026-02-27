'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fetchProductById } from '@/lib/api';
import type { Product } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/lib/cart';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
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
    }
  }, [id]);

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

  return (
    <>
      <Navbar />
      <main className="min-h-[150vh] bg-black text-white relative flex flex-col md:flex-row">
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
            <div className="absolute inset-0 bg-gradient-to-br from-forest-light via-black to-forest-mid" />
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

        {/* Right Side: Massive Typography & Details */}
        <div className="w-full md:w-1/2 px-6 md:px-16 lg:px-24 pt-12 md:pt-[30vh] pb-32 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="text-[10px] text-text-muted font-heading font-bold uppercase tracking-widest mb-6">
              Katalog {`//`} {product.id.slice(0, 8)}
            </div>

            <h1 className="font-heading font-medium text-[clamp(3.5rem,6vw,6rem)] leading-[0.9] tracking-tighter mb-8">
              {product.name}
            </h1>

            <p className="font-serif text-lg md:text-xl text-text-muted leading-relaxed mb-12 max-w-lg">
              Kami jamin kualitas dan kesegaran setiap produk yang kami jual.
              {product.name} tersedia untuk pembelian eceran maupun grosir
              dengan harga terbaik langsung dari Warung Mbah Manto.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 border-t border-border/30 pt-8">
              <span className="font-heading font-bold text-3xl md:text-4xl">
                Rp {product.base_price.toLocaleString('id-ID')}
              </span>

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
                    1,
                  );
                  openCart();
                }}
                className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-heading font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                + Tambah ke Keranjang
              </button>
            </div>

            {/* Fake editorial specs */}
            <div className="mt-24 grid grid-cols-2 gap-y-8 border-t border-border/30 pt-8 text-xs font-heading tracking-widest uppercase">
              <div>
                <span className="block text-text-muted mb-2">Ketersediaan</span>
                <span className="font-bold">Gudang Utama</span>
              </div>
              <div>
                <span className="block text-text-muted mb-2">
                  Estimasi Kirim
                </span>
                <span className="font-bold">Same Day / 24 Jam</span>
              </div>
              <div>
                <span className="block text-text-muted mb-2">Kualitas</span>
                <span className="font-bold">Grade A Premium</span>
              </div>
              <div>
                <span className="block text-text-muted mb-2">Supplier</span>
                <span className="font-bold">Petani / Pabrik Langsung</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
