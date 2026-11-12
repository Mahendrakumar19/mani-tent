import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-label'?: string;
}

export function Section({ children, className, id, 'aria-label': ariaLabel }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 transition-colors duration-300', className)}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-16 lg:mb-20', align === 'center' && 'text-center max-w-3xl mx-auto')}>
      {eyebrow && (
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-gold/80 mb-4 md:mb-6 animate-fade-in">
          {eyebrow}
        </p>
      )}
      <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight animate-fade-in-delay">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 md:mt-6 lg:mt-8 text-base md:text-lg text-brown/70 leading-relaxed max-w-2xl animate-fade-in-delay-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}