'use client';

import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={cn('max-w-3xl mx-auto space-y-4', className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              'bg-white/90 backdrop-blur-xl rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
              isOpen
                ? 'border-gold/50 shadow-xl shadow-gold/10'
                : 'border-gold/15 hover:border-gold/30 hover:shadow-lg'
            )}
          >
            <button
              type="button"
              onClick={() => handleToggle(index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  'font-playfair font-semibold text-base md:text-lg transition-colors duration-300',
                  isOpen ? 'text-gold' : 'text-charcoal'
                )}
              >
                {item.q}
              </span>
              <svg
                className={cn(
                  'w-6 h-6 flex-shrink-0 text-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  isOpen ? 'rotate-180' : 'rotate-0'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={cn(
                'grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-base text-charcoal/80 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
