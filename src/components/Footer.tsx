import Link from 'next/link';
import { dictionary } from '../content/dictionary';

interface FooterProps {
  locale: 'en' | 'hi';
}

export default function Footer({ locale }: FooterProps) {
  const t = dictionary[locale];

  return (
    <footer className="bg-charcoal text-ivory/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-playfair text-2xl font-bold text-gold mb-4">
              MANI TENT HOUSE
            </h3>
            <p className="text-sm leading-relaxed text-ivory/70">
              {t.footer.disclaimer}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-end gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gold mb-3">
                {locale === 'hi' ? 'लिंक' : 'Links'}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/${locale}/about`} className="hover:text-gold transition-colors">
                    {locale === 'hi' ? 'हमारे बारे में' : 'About Us'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/services`} className="hover:text-gold transition-colors">
                    {locale === 'hi' ? 'सेवाएं' : 'Services'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/gallery`} className="hover:text-gold transition-colors">
                    {locale === 'hi' ? 'गैलरी' : 'Gallery'}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/contact`} className="hover:text-gold transition-colors">
                    {locale === 'hi' ? 'संपर्क करें' : 'Contact'}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gold mb-3">
                {locale === 'hi' ? 'कानूनी' : 'Legal'}
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/${locale}/privacy-policy`} className="hover:text-gold transition-colors">
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/terms`} className="hover:text-gold transition-colors">
                    {t.footer.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gold/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm">
            <div>
              <h4 className="text-gold font-semibold mb-2">{locale === 'hi' ? 'पता' : 'Address'}</h4>
              <p className="text-ivory/70">{t.address}</p>
            </div>
            <div>
              <h4 className="text-gold font-semibold mb-2">{locale === 'hi' ? 'संपर्क' : 'Contact'}</h4>
              <p className="text-ivory/70">
                {locale === 'hi' ? 'फोन: ' : 'Phone: '}
                <a href="tel:9098888130" className="hover:text-gold transition-colors">{t.phone1}</a>
                {' / '}
                <a href="tel:7646857765" className="hover:text-gold transition-colors">{t.phone2}</a>
              </p>
            </div>
          </div>
          <div className="text-center text-xs text-ivory/50 border-t border-gold/20 pt-6">
            <p>{t.footer.rights}</p>
            <p className="mt-2">
              {locale === 'hi'
                ? 'बिलासपुर, छत्तीसगढ़, भारत'
                : 'Bilaspur, Chhattisgarh, India'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}