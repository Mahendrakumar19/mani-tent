import { Inter, Playfair_Display, Noto_Sans_Devanagari } from 'next/font/google';

/**
 * Brand typography:
 *  - Playfair Display    -> English headings (elegant serif)
 *  - Inter               -> English body copy
 *  - Noto Sans Devanagari -> Hindi headings and body
 */
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const noto = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
});