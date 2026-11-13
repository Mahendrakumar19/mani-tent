import type { Metadata } from 'next';
import Link from 'next/link';
import { noto } from '@/lib/fonts';
import { CONFIRMED_SERVICES } from '@/content/data';
import { generatePageMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() {
  return CONFIRMED_SERVICES.flatMap((service) => [
    { locale: 'en', slug: service.slug.en },
    { locale: 'hi', slug: service.slug.hi },
  ]);
}

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = params.locale as 'en' | 'hi';
  const service = CONFIRMED_SERVICES.find(
    (s) => s.slug[locale] === params.slug
  );

  if (!service) {
    return {};
  }

  return generatePageMetadata({
    title: service.seoTitle[locale],
    description: service.metaDescription[locale],
    path: `/services/${params.slug}`,
    locale,
    image: service.image,
  });
}

export default function ServiceDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as 'en' | 'hi';
  const service = CONFIRMED_SERVICES.find(
    (s) => s.slug[locale] === params.slug
  );

  if (!service) {
    return (
      <div className="py-16 text-center">
        <p className="text-charcoal/80">
          {locale === 'hi' ? 'सेवा नहीं मिली' : 'Service not found'}
        </p>
      </div>
    );
  }

  return (
    <div className={locale === 'hi' ? noto.className : ''}>
      {/* Breadcrumbs */}
      <Section className="py-8 md:py-10">
        <Breadcrumbs
          locale={locale}
          crumbs={[
            {
              label: locale === 'hi' ? 'सेवाएं' : 'Services',
              href: `/${locale}/services`,
            },
            {
              label: service.title[locale],
              href: `/${locale}/services/${service.slug[locale]}`,
            },
          ]}
        />
      </Section>

      {/* Hero Section with Image */}
      <Section className="py-0">
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-12">
          <img
            src={service.image}
            alt={service.title[locale]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
          <div className="absolute inset-0 flex items-end p-6 md:p-8">
            <h1 className="font-playfair text-3xl md:text-5xl font-semibold text-ivory">
              {service.title[locale]}
            </h1>
          </div>
        </div>
      </Section>

      {/* Overview */}
      <Section>
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-charcoal/90 mb-8 border-l-4 border-gold pl-6">
            {service.shortDescription[locale]}
          </p>

          {/* Full Description */}
          <SectionHeader title={locale === 'hi' ? 'विवरण' : 'About This Service'} />
          <div className="space-y-4">
            {service.fullDescription[locale].map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-charcoal/90"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Checklist */}
      <Section className="bg-ivory">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'इस सेवा के लिए तैयार रहें'
              : 'What You Need to Know'
          }
        />
        <div className="max-w-3xl">
          <p className="text-base text-charcoal/90 mb-6">
            {locale === 'hi'
              ? 'इस सेवा को बुकिंग करते समय निम्नलिखित जानकारी तैयार रखें:'
              : 'When booking this service, have the following information ready:'}
          </p>
          <ul className="space-y-3">
            {service.checklist[locale].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-charcoal flex items-center justify-center font-bold text-sm mt-0.5">
                  ✓
                </span>
                <span className="text-base text-charcoal/90">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Service Highlights */}
      <Section>
        <SectionHeader
          title={
            locale === 'hi'
              ? 'इस सेवा में शामिल है'
              : 'What\'s Included'
          }
        />
        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
          {[
            {
              title:
                locale === 'hi'
                  ? 'विस्तृत परामर्श'
                  : 'Detailed Consultation',
              desc:
                locale === 'hi'
                  ? 'आपकी आवश्यकताओं को समझने के लिए एक-एक परामर्श।'
                  : 'One-on-one consultation to understand your needs.',
            },
            {
              title:
                locale === 'hi'
                  ? 'कस्टम डिजाइन'
                  : 'Custom Design',
              desc:
                locale === 'hi'
                  ? 'आपकी दृष्टि के अनुसार व्यक्तिगत डिजाइन।'
                  : 'Personalized design according to your vision.',
            },
            {
              title:
                locale === 'hi'
                  ? 'पेशेवर स्थापना'
                  : 'Professional Setup',
              desc:
                locale === 'hi'
                  ? 'अनुभवी टीम द्वारा पेशेवर स्थापना।'
                  : 'Professional setup by our experienced team.',
            },
            {
              title:
                locale === 'hi'
                  ? 'अनुवर्ती सहायता'
                  : 'Follow-up Support',
              desc:
                locale === 'hi'
                  ? 'इवेंट के दौरान और बाद में सहायता।'
                  : 'Support during and after your event.',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-beige shadow-sm"
            >
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-charcoal/80">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-ivory">
        <SectionHeader
          title={locale === 'hi' ? 'इस सेवा के लिए प्रक्रिया' : 'Our Process'}
        />
        <div className="grid sm:grid-cols-4 gap-4 max-w-3xl">
          {[
            {
              num: '1',
              title: locale === 'hi' ? 'संपर्क करें' : 'Contact Us',
              desc:
                locale === 'hi'
                  ? 'अपनी आवश्यकताओं के साथ हमसे संपर्क करें।'
                  : 'Get in touch with your requirements.',
            },
            {
              num: '2',
              title: locale === 'hi' ? 'परामर्श' : 'Consultation',
              desc:
                locale === 'hi'
                  ? 'विस्तार से चर्चा करें।'
                  : 'Discuss details thoroughly.',
            },
            {
              num: '3',
              title: locale === 'hi' ? 'योजना' : 'Plan',
              desc:
                locale === 'hi'
                  ? 'सेवा की योजना बनाएं।'
                  : 'Plan the service together.',
            },
            {
              num: '4',
              title: locale === 'hi' ? 'निष्पादन' : 'Deliver',
              desc:
                locale === 'hi'
                  ? 'पूर्ण सेवा प्रदान करें।'
                  : 'Deliver the service perfectly.',
            },
          ].map((step) => (
            <div key={step.num} className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-charcoal font-playfair font-bold flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <h4 className="font-playfair text-base font-semibold text-charcoal mb-2">
                {step.title}
              </h4>
              <p className="text-xs text-charcoal/80">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Related Services */}
      <Section>
        <SectionHeader
          title={
            locale === 'hi'
              ? 'अन्य सेवाएं देखें'
              : 'Explore Other Services'
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIRMED_SERVICES.filter((s) => s.id !== service.id)
            .slice(0, 3)
            .map((relatedService) => (
              <Link
                key={relatedService.id}
                href={`/${locale}/services/${relatedService.slug[locale]}`}
                className="group"
              >
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <img
                    src={relatedService.image}
                    alt={relatedService.title[locale]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-playfair text-lg font-semibold text-charcoal group-hover:text-gold transition-colors">
                  {relatedService.title[locale]}
                </h3>
                <p className="text-sm text-charcoal/80 mt-2">
                  {relatedService.shortDescription[locale]}
                </p>
              </Link>
            ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-charcoal text-white text-center">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'इस सेवा को बुक करें'
              : 'Ready to Book This Service?'
          }
          subtitle={
            locale === 'hi'
              ? 'आज ही हमसे संपर्क करें और अपनी सेवा की यात्रा शुरू करें।'
              : 'Contact us today and let\'s start planning your perfect celebration.'
          }
        />
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold text-charcoal font-semibold text-base hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20"
        >
          {locale === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
        </Link>
      </Section>
    </div>
  );
}
