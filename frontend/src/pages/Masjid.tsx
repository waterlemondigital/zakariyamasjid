import React from 'react';
import { PrayerTimingsTable } from '../components/PrayerTimingsTable';
import { SectionDivider } from '../components/SectionDivider';
import { ArchFrame } from '../components/ArchFrame';
import { CTASection } from '../components/CTASection';
import { Calendar, Download, Sparkles, BookOpen, Clock } from 'lucide-react';

export const Masjid: React.FC = () => {

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#E8D08A] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#C9A227]">
            <Clock className="w-4 h-4 text-[#C9A227]" /> House of Worship
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C36]">
            Zakariya Masjid
          </h1>
          <p className="text-base md:text-lg text-[#22261F]/80">
            Daily Congregational Prayers, Jumu'ah Khutbahs, Qur'an Madrasa, and Live Broadcasts
          </p>
          <div className="w-20 h-1 bg-[#C9A227] mx-auto rounded-full mt-3"></div>
        </div>

        {/* 1. Main Prayer Timings Component */}
        <section>
          <PrayerTimingsTable />
        </section>

        {/* 2. Jumu'ah & Eid Announcements Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Jumu'ah Card */}
          <div className="bg-white p-8 rounded-3xl border-2 border-[#C9A227] shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#0F4C36] text-[#E8D08A] font-bold text-xs uppercase tracking-wider px-4 py-1 rounded-bl-2xl">
              Weekly Gathering
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#0F4C36]/10 text-[#0F4C36] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-[#C9A227]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0F4C36] mb-2">Friday Jumu'ah Schedule</h3>
            <div className="space-y-2 text-sm text-[#22261F] mt-4">
              <div className="flex items-center justify-between p-3 bg-[#FAF7F0] rounded-xl border border-[#C9A227]/20">
                <span className="font-semibold">1st Khutbah (Arabic &amp; Bayaan):</span>
                <span className="font-mono font-bold text-[#0F4C36]">01:15 PM</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#FAF7F0] rounded-xl border border-[#C9A227]/20">
                <span className="font-semibold">Jumu'ah Jamaat Namaz:</span>
                <span className="font-mono font-bold text-[#0F4C36]">01:45 PM</span>
              </div>
            </div>
            <p className="text-xs text-[#22261F]/70 mt-4 italic">
              * Dedicated wudu &amp; seating areas available for elders. Please park vehicles responsibly in designated zones.
            </p>
          </div>

          {/* Eid Announcements */}
          <div className="bg-[#0F4C36] text-white p-8 rounded-3xl border-2 border-[#C9A227] shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-[#C9A227] text-[#0F4C36] flex items-center justify-center mb-4 font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Ramadan &amp; Eid Announcements</h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Download the official Zakariya Masjid Ramadan calendar for Sehri and Iftar timings in Pune, MH.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#download-ramadan-pdf"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Zakariya Masjid Ramadan Calendar PDF download started!");
                }}
                className="px-5 py-3 rounded-xl bg-[#C9A227] text-[#0F4C36] font-bold text-xs uppercase tracking-wider hover:bg-[#E8D08A] transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Ramadan Calendar (PDF)
              </a>
            </div>
          </div>
        </div>



        {/* 5. Masjid Arch Gallery Strip */}
        <section className="space-y-6">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0F4C36] text-center">
            Masjid Architecture &amp; Facilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <ArchFrame>
              <img
                src="https://images.unsplash.com/photo-1542816417-0983cbe82752?q=80&w=800&auto=format&fit=crop"
                alt="Main Prayer Hall - Zakariya Masjid"
                className="w-full h-64 object-cover"
              />
            </ArchFrame>
            <ArchFrame>
              <img
                src="https://images.unsplash.com/photo-1590076175571-4b5459efb08c?q=80&w=800&auto=format&fit=crop"
                alt="Wudu Facilities & Courtyard"
                className="w-full h-64 object-cover"
              />
            </ArchFrame>
            <ArchFrame>
              <img
                src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop"
                alt="Qur'an Madrasa Classrooms"
                className="w-full h-64 object-cover"
              />
            </ArchFrame>
          </div>
        </section>

        <CTASection />
      </div>
    </div>
  );
};
