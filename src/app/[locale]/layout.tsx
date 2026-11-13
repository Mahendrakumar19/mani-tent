import type { Metadata } from 'next';
import { noto, playfair } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { generatePageMetadata } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }];
}

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale as 'en' | 'hi';
  const t = dictionary[locale];
  return generatePageMetadata({
    title:
      locale === 'hi'
        ? 'बिलासपुर टेंट हाउस | MANI TENT HOUSE'
        : 'Tent House in Bilaspur | MANI TENT HOUSE',
    description: t.hero.description,
    path: '/',
    locale,
  });
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as 'en' | 'hi';

  return (
    <html
      lang={locale}
      dir={locale === 'hi' ? 'ltr' : 'ltr'}
      className={`${playfair.variable} ${noto.variable}`}
      suppressHydrationWarning
    >
      <body className="font-inter bg-ivory text-charcoal antialiased">
        <Header locale={locale} />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}