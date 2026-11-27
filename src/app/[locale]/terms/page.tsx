import type { Metadata } from 'next';
import { noto } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { generatePageMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale as 'en' | 'hi';
  return generatePageMetadata({
    title:
      locale === 'hi'
        ? 'नियम एवं शर्तें | MANI TENT HOUSE'
        : 'Terms & Conditions | MANI TENT HOUSE',
    description:
      locale === 'hi'
        ? 'MANI TENT HOUSE के नियम और शर्तें पढ़ें।'
        : 'Read MANI TENT HOUSE terms and conditions.',
    path: '/terms',
    locale,
  });
}

export default function TermsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as 'en' | 'hi';
  const t = dictionary[locale].terms;

  return (
    <div className={locale === 'hi' ? noto.className : ''}>
      {/* Breadcrumbs */}
      <Section className="py-8 md:py-10">
        <Breadcrumbs
          locale={locale}
          crumbs={[
            {
              label: locale === 'hi' ? 'नियम एवं शर्तें' : 'Terms & Conditions',
              href: `/${locale}/terms`,
            },
          ]}
        />
      </Section>

      {/* Header */}
      <Section className="bg-white/60 backdrop-blur-sm">
        <SectionHeader
          title={t.title}
          subtitle={t.subtitle}
          align="center"
        />
      </Section>

      {/* Content */}
      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          {t.sections.map((section, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur rounded-2xl p-8 border border-gold/15 shadow-sm"
            >
              <h2 className="font-playfair font-semibold text-2xl text-charcoal mb-4">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-charcoal/90">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Agreement */}
      <Section className="bg-charcoal text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-base leading-relaxed text-ivory/90 mb-6">
            {locale === 'hi'
              ? 'इस वेबसाइट का उपयोग करके आप इन नियमों और शर्तों से सहमत होते हैं।'
              : 'By using this website, you agree to these terms and conditions.'}
          </p>
          <p className="text-sm text-gold font-semibold">
            {locale === 'hi'
              ? 'MANI TENT HOUSE, बिलासपुर, छत्तीसगढ़'
              : 'MANI TENT HOUSE, Bilaspur, Chhattisgarh'}
          </p>
        </div>
      </Section>
    </div>
  );
}