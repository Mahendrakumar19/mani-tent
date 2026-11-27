'use client';

import { dictionary } from '@/content/dictionary';
import Button from './Button';
import { useEffect, useRef, useState } from 'react';

interface HeroProps {
  locale: 'en' | 'hi';
}

export default function Hero({ locale }: HeroProps) {
  const t = dictionary[locale].hero;
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[88vh] md:min-h-screen flex items-center overflow-hidden bg-charcoal"
      aria-labelledby="hero-heading"
    >
      {/* Warm charcoal gradient base */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#2A251F_0%,#191714_45%,#121110_100%)]"
        aria-hidden="true"
      />

      {/* Single soft gold halo — subtle, not distracting */}
      <div
        className="absolute -top-1/4 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[130px] transition-transform duration-[1200ms] ease-out"
        style={{
          transform: `translate(calc(-50% + ${(mousePos.x - 0.5) * 40}px), ${(mousePos.y - 0.5) * 24}px)`,
        }}
        aria-hidden="true"
      />

      {/* Fine grain texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-24 md:py-32 text-center">
        <p
          className={`mb-7 text-[11px] md:text-xs font-semibold uppercase tracking-[0.35em] text-gold/90 transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {t.eyebrow}
        </p>

        <h1
          id="hero-heading"
          className={`font-playfair font-semibold text-[2.6rem] leading-[1.08] sm:text-6xl md:text-7xl lg:text-[5.2rem] font-bold text-ivory tracking-[-0.02em] transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '80ms' }}
        >
          {t.heading}
        </h1>

        <p
          className={`mx-auto mt-7 max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed text-ivory/70 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {t.description}
        </p>

        <div
          className={`mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '320ms' }}
        >
          <Button href={`/${locale}/booking`} variant="primary" size="lg" className="w-full sm:w-auto">
            {t.bookNow}
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
          <Button href={`/${locale}/services`} variant="secondary" size="lg" className="w-full sm:w-auto">
            {t.secondaryCta}
          </Button>
        </div>

        {/* Trust line instead of flashy scroll cue */}
        <p
          className={`mt-14 text-[11px] uppercase tracking-[0.25em] text-ivory/35 transition-opacity duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '520ms' }}
        >
          {locale === 'hi' ? 'बिलासपुर • छत्तीसगढ़' : 'Bilaspur • Chhattisgarh'}
        </p>
      </div>
    </section>
  );
}
