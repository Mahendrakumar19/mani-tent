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
      <Section>
        <SectionHeader title={t.intro.title} />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <p className="text-base md:text-lg leading-relaxed text-brown/90">
            {t.intro.body1}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-brown/90">
            {t.intro.body2}
          </p>
        </div>
      </Section>

      {/* Services */}
      <Section className="bg-ivory">
        <SectionHeader
          eyebrow={locale === 'hi' ? 'सेवाएं' : 'Services'}
          title={t.servicesSection.title}
          subtitle={t.servicesSection.subtitle}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CONFIRMED_SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.shortDescription}
              image={service.image}
              href={`/${locale}/services/${service.slug[locale]}`}
              locale={locale}
            />
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section>
        <SectionHeader title={t.whyChooseUs.title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.whyChooseUs.reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-beige shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <span className="text-gold font-playfair text-xl font-bold">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-brown/80 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Decoration Inspiration Gallery */}
      <Section className="bg-charcoal text-ivory">
        <SectionHeader
          title={t.gallerySection.title}
          subtitle={t.gallerySection.subtitle}
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {CONFIRMED_SERVICES.slice(0, 5).map((service) => (
            <div
              key={service.id}
              className="relative h-64 md:h-80 overflow-hidden rounded-lg group"
            >
              <img
                src={service.image}
                alt={service.title[locale]}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent flex items-end p-4">
                <span className="text-sm font-medium text-gold">
                  {service.title[locale]}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-ivory/60 mb-6">{t.gallerySection.note}</p>
        <Link
          href={`/${locale}/gallery`}
          className="inline-flex items-center text-gold hover:underline text-sm font-medium"
        >
          {t.gallerySection.cta}
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </Section>

      {/* Process */}
      <Section className="bg-ivory">
        <SectionHeader title={t.processSection.title} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.processSection.steps.map((step) => (
            <div key={step.num} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-charcoal font-playfair font-bold flex items-center justify-center">
                  {step.num}
                </span>
                <h3 className="font-playfair text-lg font-semibold text-charcoal">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-brown/80 leading-relaxed ml-13 pl-13">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Location */}
      <Section>
        <SectionHeader title={t.locationSection.title} />
        <p className="text-base md:text-lg leading-relaxed text-brown/90 max-w-3xl">
          {t.locationSection.text}
        </p>
      </Section>

      {/* Menu Card */}
      <Section className="bg-ivory">
        <SectionHeader
          title={t.menuSection.title}
          subtitle={t.menuSection.subtitle}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.menuSection.categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-beige shadow-sm">
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-4">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-brown/80 flex items-start gap-2">
                    <span className="text-gold mt-1.5 flex-shrink-0">•</span>
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
        <SectionHeader title={t.faqSection.title} />
        <div className="max-w-3xl">
          <FAQAccordion items={t.faqSection.faqs} />
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-charcoal text-ivory text-center">
        <SectionHeader
          title={t.finalCta.title}
          subtitle={t.finalCta.text}
        />
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold text-charcoal font-semibold text-base hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20"
        >
          {t.finalCta.btn}
        </Link>
      </Section>
    </div>
  );
}