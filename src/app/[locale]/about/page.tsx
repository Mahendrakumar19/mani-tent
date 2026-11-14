import type { Metadata } from 'next';
import { noto } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { generatePageMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/Section';
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
        ? 'हमारे बारे में | MANI TENT HOUSE'
        : 'About Us | MANI TENT HOUSE',
    description:
      locale === 'hi'
        ? 'बिलासपुर में MANI TENT HOUSE के बारे में जानें। हम शादी के टेंट और सजावट की सेवाएं प्रदान करते हैं।'
        : 'Learn about MANI TENT HOUSE in Bilaspur. We provide premium wedding tent and decoration services.',
    path: '/about',
    locale,
  });
}

export default function AboutPage({ params }: { params: { locale: string } }) {
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
              label: locale === 'hi' ? 'हमारे बारे में' : 'About Us',
              href: `/${locale}/about`,
            },
          ]}
        />
      </Section>

      {/* About Hero */}
      <Section className="bg-white/60 backdrop-blur-sm">
        <SectionHeader
          title={locale === 'hi' ? 'हमारे बारे में' : 'About MANI TENT HOUSE'}
          align="center"
        />
        <p className="text-center text-base md:text-lg leading-relaxed text-charcoal/90 max-w-3xl mx-auto">
          {locale === 'hi'
            ? 'MANI TENT HOUSE बिलासपुर, छत्तीसगढ़ में स्थित एक विश्वसनीय वेडिंग टेंट और सजावट सेवा प्रदाता है। हम हर शादी को विशेष और यादगार बनाने के लिए प्रतिबद्ध हैं।'
            : 'MANI TENT HOUSE is a trusted wedding tent and decoration service provider in Bilaspur, Chhattisgarh. We are committed to making every celebration special and memorable.'}
        </p>
      </Section>

      {/* Our Story */}
      <Section>
        <SectionHeader
          title={locale === 'hi' ? 'हमारी कहानी' : 'Our Story'}
        />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
              {locale === 'hi' ? 'कैसे शुरु हुआ' : 'How We Started'}
            </h3>
            <p className="text-base leading-relaxed text-charcoal/90 mb-4">
              {locale === 'hi'
                ? 'MANI TENT HOUSE की स्थापना शादी के आयोजनों को सुंदर और विशेष बनाने की दृष्टि से की गई थी। हम मानते हैं कि हर समारोह अद्वितीय है और इसे सावधानी से योजना बनाई जानी चाहिए.'
                : 'MANI TENT HOUSE was founded with the vision of making wedding celebrations beautiful and special. We believe every occasion is unique and deserves careful planning.'}
            </p>
            <p className="text-base leading-relaxed text-charcoal/90">
              {locale === 'hi'
                ? 'हमारी टीम अनुभवी पेशेवरों से मिलकर बनी है जो आपकी कल्पना को वास्तविकता में बदलने के लिए समर्पित है।'
                : 'Our team consists of experienced professionals dedicated to turning your vision into reality.'}
            </p>
          </div>
          <div>
            <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
              {locale === 'hi' ? 'हमारा दृष्टिकोण' : 'Our Approach'}
            </h3>
            <p className="text-base leading-relaxed text-charcoal/90 mb-4">
              {locale === 'hi'
                ? 'हम प्रत्येक परियोजना में विस्तार पर ध्यान देते हैं। आपकी पसंद, रंग, शैली और सांस्कृतिक महत्व को समझना हमारा पहला कदम है.'
                : 'We pay attention to every detail in each project. Understanding your preferences, colors, style and cultural significance is our first step.'}
            </p>
            <p className="text-base leading-relaxed text-charcoal/90">
              {locale === 'hi'
                ? 'आपके आयोजन स्थल, तारीख और आवश्यकताओं पर विचार करके, हम एक सुंदर व्यवस्था तैयार करते हैं जो आपके समारोह को स्मरणीय बनाता है।'
                : 'By considering your venue, date and requirements, we create beautiful arrangements that make your celebration memorable.'}
            </p>
          </div>
        </div>
      </Section>

      {/* Why Choose Us - Extended */}
      <Section className="bg-white/60 backdrop-blur-sm">
        <SectionHeader
          title={locale === 'hi' ? 'क्यों हमें चुनें' : 'Why Choose Us'}
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title:
                locale === 'hi'
                  ? 'शादी पर केंद्रित सेवाएं'
                  : 'Wedding-Focused Services',
              desc:
                locale === 'hi'
                  ? 'हम विशेष रूप से शादी के आयोजनों के लिए टेंट और सजावट की सेवाएं प्रदान करते हैं।'
                  : 'We specialize in tent and decoration services specifically for wedding occasions.',
            },
            {
              title:
                locale === 'hi'
                  ? 'विवरण पर ध्यान'
                  : 'Attention to Detail',
              desc:
                locale === 'hi'
                  ? 'प्रत्येक तत्व को आपकी दृष्टि के साथ संरेखित करने के लिए सावधानी से योजना बनाई जाती है।'
                  : 'Every element is carefully planned to align with your vision.',
            },
            {
              title:
                locale === 'hi'
                  ? 'अनुभवी टीम'
                  : 'Experienced Team',
              desc:
                locale === 'hi'
                  ? 'हमारी टीम वर्षों के अनुभव और कई सफल आयोजनों के साथ है।'
                  : 'Our team brings years of experience and many successful events.',
            },
            {
              title:
                locale === 'hi'
                  ? 'स्थानीय सेवा'
                  : 'Local Service',
              desc:
                locale === 'hi'
                  ? 'बिलासपुर और आसपास के क्षेत्रों में समर्पित सेवा।'
                  : 'Dedicated service in Bilaspur and nearby areas.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gold/15 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <span className="text-gold font-playfair text-xl font-bold">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Services Overview */}
      <Section>
        <SectionHeader
          title={locale === 'hi' ? 'हमारी सेवाएं' : 'Our Services'}
        />
        <p className="text-base leading-relaxed text-charcoal/90 mb-8 max-w-3xl">
          {locale === 'hi'
            ? 'हम शादी के आयोजनों के लिए व्यापक सेवाएं प्रदान करते हैं:'
            : 'We provide comprehensive services for wedding occasions:'}
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              title: locale === 'hi' ? 'वेडिंग टेंट सेटअप' : 'Wedding Tent Setup',
              desc:
                locale === 'hi'
                  ? 'आपके स्थान और आवश्यकताओं के अनुसार टेंट व्यवस्था।'
                  : 'Tent arrangements tailored to your venue and needs.',
            },
            {
              title: locale === 'hi' ? 'शादी की सजावट' : 'Wedding Decoration',
              desc:
                locale === 'hi'
                  ? 'आपकी पसंदीदा शैली और रंगों में पूरा सजावट।'
                  : 'Complete decoration in your preferred style and colors.',
            },
            {
              title: locale === 'hi' ? 'मंडप सजावट' : 'Mandap Decoration',
              desc:
                locale === 'hi'
                  ? 'विवाह समारोह के मंडप के लिए विशेष सजावट।'
                  : 'Special decoration for wedding ceremony mandap.',
            },
            {
              title: locale === 'hi' ? 'स्टेज सजावट' : 'Stage Decoration',
              desc:
                locale === 'hi'
                  ? 'स्वागत समारोह और अन्य आयोजनों के लिए स्टेज सजावट।'
                  : 'Stage decoration for receptions and other events.',
            },
          ].map((service, index) => (
            <div key={index} className="border-l-4 border-gold pl-6">
              <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2">
                {service.title}
              </h3>
              <p className="text-base text-charcoal/80">{service.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-charcoal text-white text-center rounded-xl backdrop-blur-lg">
        <SectionHeader
          title={locale === 'hi' ? 'अपने समारोह की योजना बनाएं' : 'Plan Your Celebration'}
          subtitle={
            locale === 'hi'
              ? 'आज ही हमसे संपर्क करें और अपनी विशेष दिन के लिए एक सुंदर व्यवस्था बनाएं।'
              : 'Contact us today to create a beautiful arrangement for your special day.'
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
