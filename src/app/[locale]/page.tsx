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
            <p className="text-base md:text-lg leading-relaxed text-charcoal/70">
              {t.intro.body1}
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-base md:text-lg leading-relaxed text-charcoal/70">
              {t.intro.body2}
            </p>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-beige/40">
        <SectionHeader
          eyebrow={locale === 'hi' ? 'सेवाएं' : 'Services'}
          title={t.servicesSection.title}
          subtitle={t.servicesSection.subtitle}
          align="center"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {CONFIRMED_SERVICES.map((service, index) => (
            <div key={service.id} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
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
      <Section className="bg-charcoal text-ivory">
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
              className="relative h-56 sm:h-64 md:h-80 overflow-hidden rounded-2xl group"
            >
              <img
                src={service.image}
                alt={service.title[locale]}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4 md:p-6">
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
        <div className="mx-auto grid max-w-5xl sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {t.processSection.steps.map((step) => (
            <div key={step.num} className="group text-center">
              <span className="mx-auto mb-5 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gold/10 font-inter font-bold text-xl text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-charcoal">
                {step.num}
              </span>
              <h3 className="font-inter font-semibold text-lg text-charcoal mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-charcoal/65 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section>
        <SectionHeader title={t.locationSection.title} align="center" />
        <div className="mx-auto max-w-3xl rounded-3xl border border-gold/20 bg-white/60 p-8 md:p-10 shadow-sm backdrop-blur">
          <p className="text-base md:text-lg leading-relaxed text-charcoal/70 text-center">
            {t.locationSection.text}
          </p>
        </div>
      </Section>

      {/* Menu Card */}
      <Section className="bg-beige/40">
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
      <Section className="bg-beige/40">
        <SectionHeader title={t.faqSection.title} align="center" />
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={t.faqSection.faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-charcoal text-ivory text-center">
        <SectionHeader
          title={t.finalCta.title}
          subtitle={t.finalCta.text}
          align="center"
          variant="dark"
        />
        <Button
          href={`/${locale}/booking`}
          variant="primary"
          size="lg"
        >
          {t.finalCta.btn}
        </Button>
      </Section>
    </div>
  );
}