import React from 'react';
import { ShieldCheck, Award, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface TrustBadgeProps {
  title: string;
  subtitle?: string;
  type?: 'registered' | 'nonprofit' | 'audited' | 'shariah';
  className?: string;
}

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  title,
  subtitle,
  type = 'registered',
  className = '',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'registered':
        return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
      case 'nonprofit':
        return <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />;
      case 'audited':
        return <Award className="w-5 h-5 text-[#D4AF37]" />;
      case 'shariah':
        return <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />;
    }
  };

  return (
    <div className={`flex items-center gap-3 p-3.5 rounded-xl bg-white/90 border border-[#D4AF37]/40 shadow-sm hover:border-[#D4AF37] transition-all ${className}`}>
      <div className="w-10 h-10 rounded-full bg-[#0F4C36] flex items-center justify-center flex-shrink-0 border border-[#D4AF37] shadow-sm">
        {getIcon()}
      </div>
      <div>
        <h4 className="font-serif font-bold text-[#0F4C36] text-sm leading-snug">{title}</h4>
        {subtitle && <p className="text-xs text-[#22261F]/70">{subtitle}</p>}
      </div>
    </div>
  );
};
