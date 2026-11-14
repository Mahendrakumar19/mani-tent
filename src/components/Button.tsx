import Link from 'next/link';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

/**
 * Unified Button component for consistent CTA styling across the site.
 * Supports both link and button behaviors with multiple visual variants.
 * Features Apple-inspired refined transitions and shadows.
 */
export default function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 inline-flex items-center justify-center cursor-pointer';

  const variants = {
    primary: 'bg-gold text-charcoal hover:bg-gold/90 hover:shadow-2xl hover:shadow-gold/30 hover:scale-[1.02] shadow-lg shadow-gold/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
    secondary: 'border-2 border-white/70 text-white hover:bg-white/15 hover:border-white hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
    dark: 'bg-charcoal text-white hover:bg-charcoal/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}