import Link from 'next/link';

interface Crumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  locale: 'en' | 'hi';
  crumbs: Crumb[];
}

export default function Breadcrumbs({ locale, crumbs }: BreadcrumbsProps) {
  const items = [{ label: locale === 'hi' ? 'होम' : 'Home', href: `/${locale}` }, ...crumbs];

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex items-center flex-wrap gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-gold/60" aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span className="text-charcoal/70" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-gold hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}