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
  title: 'Warung Mbah Manto',
  description: 'Belanja Mudah, Harga Bersahabat.',
  keywords: 'warung, kelontong, grosir, eceran, belanja online, whatsapp',
  openGraph: {
    title: 'Warung Mbah Manto',
    description: 'Belanja Mudah, Harga Bersahabat.',
    type: 'website',
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
