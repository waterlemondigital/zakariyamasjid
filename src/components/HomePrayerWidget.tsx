import React from 'react';
import { Clock, Calendar, MapPin, Sparkles } from 'lucide-react';

export const HomePrayerWidget: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border-2 border-[#D4AF37] shadow-xl overflow-hidden max-w-4xl mx-auto">
      {/* Widget Header */}
      <div className="bg-[#0F4C36] text-white p-6 relative overflow-hidden text-center md:text-left">
        <div className="absolute inset-0 islamic-pattern-dark opacity-30 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#F3E5AB] text-xs font-bold uppercase tracking-widest mb-1">
              <Calendar className="w-4 h-4 text-[#D4AF37]" /> Zakariya Masjid Jamaat Timings
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold">Prayer Schedule</h3>
            <p className="text-xs text-white/80 mt-1 flex items-center justify-center md:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Zakariya Masjid &amp; Kabristan, Mundhwa, Off Koregaon Park, Pune
            </p>
          </div>

          <div className="bg-[#1C6B4A] border-2 border-[#D4AF37] px-4 py-2.5 rounded-2xl text-center shadow-lg">
            <div className="text-[10px] text-[#F3E5AB] font-bold uppercase tracking-wider">Location</div>
            <div className="font-serif font-bold text-sm text-white">Mundhwa, Pune</div>
          </div>
        </div>
      </div>

      {/* Main Prayer Timings Cards */}
      <div className="p-6 md:p-8 bg-[#FAF7F0] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zuhr Prayer Card */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/60 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] block mb-1">Daily Namaz</span>
              <h4 className="font-serif text-2xl font-bold text-[#0F4C36]">Zuhr Jamaat</h4>
              <p className="text-xs text-[#22261F]/70 mt-1">Daily Congregational Prayer</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-4 py-2 rounded-xl bg-[#0F4C36] text-[#F3E5AB] font-mono font-bold text-xl md:text-2xl shadow-inner border border-[#D4AF37]">
                1:20 PM
              </span>
            </div>
          </div>

          {/* Jumu'ah Friday Prayer Card */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/60 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h4 className="font-serif text-xl font-bold text-[#0F4C36]">Jumu'ah Prayer</h4>
              </div>
              <span className="text-xs font-bold text-[#B8860B] uppercase bg-[#FAF7F0] px-2.5 py-1 rounded-md border border-[#D4AF37]/40">Friday</span>
            </div>

            <div className="space-y-2 pt-1 font-sans text-sm">
              <div className="flex items-center justify-between p-2.5 bg-[#FAF7F0] rounded-xl border border-[#D4AF37]/30">
                <span className="font-bold text-[#0F4C36]">First Jamaat:</span>
                <span className="font-mono font-bold text-[#0F4C36] text-base">1:15 PM</span>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-[#FAF7F0] rounded-xl border border-[#D4AF37]/30">
                <span className="font-bold text-[#0F4C36]">Second Jamaat:</span>
                <span className="font-mono font-bold text-[#B8860B] text-base">1:45 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-[#22261F]/70 italic pt-2">
          * Note: Prayer timings are subject to change as per seasonal requirements. Please arrive 10 minutes before Jamaat.
        </div>
      </div>
    </div>
  );
};

