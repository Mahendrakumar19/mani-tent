import Link from 'next/link';
import { dictionary } from '@/content/dictionary';

interface HeroProps {
  locale: 'en' | 'hi';
}

export default function Hero({ locale }: HeroProps) {
  const t = dictionary[locale].hero;

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/75 to-charcoal/50"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #C6A66B 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
        <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-gold mb-6">
          {t.eyebrow}
        </p>
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
          {t.heading}
        </h1>
        <p className="font-playfair text-xl md:text-2xl text-gold/90 italic mb-6">
          {t.subheading}
        </p>
        <p className="max-w-3xl mx-auto text-base md:text-lg text-ivory/85 leading-relaxed mb-10">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold text-charcoal font-semibold text-base hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20"
          >
            {t.primaryCta}
          </Link>
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-ivory/70 text-white font-semibold text-base hover:bg-white/10 transition-colors"
          >
            {t.secondaryCta}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/50">
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}