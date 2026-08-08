import React from 'react';

interface StatCounterProps {
  value: string;
  label: string;
  sublabel?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({ value, label, sublabel }) => {
  return (
    <div className="text-center p-6 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm relative overflow-hidden group hover:border-[#D4AF37] hover:shadow-md transition-all">
      <div className="absolute top-0 left-0 right-0 h-1 gold-gradient-bg"></div>
      <div className="font-serif font-extrabold text-3xl lg:text-4xl text-[#0F4C36] mb-1 group-hover:scale-105 transition-transform">
        {value}
      </div>
      <div className="font-medium text-[#22261F] text-sm md:text-base">{label}</div>
      {sublabel && <div className="text-xs text-[#22261F]/60 mt-0.5">{sublabel}</div>}
    </div>
  );
};
