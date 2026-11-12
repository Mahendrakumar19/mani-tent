import type { Metadata } from 'next';
import { SITE_URL } from './constants';

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  locale: 'en' | 'hi';
  image?: string;
  type?: 'website' | 'article';
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  image = '/images/og-default.jpg',
  type = 'website',
}: SEOProps): Metadata {
  const currentPath = path === '/' ? '' : path;
  const currentUrl = `${SITE_URL}/${locale}${currentPath}`;
  const enUrl = `${SITE_URL}/en${currentPath}`;
  const hiUrl = `${SITE_URL}/hi${currentPath}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: currentUrl,
      languages: {
        en: enUrl,
        hi: hiUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: 'MANI TENT HOUSE',
      locale: locale === 'hi' ? 'hi_IN' : 'en_IN',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MANI TENT HOUSE',
    description: 'Premium Wedding Tent & Decoration Services in Bilaspur, Chhattisgarh',
    url: SITE_URL,
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Bilaspur, Chhattisgarh, India',
      },
    ],
    knowsAbout: [
      'Wedding tent setup',
      'Wedding decoration',
      'Mandap decoration',
      'Stage decoration',
      'Reception decoration',
    ],
  };
}