import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const interHeading = Inter({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Warung Mbah Manto | Grosir & Eceran Sembako Terpercaya',
  description:
    'Warung Mbah Manto melayani kebutuhan belanja harian dan grosir sembako terpercaya sejak 2014. Harga jujur, stok lengkap, dan layanan pesan antar cepat via WhatsApp.',
  keywords:
    'warung, kelontong, grosir sembako, eceran, belanja harian, sembako murah, pesan antar sembako, warung sembako terdekat',
  authors: [{ name: 'Warung Mbah Manto' }],
  openGraph: {
    title: 'Warung Mbah Manto | Grosir & Eceran Sembako Terpercaya',
    description:
      'Penuhi kebutuhan harian dan pasokan bisnis Anda dengan standar kualitas terbaik dari Warung Mbah Manto. Buka setiap hari.',
    url: 'https://warungmbahmanto.com',
    siteName: 'Warung Mbah Manto',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warung Mbah Manto | Grosir Sembako',
    description:
      'Belanja harian jadi mudah, harga grosir untuk semua kalangan.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth bg-black text-white">
      <body
        className={`${interHeading.variable} ${inter.variable} ${playfair.variable} font-body antialiased bg-black selection:bg-white selection:text-black`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
