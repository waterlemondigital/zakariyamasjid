import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, ChevronDown, ShieldCheck, MapPin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-white text-[#22261F]">
      {/* Background Image Layer with White Light Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542816417-0983cbe82752?q=80&w=1920&auto=format&fit=crop"
          alt="Zakariya Masjid Mosque Interior & Archway"
          className="w-full h-full object-cover filter blur-[2px] opacity-10 scale-105 transform transition-transform duration-10000"
        />
        {/* Soft White Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/95"
        ></div>
        {/* Faint Islamic Pattern Texture */}
        <div className="absolute inset-0 islamic-pattern-subtle opacity-40"></div>
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 md:pt-28 pb-16 my-auto flex flex-col items-center">
        
        {/* Bismillah Calligraphy Accent */}
        <div className="mb-4">
          <span className="font-arabic text-2xl md:text-3xl text-[#0F4C36] tracking-wider font-bold drop-shadow-sm">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <div className="w-20 h-0.5 gold-gradient-bg mx-auto mt-2 rounded-full"></div>
        </div>

        {/* Small Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FAF7F0] border-2 border-[#D4AF37]/60 text-[#0F4C36] text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-md">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Zakariya Masjid &amp; Kabristan • Mundhwa, Pune</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4">
          <span className="text-[#0F4C36]">Zakariya Masjid &amp;</span> <br className="hidden sm:inline" />
          <span className="gold-metallic-text">Kabrastan Trust</span>
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-lg sm:text-2xl text-[#22261F]/80 max-w-3xl mx-auto mb-8 font-medium">
          "A House of Worship, A Trust of Service, A Place of Eternal Rest."
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10">
          <Link
            to="/donate"
            className="btn-islamic-gold px-8 py-4 rounded-xl text-base md:text-lg uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-xl"
          >
            <Heart className="w-5 h-5 fill-current" /> Donate Now
          </Link>

          <Link
            to="/masjid"
            className="btn-islamic-green px-8 py-4 rounded-xl text-base md:text-lg uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-xl"
          >
            <Clock className="w-5 h-5 text-[#D4AF37]" /> Prayer Timings
          </Link>
        </div>

        {/* Location Subtext */}
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[#0F4C36] bg-[#FAF7F0] px-5 py-2.5 rounded-full border border-[#D4AF37]/50 shadow-md">
          <MapPin className="w-4 h-4 text-[#B8860B]" /> Ghorpadi Gaon, Off Koregaon Park, Pune – 411001
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 animate-bounce">
          <a href="#home-about" className="text-[#0F4C36]/70 hover:text-[#B8860B] transition-colors" aria-label="Scroll down">
            <ChevronDown className="w-8 h-8 mx-auto" />
          </a>
        </div>
      </div>

      {/* Live-style Info Ticker Bar below Hero */}
      <div className="relative z-20 bg-[#0F4C36] border-t-2 border-[#D4AF37] py-3.5 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm font-medium">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
            </span>
            <span className="text-[#F3E5AB] font-bold uppercase tracking-wider">Next Jamaat:</span>
            <span className="text-white font-semibold">Zuhr Namaz @ 01:15 PM</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-white/80">
            <span>Fajr: 05:45 AM</span>
            <span>Asr: 05:30 PM</span>
            <span>Maghrib: 07:12 PM</span>
            <span>Isha: 08:50 PM</span>
          </div>

          <Link
            to="/masjid"
            className="text-[#F3E5AB] font-bold hover:underline flex items-center gap-1 uppercase tracking-wider text-xs"
          >
            Full Namaz Schedule →
          </Link>
        </div>
      </div>
    </section>
  );
};
