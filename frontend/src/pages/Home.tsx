import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { SectionDivider } from '../components/SectionDivider';
import { ArchFrame } from '../components/ArchFrame';
import { TrustBadge } from '../components/TrustBadge';
import { MapEmbed } from '../components/MapEmbed';
import { CTASection } from '../components/CTASection';
import { DailyVerseWidget } from '../components/DailyVerseWidget';
import { HomePrayerWidget } from '../components/HomePrayerWidget';
import { JanazahQuickBar } from '../components/JanazahQuickBar';
import { DigitalTasbeeh } from '../components/DigitalTasbeeh';
import { MadrasaHighlight } from '../components/MadrasaHighlight';
import { MosqueGalleryTeaser } from '../components/MosqueGalleryTeaser';
import { NeedyAssistanceSection } from '../components/NeedyAssistanceSection';
import { Building, Heart, Crosshair, BookOpen, Radio, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Emergency 24/7 Janazah & Bereavement Helpline Quick Banner */}
      <section className="py-8 bg-[#FAF7F0] border-b border-[#D4AF37]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <JanazahQuickBar />
        </div>
      </section>

      {/* 3. Trust Badges Quick Banner */}
      <section className="bg-white py-8 border-b border-[#D4AF37]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <TrustBadge
              type="registered"
              title="Dedicated Institution"
              subtitle="Zakariya Masjid &amp; Kabristan, Pune"
            />
            <TrustBadge
              type="nonprofit"
              title="100% Non-Profit"
              subtitle="All funds for community service"
            />
            <TrustBadge
              type="audited"
              title="Annual Audited"
              subtitle="Full financial transparency"
            />
            <TrustBadge
              type="shariah"
              title="Shariah Compliant"
              subtitle="Guided by Qur'an &amp; Sunnah"
            />
          </div>
        </div>
      </section>

      {/* 4. Interactive Prayer Timings, Hijri Calendar & Qibla Compass Section */}
      <section className="py-16 bg-[#FAF7F0] islamic-pattern-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block mb-1">
              Live Namaz Schedule
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C36]">
              Daily Congregational Prayer Timings
            </h2>
            <p className="text-xs sm:text-sm text-[#22261F]/80 mt-1">
              Accurate prayer times, Azaan &amp; Jamaat schedule for Zakariya Masjid, Mundhwa, Off Koregaon Park, Pune
            </p>
          </div>

          <HomePrayerWidget />
        </div>
      </section>

      <SectionDivider />

      {/* 5. Daily Islamic Reflection (Ayah / Hadith Widget) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DailyVerseWidget />
        </div>
      </section>

      <SectionDivider />

      {/* 6. About the Trust Teaser Section */}
      <section id="home-about" className="py-16 md:py-24 bg-[#FAF7F0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Arch Photo Column */}
            <div className="lg:col-span-5">
              <ArchFrame className="max-w-md mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1590076175571-4b5459efb08c?q=80&w=1000&auto=format&fit=crop"
                  alt="Zakariya Masjid Mosque Courtyard & Architecture"
                  className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </ArchFrame>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#0F4C36]/10 text-[#0F4C36] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Dedicated To Service &amp; Worship
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F4C36] leading-tight">
                About Zakariya Masjid &amp; Kabristan
              </h2>

              <p className="text-base md:text-lg text-[#22261F] leading-relaxed">
                Zakariya Masjid &amp; Kabristan in Mundhwa, Pune, is dedicated to serving the Muslim community through worship, education, social welfare, and dignified burial services.
              </p>

              <p className="text-sm md:text-base text-[#22261F]/80 leading-relaxed">
                Established with the sole intention of seeking the pleasure of Allah (SWT), the Trust strives to uphold Islamic values while meeting the spiritual, educational, and social needs of the community in Koregaon Park, Ghorpadi, and broader Pune.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0F4C36]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Five Daily Prayers &amp; Jumu'ah
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0F4C36]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Dignified Islamic Burial Grounds
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0F4C36]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Children's Qur'an &amp; Tajweed Classes
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#0F4C36]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Transparent Zakat &amp; Sadaqah
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/about"
                  className="btn-islamic-green px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2"
                >
                  Read Full Trust History <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>
                <Link
                  to="/transparency"
                  className="px-6 py-3.5 rounded-xl border-2 border-[#D4AF37] text-[#0F4C36] font-bold text-sm hover:bg-[#FAF7F0] transition-colors"
                >
                  View Legal Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Vision & Mission Cards */}
      <section className="py-16 bg-white border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block mb-1">
              Guiding Principles
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C36]">
              Our Vision &amp; Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="bg-[#FAF7F0] p-8 rounded-3xl border-2 border-[#D4AF37]/50 shadow-lg relative overflow-hidden arch-card-top hover:border-[#D4AF37] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#0F4C36] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md border border-[#D4AF37]">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F4C36] mb-3">Our Vision</h3>
              <p className="text-[#22261F] text-base leading-relaxed">
                To nurture a vibrant, united, and spiritually grounded Islamic community centered around the Masjid, providing sacred space for worship, lifelong learning, welfare assistance, and eternal rest with dignity and reverence.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-[#FAF7F0] p-8 rounded-3xl border-2 border-[#D4AF37]/50 shadow-lg relative overflow-hidden arch-card-top hover:border-[#D4AF37] transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#0F4C36] text-[#D4AF37] flex items-center justify-center mb-6 shadow-md border border-[#D4AF37]">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F4C36] mb-3">Our Mission</h3>
              <ul className="space-y-2.5 text-[#22261F] text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">1.</span> Maintain Zakariya Masjid as an inviting center of daily worship &amp; learning.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">2.</span> Manage the Kabristan with sanctity, cleanliness, and strict adherence to Sunnah.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">3.</span> Provide compassionate guidance and support to bereaved families.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">4.</span> Promote Islamic education, youth welfare, and Zakat/Sadaqah distribution.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">5.</span> Uphold complete transparency, legal compliance, and financial accountability.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 8. Madrasa & Education Section */}
      <section className="py-16 bg-[#FAF7F0] islamic-pattern-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MadrasaHighlight />
        </div>
      </section>

      <SectionDivider />

      {/* 9. Our Core Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block mb-1">
              What We Provide
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F4C36]">
              Our Core Trust Services
            </h2>
            <p className="text-sm md:text-base text-[#22261F]/70 mt-2">
              Fulfilling the spiritual, social, and burial needs of Pune's Muslim community
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Daily Prayers & Jumu\'ah',
                desc: 'Five daily congregational prayers, Friday Jumu\'ah khutbah, Taraweeh during Ramadan, and Eid prayers.',
                link: '/masjid',
              },
              {
                icon: <Crosshair className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Kabristan & Burial Services',
                desc: 'Dignified burial arrangements, grave preparation, maintenance of cemetery grounds as per Qur\'an & Sunnah.',
                link: '/kabristan',
              },
              {
                icon: <BookOpen className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Qur\'an & Islamic Education',
                desc: 'Daily Nazra and Hifz classes for children, Tajweed instruction, and weekly lectures for adults.',
                link: '/masjid',
              },
              {
                icon: <Heart className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Community Welfare & Zakat',
                desc: 'Transparent distribution of Zakat and Sadaqah funds to widows, orphans, medical emergencies, and poor families.',
                link: '/donate',
              },
              {
                icon: <Radio className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Live Khutbah & Streaming',
                desc: 'Live streaming of Friday Khutbahs and special Ramadan lectures for sisters, elders, and community members at home.',
                link: '/masjid',
              },
              {
                icon: <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />,
                title: 'Legal & Family Support',
                desc: 'Compassionate assistance for death certificates, grave permission, and bereavement family counseling.',
                link: '/kabristan',
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F0]/60 p-8 rounded-3xl border-2 border-[#D4AF37]/40 hover:border-[#D4AF37] hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0F4C36] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform border border-[#D4AF37]">
                    {s.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0F4C36] mb-3">{s.title}</h3>
                  <p className="text-sm text-[#22261F]/80 leading-relaxed mb-6">{s.desc}</p>
                </div>
                <Link
                  to={s.link}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F4C36] hover:text-[#D4AF37] transition-colors"
                >
                  Learn Details <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Interactive Digital Tasbeeh / Dhikr Counter */}
      <section className="py-16 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DigitalTasbeeh />
        </div>
      </section>

      {/* 11. Visual Tour / Mosque Gallery Teaser */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MosqueGalleryTeaser />
        </div>
      </section>



      {/* 14. Transparency Callout Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF7F0] border-2 border-[#D4AF37] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block bg-[#0F4C36] text-[#F3E5AB] font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full border border-[#D4AF37]/30">
                Legal &amp; Financial Compliance
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0F4C36]">
                Our Commitment to Uncompromising Transparency
              </h3>
              <p className="text-sm text-[#22261F]/80 max-w-2xl">
                Zakariya Masjid &amp; Kabristan operates with full dedication to community welfare and spiritual service. View our governance commitment, prayer facilities, and community activities.
              </p>
            </div>
            <Link
              to="/transparency"
              className="btn-islamic-green px-8 py-4 rounded-xl font-bold text-sm shadow-lg flex-shrink-0 flex items-center gap-2 border-2 border-[#D4AF37]"
            >
              View Transparency Page <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* 15. Relief & Assistance for People in Need Section */}
      <NeedyAssistanceSection />

      <SectionDivider />

      {/* 16. Contact / Location Teaser */}
      <section className="py-16 md:py-24 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block mb-1">
              Visit Or Contact Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C36]">
              Zakariya Masjid &amp; Trust Location
            </h2>
          </div>

          <MapEmbed />
        </div>
      </section>

      {/* 17. CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CTASection />
      </div>
    </div>
  );
};
