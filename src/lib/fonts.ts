import { Inter, Playfair_Display, Noto_Sans_Devanagari } from 'next/font/google';

/**
 * Brand typography:
 *  - Playfair Display  -> English display headings
 *  - Inter              -> English body copy
 *  - Noto Sans Devanagari -> Hindi headings and body
 */
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const noto = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto',
  display: 'swap',
});