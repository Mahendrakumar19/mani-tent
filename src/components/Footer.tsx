import Link from 'next/link';
import { dictionary } from '@/content/dictionary';

interface FooterProps {
  locale: 'en' | 'hi';
}

export default function Footer({ locale }: FooterProps) {
  const t = dictionary[locale];
  const isHi = locale === 'hi';

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:pr-8">
            <p className="font-playfair text-2xl font-bold text-gold">MANI TENT HOUSE</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/40">
              {isHi ? 'बिलासपुर' : 'Bilaspur'}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/60">
              {isHi
                ? 'विवाह, शादी और पारिवारिक समारोहों के लिए प्रीमियम टेंट, डेकोरेशन, मंडप और स्टेज सेटअप।'
                : 'Premium tent, decoration, mandap and stage setup for weddings and family celebrations.'}
            </p>
          </div>

          {/* Quick links */}
          <nav>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {isHi ? 'लिंक' : 'Links'}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                { href: `/${locale}/about`, label: isHi ? 'हमारे बारे में' : 'About Us' },
                { href: `/${locale}/services`, label: isHi ? 'सेवाएं' : 'Services' },
                { href: `/${locale}/gallery`, label: isHi ? 'गैलरी' : 'Gallery' },
                { href: `/${locale}/contact`, label: isHi ? 'संपर्क' : 'Contact' },
                { href: `/${locale}/booking`, label: isHi ? 'बुकिंग' : 'Booking' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-ivory/65 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {isHi ? 'कानूनी' : 'Legal'}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}/privacy-policy`}
                  className="text-ivory/65 transition-colors hover:text-gold"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/terms`}
                  className="text-ivory/65 transition-colors hover:text-gold"
                >
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {isHi ? 'संपर्क' : 'Contact'}
            </p>
            <ul className="mt-6 space-y-4 text-sm text-ivory/65">
              <li className="leading-relaxed">
                {isHi
                  ? 'हेमू नगर, बंधुआपारा तालाब, तोरवा रोड, तोरवा, बिलासपुर, छत्तीसगढ़ - 495004'
                  : 'Hemu Nagar, Bandhuapara Talab, Torwa Road, Torwa, Bilaspur, Chhattisgarh - 495004'}
              </li>
              <li>
                <a href="tel:+919098888130" className="transition-colors hover:text-gold">
                  +91 90988 88130
                </a>
              </li>
              <li>
                <a href="tel:+917646857765" className="transition-colors hover:text-gold">
                  +91 76468 57765
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 sm:flex-row">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p>{isHi ? 'बिलासपुर, छत्तीसगढ़, भारत' : 'Bilaspur, Chhattisgarh, India'}</p>
        </div>
      </div>
    </footer>
  );
}