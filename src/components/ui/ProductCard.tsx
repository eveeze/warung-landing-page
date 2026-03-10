'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatRupiah } from '@/lib/api';
import type { Product } from '@/lib/api';
import { useCart } from '@/lib/cart';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      unit: product.unit,
      basePrice: product.base_price,
      imageUrl: product.image_url,
      pricingTiers: product.pricing_tiers || [],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className="group bg-transparent border border-border hover:border-[var(--color-primary)] transition-colors duration-300 relative flex flex-col justify-between h-full"
    >
      {/* Image / Color Placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-forest-mid border-b border-border">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1] mix-blend-luminosity group-hover:mix-blend-normal"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-500">
            <span className="font-heading font-black text-6xl text-border group-hover:text-[var(--color-accent-contrast)] transition-colors duration-500">
              W.M.
            </span>
          </div>
        )}

        {/* Wholesale badge */}
        {product.pricing_tiers?.length > 0 && (
          <div className="absolute top-0 left-0 bg-[var(--color-accent)] text-[var(--color-accent-contrast)] text-[9px] font-heading font-black px-2 py-1 uppercase tracking-widest">
            Grosir
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleAdd}
          className="absolute bottom-4 right-4 w-10 h-10 bg-[var(--color-accent)] text-[var(--color-accent-contrast)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10"
        >
          {added ? (
            <span className="font-heading font-black text-xs uppercase tracking-widest">
              OK
            </span>
          ) : (
            <span className="font-heading font-black text-xl leading-none">
              +
            </span>
          )}
        </button>
      </div>

      <div className="p-4 md:p-6 flex flex-col justify-between flex-1">
        <div className="flex justify-between items-start gap-4 mb-8">
          <h3 className="font-heading font-black text-lg uppercase tracking-tight leading-tight">
            {product.name}
          </h3>
          <p className="font-heading font-black text-base md:text-lg whitespace-nowrap">
            {formatRupiah(product.base_price)}
          </p>
        </div>

        <div className="flex justify-between items-end border-t border-border/50 pt-4 mt-auto">
          <span className="font-body text-xs text-text-muted uppercase tracking-widest">
            {product.category?.name || 'UMUM'}
          </span>
          <span className="font-serif italic text-xs text-text-muted">
            /{product.unit}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
