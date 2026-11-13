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
 * Reusable Card component for consistent card styling across the site.
 * Used for reasons, features, menu items, and other grouped content.
 *
 * @param icon - Emoji, number, or ReactNode icon
 * @param title - Card title (supports Playfair font styling)
 * @param description - Card description text
 * @param hoverable - Enable hover effects and lift animation (default: true)
 * @param className - Additional Tailwind classes
 */
export default function Card({
  icon,
  title,
  description,
  hoverable = true,
  className = '',
}: CardProps) {
  const hoverClasses = hoverable
    ? 'hover:shadow-xl hover:border-gold/30 transition-all duration-300 group hover:translate-y-[-4px]'
    : '';

  return (
    <div
      className={cn(
        'bg-white rounded-xl p-7 sm:p-6 md:p-8',
        'border border-beige/50 shadow-md',
        hoverClasses,
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center mb-5',
            'bg-gradient-to-br from-gold/20 to-gold/10',
            hoverable && 'group-hover:bg-gold/20 transition-colors'
          )}
        >
          {typeof icon === 'string' ? (
            <span className="text-gold font-playfair text-2xl font-bold">
              {icon}
            </span>
          ) : (
            icon
          )}
        </div>
      )}

      <h3
        className={cn(
          'font-playfair text-lg font-semibold text-charcoal mb-3',
          hoverable && 'group-hover:text-gold transition-colors'
        )}
      >
        {title}
      </h3>

      <p className="text-sm text-charcoal/75 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
