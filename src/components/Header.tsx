'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  locale: 'en' | 'hi';
}

export default function Header({ locale }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: `/${locale}`, label: locale === 'hi' ? 'होम' : 'Home' },
    { href: `/${locale}/about`, label: locale === 'hi' ? 'हमारे बारे में' : 'About' },
    { href: `/${locale}/services`, label: locale === 'hi' ? 'सेवाएं' : 'Services' },
    { href: `/${locale}/gallery`, label: locale === 'hi' ? 'गैलरी' : 'Gallery' },
    { href: `/${locale}/contact`, label: locale === 'hi' ? 'संपर्क' : 'Contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-charcoal/10 bg-ivory/90 shadow-sm backdrop-blur-xl'
          : 'border-b border-transparent bg-ivory/70 backdrop-blur-md'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Brand */}
          <Link
            href={`/${locale}`}
            className="flex flex-col leading-none transition-opacity hover:opacity-70"
          >
            <span className="font-inter font-bold text-lg tracking-wide text-charcoal md:text-xl">
              MANI TENT HOUSE
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-gold">
              {locale === 'hi' ? 'बिलासपुर' : 'Bilaspur'}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === `/${locale}`
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-gold' : 'text-charcoal/80 hover:text-charcoal'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/booking`}
              className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal shadow-sm transition-all duration-300 hover:bg-gold-dark hover:shadow-md"
            >
              {locale === 'hi' ? 'बुक करें' : 'Book Now'}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded-lg p-2 text-charcoal transition-colors hover:bg-gold/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`grid overflow-hidden transition-all duration-300 ease-out md:hidden ${
            isMobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-1 border-t border-charcoal/10 py-5">
              {navItems.map((item) => {
                const isActive =
                  item.href === `/${locale}`
                    ? pathname === item.href
                    : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive ? 'bg-gold/10 text-gold' : 'text-charcoal hover:bg-charcoal/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={`/${locale}/booking`}
                className="mt-3 block rounded-full bg-gold px-4 py-3 text-center text-base font-semibold text-charcoal"
              >
                {locale === 'hi' ? 'बुक करें' : 'Book Now'}
              </Link>
              <div className="px-4 pt-4">
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
