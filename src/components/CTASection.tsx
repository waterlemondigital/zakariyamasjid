import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Support Zakariya Masjid & Kabrastan Trust",
  description = "Your generous Sadaqah and Zakat ensure the dignified preservation of our sacred house of Allah and cemetery grounds for generations to come.",
  buttonText = "Donate Now",
  buttonLink = "/donate",
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0F4C36] text-white border-2 border-[#D4AF37] p-8 md:p-12 shadow-2xl my-12 animate-pulse-gold">
      {/* Background Subtle Geometry Overlay */}
      <div className="absolute inset-0 islamic-pattern-dark opacity-40 pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5">
        <div className="inline-flex items-center gap-2 gold-gradient-bg text-[#0F4C36] font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
          <Heart className="w-3.5 h-3.5 fill-current" /> Non-Profit Registered Trust
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          {title}
        </h2>

        <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
          {description}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={buttonLink}
            className="btn-islamic-gold px-8 py-4 rounded-xl text-base flex items-center gap-2"
          >
            {buttonText} <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/transparency"
            className="px-6 py-4 rounded-xl border-1.5 border-[#D4AF37] hover:bg-white/10 text-[#F3E5AB] font-semibold text-sm transition-all"
          >
            Read Transparency Report
          </Link>
        </div>
      </div>
    </div>
  );
};
