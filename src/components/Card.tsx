import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  icon?: string | ReactNode;
  title: string;
  description: string | ReactNode;
  hoverable?: boolean;
  className?: string;
}

/**
 * Clean, self-contained card. Hover effects use `hover:` (not `group-hover:`)
 * so they work regardless of the parent layout.
 */
export default function Card({
  icon,
  title,
  description,
  hoverable = true,
  className = '',
}: CardProps) {
  const renderIcon = () => {
    if (icon === undefined || icon === null) return null;
    if (typeof icon === 'string' || typeof icon === 'number') {
      return (
        <span className="font-playfair text-2xl font-semibold text-gold">{icon}</span>
      );
    }
    return icon;
  };

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col rounded-2xl border border-gold/15 bg-white p-7 md:p-8 shadow-sm',
        hoverable &&
          'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-xl',
        className
      )}
    >
      {icon !== undefined && icon !== null && (
        <div
          className={cn(
            'mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10',
            hoverable && 'transition-colors duration-300 group-hover:bg-gold/20'
          )}
        >
          {renderIcon()}
        </div>
      )}

      <h3 className="font-playfair text-xl font-semibold text-charcoal mb-3">
        {title}
      </h3>

      <div className="text-[15px] leading-relaxed text-charcoal/70">
        {description}
      </div>

      {/* Gold accent that grows on hover */}
      <span
        className={cn(
          'pointer-events-none absolute bottom-0 left-7 right-7 h-px origin-left scale-x-0 bg-gold/50',
          hoverable && 'transition-transform duration-500 group-hover:scale-x-100'
        )}
        aria-hidden="true"
      />
    </div>
  );
}
