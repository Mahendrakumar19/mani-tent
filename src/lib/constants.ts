export const BRAND = {
  name: 'MANI TENT HOUSE',
  location: 'Bilaspur, Chhattisgarh',
  country: 'India',
  taglineEn: 'We Create Celebrations. You Create Memories.',
  taglineHi: 'हर जश्न को बनाएं यादगार।',
} as const;

export const COLORS = {
  charcoal: '#191714',
  gold: '#C6A66B',
  ivory: '#F7F3EB',
  beige: '#E8DFD0',
  brown: '#40352C',
  goldMuted: '#9C8050',
  white: '#FFFFFF',
} as const;

export const SUPPORTED_LOCALES = ['en', 'hi'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const SERVICES = [
  'wedding-tent-setup',
  'wedding-decoration',
  'mandap-decoration',
  'stage-decoration',
  'reception-decoration',
] as const;

export const SERVICE_SLUGS = {
  en: ['wedding-tent-house', 'wedding-decoration', 'mandap-decoration', 'stage-decoration', 'reception-decoration'],
  hi: ['wedding-tent-house', 'wedding-decoration', 'mandap-decoration', 'stage-decoration', 'reception-decoration'],
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://manitenthouse.in';