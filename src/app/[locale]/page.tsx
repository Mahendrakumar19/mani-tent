import type { Metadata } from 'next';
import Link from 'next/link';
import { noto } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { CONFIRMED_SERVICES } from '@/content/data';
import { generatePageMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import FAQAccordion from '@/components/FAQAccordion';
import Hero from '@/components/Hero';
import Button from '@/components/Button';
import Card from '@/components/Card';

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

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'hi';
  const t = dictionary[locale];

  return (
    <div className={locale === 'hi' ? noto.className : ''}>
      {/* Hero */}
      <Hero locale={locale} />

      {/* Introduction */}
      <Section className="py-16 md:py-24">
        <SectionHeader title={t.intro.title} />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-4">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-charcoal/85">
              {t.intro.body1}
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-charcoal/85">
              {t.intro.body2}
            </p>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-white/60 backdrop-blur-sm">
        <SectionHeader
          eyebrow={locale === 'hi' ? 'सेवाएं' : 'Services'}
          title={t.servicesSection.title}
          subtitle={t.servicesSection.subtitle}
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {CONFIRMED_SERVICES.map((service, index) => (
            <div key={service.id} style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
              <ServiceCard
                title={service.title}
                description={service.shortDescription}
                image={service.image}
                href={`/${locale}/services/${service.slug[locale]}`}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <SectionHeader title={t.whyChooseUs.title} align="center" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.whyChooseUs.reasons.map((reason, index) => (
            <Card
              key={index}
              icon={index + 1}
              title={reason.title}
              description={reason.desc}
            />
          ))}
        </div>
      </Section>

      {/* Decoration Inspiration Gallery */}
      <Section className="bg-charcoal/95 text-white">
        <SectionHeader
          title={t.gallerySection.title}
          subtitle={t.gallerySection.subtitle}
          align="center"
          variant="dark"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-10">
          {CONFIRMED_SERVICES.slice(0, 5).map((service, index) => (
            <div
              key={service.id}
              className="relative h-56 sm:h-64 md:h-80 overflow-hidden rounded-xl group shadow-lg"
            >
              <img
                src={service.image}
                alt={service.title[locale]}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-120"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                <span className="text-sm md:text-base font-semibold text-gold/90">
                  {service.title[locale]}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-white/80 mb-8 text-center">{t.gallerySection.note}</p>
        <div className="flex justify-center">
          <Link
            href={`/${locale}/gallery`}
            className="inline-flex items-center text-gold hover:text-gold/80 hover:gap-3 text-base font-semibold transition-all duration-300 group"
          >
            {t.gallerySection.cta}
            <svg
              className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <SectionHeader title={t.processSection.title} align="center" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {t.processSection.steps.map((step) => (
            <div key={step.num} className="relative group">
              <div className="flex flex-col items-center text-center">
                <span className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 text-charcoal font-playfair font-bold flex items-center justify-center text-xl mb-5 group-hover:from-gold/40 group-hover:to-gold/20 transition-all shadow-md">
                  {step.num}
                </span>
                <h3 className="font-playfair text-lg font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-charcoal/75 leading-relaxed text-center">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section>
        <SectionHeader title={t.locationSection.title} align="center" />
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur rounded-xl p-8 md:p-10 border border-gold/15 shadow-sm">
          <p className="text-base md:text-lg leading-relaxed text-charcoal/80 text-center">
            {t.locationSection.text}
          </p>
        </div>
      </Section>

      {/* Menu Card */}
      <Section className="bg-white/60 backdrop-blur-sm">
        <SectionHeader
          title={t.menuSection.title}
          subtitle={t.menuSection.subtitle}
          align="center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {t.menuSection.categories.map((category, index) => (
            <Card
              key={index}
              title={category.name}
              description={
                <ul className="space-y-2 text-sm">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-charcoal/70 flex items-start gap-2">
                      <span className="text-gold flex-shrink-0 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              }
            />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-white/60 backdrop-blur-sm">
        <SectionHeader title={t.faqSection.title} align="center" />
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={t.faqSection.faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-b from-charcoal/95 to-charcoal text-white text-center">
        <SectionHeader
          title={t.finalCta.title}
          subtitle={t.finalCta.text}
          align="center"
          variant="dark"
        />
        <Button
          href={`/${locale}/contact`}
          variant="primary"
          size="lg"
        >
          {t.finalCta.btn}
        </Button>
      </Section>
    </div>
  );
}