import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { DonationForm } from '../components/DonationForm';
import { SectionDivider } from '../components/SectionDivider';
import { TrustBadge } from '../components/TrustBadge';
import { Heart, ShieldCheck, Sparkles, Award } from 'lucide-react';

export const Donate: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || undefined;

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Header Strip */}
        <div className="bg-[#0F4C36] text-white rounded-3xl border-2 border-[#C9A227] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center space-y-4">
          <div className="absolute inset-0 islamic-pattern-dark opacity-30 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#C9A227] text-[#0F4C36] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
              <Heart className="w-4 h-4 fill-current" /> Zakariya Masjid &amp; Kabristan, Pune
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-white">
              Support Zakariya Masjid &amp; Kabristan
            </h1>

            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Your Sadaqah and Zakat sustain daily prayers, maintain the cemetery with dignity, support Qur'an education, and provide relief to needy families in Pune.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#E8D08A]">
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#C9A227]" /> Shariah Compliant Distribution</span>
            </div>
          </div>
        </div>

        {/* Main Donation Form Component */}
        <DonationForm initialCategoryId={categoryParam} />

        <SectionDivider />

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TrustBadge type="registered" title="Zakariya Masjid &amp; Kabristan" subtitle="Mundhwa, Off Koregaon Park, Pune" />
          <TrustBadge type="audited" title="Audited &amp; Accountable" subtitle="Financial Integrity &amp; Transparency" />
          <TrustBadge type="nonprofit" title="Community Welfare" subtitle="Dedicated to Service &amp; Worship" />
          <TrustBadge type="shariah" title="Strict Zakat Isolation" subtitle="Zakat kept completely separate" />
        </div>
      </div>
    </div>
  );
};
