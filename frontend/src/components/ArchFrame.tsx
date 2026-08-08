import React from 'react';

interface ArchFrameProps {
  children: React.ReactNode;
  className?: string;
  goldBorder?: boolean;
  shadow?: boolean;
}

export const ArchFrame: React.FC<ArchFrameProps> = ({
  children,
  className = '',
  goldBorder = true,
  shadow = true,
}) => {
  return (
    <div className={`relative group ${shadow ? 'drop-shadow-lg' : ''} ${className}`}>
      {/* Outer Arch Frame Container */}
      <div
        className={`overflow-hidden arch-top bg-white transition-all duration-300 ${
          goldBorder ? 'border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]' : ''
        }`}
      >
        {children}
      </div>
      {/* Decorative Gold Arch Ring / Highlight Line */}
      {goldBorder && (
        <div className="absolute inset-0 pointer-events-none rounded-t-[120px] border border-[#D4AF37]/30 m-1.5 transition-colors group-hover:border-[#D4AF37]/60"></div>
      )}
    </div>
  );
};
