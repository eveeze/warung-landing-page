'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { calculatePrice, formatRupiah, type PricingTier } from './api';

export interface CartItem {
  productId: string;
  name: string;
  unit: string;
  basePrice: number;
  imageUrl: string | null;
  pricingTiers: PricingTier[];
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CART_KEY = 'warung_cart';
const CartContext = createContext<CartContextType | null>(null);

function getStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return [];

  try {
    // Specifically handle the case where stored might be literally the string "undefined" or "[object Object]"
    if (
      stored === 'undefined' ||
      stored === 'null' ||
      stored.startsWith('[object')
    ) {
      localStorage.removeItem(CART_KEY);
      return [];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Silently handle the JSON parse error instead of crashing/spamming console
    // This happens if the user's localStorage gets corrupted with non-JSON string data
    localStorage.removeItem(CART_KEY);
    return [];
  }
}

function storeCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(getStoredCart());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) storeCart(items);
  }, [items, mounted]);

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [...prev, { ...item, quantity }];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const { pricePerUnit } = calculatePrice(
      { base_price: item.basePrice, pricing_tiers: item.pricingTiers },
      item.quantity,
    );
    return sum + pricePerUnit * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((v) => !v),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function generateWhatsAppURL(
  cartItems: CartItem[],
  customerInfo: { name: string; address?: string },
  waNumber = '6281234567890',
): string {
  let message = 'Halo Warung Manto! 👋\nSaya ingin memesan:\n\n';
  let grandTotal = 0;

  cartItems.forEach((item, index) => {
    const { pricePerUnit, tierName } = calculatePrice(
      { base_price: item.basePrice, pricing_tiers: item.pricingTiers },
      item.quantity,
    );
    const subtotal = pricePerUnit * item.quantity;
    grandTotal += subtotal;
    const tierLabel = tierName !== 'Harga Dasar' ? ` (${tierName})` : '';
    message += `${index + 1}. ${item.name} x${item.quantity}${tierLabel} — ${formatRupiah(subtotal)}\n`;
  });

  message += `\n*Total: ${formatRupiah(grandTotal)}*\n`;
  if (customerInfo.name) message += `\nNama: ${customerInfo.name}`;
  if (customerInfo.address) message += `\nAlamat: ${customerInfo.address}`;

  return `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`;
}
