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

export default function ServiceCard({ title, description, image, href, locale }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white/95 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border border-gold/20 hover:border-gold/40 hover:-translate-y-2 hover:shadow-gold/20"
      style={cardStyles}
    >
      <div className="relative h-64 sm:h-56 md:h-64 overflow-hidden">
        <Image
          src={image}
          alt={title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent group-hover:from-charcoal/90 transition-opacity duration-500" />
        {/* Gold accent line at bottom of image */}
        <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6 sm:p-5 md:p-6 relative">
        <h3 className="font-playfair text-lg sm:text-xl font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {title[locale]}
        </h3>
        <p className="text-sm text-charcoal/75 line-clamp-3 mb-4 leading-relaxed">
          {description[locale]}
        </p>
        <span className="inline-flex items-center text-sm font-semibold text-gold group-hover:text-gold/80 transition-colors group-hover:translate-x-1">
          {locale === 'hi' ? 'सेवा देखें' : 'Explore Service'}
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}