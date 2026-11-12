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

  return (
    <div className="divide-y divide-beige border border-beige rounded-lg overflow-hidden bg-white shadow-sm">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="group">
            <button
              type="button"
              className="w-full flex items-center justify-between text-left py-4 px-5 bg-white hover:bg-ivory/60 transition-colors"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="font-medium text-charcoal pr-4">
                {item.q}
              </span>
              <svg
                className={`w-5 h-5 text-gold transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <p className="px-5 pb-4 text-sm text-brown/80 leading-relaxed">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}