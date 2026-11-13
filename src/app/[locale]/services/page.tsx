import type { Metadata } from 'next';
import Link from 'next/link';
import { noto } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { CONFIRMED_SERVICES } from '@/content/data';
import { generatePageMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/Button';

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
        ? 'हमारी सेवाएं | MANI TENT HOUSE'
        : 'Our Services | MANI TENT HOUSE',
    description:
      locale === 'hi'
        ? 'बिलासपुर में MANI TENT HOUSE की सभी सेवाओं को देखें - वेडिंग टेंट सेटअप, सजावट, मंडप और स्टेज डेकोरेशन।'
        : 'Explore all MANI TENT HOUSE services in Bilaspur - wedding tent setup, decoration, mandap and stage decoration.',
    path: '/services',
    locale,
  });
}

export default function ServicesPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'hi';
  const t = dictionary[locale];

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
          ]}
        />
      </Section>

      {/* Services Header */}
      <Section className="bg-white">
        <SectionHeader
          title={t.servicesSection.title}
          subtitle={t.servicesSection.subtitle}
          align="center"
        />
      </Section>

      {/* All Services Grid */}
      <Section>
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

      {/* Service Features */}
      <Section className="bg-white">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'हर सेवा में शामिल है'
              : 'What\'s Included in Every Service'
          }
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: locale === 'hi' ? 'विस्तृत परामर्श' : 'Detailed Consultation',
              icon: '💬',
              desc:
                locale === 'hi'
                  ? 'आपकी दृष्टि और आवश्यकताओं को समझने के लिए विस्तृत परामर्श।'
                  : 'In-depth consultation to understand your vision and requirements.',
            },
            {
              title:
                locale === 'hi'
                  ? 'व्यक्तिगत योजना'
                  : 'Custom Planning',
              icon: '📋',
              desc:
                locale === 'hi'
                  ? 'आपके स्थान, तारीख और शैली के अनुसार व्यक्तिगत योजना।'
                  : 'Personalized planning tailored to your venue, date and style.',
            },
            {
              title:
                locale === 'hi'
                  ? 'पेशेवर निष्पादन'
                  : 'Professional Execution',
              icon: '👥',
              desc:
                locale === 'hi'
                  ? 'अनुभवी टीम द्वारा पेशेवर और सावधान निष्पादन।'
                  : 'Professional and careful execution by our experienced team.',
            },
            {
              title: locale === 'hi' ? 'गुणवत्ता की सामग्री' : 'Quality Materials',
              icon: '✨',
              desc:
                locale === 'hi'
                  ? 'सर्वोत्तम गुणवत्ता की सामग्री का उपयोग।'
                  : 'Use of best quality materials and decorations.',
            },
            {
              title: locale === 'hi' ? 'समय पर वितरण' : 'Timely Delivery',
              icon: '⏰',
              desc:
                locale === 'hi'
                  ? 'समय पर सेटअप और तैयारी की गारंटी।'
                  : 'Guaranteed timely setup and preparation.',
            },
            {
              title: locale === 'hi' ? 'समर्थन' : 'Support',
              icon: '🤝',
              desc:
                locale === 'hi'
                  ? 'पूरे इवेंट के दौरान हमारी टीम का समर्थन।'
                  : 'Our team support throughout the entire event.',
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 border border-beige shadow-sm">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* How to Choose */}
      <Section>
        <SectionHeader
          title={locale === 'hi' ? 'अपनी सेवा चुनें' : 'Choose Your Service'}
        />
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-charcoal/90 mb-6">
            {locale === 'hi'
              ? 'प्रत्येक सेवा आपके शादी के विभिन्न पहलुओं को कवर करती है। अपनी आवश्यकताओं के आधार पर एक या अधिक सेवाओं को चुनें:'
              : 'Each service covers different aspects of your wedding. Choose one or more services based on your needs:'}
          </p>
          <ul className="space-y-4">
            {[
              {
                title:
                  locale === 'hi'
                    ? 'केवल टेंट सेटअप'
                    : 'Tent Setup Only',
                desc:
                  locale === 'hi'
                    ? 'यदि आप केवल टेंट व्यवस्था की आवश्यकता है।'
                    : 'If you need only tent arrangement.',
              },
              {
                title:
                  locale === 'hi'
                    ? 'केवल सजावट'
                    : 'Decoration Only',
                desc:
                  locale === 'hi'
                    ? 'यदि आप अपना टेंट है और सजावट चाहते हैं।'
                    : 'If you have your own tent and want decoration.',
              },
              {
                title:
                  locale === 'hi'
                    ? 'संपूर्ण पैकेज'
                    : 'Complete Package',
                desc:
                  locale === 'hi'
                    ? 'टेंट सेटअप और सजावट दोनों के लिए संपूर्ण समाधान।'
                    : 'Complete solution for both tent setup and decoration.',
              },
              {
                title:
                  locale === 'hi'
                    ? 'विशेष आवश्यकताएं'
                    : 'Special Requirements',
                desc:
                  locale === 'hi'
                    ? 'अपनी विशेष आवश्यकताओं के लिए हमसे संपर्क करें।'
                    : 'Contact us for your special requirements.',
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex gap-4 items-start bg-white p-4 rounded-lg border border-beige"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-charcoal flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-charcoal">{item.title}</h4>
                  <p className="text-sm text-charcoal/80 mt-1">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Pricing Note */}
      <Section className="bg-white/50 border-t border-b border-beige">
        <div className="max-w-3xl">
          <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
            {locale === 'hi' ? 'मूल्य निर्धारण' : 'Pricing'}
          </h3>
          <p className="text-base leading-relaxed text-charcoal/90 mb-6">
            {locale === 'hi'
              ? 'प्रत्येक आयोजन अद्वितीय है, और हमारी सेवाओं की लागत आपकी आवश्यकताओं, स्थान और आकार पर निर्भर करती है। आयोजन की पूरी जानकारी के साथ हमसे संपर्क करें ताकि हम सटीक उद्धरण प्रदान कर सकें।'
              : 'Every event is unique, and our service costs depend on your requirements, venue and scale. Contact us with complete event details so we can provide accurate quotes.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-charcoal text-white font-semibold text-base hover:bg-charcoal/90 transition-colors"
          >
            {locale === 'hi' ? 'उद्धरण के लिए पूछें' : 'Request a Quote'}
          </Link>
        </div>
      </Section>

      {/* Call to Action */}
      <Section className="bg-charcoal text-ivory text-center">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'अपनी सेवा को अभी चुनें'
              : 'Choose Your Service Today'
          }
          subtitle={
            locale === 'hi'
              ? 'किसी भी सेवा के बारे में और जानें या एक विशेष पूछताछ के लिए हमसे संपर्क करें।'
              : 'Learn more about any service or contact us for a special inquiry.'
          }
          variant="dark"
        />
        <Button
          href={`/${locale}/contact`}
          variant="primary"
          size="md"
        >
          {locale === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
        </Button>
      </Section>
    </div>
  );
}
