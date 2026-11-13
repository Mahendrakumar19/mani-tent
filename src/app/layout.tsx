import type { Metadata } from 'next';
import { inter, playfair, noto } from '@/lib/fonts';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'MANI TENT HOUSE | Wedding Tent & Decoration in Bilaspur',
  description:
    'Premium wedding tent setup, wedding decoration, mandap, stage and reception decoration services by MANI TENT HOUSE in Bilaspur, Chhattisgarh.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://manitenthouse.in'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      hi: '/hi',
      'x-default': '/en',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${noto.variable}`}
      suppressHydrationWarning
    >
      <body className="font-inter bg-ivory text-charcoal antialiased">{children}</body>
    </html>
  );
}