import Link from 'next/link';
import { dictionary } from '../content/dictionary';

interface FooterProps {
  locale: 'en' | 'hi';
}

export default function Footer({ locale }: FooterProps) {
  const t = dictionary[locale];

  return (
    <footer className="bg-charcoal/95 text-ivory/90 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-gold mb-6">
              MANI TENT HOUSE
            </h3>
            <p className="text-sm leading-relaxed text-white pr-4">
              {t.footer.disclaimer}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center gap-12 sm:gap-6 md:gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gold mb-4 tracking-wide uppercase">
                {locale === 'hi' ? 'लिंक' : 'Links'}
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href={`/${locale}/about`} className="text-white hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold transition-colors"></span>
                    {locale === 'hi' ? 'हमारे बारे में' : 'About Us'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/services`} className="text-white hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold transition-colors"></span>
                    {locale === 'hi' ? 'सेवाएं' : 'Services'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/gallery`} className="text-white hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold transition-colors"></span>
                    {locale === 'hi' ? 'गैलरी' : 'Gallery'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="text-white hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold transition-colors"></span>
                    {locale === 'hi' ? 'संपर्क करें' : 'Contact'}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gold mb-4 tracking-wide uppercase">
                {locale === 'hi' ? 'कानूनी' : 'Legal'}
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href={`/${locale}/privacy-policy`} className="text-white hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold transition-colors"></span>
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/terms`} className="text-white hover:text-gold transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gold/50 rounded-full group-hover:bg-gold transition-colors"></span>
                    {t.footer.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-10 border-t border-gold/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 text-sm">
            <div className="flex-1">
              <h4 className="text-gold font-semibold mb-3 tracking-wide uppercase text-xs">{locale === 'hi' ? 'पता' : 'Address'}</h4>
              <p className="text-white leading-relaxed">{t.address}</p>
            </div>
            <div className="flex-1">
              <h4 className="text-gold font-semibold mb-3 tracking-wide uppercase text-xs">{locale === 'hi' ? 'संपर्क' : 'Contact'}</h4>
              <p className="text-white leading-relaxed">
                <span className="block">{locale === 'hi' ? 'फोन: ' : 'Phone: '}</span>
                <a href="tel:9098888130" className="text-white hover:text-gold transition-colors inline-block">{t.phone1}</a>
                <span className="text-white/60 mx-1">/</span>
                <a href="tel:7646857765" className="text-white hover:text-gold transition-colors inline-block">{t.phone2}</a>
              </p>
            </div>
            <div className="flex-1">
              <h4 className="text-gold font-semibold mb-3 tracking-wide uppercase text-xs">{locale === 'hi' ? 'सीधे संपर्क करें' : 'Get in Touch'}</h4>
              <p className="text-white text-sm">
                {locale === 'hi' ? 'बुक लें और आसां' : "Let's discuss your event needs"}
              </p>
            </div>
          </div>
          <div className="text-center text-xs text-white/50 space-y-2 py-6">
            <p>© {new Date().getFullYear()} {t.footer.rights}</p>
            <p>
              {locale === 'hi'
                ? 'बिलासपुर, छत्तीसगढ, भारत'
                : 'Bilaspur, Chhattisgarh, India'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}