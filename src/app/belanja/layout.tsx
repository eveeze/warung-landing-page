import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Katalog Belanja',
  description:
    'Jelajahi katalog lengkap produk sembako, bumbu dapur, minuman, dan kebutuhan rumah tangga dari Warung Mbah Manto. Harga grosir dan eceran transparan.',
  alternates: {
    canonical: 'https://warungmanto.store/belanja',
  },
  openGraph: {
    title: 'Katalog Belanja | Warung Mbah Manto',
    description:
      'Koleksi lengkap kebutuhan harian dan pasokan bisnis dengan standar kualitas terbaik.',
    url: 'https://warungmanto.store/belanja',
  },
};

export default function BelanjaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
