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
      <Section className="bg-gradient-to-b from-transparent via-ivory/20 to-transparent">
        <SectionHeader title={t.intro.title} />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          <div className="space-y-4">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-brown/85">
              {t.intro.body1}
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-brown/85">
              {t.intro.body2}
            </p>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-ivory">
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
            <div
              key={index}
              className="bg-white rounded-xl p-7 sm:p-6 md:p-8 border border-beige/50 shadow-md hover:shadow-xl hover:border-gold/30 transition-all duration-300 group hover:translate-y-[-4px]"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                <span className="text-gold font-playfair text-2xl font-bold">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors">
                {reason.title}
              </h3>
              <p className="text-sm text-brown/75 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Decoration Inspiration Gallery */}
      <Section className="bg-charcoal/95 text-ivory">
        <SectionHeader
          title={t.gallerySection.title}
          subtitle={t.gallerySection.subtitle}
          align="center"
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
        <p className="text-sm text-ivory/50 mb-8 text-center">{t.gallerySection.note}</p>
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
      <Section className="bg-ivory">
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
              <p className="text-sm text-brown/75 leading-relaxed text-center">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section>
        <SectionHeader title={t.locationSection.title} align="center" />
        <div className="max-w-3xl mx-auto bg-gold/3 rounded-xl p-8 md:p-10 border border-gold/20">
          <p className="text-base md:text-lg leading-relaxed text-brown/80 text-center">
            {t.locationSection.text}
          </p>
        </div>
      </Section>

      {/* Menu Card */}
      <Section className="bg-ivory">
        <SectionHeader
          title={t.menuSection.title}
          subtitle={t.menuSection.subtitle}
          align="center"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {t.menuSection.categories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-7 md:p-8 border border-beige/50 shadow-md hover:shadow-xl hover:border-gold/30 transition-all duration-300 group hover:translate-y-[-4px]">
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-6 group-hover:text-gold transition-colors">
                {category.name}
              </h3>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-brown/70 flex items-start gap-3 leading-relaxed">
                    <span className="text-gold/80 mt-1 flex-shrink-0 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-ivory">
        <SectionHeader title={t.faqSection.title} align="center" />
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={t.faqSection.faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-gradient-to-b from-charcoal/95 to-charcoal text-ivory text-center">
        <SectionHeader
          title={t.finalCta.title}
          subtitle={t.finalCta.text}
          align="center"
        />
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-gold text-charcoal font-bold text-lg hover:bg-gold/90 hover:shadow-2xl hover:shadow-gold/40 hover:scale-105 transition-all duration-300 shadow-lg shadow-gold/20"
        >
          {t.finalCta.btn}
        </Link>
      </Section>
    </div>
  );
}