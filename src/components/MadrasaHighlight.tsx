import React from 'react';
import { BookOpen, Users, Clock, CheckCircle2, Award, Sparkles, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MadrasaHighlight: React.FC = () => {
  return (
    <div className="bg-[#FAF7F0] border-2 border-[#D4AF37] rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Image with Arch Frame */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md">
            <div className="overflow-hidden rounded-t-[100px] rounded-b-2xl border-4 border-[#D4AF37] shadow-xl bg-white">
              <img
                src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1000&auto=format&fit=crop"
                alt="Children studying Holy Quran at Madrasa Zakariya"
                className="w-full h-[360px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#0F4C36] text-[#F3E5AB] p-4 rounded-2xl border-2 border-[#D4AF37] shadow-lg text-center hidden sm:block">
              <span className="block font-serif font-bold text-2xl text-white">150+</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Students Enrolled</span>
            </div>
          </div>
        </div>

        {/* Right Column: Content & Class Offerings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36]/10 text-[#0F4C36] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
            <GraduationCap className="w-3.5 h-3.5 text-[#B8860B]" /> Madrasa Zakariya • Qur'an &amp; Tajweed
          </div>

          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C36] leading-tight">
            Nurturing Young Minds with Sacred Knowledge
          </h3>

          <p className="text-sm md:text-base text-[#22261F]/80 leading-relaxed">
            Zakariya Madrasa provides structured Quranic education, correct Tajweed pronunciation, Hifz-ul-Qur'an memorization, and foundational Islamic etiquette (Adab &amp; Akhlaq) for boys and girls under qualified Aalim and Qari teachers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-white p-4 rounded-2xl border border-[#D4AF37]/40 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F4C36] text-[#D4AF37] flex items-center justify-center flex-shrink-0 font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#0F4C36] text-sm">Nazra &amp; Tajweed Batch</h4>
                <p className="text-xs text-[#22261F]/70">Daily 05:00 PM – 07:00 PM • Ages 5 to 15</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#D4AF37]/40 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F4C36] text-[#D4AF37] flex items-center justify-center flex-shrink-0 font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#0F4C36] text-sm">Hifz-ul-Qur'an Program</h4>
                <p className="text-xs text-[#22261F]/70">Full-time &amp; Part-time memorization</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              to="/masjid"
              className="btn-islamic-green px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2"
            >
              Enroll Your Child <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            </Link>
            <span className="text-xs text-[#22261F]/70 font-semibold">
              Separate arrangements for Sisters &amp; Female Teachers
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
