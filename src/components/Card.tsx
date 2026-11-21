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
 * Features Apple-inspired glassmorphism with subtle frost effects.
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
    ? 'group-hover:translate-y-[-6px] group-hover:shadow-2xl group-hover:border-gold/30 group-hover:bg-white/95 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]'
    : '';

  return (
    <div
      className={cn(
        'bg-white/90 backdrop-blur-2xl rounded-2xl p-8 sm:p-6 md:p-8 border border-gold/20 shadow-2xl overflow-hidden',
        hoverClasses,
        'hover:shadow-gold/20 transition-shadow duration-500',
        className
      )}
    >
      {icon && (
        <div
          className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto',
            'bg-gold/5',
            'transition-colors duration-300',
            hoverable && 'group-hover:bg-gold/15'
          )}
        >
          {typeof icon === 'string' ? (
            <span className="text-gold/80 font-playfair text-3xl font-semibold">
              {icon}
            </span>
          ) : (
            icon
          )}
        </div>
      )}

      <h3
        className={cn(
          'font-playfair text-xl font-semibold text-charcoal mb-4 tracking-tight',
          hoverable && 'group-hover:text-gold transition-colors'
        )}
      >
        {title}
      </h3>

      <p className="text-base text-charcoal/75 leading-relaxed md:text-lg">
        {description}
      </p>

      <div className="mt-8 pt-8 border-t border-gold/20 opacity-60">
        <span className="inline-block w-full h-1 rounded-full bg-gold/30" />
      </div>
    </div>
  );
}