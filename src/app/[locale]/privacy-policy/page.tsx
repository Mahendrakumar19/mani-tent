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
        ? 'गोपनीयता नीति | MANI TENT HOUSE'
        : 'Privacy Policy | MANI TENT HOUSE',
    description:
      locale === 'hi'
        ? 'MANI TENT HOUSE की गोपनीयता नीति देखें। हम आपकी जानकारी कैसे संभालते हैं।'
        : 'Read MANI TENT HOUSE privacy policy. Learn how we handle your information.',
    path: '/privacy-policy',
    locale,
  });
}

export default function PrivacyPolicyPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as 'en' | 'hi';
  const t = dictionary[locale].privacyPolicy;

  return (
    <div className={locale === 'hi' ? noto.className : ''}>
      {/* Breadcrumbs */}
      <Section className="py-8 md:py-10">
        <Breadcrumbs
          locale={locale}
          crumbs={[
            {
              label: locale === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy',
              href: `/${locale}/privacy-policy`,
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
              <h2 className="font-inter font-semibold text-2xl text-charcoal mb-4">
                {section.heading}
              </h2>
              <p className="text-base leading-relaxed text-charcoal/90">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Last Updated */}
      <Section className="bg-white/50 backdrop-blur-sm border-y border-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-charcoal/60">
            {locale === 'hi'
              ? 'अंतिम अपडेट: 15 नवंबर 2026'
              : 'Last updated: November 15, 2026'}
          </p>
        </div>
      </Section>
    </div>
  );
}