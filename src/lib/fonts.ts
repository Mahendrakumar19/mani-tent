import { Inter, Noto_Sans_Devanagari } from 'next/font/google';

/**
 * Brand typography:
 *  - Inter              -> English headings + body copy
 *  - Noto Sans Devanagari -> Hindi headings and body
 */
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