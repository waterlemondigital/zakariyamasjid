import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, ChevronDown, ShieldCheck, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0a2e1f] text-white">
      {/* Background Image Layer with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/zakariyabg.jpeg"
          alt="Zakariya Masjid Jumu'ah Congregation in Mundhwa, Pune"
          className="w-full h-full object-cover scale-105"
        />
        {/* Dark gradient overlay — keeps the image visible while ensuring text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#0a2e1f]/80 via-[#0a2e1f]/65 to-[#0a2e1f]/85"
        ></div>
        {/* Subtle gold pattern texture on top */}
        <div className="absolute inset-0 islamic-pattern-dark opacity-20"></div>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 md:pt-28 pb-16 my-auto flex flex-col items-center">
        
        {/* Bismillah Calligraphy Accent */}
        <div className="mb-4">
          <span className="font-arabic text-2xl md:text-3xl text-[#F3E5AB] tracking-wider font-bold drop-shadow-lg">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <div className="w-20 h-0.5 gold-gradient-bg mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Small Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-[#D4AF37]/60 text-[#F3E5AB] text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Zakariya Masjid &amp; Kabristan • Mundhwa, Pune</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4 drop-shadow-lg">
          <span className="text-white">Zakariya Masjid &amp;</span> <br className="hidden sm:inline" />
          <span className="gold-metallic-text">Kabrastan Trust</span>
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-lg sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8 font-medium drop-shadow-md">
          "A House of Worship, A Trust of Service, A Place of Eternal Rest."
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10">
          <Link
            to="/donate"
            className="btn-islamic-gold px-8 py-4 rounded-xl text-base md:text-lg uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Heart className="w-5 h-5 fill-current" /> Donate Now
          </Link>

          <Link
            to="/masjid"
            className="btn-islamic-green px-8 py-4 rounded-xl text-base md:text-lg uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl border-2 border-[#D4AF37]"
          >
            <Clock className="w-5 h-5 text-[#D4AF37]" /> Prayer Timings
          </Link>
        </div>

        {/* Location Subtext */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[#F3E5AB] bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-[#D4AF37]/50 shadow-lg">
          <MapPin className="w-4 h-4 text-[#D4AF37]" /> Ghorpadi Gaon, Off Koregaon Park, Pune – 411001
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 animate-bounce">
          <a href="#home-about" className="text-[#D4AF37]/80 hover:text-[#F3E5AB] transition-colors" aria-label="Scroll down">
            <ChevronDown className="w-8 h-8 mx-auto" />
          </a>
        </div>
      </div>

    </section>
  );
};
