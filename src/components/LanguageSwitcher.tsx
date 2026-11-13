'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale: 'en' | 'hi';
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Replace /en with /hi or vice versa while maintaining sub-route
  const getTargetUrl = (targetLang: 'en' | 'hi') => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLang}`;

    if (segments[0] === 'en' || segments[0] === 'hi') {
      segments[0] = targetLang;
    } else {
      segments.unshift(targetLang);
    }
    return `/${segments.join('/')}`;
  };

  return (
    <div className="inline-flex items-center bg-charcoal/10 rounded-full p-1 border border-gold/30">
      <Link
        href={getTargetUrl('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
          currentLocale === 'en'
            ? 'bg-gold text-charcoal shadow-sm'
            : 'text-charcoal hover:text-gold'
        }`}
      >
        English
      </Link>
      <Link
        href={getTargetUrl('hi')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${
          currentLocale === 'hi'
            ? 'bg-gold text-charcoal shadow-sm'
            : 'text-charcoal hover:text-gold'
        }`}
      >
        हिंदी
      </Link>
    </div>
  );
}
