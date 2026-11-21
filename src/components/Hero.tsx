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
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    containerRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => containerRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden mt-16 md:mt-0"
      aria-labelledby="hero-heading"
    >
      {/* Deep charcoal background with subtle gold texture */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal/80"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #C6A66B 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Animated ambient glow orbs following mouse */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/15 rounded-full blur-[120px] mix-blend-overlay animate-float-slow"
          style={{
            transform: `translate(-25%, -25%) translate(${mousePos.x * 40 - 20}px, ${mousePos.y * 40 - 20}px)`,
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/8 rounded-full blur-[100px] mix-blend-overlay animate-float"
          style={{
            transform: `translate(25%, 25%) translate(${mousePos.x * -30 + 15}px, ${mousePos.y * -30 + 15}px)`,
          }}
          aria-hidden="true"
        />
        {/* Third smaller glow */}
        <div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[80px] mix-blend-overlay animate-float-slow"
          style={{
            transform: `translate(-50%, -50%) translate(${mousePos.x * 20 - 10}px, ${mousePos.y * 20 - 10}px)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(198,166,107,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(198,166,107,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-40 text-center">
        <p
          className={`text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-gold mb-6 md:mb-8 ${
            isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-4'
          }`}
        >
          {t.eyebrow}
        </p>
        <h1
          id="hero-heading"
          className={`font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6 md:mb-8 tracking-tight ${
            isVisible ? 'animate-fade-in-delay' : 'opacity-0 translate-y-6'
          }`}
        >
          {t.heading}
        </h1>
        <p
          className={`font-playfair text-lg md:text-2xl lg:text-3xl text-gold/90 italic mb-6 md:mb-10 ${
            isVisible ? 'animate-fade-in-delay-2' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.subheading}
        </p>
        <p
          className={`max-w-3xl mx-auto text-sm md:text-lg lg:text-xl text-ivory/90 leading-relaxed mb-10 md:mb-14 ${
            isVisible ? 'animate-fade-in-delay-3' : 'opacity-0 translate-y-8'
          }`}
        >
          {t.description}
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-fade-in-delay-4 w-full sm:w-auto ${
            isVisible ? 'animate-fade-in-delay-4' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button
            href={`/${locale}/booking`}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t.bookNow}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-gold-glow to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button
            href={`/${locale}/services`}
            variant="gold"
            size="lg"
            className="w-full sm:w-auto"
          >
            {t.secondaryCta}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Scroll indicator with bounce */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/50 hidden sm:block">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <svg
            className="w-6 h-6 text-gold/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="text-xs font-medium tracking-widest uppercase text-white/40">
            {locale === 'hi' ? 'नीचे स्क्रॉल करें' : 'Scroll to Explore'}
          </span>
        </div>
      </div>
    </section>
  );
}