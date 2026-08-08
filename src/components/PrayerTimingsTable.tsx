import React from 'react';
import { Clock, Sparkles } from 'lucide-react';

export const PrayerTimingsTable: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border-2 border-[#D4AF37]/50 shadow-lg overflow-hidden max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-[#0F4C36] text-white p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#D4AF37]">
        <div>
          <div className="flex items-center gap-2 text-[#F3E5AB] text-xs font-semibold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Congregational Prayer Timings
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold">Prayer Schedule</h3>
          <p className="text-xs md:text-sm text-white/80 mt-1">
            Zakariya Masjid, Mundhwa, Off Koregaon Park, Pune
          </p>
        </div>

        <div className="bg-[#1C6B4A] border border-[#D4AF37] px-4 py-2 rounded-xl text-center shadow-inner flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs text-[#F3E5AB] font-bold">Mundhwa, Pune</span>
        </div>
      </div>

      {/* Specified Timings Grid */}
      <div className="p-6 md:p-8 bg-[#FAF7F0] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zuhr Prayer Card */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/60 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] block mb-1">Daily Namaz</span>
              <h4 className="font-serif text-2xl font-bold text-[#0F4C36]">Zuhr Jamaat</h4>
              <p className="text-xs text-[#22261F]/70 mt-1">Daily Congregational Prayer</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-4 py-2.5 rounded-xl bg-[#0F4C36] text-[#F3E5AB] font-mono font-bold text-xl md:text-2xl shadow-inner border border-[#D4AF37]">
                1:20 PM
              </span>
            </div>
          </div>

          {/* Jumu'ah Prayer Card */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/60 shadow-sm space-y-3">
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
          * Please arrive 10 minutes prior to Jamaat time. Turn off mobile phones inside the prayer hall.
        </div>
      </div>
    </div>
  );
};

