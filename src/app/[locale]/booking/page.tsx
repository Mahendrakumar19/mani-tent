import type { Metadata } from 'next';
import { noto } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { generatePageMetadata } from '@/lib/seo';
import { Section, SectionHeader } from '@/components/Section';
import Breadcrumbs from '@/components/Breadcrumbs';
import BookingForm from '@/components/BookingForm/BookingForm';

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
        ? 'अपनी शादी बुक करें | MANI TENT HOUSE'
        : 'Book Your Wedding | MANI TENT HOUSE',
    description:
      locale === 'hi'
        ? 'MANI TENT HOUSE के साथ अपनी शादी के लिए टेंट और सजावट सेवाएं बुक करें। आसान और त्वरित बुकिंग प्रक्रिया।'
        : 'Book tent and decoration services for your wedding with MANI TENT HOUSE. Easy and quick booking process.',
    path: '/booking',
    locale,
  });
}

export default function BookingPage({
  params,
}: {
  params: { locale: string };
}) {
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
              label: locale === 'hi' ? 'बुकिंग' : 'Booking',
              href: `/${locale}/booking`,
            },
          ]}
        />
      </Section>

      {/* Header */}
      <Section>
        <SectionHeader
          title={t.booking.title}
          subtitle={t.booking.subtitle}
          align="center"
        />
      </Section>

      {/* Booking Form */}
      <Section className="max-w-3xl mx-auto">
        <BookingForm locale={locale} t={t} />
      </Section>

      {/* Info Section */}
      <Section className="bg-white border-t border-beige/30">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
            {locale === 'hi'
              ? 'बुकिंग के बारे में जानकारी'
              : 'About Booking Process'}
          </h3>
          <div className="space-y-4 text-charcoal/90">
            <p>
              {locale === 'hi'
                ? 'यह फॉर्म भरकर आप अपनी शादी के लिए हमारी टेंट और सजावट सेवाओं के लिए एक बुकिंग अनुरोध सबमिट कर रहे हैं। हमारी टीम जल्द ही आपसे संपर्क करेगी।'
                : 'By submitting this form, you are requesting to book our tent and decoration services for your wedding. Our team will contact you soon.'}
            </p>
            <p>
              {locale === 'hi'
                ? 'कृपया सभी आवश्यक जानकारी सटीक रूप से भरें। आपके द्वारा प्रदान की गई सभी जानकारी पूरी तरह गोपनीय रहेगी।'
                : 'Please fill in all required information accurately. All information provided by you will be kept confidential.'}
            </p>
            <p>
              {locale === 'hi'
                ? 'आपकी अनुरोध के बाद, हमारी टीम आपके साथ विस्तार से चर्चा करेगी और आपकी आवश्यकताओं के अनुसार एक कोटेशन प्रदान करेगी।'
                : 'After your request, our team will discuss in detail and provide a quotation according to your requirements.'}
            </p>
          </div>
        </div>
      </Section>

      {/* Contact Info */}
      <Section>
        <div className="max-w-3xl mx-auto bg-white rounded-lg border border-beige p-8">
          <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-6">
            {locale === 'hi'
              ? 'किसी भी सवाल के लिए हमसे संपर्क करें'
              : 'Questions? Contact Us'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-charcoal/60 font-semibold mb-1">
                {locale === 'hi' ? 'फोन' : 'Phone'}
              </p>
              <a
                href={`tel:${t.phone1}`}
                className="text-lg text-gold font-semibold hover:underline"
              >
                {t.phone1}
              </a>
              <br />
              <a
                href={`tel:${t.phone2}`}
                className="text-lg text-gold font-semibold hover:underline"
              >
                {t.phone2}
              </a>
            </div>
            <div>
              <p className="text-sm text-charcoal/60 font-semibold mb-1">
                {locale === 'hi' ? 'पता' : 'Address'}
              </p>
              <p className="text-charcoal">{t.address}</p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
