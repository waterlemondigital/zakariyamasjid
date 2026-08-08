import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenId, className = '' }) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-[#D4AF37]/40 rounded-xl overflow-hidden bg-white shadow-sm transition-colors hover:border-[#D4AF37]"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left font-serif font-bold text-base md:text-lg text-[#0F4C36] hover:bg-[#FAF7F0] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                {item.icon && <span className="text-[#D4AF37]">{item.icon}</span>}
                <span>{item.title}</span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[#D4AF37] transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="p-4 md:p-6 pt-2 md:pt-2 border-t border-[#FAF7F0] bg-[#FAF7F0]/40 text-[#22261F] text-sm md:text-base leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
