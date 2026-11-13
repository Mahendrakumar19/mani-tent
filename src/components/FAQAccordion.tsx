'use client';

import { useState } from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  // First item opens by default for better UX

  return (
    <div className="divide-y divide-beige/40 border border-beige/50 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="group">
            <button
              type="button"
              className="w-full flex items-center justify-between text-left py-5 px-6 bg-white hover:bg-gold/3 transition-colors duration-300 group-hover:bg-gold/2"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-semibold text-charcoal/90 pr-6 text-base leading-tight group-hover:text-charcoal transition-colors">
                {item.q}
              </span>
              <svg
                className={`w-6 h-6 text-gold/70 transition-all duration-500 flex-shrink-0 group-hover:text-gold ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${  isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="px-6 pb-5 pt-2 text-base text-charcoal/80 leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}