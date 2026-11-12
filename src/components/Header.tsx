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
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { href: `/${locale}`, label: locale === 'hi' ? 'होम' : 'Home' },
    { href: `/${locale}/about`, label: locale === 'hi' ? 'हमारे बारे में' : 'About Us' },
    { href: `/${locale}/services`, label: locale === 'hi' ? 'सेवाएं' : 'Services' },
    { href: `/${locale}/gallery`, label: locale === 'hi' ? 'गैलरी' : 'Gallery' },
    { href: `/${locale}/blog`, label: locale === 'hi' ? 'ब्लॉग' : 'Blog' },
    { href: `/${locale}/contact`, label: locale === 'hi' ? 'संपर्क करें' : 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-md shadow-md border-b border-gold/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="font-playfair text-xl md:text-2xl font-bold tracking-wide text-charcoal">
              MANI TENT HOUSE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors relative pb-1 ${
                    isActive ? 'text-gold' : 'text-brown hover:text-gold'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gold rounded-full" />
                  )}
                </Link>
              );
            })}
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-charcoal hover:bg-gold/10"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3 border-t border-gold/20">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-2 text-base font-medium ${
                    isActive ? 'text-gold' : 'text-brown'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}