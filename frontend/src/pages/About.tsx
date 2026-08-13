import React from 'react';
import { Link } from 'react-router-dom';
import { SectionDivider } from '../components/SectionDivider';
import { CTASection } from '../components/CTASection';
import { Building, Crosshair, Heart, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Hero Banner */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#F3E5AB] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#D4AF37]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Official Trust Overview
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F4C36] leading-tight">
            About Zakariya Masjid &amp; Kabrastan Trust
          </h1>

          <p className="font-serif italic text-lg md:text-xl gold-metallic-text font-bold">
            "A House of Worship, A Trust of Service, A Place of Eternal Rest."
          </p>

          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full mt-4"></div>
        </div>

        {/* Core Statement Box */}
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37] p-8 md:p-12 shadow-xl space-y-6 text-[#22261F] text-base md:text-lg leading-relaxed">
          <p className="font-serif text-xl md:text-2xl text-[#0F4C36] font-bold leading-relaxed border-l-4 border-[#D4AF37] pl-6 py-1">
            Zakariya Masjid &amp; Kabrastan Trust is a registered trust dedicated to serving the Muslim community through worship, education, social welfare, and dignified burial services. Established with the sole intention of seeking the pleasure of Allah (SWT), the Trust strives to uphold Islamic values while meeting the spiritual and social needs of the community.
          </p>

          <p>
            Located at Mundhwa, Off Koregaon Park, Pune, Maharashtra, Zakariya Masjid and the adjoining Kabristan (cemetery) serve the community's spiritual and social needs. Through the grace of Allah (SWT) and the generous support of our community, we maintain these sacred sites to high standards of cleanliness, safety, and decorum.
          </p>
        </div>

        {/* 3 Pillars: About Masjid, About Kabristan, Community Welfare */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Masjid */}
          <div className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37]/50 shadow-lg hover:border-[#D4AF37] transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F4C36] text-[#D4AF37] flex items-center justify-center shadow-md border border-[#D4AF37]">
              <Building className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0F4C36]">About the Masjid</h3>
            <p className="text-sm text-[#22261F]/80 leading-relaxed">
              Zakariya Masjid hosts five daily congregational prayers, Friday Jumu'ah khutbah, Special Taraweeh prayers during the blessed month of Ramadan, and Eid-ul-Fitr / Eid-ul-Adha gatherings. The Masjid serves as a sanctuary for Qur'an recitation, spiritual reflection, and weekly Islamic lectures by respected scholars.
            </p>
            <ul className="text-xs space-y-1.5 text-[#0F4C36] font-semibold pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> 5 Daily Congregational Namaz</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Jumu'ah Khutbah &amp; Jamaat</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Ramadan Taraweeh &amp; Iftar</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Air-conditioned Wudu Facilities</li>
            </ul>
          </div>

          {/* Pillar 2: Kabristan */}
          <div className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37]/50 shadow-lg hover:border-[#D4AF37] transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F4C36] text-[#D4AF37] flex items-center justify-center shadow-md border border-[#D4AF37]">
              <Crosshair className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0F4C36]">About the Kabristan</h3>
            <p className="text-sm text-[#22261F]/80 leading-relaxed">
              Our Kabristan offers dignified burial in strict accordance with Islamic principles (Qur'an and Sunnah). The Trust maintains clean pathways, boundary walls, security, and lighting across the burial grounds, providing compassionate, respectful assistance to bereaved families during difficult times of loss.
            </p>
            <ul className="text-xs space-y-1.5 text-[#0F4C36] font-semibold pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Strict Adherence to Sunnah</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Clean, Illuminated Grounds</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Bereavement Assistance</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> PMC Burial Pass Guidance</li>
            </ul>
          </div>

          {/* Pillar 3: Community Welfare */}
          <div className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37]/50 shadow-lg hover:border-[#D4AF37] transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F4C36] text-[#D4AF37] flex items-center justify-center shadow-md border border-[#D4AF37]">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#0F4C36]">Community Welfare</h3>
            <p className="text-sm text-[#22261F]/80 leading-relaxed">
              Beyond physical maintenance, the Trust actively promotes community upliftment through daily Qur'an and Tajweed classes for youth, Zakat distribution to deserving families, medical relief support, emergency food assistance, and moral guidance for young Muslims.
            </p>
            <ul className="text-xs space-y-1.5 text-[#0F4C36] font-semibold pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Children's Qur'an Madrasa</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Transparent Zakat Relief</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Widow &amp; Orphan Support</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Medical Charity Funds</li>
            </ul>
          </div>
        </div>

        <SectionDivider />

        {/* Governance & Transparency Card */}
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/50 p-8 md:p-12 shadow-lg space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
              Institutional Governance
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C36]">
              Our Commitment to Transparency
            </h2>
          </div>

          <p className="text-[#22261F] leading-relaxed text-base md:text-lg">
            Zakariya Masjid &amp; Kabristan operates with dedication to Islamic principles and community service. We ensure that every rupee of Sadaqah, Zakat, and general contribution is deployed strictly for facility upkeep, burial ground preservation, and community welfare.
          </p>

          <div className="pt-2">
            <Link
              to="/transparency"
              className="btn-islamic-green px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 inline-flex"
            >
              Governance &amp; Information <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* Closing Quote Banner */}
        <div className="bg-[#0F4C36] text-white rounded-3xl border-2 border-[#D4AF37] p-8 md:p-12 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full gold-gradient-bg text-[#0F4C36] flex items-center justify-center mx-auto font-serif text-xl font-bold shadow-md">
            ﷺ
          </div>
          <p className="font-serif italic text-2xl md:text-3xl gold-light-text max-w-3xl mx-auto font-medium">
            "A House of Worship, A Trust of Service, A Place of Eternal Rest."
          </p>
          <p className="text-xs text-white/80 tracking-widest uppercase font-semibold">
            Zakariya Masjid &amp; Kabrastan Trust • Pune, MH
          </p>
        </div>

        {/* CTA */}
        <CTASection />
      </div>
    </div>
  );
};
