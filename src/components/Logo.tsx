import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light';
  showSubtext?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = 'h-14', variant = 'full', showSubtext = true }) => {
  const isLight = variant === 'light';
  const isFull = variant === 'full' || variant === 'light';

  const textColor = isLight ? 'text-white' : 'text-[#0F4C36]';
  const subTextColor = isLight ? 'text-[#E8D08A]' : 'text-[#B8860B]';
  const goldColor = '#C9A227';
  const greenColor = '#0F4C36';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Emblem SVG */}
      <svg
        viewBox="0 0 300 300"
        className="h-full w-auto aspect-square flex-shrink-0 drop-shadow-sm"
        aria-label="Zakariya Masjid & Kabrastan Trust Emblem"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8D08A" />
            <stop offset="50%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#9A7B18" />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1C6B4A" />
            <stop offset="100%" stopColor="#0F4C36" />
          </linearGradient>
        </defs>

        {/* Outer Circular Gold Ring */}
        <circle cx="150" cy="115" r="102" fill="none" stroke="url(#goldGradient)" strokeWidth="3.5" />

        {/* Minaret on Left */}
        <path
          d="M 70 160 L 70 85 L 68 85 L 68 70 L 77 55 L 79 55 L 79 38 L 76 38 L 76 30 L 78 28 L 78 22 L 77 22 L 77 15 L 78 12 L 78 7 L 79.5 5 L 81 7 L 81 12 L 82 15 L 82 22 L 81 22 L 81 28 L 83 30 L 83 38 L 80 38 L 80 55 L 82 55 L 91 70 L 91 85 L 89 85 L 89 160 Z"
          fill="url(#greenGradient)"
        />
        {/* Minaret Crescent */}
        <path d="M 79.5 2 C 81 2 82 3 82 4.5 C 82 3.5 81 2.5 79.5 2.5 C 78 2.5 77 3.5 77 4.5 C 77 3 78 2 79.5 2 Z" fill="#C9A227" />

        {/* Main Central Mosque Dome */}
        <path
          d="M 105 150 C 105 90 120 70 150 55 C 180 70 195 90 195 150 Z"
          fill="url(#greenGradient)"
        />
        {/* Main Dome Crescent Finial */}
        <path
          d="M 150 42 C 153 42 155 44 155 47 C 155 45 153.5 43.5 150 43.5 C 146.5 43.5 145 45 145 47 C 145 44 147 42 150 42 Z"
          fill="#C9A227"
        />
        <line x1="150" y1="47" x2="150" y2="55" stroke="#C9A227" strokeWidth="2" />

        {/* Archway inside Main Mosque with Sujood Silhouette */}
        <path
          d="M 125 160 L 125 110 C 125 90 150 78 150 78 C 150 78 175 90 175 110 L 175 160 Z"
          fill="#FAF7F0"
        />
        <path
          d="M 128 160 L 128 112 C 128 94 150 83 150 83 C 150 83 172 94 172 112 L 172 160 Z"
          fill="none" stroke="url(#greenGradient)" strokeWidth="2"
        />
        {/* Figure in Sujood (Prayer) Silhouette */}
        <g fill={greenColor}>
          {/* Head */}
          <circle cx="140" cy="132" r="4.5" />
          {/* Torso & Arms in Sujood posture */}
          <path d="M 136 137 C 132 138 128 143 126 148 L 148 148 C 145 145 142 140 139 137 Z" />
          <path d="M 123 148 L 152 148 L 150 146 L 125 146 Z" />
          {/* Prayer Mat */}
          <line x1="120" y1="149" x2="158" y2="149" stroke="#C9A227" strokeWidth="1.5" />
        </g>

        {/* Tree on Right (Kabrastan motif) */}
        <g fill="url(#greenGradient)">
          <path d="M 220 160 Q 220 140 221 125 L 223 125 Q 224 140 224 160 Z" fill="#1C6B4A" />
          {/* Leaf Canopy */}
          <circle cx="210" cy="110" r="10" opacity="0.9" />
          <circle cx="225" cy="100" r="14" opacity="0.95" />
          <circle cx="238" cy="112" r="11" opacity="0.9" />
          <circle cx="222" cy="85" r="12" />
          <circle cx="205" cy="95" r="9" />
        </g>

        {/* Gravestones on Right */}
        <path d="M 198 160 L 198 135 C 198 128 206 128 206 135 L 206 160 Z" fill="url(#greenGradient)" />
        <path d="M 242 160 L 242 140 C 242 135 248 135 248 140 L 248 160 Z" fill="url(#greenGradient)" stroke="#C9A227" strokeWidth="0.5" />
        <path d="M 252 160 L 252 144 C 252 140 257 140 257 144 L 257 160 Z" fill="url(#greenGradient)" opacity="0.8" />

        {/* Base Hill Ground Curve */}
        <path d="M 45 160 Q 150 178 255 160 Q 150 168 45 160 Z" fill="url(#greenGradient)" />

        {/* Text Section in Logo */}
        {isFull && (
          <g>
            {/* ZAKARIYA */}
            <text
              x="150"
              y="205"
              textAnchor="middle"
              fill={isLight ? '#FFFFFF' : '#0F4C36'}
              fontFamily="Playfair Display, serif"
              fontWeight="800"
              fontSize="30"
              letterSpacing="3"
            >
              ZAKARIYA
            </text>

            {/* MASJID & KABRASTAN TRUST */}
            <text
              x="150"
              y="230"
              textAnchor="middle"
              fill={isLight ? '#E8D08A' : '#1C6B4A'}
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              fontSize="12.5"
              letterSpacing="2.5"
            >
              MASJID &amp; KABRASTAN TRUST
            </text>

            {/* Gold Ornamental Divider */}
            <path
              d="M 80 242 L 130 242 Q 150 246 170 242 L 220 242"
              stroke={goldColor}
              strokeWidth="1.2"
              fill="none"
            />
            <polygon points="150,239 154,242 150,245 146,242" fill={goldColor} />

            {/* Badges: MASJID & KABRASTAN */}
            <g transform="translate(68, 252)">
              <circle cx="12" cy="12" r="10" fill={greenColor} />
              {/* Masjid icon inside badge */}
              <path d="M 8 16 L 8 11 C 8 8 12 7 12 7 C 12 7 16 8 16 11 L 16 16 Z" fill="#FFFFFF" />
              <text x="28" y="16" fill={isLight ? '#FFFFFF' : '#0F4C36'} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1">
                MASJID
              </text>
            </g>

            <line x1="148" y1="256" x2="148" y2="272" stroke={goldColor} strokeWidth="1" opacity="0.6" />

            <g transform="translate(158, 252)">
              <circle cx="12" cy="12" r="10" fill={greenColor} />
              {/* Kabrastan tomb icon inside badge */}
              <path d="M 8 17 L 8 11 C 8 9 16 9 16 11 L 16 17 Z" fill="#FFFFFF" />
              <text x="28" y="16" fill={isLight ? '#FFFFFF' : '#0F4C36'} fontFamily="Inter, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1">
                KABRASTAN
              </text>
            </g>
          </g>
        )}
      </svg>

      {/* Side Typography Text for Navbar / Full layout */}
      {showSubtext && (
        <div className="flex flex-col justify-center">
          <span className={`font-serif font-extrabold tracking-wider leading-none text-lg md:text-xl ${textColor}`}>
            ZAKARIYA
          </span>
          <span className={`text-[10px] sm:text-xs font-bold tracking-widest uppercase mt-0.5 ${subTextColor}`}>
            Masjid &amp; Kabristan Trust
          </span>
          <span className="text-[9px] text-[#B8860B] tracking-wider font-semibold flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Mundhwa, Off Koregaon Park, Pune
          </span>
        </div>
      )}
    </div>
  );
};

