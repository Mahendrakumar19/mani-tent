import type { Metadata } from 'next';
import Link from 'next/link';
import { noto } from '@/lib/fonts';
import { dictionary } from '@/content/dictionary';
import { DRAFT_BLOG_POSTS } from '@/content/data';
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
        ? 'ब्लॉग | MANI TENT HOUSE'
        : 'Blog | MANI TENT HOUSE',
    description:
      locale === 'hi'
        ? 'MANI TENT HOUSE ब्लॉग - शादी की सजावट, टेंट सेटअप और आयोजन सुझाव।'
        : 'MANI TENT HOUSE Blog - Wedding decoration, tent setup and event planning tips.',
    path: '/blog',
    locale,
  });
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const locale = params.locale as 'en' | 'hi';
  const t = dictionary[locale];

  // Filter published posts
  const publishedPosts = DRAFT_BLOG_POSTS.filter((post) => post.published);

  return (
    <div className={locale === 'hi' ? noto.className : ''}>
      {/* Breadcrumbs */}
      <Section className="py-8 md:py-10">
        <Breadcrumbs
          locale={locale}
          crumbs={[
            {
              label: locale === 'hi' ? 'ब्लॉग' : 'Blog',
              href: `/${locale}/blog`,
            },
          ]}
        />
      </Section>

      {/* Blog Header */}
      <Section className="bg-white">
        <SectionHeader
          title={locale === 'hi' ? 'हमारा ब्लॉग' : 'Our Blog'}
          subtitle={
            locale === 'hi'
              ? 'शादी की सजावट, टेंट सेटअप और आयोजन सुझावों के बारे में जानें।'
              : 'Learn about wedding decoration, tent setup and event planning tips.'
          }
          align="center"
        />
      </Section>

      {/* Blog Posts List */}
      <Section>
        {publishedPosts.length > 0 ? (
          <div className="space-y-8">
            {publishedPosts.map((post, index) => (
              <div key={post.slug} className="border-b border-beige pb-8 last:border-0">
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 items-start">
                  {/* Post Index */}
                  <div className="hidden md:block">
                    <span className="text-6xl font-playfair font-bold text-gold/20">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="md:col-span-2">
                    <span className="inline-block text-xs font-medium tracking-widest uppercase text-gold mb-3">
                      {locale === 'hi' ? 'ब्लॉग पोस्ट' : 'Blog Post'}
                    </span>
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-charcoal hover:text-gold transition-colors mb-3 cursor-pointer">
                        {post.title[locale]}
                      </h3>
                    </Link>
                    <p className="text-base leading-relaxed text-charcoal/90 mb-4">
                      {post.summary[locale]}
                    </p>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center text-gold font-medium text-sm hover:gap-2 transition-all"
                    >
                      {locale === 'hi' ? 'पूरा पढ़ें' : 'Read Full Article'}
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
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-charcoal/80 mb-6">
              {locale === 'hi'
                ? 'जल्द ही नई ब्लॉग पोस्ट आने वाली हैं।'
                : 'New blog posts coming soon.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-charcoal text-white font-semibold text-sm hover:bg-charcoal/90 transition-colors"
            >
              {locale === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
            </Link>
          </div>
        )}
      </Section>

      {/* Topics Section */}
      <Section className="bg-white">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'हम किन विषयों पर लिखते हैं'
              : 'Topics We Cover'
          }
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {[
            {
              title: locale === 'hi' ? 'शादी की सजावट' : 'Wedding Decoration',
              desc:
                locale === 'hi'
                  ? 'आपकी शादी को और सुंदर बनाने के लिए सजावट विचार और सुझाव।'
                  : 'Decoration ideas and tips to make your wedding more beautiful.',
              icon: '🎨',
            },
            {
              title: locale === 'hi' ? 'टेंट सेटअप' : 'Tent Setup',
              desc:
                locale === 'hi'
                  ? 'टेंट व्यवस्था और योजना के बारे में उपयोगी जानकारी।'
                  : 'Useful information about tent arrangement and planning.',
              icon: '⛺',
            },
            {
              title:
                locale === 'hi'
                  ? 'आयोजन सुझाव'
                  : 'Event Planning',
              desc:
                locale === 'hi'
                  ? 'सफल आयोजन के लिए योजना और संगठन सुझाव।'
                  : 'Planning and organization tips for successful events.',
              icon: '📋',
            },
            {
              title:
                locale === 'hi'
                  ? 'रंग और शैली'
                  : 'Colors & Styles',
              desc:
                locale === 'hi'
                  ? 'विभिन्न रंग योजनाएं और डेकोरेशन शैलियां।'
                  : 'Different color schemes and decoration styles.',
              icon: '🎭',
            },
            {
              title:
                locale === 'hi'
                  ? 'बजट सुझाव'
                  : 'Budget Tips',
              desc:
                locale === 'hi'
                  ? 'अपने बजट के भीतर एक सुंदर आयोजन बनाने के सुझाव।'
                  : 'Tips to create a beautiful event within your budget.',
              icon: '💰',
            },
            {
              title:
                locale === 'hi'
                  ? 'DIY विचार'
                  : 'DIY Ideas',
              desc:
                locale === 'hi'
                  ? 'कुछ सरल DIY सजावट विचार और दिशानिर्देश।'
                  : 'Simple DIY decoration ideas and guidelines.',
              icon: '🛠️',
            },
          ].map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-beige shadow-sm text-center"
            >
              <div className="text-4xl mb-4">{topic.icon}</div>
              <h3 className="font-playfair text-lg font-semibold text-charcoal mb-2">
                {topic.title}
              </h3>
              <p className="text-sm text-charcoal/80">{topic.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Subscribe Section */}
      <Section>
        <div className="max-w-2xl bg-charcoal text-white rounded-lg p-8 md:p-12 text-center">
          <h3 className="font-playfair text-2xl font-semibold mb-4">
            {locale === 'hi'
              ? 'नई पोस्ट के लिए अपडेट पाएं'
              : 'Get Updates on New Posts'}
          </h3>
          <p className="text-base text-white/90 mb-6">
            {locale === 'hi'
              ? 'हमारी ब्लॉग पोस्ट्स के बारे में जानने के लिए हमसे संपर्क करें।'
              : 'Contact us to learn about our latest blog posts and updates.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold text-charcoal font-semibold text-base hover:bg-gold/90 transition-colors"
          >
            {locale === 'hi' ? 'संपर्क करें' : 'Get in Touch'}
          </Link>
        </div>
      </Section>

      {/* Related Links */}
      <Section className="bg-white">
        <SectionHeader
          title={
            locale === 'hi'
              ? 'अन्य उपयोगी जानकारी'
              : 'Other Useful Information'
          }
          align="center"
        />
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Link
            href={`/${locale}/services`}
            className="group bg-white rounded-lg p-6 border border-beige hover:border-gold hover:shadow-lg transition-all duration-300 text-center"
          >
            <h3 className="font-playfair text-lg font-semibold text-charcoal group-hover:text-gold transition-colors mb-2">
              {locale === 'hi' ? 'सेवाएं' : 'Our Services'}
            </h3>
            <p className="text-sm text-charcoal/80 mb-4">
              {locale === 'hi'
                ? 'सभी सेवाओं को जानें जो हम प्रदान करते हैं।'
                : 'Learn about all the services we offer.'}
            </p>
            <span className="inline-flex items-center text-gold font-medium text-sm">
              {locale === 'hi' ? 'जानें अधिक' : 'Learn More'}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
          <Link
            href={`/${locale}/gallery`}
            className="group bg-white rounded-lg p-6 border border-beige hover:border-gold hover:shadow-lg transition-all duration-300 text-center"
          >
            <h3 className="font-playfair text-lg font-semibold text-charcoal group-hover:text-gold transition-colors mb-2">
              {locale === 'hi' ? 'गैलरी' : 'Gallery'}
            </h3>
            <p className="text-sm text-charcoal/80 mb-4">
              {locale === 'hi'
                ? 'हमारी सजावट प्रेरणा गैलरी देखें।'
                : 'Explore our decoration inspiration gallery.'}
            </p>
            <span className="inline-flex items-center text-gold font-medium text-sm">
              {locale === 'hi' ? 'गैलरी देखें' : 'View Gallery'}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
