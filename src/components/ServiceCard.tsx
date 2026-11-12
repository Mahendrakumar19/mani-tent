import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  image: string;
  href: string;
  locale: 'en' | 'hi';
}

export default function ServiceCard({ title, description, image, href, locale }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-beige hover:border-gold/50"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-playfair text-xl font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors">
          {title[locale]}
        </h3>
        <p className="text-sm text-brown/80 line-clamp-2">
          {description[locale]}
        </p>
        <span className="inline-block mt-3 text-sm font-medium text-gold group-hover:underline">
          {locale === 'hi' ? 'सेवा देखें' : 'Explore Service'}
        </span>
      </div>
    </Link>
  );
}