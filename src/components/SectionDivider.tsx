import React from 'react';

interface SectionDividerProps {
  className?: string;
  variant?: 'gold' | 'light' | 'green';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ className = '', variant = 'gold' }) => {
  const color = variant === 'light' ? '#FAF7F0' : variant === 'green' ? '#0F4C36' : '#D4AF37';

  return (
    <div className={`flex items-center justify-center my-8 md:my-12 px-4 ${className}`}>
      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37] opacity-70"></div>
      
      {/* Central 8-Point Star Geometric Motif (Rub el Hizb) */}
      <div className="mx-4 flex items-center justify-center text-[#D4AF37] drop-shadow-sm">
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Square 1 */}
          <rect x="8" y="8" width="24" height="24" stroke={color} strokeWidth="1.5" fill="none" />
          {/* Square 2 rotated 45 deg */}
          <rect x="8" y="8" width="24" height="24" stroke={color} strokeWidth="1.5" fill="none" transform="rotate(45 20 20)" />
          {/* Inner Circle */}
          <circle cx="20" cy="20" r="4" fill={color} />
        </svg>
      </div>

      <div className="h-[1px] flex-1 max-w-xs bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37] opacity-70"></div>
    </div>
  );
};
