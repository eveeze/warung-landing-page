import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/ThemeProvider';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';

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
  metadataBase: new URL('https://warungmanto.store'),
  title: {
    default: 'Warung Mbah Manto | Grosir & Eceran Sembako Terpercaya',
    template: '%s | Warung Mbah Manto',
  },
  description:
    'Warung Mbah Manto melayani kebutuhan belanja harian dan grosir sembako terpercaya sejak 2005. Harga jujur, stok lengkap, dan layanan pesan antar cepat via WhatsApp.',
  keywords: [
    'warung mbah manto',
    'warung manto',
    'grosir sembako',
    'eceran sembako',
    'belanja harian',
    'sembako murah',
    'pesan antar sembako',
    'warung sembako terdekat',
    'kelontong',
    'toko sembako online',
    'belanja online sembako',
  ],
  authors: [{ name: 'Warung Mbah Manto' }],
  creator: 'Warung Mbah Manto',
  publisher: 'Warung Mbah Manto',
  alternates: {
    canonical: 'https://warungmanto.store',
  },
  openGraph: {
    title: 'Warung Mbah Manto | Grosir & Eceran Sembako Terpercaya',
    description:
      'Penuhi kebutuhan harian dan pasokan bisnis Anda dengan standar kualitas terbaik dari Warung Mbah Manto. Buka setiap hari.',
    url: 'https://warungmanto.store',
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
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${interHeading.variable} ${inter.variable} ${playfair.variable} font-body antialiased bg-forest-deep text-text-primary selection:bg-forest selection:text-forest-deep`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <SmoothScrollProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'GroceryStore',
                  '@id': 'https://warungmanto.store/#business',
                  name: 'Warung Mbah Manto',
                  alternateName: 'Warung Manto',
                  description:
                    'Warung grosir dan eceran sembako terpercaya sejak 2005. Melayani kebutuhan belanja harian, bumbu dapur, minuman, dan kebutuhan rumah tangga dengan harga jujur dan stok lengkap.',
                  url: 'https://warungmanto.store',
                  telephone: '+62882006706334',
                  image: 'https://warungmanto.store/opengraph-image',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Jl. Raya',
                    addressLocality: 'Indonesia',
                    addressRegion: 'Jawa',
                    addressCountry: 'ID',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: -7.0,
                    longitude: 110.0,
                  },
                  openingHoursSpecification: {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ],
                    opens: '06:00',
                    closes: '21:00',
                  },
                  priceRange: 'Rp',
                  currenciesAccepted: 'IDR',
                  paymentAccepted: 'Cash, QRIS',
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Katalog Produk',
                    itemListElement: [
                      {
                        '@type': 'OfferCatalog',
                        name: 'Sembako',
                      },
                      {
                        '@type': 'OfferCatalog',
                        name: 'Bumbu Dapur',
                      },
                      {
                        '@type': 'OfferCatalog',
                        name: 'Minuman',
                      },
                      {
                        '@type': 'OfferCatalog',
                        name: 'Kebutuhan Rumah Tangga',
                      },
                    ],
                  },
                  sameAs: [],
                  foundingDate: '2005',
                  areaServed: {
                    '@type': 'GeoCircle',
                    geoMidpoint: {
                      '@type': 'GeoCoordinates',
                      latitude: -7.0,
                      longitude: 110.0,
                    },
                    geoRadius: '10000',
                  },
                }),
              }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'WebSite',
                  '@id': 'https://warungmanto.store/#website',
                  name: 'Warung Mbah Manto',
                  url: 'https://warungmanto.store',
                  publisher: {
                    '@id': 'https://warungmanto.store/#business',
                  },
                  inLanguage: 'id-ID',
                }),
              }}
            />
            <CartProvider>
              <PageTransitionWrapper>{children}</PageTransitionWrapper>
            </CartProvider>
            <Analytics />
            <SpeedInsights />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
