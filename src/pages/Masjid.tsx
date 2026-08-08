import React from 'react';
import { PrayerTimingsTable } from '../components/PrayerTimingsTable';
import { SectionDivider } from '../components/SectionDivider';
import { ArchFrame } from '../components/ArchFrame';
import { CTASection } from '../components/CTASection';
import { Radio, Calendar, Download, Volume2, Sparkles, Video, PlayCircle, BookOpen, Clock } from 'lucide-react';

export const Masjid: React.FC = () => {
  const khutbahArchive = [
    { id: '1', title: 'The Character of a Believer in Times of Trial', speaker: 'Maulana Mohammad Zubair', date: 'August 1, 2026', topic: 'Islamic Ethics & Morality' },
    { id: '2', title: 'Rights of Neighbors & Community Harmony in Sunnah', speaker: 'Mufti Mohammad Ismail', date: 'July 25, 2026', topic: 'Social Obligations (Huqooq-ul-Ibad)' },
    { id: '3', title: 'The Importance of Seeking Halal Sustenance', speaker: 'Maulana Abdul Qayum', date: 'July 18, 2026', topic: 'Earning & Trade in Islam' },
    { id: '4', title: 'Preparing Heart and Soul for the Hereafter', speaker: 'Maulana Mohammad Zubair', date: 'July 11, 2026', topic: 'Tazkiyah & Spiritual Purification' },
  ];

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

        <SectionDivider />

        {/* 3. Live Streaming Section */}
        <section className="bg-white rounded-3xl border-2 border-[#C9A227]/40 p-8 md:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                <Radio className="w-3.5 h-3.5" /> Live Broadcast Feed
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#0F4C36]">
                Watch Live Streamed Khutbahs &amp; Programs
              </h2>
              <p className="text-sm text-[#22261F]/80 leading-relaxed">
                For community members unable to attend in person — including sisters, unwell elders, and travelers — Zakariya Masjid broadcasts Friday Jumu'ah lectures and special Ramadan discourses live online.
              </p>
              <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#C9A227]/30 text-xs space-y-2">
                <div className="font-bold text-[#0F4C36]">Next Scheduled Live Broadcast:</div>
                <div className="text-[#22261F]">Friday Jumu'ah Khutbah • This Friday @ 01:15 PM IST</div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C9A227] bg-black aspect-video flex flex-col items-center justify-center text-white p-6 shadow-2xl">
                <Video className="w-16 h-16 text-[#C9A227] mb-3 opacity-80" />
                <h4 className="font-serif font-bold text-xl text-center">Zakariya Masjid Official Live Stream</h4>
                <p className="text-xs text-white/70 text-center max-w-sm mt-1">
                  [YouTube / Facebook Live Broadcast Player Placeholder]
                </p>
                <button
                  onClick={() => alert("Connecting to Zakariya Masjid Live Video Stream...")}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#C9A227] text-[#0F4C36] font-bold text-xs uppercase tracking-wider hover:bg-[#E8D08A] transition-colors flex items-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" /> Start Live Stream
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Khutbah Archive */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#C9A227]/30 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                Knowledge &amp; Reflection
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0F4C36]">
                Khutbah &amp; Discourse Archive
              </h2>
            </div>
            <span className="text-xs text-[#22261F]/70">Listen or download past Friday khutbah recordings</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {khutbahArchive.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl border border-[#C9A227]/30 hover:border-[#C9A227] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#22261F]/60 mb-2">
                    <span className="font-bold text-[#C9A227]">{item.topic}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-lg text-[#0F4C36] mb-1">{item.title}</h4>
                  <p className="text-xs text-[#22261F]/80">Speaker: {item.speaker}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => alert(`Playing audio recording: ${item.title}`)}
                    className="font-bold text-[#0F4C36] hover:text-[#C9A227] flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4 text-[#C9A227]" /> Listen Audio
                  </button>
                  <button
                    onClick={() => alert(`Downloading transcript for: ${item.title}`)}
                    className="text-[#22261F]/60 hover:text-[#0F4C36] flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Notes (PDF)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

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
