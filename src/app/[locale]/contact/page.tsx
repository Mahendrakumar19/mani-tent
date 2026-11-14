import type { Metadata } from 'next';
import Link from 'next/link';
import { noto } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { generatePageMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';
import BookingForm from '@/components/BookingForm/BookingForm';
import Button from '@/components/Button';

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = params.locale as 'en' | 'hi';
  return generatePageMetadata({
    title:
      locale === 'hi'
        ? 'संपर्क करें | MANI TENT HOUSE'
        : 'Contact Us | MANI TENT HOUSE',
    description:
      locale === 'hi'
        ? 'MANI TENT HOUSE से संपर्क करें। बिलासपुर में अपने शादी के आयोजन के लिए हमसे जुड़ें। फोन: 9098888130 / 7646857765'
        : 'Contact MANI TENT HOUSE. Get in touch for your wedding planning in Bilaspur. Phone: 9098888130 / 7646857765',
    path: '/contact',
    locale,
  });
}

export default function ContactPage({ params }: { params: { locale: string } }) {
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
              label: locale === 'hi' ? 'संपर्क करें' : 'Contact Us',
              href: `/${locale}/contact`,
            },
          ]}
        />
      </Section>

      {/* Contact Header */}
      <Section className="bg-white">
        <SectionHeader
          title={locale === 'hi' ? 'संपर्क में रहें' : 'Get In Touch'}
          subtitle={
            locale === 'hi'
              ? 'आपके सवालों का जवाब देने और आपके आयोजन की योजना बनाने में हम यहां हैं।'
              : 'We\'re here to answer your questions and help plan your celebration.'
          }
          align="center"
        />
      </Section>

      {/* Contact Info Cards */}
      <Section>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: '📍',
              title: locale === 'hi' ? 'पता' : 'Address',
              content:
                locale === 'hi'
                  ? 'हेमू नगर, बंधुआपारा तालाब, तोरवा रोड, तोरवा, बिलासपुर-495004'
                  : 'Hemu Nagar, Bandhuapara Talab, Torwa Road, Torwa, Bilaspur-495004',
              desc:
                locale === 'hi'
                  ? 'बिलासपुर, छत्तीसगढ़ में हमारा मुख्यालय।'
                  : 'Our headquarters in Bilaspur, Chhattisgarh.',
            },
            {
              icon: '📞',
              title: locale === 'hi' ? 'फोन / व्हाट्सएप' : 'Phone / WhatsApp',
              content: '9098888130 / 7646857765',
              desc:
                locale === 'hi'
                  ? 'सीधे हमें कॉल या व्हाट्सएप करें।'
                  : 'Call or WhatsApp us directly.',
            },
            {
              icon: '⏰',
              title: locale === 'hi' ? 'उपलब्धता' : 'Availability',
              content:
                locale === 'hi'
                  ? 'हर दिन उपलब्ध'
                  : 'Available daily',
              desc:
                locale === 'hi'
                  ? 'कृपया सुविधाजनक समय में संपर्क करें।'
                  : 'Contact us at your convenience.',
            },
          ].map((info, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gold/20 shadow-sm text-center"
            >
              <div className="text-4xl mb-4">{info.icon}</div>
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                {info.title}
              </h3>
              <p className="font-semibold text-charcoal mb-2">{info.content}</p>
              <p className="text-sm text-charcoal/80">{info.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Quick Contact Links */}
      <Section className="bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-playfair text-2xl font-bold text-charcoal mb-6">
            {locale === 'hi' ? 'तुरंत संपर्क करें' : 'Quick Contact'}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:9098888130"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gold text-charcoal font-semibold hover:bg-gold/90 transition-colors"
            >
              {locale === 'hi' ? '📞 कॉल करें: 9098888130' : '📞 Call: 9098888130'}
            </a>
            <a
              href="https://wa.me/919098888130"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
            >
              {locale === 'hi' ? '💬 व्हाट्सएप: 9098888130' : '💬 WhatsApp: 9098888130'}
            </a>
            <a
              href="tel:7646857765"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gold text-charcoal font-semibold hover:bg-gold/90 transition-colors"
            >
              {locale === 'hi' ? '📞 कॉल करें: 7646857765' : '📞 Call: 7646857765'}
            </a>
          </div>
        </div>
      </Section>

      {/* Contact Form */}
      <Section className="bg-white">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title={
              locale === 'hi'
                ? 'हमें एक संदेश भेजें'
                : 'Send Us a Message'
            }
            align="center"
          />

          <BookingForm locale={locale} t={t} />

          {/* Note */}
          <p className="text-sm text-charcoal/60 text-center mt-4">
            {locale === 'hi'
              ? '* आवश्यक फील्ड। हम जल्द ही आपसे संपर्क करेंगे।'
              : '* Required fields. We will get back to you soon.'}
          </p>
        </div>
      </Section>

      {/* Why Contact */}
      <Section>
        <SectionHeader
          title={
            locale === 'hi'
              ? 'हमसे संपर्क करने के कारण'
              : 'Why Contact Us'
          }
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              num: '1',
              title: locale === 'hi' ? 'विशेषज्ञ सलाह' : 'Expert Advice',
              desc:
                locale === 'hi'
                  ? 'अनुभवी टीम से सीधी सलाह पाएं।'
                  : 'Get direct advice from our experienced team.',
            },
            {
              num: '2',
              title: locale === 'hi' ? 'व्यक्तिगत योजना' : 'Custom Planning',
              desc:
                locale === 'hi'
                  ? 'आपके लिए विशेष योजना बनाएं।'
                  : 'Create a plan tailored to you.',
            },
            {
              num: '3',
              title: locale === 'hi' ? 'त्वरित प्रतिक्रिया' : 'Quick Response',
              desc:
                locale === 'hi'
                  ? 'तुरंत संपर्क और अपडेट।'
                  : 'Prompt communication and updates.',
            },
            {
              num: '4',
              title: locale === 'hi' ? 'पूर्ण समर्थन' : 'Full Support',
              desc:
                locale === 'hi'
                  ? 'सभी चरणों में सहायता।'
                  : 'Support through every stage.',
            },
          ].map((item) => (
            <div
              key={item.num}
              className="text-center bg-white rounded-lg p-6 border border-gold/20 shadow-sm"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-charcoal font-playfair font-bold flex items-center justify-center mx-auto mb-4">
                {item.num}
              </span>
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-charcoal/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ CTA */}
      <Section className="bg-charcoal text-white text-center rounded-lg">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'सामान्य प्रश्न?'
              : 'Have Questions?'
          }
          subtitle={
            locale === 'hi'
              ? 'होमपेज पर हमारे अक्सर पूछे जाने वाले प्रश्नों के अनुभाग को देखें।'
              : 'Check our FAQ section on the home page for common questions.'
          }
          variant="dark"
        />
        <Button
          href={`/${locale}`}
          variant="primary"
          size="md"
        >
          {locale === 'hi' ? 'होमपेज पर जाएं' : 'Visit Home'}
        </Button>
      </Section>

      {/* Thank You Message */}
      <Section>
        <div className="max-w-2xl mx-auto text-center bg-white rounded-lg p-8 border border-gold/20 shadow-sm">
          <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
            {locale === 'hi' ? 'धन्यवाद!' : 'Thank You!'}
          </h3>
          <p className="text-base leading-relaxed text-charcoal/90">
            {locale === 'hi'
              ? 'आपके आयोजन के बारे में पूछताछ करने के लिए धन्यवाद। हम आपके विशेष दिन को यादगार बनाने के लिए उत्सुक हैं। कृपया जल्द ही हमारी टीम से सुनने की उम्मीद करें।'
              : 'Thank you for inquiring about your event. We are excited to make your special day memorable. Please expect to hear from our team soon.'}
          </p>
        </div>
      </Section>
    </div>
  );
}
