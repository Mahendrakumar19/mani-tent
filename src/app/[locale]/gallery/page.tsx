import type { Metadata } from 'next';
import Link from 'next/link';
import { noto } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { CONFIRMED_SERVICES } from '@/content/data';
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
        ? 'गैलरी | MANI TENT HOUSE'
        : 'Gallery | MANI TENT HOUSE',
    description:
      locale === 'hi'
        ? 'MANI TENT HOUSE की सजावट प्रेरणा गैलरी देखें। वेडिंग टेंट, मंडप, स्टेज और रिसेप्शन डेकोरेशन।'
        : 'Explore MANI TENT HOUSE decoration inspiration gallery. Wedding tents, mandaps, stages and reception decoration.',
    path: '/gallery',
    locale,
  });
}

export default function GalleryPage({ params }: { params: { locale: string } }) {
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
              label: locale === 'hi' ? 'गैलरी' : 'Gallery',
              href: `/${locale}/gallery`,
            },
          ]}
        />
      </Section>

      {/* Gallery Header */}
      <Section className="bg-ivory">
        <SectionHeader
          title={t.gallerySection.title}
          subtitle={t.gallerySection.subtitle}
          align="center"
        />
      </Section>

      {/* Gallery Grid */}
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {CONFIRMED_SERVICES.map((service, index) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.slug[locale]}`}
              className="group relative h-64 md:h-80 overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={service.image}
                alt={service.title[locale]}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <span className="text-sm font-medium text-gold">
                    {service.title[locale]}
                  </span>
                  <p className="text-xs text-white/80 mt-1">
                    {service.shortDescription[locale]}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 flex items-end p-4 group-hover:hidden">
                <span className="text-sm font-medium text-gold">
                  {service.title[locale]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Gallery Note */}
      <Section className="bg-beige">
        <div className="max-w-3xl">
          <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
            {locale === 'hi' ? 'गैलरी के बारे में' : 'About This Gallery'}
          </h3>
          <p className="text-base leading-relaxed text-charcoal/90 mb-4">
            {t.gallerySection.note}
          </p>
          <p className="text-base leading-relaxed text-charcoal/90">
            {locale === 'hi'
              ? 'हर सेवा के लिए, हम आपके आयोजन को और अधिक सुंदर और विशेष बनाने के लिए व्यक्तिगत डिजाइन विकल्पप्रदान करते हैं। हमारी टीम के साथ अपने विचार और प्राथमिकताओं पर चर्चा करने के लिए संपर्क करें।'
              : 'For each service, we provide personalized design options to make your event more beautiful and special. Contact us to discuss your ideas and preferences with our team.'}
          </p>
        </div>
      </Section>

      {/* Service Categories */}
      <Section className="bg-ivory">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'सेवा श्रेणियां'
              : 'Service Categories'
          }
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIRMED_SERVICES.map((service) => (
            <Link
              key={service.id}
              href={`/${locale}/services/${service.slug[locale]}`}
              className="group bg-white rounded-lg overflow-hidden border border-beige hover:border-gold hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title[locale]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-lg font-semibold text-charcoal group-hover:text-gold transition-colors mb-2">
                  {service.title[locale]}
                </h3>
                <p className="text-sm text-charcoal/80 leading-relaxed mb-4">
                  {service.shortDescription[locale]}
                </p>
                <span className="inline-flex items-center text-gold font-medium text-sm group-hover:gap-2 transition-all">
                  {locale === 'hi' ? 'विवरण देखें' : 'Learn More'}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Why View Gallery */}
      <Section>
        <SectionHeader
          title={
            locale === 'hi'
              ? 'यह गैलरी क्यों देखें'
              : 'Why Browse Our Gallery'
          }
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {[
            {
              title:
                locale === 'hi'
                  ? 'प्रेरणा पाएं'
                  : 'Get Inspired',
              desc:
                locale === 'hi'
                  ? 'विभिन्न सजावट शैलियों और विचारों से प्रेरणा लें।'
                  : 'Get inspiration from various decoration styles and ideas.',
              icon: '✨',
            },
            {
              title:
                locale === 'hi'
                  ? 'सेवाएं समझें'
                  : 'Understand Services',
              desc:
                locale === 'hi'
                  ? 'प्रत्येक सेवा कैसी दिखती है और क्या संभव है।'
                  : 'See what each service looks like and what\'s possible.',
              icon: '👁️',
            },
            {
              title:
                locale === 'hi'
                  ? 'विचार साझा करें'
                  : 'Share Your Ideas',
              desc:
                locale === 'hi'
                  ? 'गैलरी से विचार लेकर हमारी टीम से अपनी दृष्टि साझा करें।'
                  : 'Share your vision with our team using gallery ideas.',
              icon: '💡',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-beige shadow-sm text-center"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Update Notice */}
      <Section className="bg-charcoal text-white rounded-lg">
        <div className="flex gap-4 items-start">
          <span className="text-3xl flex-shrink-0">📸</span>
          <div>
            <h3 className="font-playfair text-xl font-semibold mb-2">
              {locale === 'hi' ? 'नए फोटो जल्द ही आ रहे हैं' : 'More Photos Coming Soon'}
            </h3>
            <p className="text-base leading-relaxed text-ivory/90 mb-4">
              {locale === 'hi'
                ? 'हम नियमित रूप से अपनी गैलरी को वास्तविक परियोजना फोटोग्राफी से अपडेट कर रहे हैं। अपने सजावट विचार हमारे साथ साझा करने के लिए आज ही संपर्क करें।'
                : 'We regularly update our gallery with real project photographs. Contact us today to share your decoration ideas.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gold text-charcoal font-semibold text-sm hover:bg-gold/90 transition-colors"
            >
              {locale === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
            </Link>
          </div>
        </div>
      </Section>

      {/* Ready to Plan */}
      <Section className="bg-ivory text-center">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'क्या आप तैयार हैं?'
              : 'Ready to Plan Your Celebration?'
          }
          subtitle={
            locale === 'hi'
              ? 'गैलरी से प्रेरणा लें और अपने विशेष दिन के लिए एक सुंदर व्यवस्था बनाएं।'
              : 'Get inspired from the gallery and create a beautiful arrangement for your special day.'
          }
          align="center"
        />
        <Link
          href={`/${locale}/services`}
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-charcoal text-ivory font-semibold text-base hover:bg-charcoal/90 transition-colors shadow-lg"
        >
          {locale === 'hi' ? 'सेवाएं देखें' : 'Explore Services'}
        </Link>
      </Section>
    </div>
  );
}
