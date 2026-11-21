'use client';

import Link from 'next/link';
import { dictionary } from '@/content/dictionary';

interface FooterProps {
  locale: 'en' | 'hi';
}

export default function Footer({ locale }: FooterProps) {
  const t = dictionary[locale];

  return (
    <footer className="border-t border-gold/20">
      <div className="bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal/98 text-ivory/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-20">
            {/* Brand & Intro */}
            <div>
              <h3 className="font-playfair text-3xl lg:text-4xl font-bold text-gold mb-6 tracking-tight">
                MANI TENT HOUSE
              </h3>
              <p className="text-sm leading-relaxed text-white/80 max-w-xs">
                {locale === 'hi'
                  ? 'हेमू नगर, बंधुआपारा तालाब, तोरवा रोड, तोरवा, बिलासपुर-छत्तीसगढ़-495004'
                  : 'Hemu Nagar, Bandhuapara Talab, Torwa Road, Torwa, Bilaspur-Chhattisgarh-495004'}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:9098888130"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold hover:bg-gold transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z" />
                  </svg>
                  {locale === 'hi' ? '9098888130' : '9098888130'}
                </a>
                <a
                  href="tel:7646857765"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold hover:bg-gold transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z" />
                  </svg>
                  {locale === 'hi' ? '7646857765' : '7646857765'}
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-semibold text-gold mb-5 tracking-wide uppercase text-xs">
                {locale === 'hi' ? 'लिंक' : 'Links'}
              </h4>
              <nav className="space-y-3">
                <Link
                  href={`/${locale}/about`}
                  className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                  {locale === 'hi' ? 'हमारे बारे में' : 'About Us'}
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                  {locale === 'hi' ? 'सेवाएं' : 'Services'}
                </Link>
                <Link
                  href={`/${locale}/gallery`}
                  className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                  {locale === 'hi' ? 'गैलरी' : 'Gallery'}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                  {locale === 'hi' ? 'संपर्क करें' : 'Contact'}
                </Link>
                <Link
                  href={`/${locale}/booking`}
                  className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                  {locale === 'hi' ? 'बुक करें' : 'Book Now'}
                </Link>
              </nav>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-gold mb-5 tracking-wide uppercase text-xs">
                {locale === 'hi' ? 'कानूनी' : 'Legal'}
              </h4>
              <nav className="space-y-3">
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                  {t.footer.privacy}
                </Link>
                <Link
                  href={`/${locale}/terms`}
                  className="text-white/80 hover:text-gold transition-colors duration-300 flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 bg-gold/40 rounded-full"></span>
                  {t.footer.terms}
                </Link>
              </nav>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-12 border-t border-gold/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
              <div>
                <h4 className="text-gold font-semibold mb-3 tracking-wide uppercase text-xs">
                  {locale === 'hi' ? 'पता' : 'Address'}
                </h4>
                <p className="text-white/80 leading-relaxed">
                  {locale === 'hi'
                    ? 'हेमू नगर, बंधुआपारा तालाब, तोरवा रोड, तोरवा, बिलासपुर, छत्तीसगढ़ - 495004'
                    : 'Hemu Nagar, Bandhuapara Talab, Torwa Road, Torwa, Bilaspur, Chhattisgarh - 495004'}
                </p>
              </div>
              <div>
                <h4 className="text-gold font-semibold mb-3 tracking-wide uppercase text-xs">
                  {locale === 'hi' ? 'संपर्क' : 'Contact'}
                </h4>
                <p className="text-white/80 leading-relaxed">
                  <span className="block text-gold">{locale === 'hi' ? 'फोन: ' : 'Phone: '}</span>
                  <a
                    href="tel:9098888130"
                    className="text-white/80 hover:text-gold transition-colors inline-block"
                  >
                    {locale === 'hi' ? '9098888130' : '9098888130'}
                  </a>
                  <span className="text-white/40 mx-1">/</span>
                  <a
                    href="tel:7646857765"
                    className="text-white/80 hover:text-gold transition-colors inline-block"
                  >
                    {locale === 'hi' ? '7646857765' : '7646857765'}
                  </a>
                </p>
              </div>
              <div>
                <h4 className="text-gold font-semibold mb-3 tracking-wide uppercase text-xs">
                  {locale === 'hi' ? 'भाषा' : 'Language'}
                </h4>
                <p className="text-white/80 text-sm mb-3">
                  {locale === 'hi'
                    ? 'अपनी भाषा चुनें:'
                    : 'Choose your language:'}
                </p>
                <button
                  onClick={() => {}}
                  className="px-4 py-2 rounded-full bg-gold text-charcoal font-semibold text-sm hover:bg-gold/90 transition-colors"
                >
                  {locale === 'en' ? 'हिंदी' : 'English'}
                </button>
              </div>
            </div>

            {/* Bottom Rights */}
            <div className="text-center text-xs text-white/40 space-y-2 py-6 border-t border-gold/10">
              <p>© {new Date().getFullYear()} {t.footer.rights}</p>
              <p>
                {locale === 'hi'
                  ? 'बिलासपुर, छत्तीसगढ़, भारत'
                  : 'Bilaspur, Chhattisgarh, India'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
