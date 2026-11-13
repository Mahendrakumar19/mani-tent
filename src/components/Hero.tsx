import Link from 'next/link';
import { dictionary } from '@/content/dictionary';
import Button from './Button';

interface HeroProps {
  locale: 'en' | 'hi';
}

export default function Hero({ locale }: HeroProps) {
  // Animation styles added via tailwind in tailwind.config.ts
  const t = dictionary[locale].hero;

  return (
    <section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden mt-16 md:mt-0">
      {/* Decorative background pattern */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/95 via-charcoal/80 to-charcoal/60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #C6A66B 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40 text-center">
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-gold mb-6 md:mb-8 animate-fade-in">
          {t.eyebrow}
        </p>
        <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 md:mb-8 animate-fade-in-delay">
          {t.heading}
        </h1>
        <p className="font-playfair text-lg md:text-2xl lg:text-3xl text-ivory italic mb-6 md:mb-10 animate-fade-in-delay-2">
          {t.subheading}
        </p>
        <p className="max-w-3xl mx-auto text-sm md:text-lg lg:text-xl text-white leading-relaxed mb-10 md:mb-14 animate-fade-in-delay-3">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-fade-in-delay-4 w-full sm:w-auto">
          <Button
            href={`/${locale}/contact`}
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
          >
            {t.primaryCta}
          </Button>
          <Button
            href={`/${locale}/services`}
            variant="secondary"
            size="md"
            className="w-full sm:w-auto"
          >
            {t.secondaryCta}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/40 hidden sm:block animate-pulse">
        <svg
          className="w-6 h-6 animate-bounce"
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