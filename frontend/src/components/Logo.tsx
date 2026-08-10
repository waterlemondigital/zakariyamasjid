import React from 'react';
import logoImg from '../../assets/images/masjidlogo.png';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light';
  showSubtext?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-10 sm:h-12 md:h-14', variant = 'full', showSubtext = true }) => {
  const isLight = variant === 'light';

  const textColor = isLight ? 'text-white' : 'text-[#0F4C36]';
  const subTextColor = isLight ? 'text-[#E8D08A]' : 'text-[#B8860B]';

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 select-none flex-shrink-0 ${className}`}>
      {/* Official Masjid Logo Image */}
      <img
        src={logoImg}
        alt="Zakariya Masjid & Kabristan Trust Logo"
        className="h-full w-auto object-contain flex-shrink-0 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
      />

      {/* Side Typography Text — hidden on lg to avoid overlap with nav links, shown on xl+ and below lg */}
      {showSubtext && (
        <div className="flex flex-col justify-center flex-shrink-0 lg:hidden xl:flex">
          <span className={`font-serif font-extrabold tracking-wider leading-none text-base sm:text-lg md:text-xl ${textColor}`}>
            ZAKARIYA
          </span>
          <span className={`text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wider uppercase mt-0.5 whitespace-nowrap ${subTextColor}`}>
            Masjid &amp; Kabristan Trust
          </span>
          <span className="hidden 2xl:flex text-[9px] text-[#B8860B] tracking-wider font-semibold items-center gap-1 mt-0.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0"></span> Mundhwa, Pune
          </span>
        </div>
      )}
    </div>
  );
};
