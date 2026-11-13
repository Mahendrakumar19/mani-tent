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
              className="bg-white rounded-lg p-6 border border-beige shadow-sm text-center"
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

          <form className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t.form.nameLabel} *
              </label>
              <input
                type="text"
                placeholder={
                  locale === 'hi'
                    ? 'आपका नाम'
                    : 'Your full name'
                }
                className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t.form.mobileLabel} *
              </label>
              <input
                type="tel"
                placeholder={
                  locale === 'hi'
                    ? 'आपका फोन नंबर'
                    : 'Your phone number'
                }
                className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t.form.emailLabel}
              </label>
              <input
                type="email"
                placeholder={
                  locale === 'hi'
                    ? 'आपकी ईमेल'
                    : 'Your email address'
                }
                className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t.form.dateLabel}
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t.form.locationLabel}
              </label>
              <input
                type="text"
                placeholder={
                  locale === 'hi'
                    ? 'आयोजन स्थान'
                    : 'Event location/venue'
                }
                className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              />
            </div>

            {/* Services */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-3">
                {t.form.servicesLabel}
              </label>
              <div className="space-y-2">
                {[
                  {
                    value: 'tent-setup',
                    label:
                      locale === 'hi'
                        ? 'वेडिंग टेंट सेटअप'
                        : 'Wedding Tent Setup',
                  },
                ].map((service) => (
                  <label key={service.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      value={service.value}
                      className="w-4 h-4 rounded border-beige text-gold focus:ring-2 focus:ring-gold"
                    />
                    <span className="text-sm text-charcoal">{service.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Guest Count */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t.form.guestLabel}
              </label>
              <input
                type="number"
                placeholder={
                  locale === 'hi'
                    ? 'अनुमानित मेहमान संख्या'
                    : 'Estimated guest count'
                }
                className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                {t.form.messageLabel}
              </label>
              <textarea
                placeholder={
                  locale === 'hi'
                    ? 'अपनी आवश्यकताओं और विचारों को साझा करें...'
                    : 'Share your requirements and ideas...'
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-beige bg-white text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-beige text-gold focus:ring-2 focus:ring-gold mt-1 flex-shrink-0"
                required
              />
              <span className="text-xs text-charcoal/80">
                {t.form.consentText}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-charcoal text-white font-semibold text-base hover:bg-charcoal/90 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            >
              {t.form.submitBtn}
            </button>

            {/* Note */}
            <p className="text-xs text-charcoal/60 text-center">
              {locale === 'hi'
                ? '* आवश्यक फील्ड। हम जल्द ही आपसे संपर्क करेंगे।'
                : '* Required fields. We\'ll get back to you soon.'}
            </p>
          </form>
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
              className="text-center bg-white rounded-lg p-6 border border-beige"
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
              ? 'सामण्य प्रश्न?'
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

      {/* Booking Form Section */}
      <Section className="bg-white">
        <SectionHeader
          title={t.booking.title}
          subtitle={t.booking.subtitle}
          align="center"
        />
      </Section>

      <Section className="max-w-2xl mx-auto">
        <BookingForm locale={locale} t={t} />
      </Section>

      {/* Thank You Message */}
      <Section>
        <div className="max-w-2xl mx-auto text-center bg-white rounded-lg p-8 border border-beige">
          <h3 className="font-playfair text-2xl font-semibold text-charcoal mb-4">
            {locale === 'hi' ? 'धन्यवाद!' : 'Thank You!'}
          </h3>
          <p className="text-base leading-relaxed text-charcoal/90">
            {locale === 'hi'
              ? 'आपके आयोजन के बारे में पूछताछ करने के लिए धन्यवाद। हम आपके विशेष दिन को यादगार बनाने के लिए उत्सुक हैं। कृपया जल्द ही हमारी टीम से सुनने की उम्मीद करें।'
              : 'Thank you for inquiring about your event. We\'re excited to make your special day memorable. Please expect to hear from our team soon.'}
          </p>
        </div>
      </Section>
    </div>
  );
}
