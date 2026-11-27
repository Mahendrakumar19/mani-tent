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
      className={cn('py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8', className)}
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
  const isCenter = align === 'center';
  const isDark = variant === 'dark';

  return (
    <div className={cn('mb-12 md:mb-16', isCenter && 'mx-auto max-w-3xl text-center')}>
      {eyebrow && (
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {isCenter ? (
            <span className="flex w-full items-center justify-center gap-3">
              <span className="h-px w-8 bg-gold/40" />
              {eyebrow}
              <span className="h-px w-8 bg-gold/40" />
            </span>
          ) : (
            <>
              <span className="h-px w-8 bg-gold/40" />
              {eyebrow}
            </>
          )}
        </p>
      )}

      <h2
        className={cn(
          'font-inter font-semibold text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.02em]',
          isDark ? 'text-ivory' : 'text-charcoal'
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            'mt-4 md:mt-5 text-base md:text-lg leading-relaxed',
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl',
            isDark ? 'text-ivory/70' : 'text-charcoal/65'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
