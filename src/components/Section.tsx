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
  variant?: 'light' | 'dark';
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  variant = 'light',
}: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 md:mb-16 lg:mb-20', align === 'center' && 'text-center max-w-3xl mx-auto')}>
      {eyebrow && (
        <p className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-gold mb-4 md:mb-6 animate-fade-in">
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        'font-playfair text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight animate-fade-in-delay',
        variant === 'dark' ? 'text-white' : 'text-charcoal'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 md:mt-6 lg:mt-8 text-base md:text-lg leading-relaxed max-w-2xl animate-fade-in-delay-2',
          variant === 'dark' ? 'text-white/90' : 'text-charcoal/80'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}