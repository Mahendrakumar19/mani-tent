import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';

// CSS for subtle stagger effect on multiple cards
const cardStyles: CSSProperties = {
  transitionDelay: 'var(--delay, 0ms)',
};

interface ServiceCardProps {
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  image: string;
  href: string;
  locale: 'en' | 'hi';
}

// This component provides a polished service card with improved spacing, hover effects,
// and better visual hierarchy for the services section
// Features Apple-inspired glassmorphism with subtle frost effects

export default function ServiceCard({ title, description, image, href, locale }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white/80 backdrop-blur rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gold/15 hover:border-gold/30 hover:translate-y-[-4px]"
      style={cardStyles}
    >
      <div className="relative h-64 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={image}
          alt={title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
      </div>
      <div className="p-6 sm:p-5 md:p-6">
        <h3 className="font-playfair text-lg sm:text-xl font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors line-clamp-2">
          {title[locale]}
        </h3>
        <p className="text-sm text-charcoal/75 line-clamp-3 mb-4 leading-relaxed">
          {description[locale]}
        </p>
        <span className="inline-flex items-center text-sm font-semibold text-gold group-hover:text-gold/80 transition-colors">
          {locale === 'hi' ? 'सेवा देखें' : 'Explore Service'}
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}