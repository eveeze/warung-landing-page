// API Types
export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface PricingTier {
  name: string | null;
  min_quantity: number;
  max_quantity: number | null;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  unit: string;
  base_price: number;
  image_url: string | null;
  category: { id: string; name: string } | null;
  pricing_tiers: PricingTier[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  per_page: number;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'https://api.warungmanto.store';

export async function fetchProducts(params?: {
  search?: string;
  categoryId?: string;
  page?: number;
  perPage?: number;
}): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  if (params?.search) query.set('search', params.search);
  if (params?.categoryId) query.set('category_id', params.categoryId);
  query.set('page', String(params?.page || 1));
  query.set('per_page', String(params?.perPage || 20));

  const res = await fetch(`${API_BASE}/public/products?${query}`);
  const json = await res.json();
  return json.data;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/public/categories`);
  const json = await res.json();
  return json.data;
}

// Pricing logic
export function calculatePrice(
  product: { base_price: number; pricing_tiers: PricingTier[] },
  quantity: number,
): { pricePerUnit: number; tierName: string } {
  if (!product.pricing_tiers || product.pricing_tiers.length === 0) {
    return { pricePerUnit: product.base_price, tierName: 'Harga Dasar' };
  }

  const sorted = [...product.pricing_tiers].sort(
    (a, b) => b.min_quantity - a.min_quantity,
  );

  for (const tier of sorted) {
    if (quantity >= tier.min_quantity) {
      if (tier.max_quantity !== null && quantity > tier.max_quantity) continue;
      return {
        pricePerUnit: tier.price,
        tierName: tier.name || 'Tier',
      };
    }
  }

  return { pricePerUnit: product.base_price, tierName: 'Harga Dasar' };
}

export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}
