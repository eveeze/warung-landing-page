'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import { useCart, generateWhatsAppURL } from '@/lib/cart';
import { calculatePrice, formatRupiah } from '@/lib/api';
import AnimatedButton from '@/components/ui/AnimatedButton';

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isOpen,
    closeCart,
  } = useCart();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleCheckout = () => {
    if (!name.trim()) return;
    const url = generateWhatsAppURL(items, { name, address });
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-forest-deep/80 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-forest-deep border-l border-border shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-8 border-b border-border">
              <div>
                <h2 className="font-heading font-black text-white text-2xl uppercase tracking-tighter">
                  Keranjang
                </h2>
                <span className="text-xs font-heading font-medium text-text-muted tracking-[0.2em] uppercase mt-1 block">
                  {totalItems} item
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-3 text-text-muted hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6">
                    <span className="text-xl opacity-50">🛒</span>
                  </div>
                  <p className="font-heading font-bold text-white text-xl tracking-tight">
                    Keranjang Kosong
                  </p>
                  <p className="text-sm text-text-muted mt-2 font-body">
                    Mulai belanja untuk menambahkan produk.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => {
                      const { pricePerUnit, tierName } = calculatePrice(
                        {
                          base_price: item.basePrice,
                          pricing_tiers: item.pricingTiers,
                        },
                        item.quantity,
                      );
                      const subtotal = pricePerUnit * item.quantity;

                      return (
                        <motion.div
                          key={item.productId}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          className="bg-transparent border-b border-border pb-6 relative group"
                        >
                          <div className="relative z-10">
                            <div className="flex justify-between items-start">
                              <div className="flex-1 min-w-0 pr-4">
                                <h4 className="font-heading font-semibold text-white text-base line-clamp-2 leading-snug tracking-tight">
                                  {item.name}
                                </h4>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <span className="text-[11px] text-text-muted font-body uppercase tracking-wider">
                                    {formatRupiah(pricePerUnit)} / {item.unit}
                                  </span>
                                  {tierName !== 'Harga Dasar' && (
                                    <span className="text-[9px] font-heading font-bold text-black bg-white px-2 py-0.5 uppercase tracking-[0.2em]">
                                      {tierName}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => removeItem(item.productId)}
                                className="p-2 text-text-muted hover:text-white transition-colors"
                              >
                                <Trash2 size={18} strokeWidth={1.5} />
                              </button>
                            </div>

                            {/* Quantity + Subtotal */}
                            <div className="flex items-center justify-between mt-6">
                              <div className="flex items-center bg-transparent border border-border p-1">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.quantity - 1,
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-text-muted"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-10 text-center text-sm font-heading font-bold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.quantity + 1,
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-white transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <span className="font-heading font-medium text-white text-lg">
                                {formatRupiah(subtotal)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Clear All */}
                  <div className="pt-2 flex justify-start">
                    <AnimatedButton
                      onClick={clearCart}
                      className="text-[10px] text-text-muted hover:text-white transition-colors font-heading uppercase tracking-[0.2em] font-medium flex"
                    >
                      Hapus Semua Item
                    </AnimatedButton>
                  </div>
                </div>
              )}
            </div>

            {/* Footer — Checkout */}
            {items.length > 0 && (
              <div className="border-t border-border px-8 py-8 space-y-8 bg-forest-deep">
                {/* Total */}
                <div className="flex items-end justify-between">
                  <span className="text-xs text-text-muted font-heading uppercase tracking-[0.3em] font-medium">
                    Total
                  </span>
                  <span className="text-3xl font-heading font-black text-white leading-none tracking-tighter">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nama Lengkap *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-border px-2 py-3 text-sm font-heading font-medium text-white placeholder:text-text-muted focus:outline-none focus:border-white transition-colors rounded-none"
                  />
                  <input
                    type="text"
                    placeholder="Alamat Pengiriman (Opsional)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-transparent border-b border-border px-2 py-3 text-sm font-heading font-medium text-white placeholder:text-text-muted focus:outline-none focus:border-white transition-colors rounded-none"
                  />
                </div>

                {/* WhatsApp Button */}
                {/* WhatsApp Button */}
                <AnimatedButton
                  as="button"
                  onClick={handleCheckout}
                  disabled={!name.trim()}
                  iconLeft={
                    <MessageCircle
                      size={18}
                      strokeWidth={2}
                      className="relative z-10"
                    />
                  }
                  fillColor="bg-white"
                  className="group w-full flex items-center justify-center gap-3 bg-[#111] border border-white/10 text-white hover:text-black font-heading font-black text-xs tracking-[0.2em] uppercase py-5 transition-colors duration-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#111] disabled:hover:text-white"
                >
                  Checkout via WA
                </AnimatedButton>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
