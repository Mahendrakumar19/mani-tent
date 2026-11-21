'use client';

import Link from 'next/link';
import { ReactNode, useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'gold';
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
 * Premium Button with cursor-following glow, shimmer sweep and refined easing.
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
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  };

  const baseStyles =
    'group relative font-semibold rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] inline-flex items-center justify-center cursor-pointer overflow-hidden';

  const variants = {
    primary:
      'bg-gold text-charcoal shadow-lg shadow-gold/20 hover:shadow-2xl hover:shadow-gold/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
    gold:
      'bg-transparent border-2 border-gold text-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'border-2 border-white/70 text-white hover:bg-white/15 hover:border-white hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
    dark:
      'bg-charcoal text-white hover:bg-charcoal/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed',
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-sm min-h-[40px]',
    md: 'px-8 py-4 text-base min-h-[48px]',
    lg: 'px-10 py-5 text-lg min-h-[56px]',
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Cursor-following glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle 60px at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.35), transparent 70%)`,
          opacity: glow.active ? 1 : undefined,
        }}
      />
      {/* Shimmer sweep */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
      >
        {inner}
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
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
    >
      {inner}
    </button>
  );
}
