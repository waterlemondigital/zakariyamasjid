import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-[#22261F] border-t-4 border-[#D4AF37] relative overflow-hidden pt-14 pb-8 shadow-inner">
      {/* Subtle Islamic geometric pattern watermark */}
      <div className="absolute inset-0 islamic-pattern-subtle opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Islamic Bismillah Calligraphy Banner */}
        <div className="text-center pb-8 mb-10 border-b border-[#D4AF37]/30">
          <span className="font-arabic text-xl sm:text-2xl text-[#0F4C36] font-bold tracking-wider block">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <div className="w-24 h-0.5 gold-gradient-bg mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-[#D4AF37]/40">
          
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-4 space-y-4">
            <Logo className="h-16" variant="full" showSubtext={true} />
            <p className="font-serif italic text-base text-[#0F4C36] pt-1 font-semibold">
              "A House of Worship, A Trust of Service, A Place of Eternal Rest."
            </p>
            <p className="text-xs text-[#22261F]/80 leading-relaxed font-normal">
              Zakariya Masjid &amp; Kabristan in Mundhwa, Pune, is dedicated to Islamic worship, community welfare, Qur'an education, and dignified burial services.
            </p>
            <div className="pt-1 inline-flex items-center gap-2 text-xs font-bold text-[#0F4C36] bg-[#FAF7F0] border border-[#D4AF37]/60 px-3.5 py-1.5 rounded-full shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#B8860B]" /> Dedicated to Worship &amp; Community Service
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-lg text-[#0F4C36] uppercase tracking-wider border-b border-[#D4AF37]/40 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm font-medium text-[#22261F]/80">
              <li><Link to="/" className="hover:text-[#0F4C36] transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-[#0F4C36] transition-colors">About The Trust</Link></li>
              <li><Link to="/masjid" className="hover:text-[#0F4C36] transition-colors">Masjid &amp; Prayer Schedule</Link></li>
              <li><Link to="/kabristan" className="hover:text-[#0F4C36] transition-colors">Kabristan &amp; Burial Guidelines</Link></li>
              <li><Link to="/welfare-cases" className="hover:text-[#0F4C36] transition-colors font-bold text-[#0F4C36]">Verified Welfare Cases</Link></li>
              <li><Link to="/donate" className="hover:text-[#0F4C36] transition-colors flex items-center gap-1.5 font-bold text-[#0F4C36]"><Heart className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> Support Masjid</Link></li>
              <li><Link to="/contact" className="hover:text-[#0F4C36] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-serif font-bold text-lg text-[#0F4C36] uppercase tracking-wider border-b border-[#D4AF37]/40 pb-2">
              Location &amp; Contact
            </h4>
            <div className="space-y-3.5 text-xs md:text-sm text-[#22261F]/90 font-normal">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B8860B] flex-shrink-0 mt-0.5" />
                <span>
                  Zakariya Masjid &amp; Kabristan, Mundhwa, Off Koregaon Park, Pune, Maharashtra, India – 411001
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                <span>Mobile: <a href="tel:+919890185013" className="font-bold text-[#0F4C36] hover:underline">+91 98901 85013</a></span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#B8860B] flex-shrink-0" />
                <span>Email: <a href="mailto:contact@zakariyamasjid.org" className="hover:underline font-bold text-[#0F4C36]">contact@zakariyamasjid.org</a></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#22261F]/70 gap-4 font-medium">
          <div>
            © {new Date().getFullYear()} Zakariya Masjid &amp; Kabristan, Pune. All rights reserved.
          </div>

          <div className="text-center font-semibold text-[#0F4C36]">
            Made by <span className="text-[#B8860B] font-bold">WaterLemon Digital</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/policies" className="hover:text-[#0F4C36] transition-colors">
              Privacy Policy &amp; Terms
            </Link>
            <Link to="/transparency" className="hover:text-[#0F4C36] transition-colors">
              Legal Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
