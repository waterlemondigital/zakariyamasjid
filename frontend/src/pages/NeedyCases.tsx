import React from 'react';
import { NeedyProfile } from '../types';
import { SectionDivider } from '../components/SectionDivider';
import { TrustBadge } from '../components/TrustBadge';
import { NeedyAssistanceSection } from '../components/NeedyAssistanceSection';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  MapPin, 
  User, 
  FileCheck, 
  Coins
} from 'lucide-react';

const mockNeedyProfiles: NeedyProfile[] = [
  {
    id: '1',
    caseNumber: 'ZMT-CASE-2026-081',
    title: 'Emergency Cardiac Surgery Aid for Sister Aisha',
    category: 'Medical Relief',
    beneficiaryName: 'Sister Aisha (Family of 4 Children)',
    location: 'Mundhwa, Off Koregaon Park, Pune',
    story: 'Sister Aisha, a widowed mother of four in Mundhwa, requires urgent heart valve replacement surgery at Poona Hospital. The family has no active breadwinner. The Masjid Trust verification committee has personally inspected hospital bills, prescription records, and income statements.',
    targetAmount: 85000,
    raisedAmount: 58500,
    verifiedBy: 'Maulana Shabbir & Trustee Committee',
    urgency: 'Critical',
    isZakatEligible: true,
  },
  {
    id: '2',
    caseNumber: 'ZMT-CASE-2026-064',
    title: 'Annual Essential Ration & Medicine Kit for Elderly Widow',
    category: 'Widow Support',
    beneficiaryName: 'Mrs. Zohra Begum (Age 72)',
    location: 'Hadapsar / Mundhwa Border, Pune',
    story: '72-year-old Zohra Begum lives alone with no immediate family members able to support her. Zakariya Masjid Trust provides her with monthly ration packs (rice, wheat flour, oil, pulses, tea, and daily hypertension medication).',
    targetAmount: 24000,
    raisedAmount: 19200,
    verifiedBy: 'Welfare Officer Janab Tanveer Seth',
    urgency: 'High',
    isZakatEligible: true,
  },
  {
    id: '3',
    caseNumber: 'ZMT-CASE-2026-049',
    title: 'School & Madrasa Hifz Fee Support for 2 Orphan Siblings',
    category: 'Orphan Education',
    beneficiaryName: 'Sameer (10 yrs) & Zoya (8 yrs)',
    location: 'Koregaon Park Annex, Pune',
    story: 'Following the unexpected demise of their father, Sameer and Zoya are raised by their mother who works part-time. Trust supports their annual school tuition, books, uniform, and evening Hifz-ul-Qur\'an education expenses.',
    targetAmount: 36000,
    raisedAmount: 27000,
    verifiedBy: 'Madrasa Supervisor & Education Desk',
    urgency: 'Moderate',
    isZakatEligible: true,
  },
];

export const NeedyCases: React.FC = () => {

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Header Strip */}
        <div className="bg-[#0F4C36] text-white rounded-3xl border-2 border-[#D4AF37] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center space-y-4">
          <div className="absolute inset-0 islamic-pattern-dark opacity-35 pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-3">
            <span className="font-arabic text-xl sm:text-2xl text-[#F3E5AB] font-bold block mb-1">
              وَيُطْعِمُونَ الطَّعَامَ عَلَىٰ حُبِّهِ مِسْكِينًا وَيَتِيمًا وَأَسِيرًا
            </span>
            
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#0F4C36] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
              <Heart className="w-4 h-4 fill-current" /> Verified Welfare Cases • Zakariya Masjid Trust
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight text-white">
              Verified Needy &amp; Welfare Profiles
            </h1>

            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              Every case listed here has been physically verified by the Zakariya Masjid Welfare Committee in Pune. 100% of your Zakat &amp; Sadaqah goes directly toward fulfilling these validated requirements.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#F3E5AB]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> 100% Authenticated
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Shariah Zakat Isolation
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[#D4AF37]" /> Direct Trustee Supervision
              </span>
            </div>
          </div>
        </div>

        {/* Needy Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mockNeedyProfiles.map((profile) => {
            return (
              <div
                key={profile.id}
                className="bg-white rounded-3xl border-2 border-[#D4AF37]/50 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group"
              >
                {/* Top Metallic Gold Accent */}
                <div className="h-2 gold-gradient-bg"></div>

                <div className="p-6 space-y-5 flex-grow">
                  {/* Card Header & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <span className="inline-flex items-center gap-1 bg-[#0F4C36]/10 text-[#0F4C36] border border-[#0F4C36]/30 text-[11px] font-bold px-3 py-1 rounded-full">
                      <Coins className="w-3.5 h-3.5 text-[#B8860B]" /> {profile.category}
                    </span>

                    <div className="flex items-center gap-2">
                      {profile.isZakatEligible && (
                        <span className="inline-flex items-center gap-1 bg-[#D4AF37]/20 text-[#8C620B] border border-[#D4AF37]/60 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-[#B8860B]" /> Zakat Eligible
                        </span>
                      )}
                      <span className="bg-[#0F4C36] text-[#F3E5AB] font-mono px-2.5 py-0.5 rounded-md text-[10px] border border-[#D4AF37] font-bold">
                        {profile.caseNumber}
                      </span>
                    </div>
                  </div>

                  {/* Title & Beneficiary & Location */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-[#0F4C36] leading-snug group-hover:text-[#B8860B] transition-colors">
                      {profile.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#22261F]/75 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#B8860B]" /> {profile.beneficiaryName}
                      </span>
                      <span className="flex items-center gap-1 text-[#0F4C36]">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> {profile.location}
                      </span>
                    </div>
                  </div>

                  {/* Story */}
                  <p className="text-xs text-[#22261F]/80 leading-relaxed line-clamp-4 bg-[#FAF7F0] p-3.5 rounded-xl border border-[#D4AF37]/30">
                    "{profile.story}"
                  </p>

                  {/* Verification Note */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#0F4C36] font-medium pt-1 border-t border-gray-100">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Verified by: <strong className="text-[#0F4C36]">{profile.verifiedBy}</strong></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Admin Integration Note Banner */}
        <div className="bg-[#0F4C36]/5 border border-[#0F4C36]/30 rounded-2xl p-4 text-center max-w-3xl mx-auto flex items-center justify-center gap-3 text-xs text-[#0F4C36]">
          <AlertCircle className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
          <span>
            <strong>Management Notice:</strong> Verified profiles are updated by Zakariya Masjid Trustees. An online self-service Admin Panel for real-time case management will be integrated soon.
          </span>
        </div>

        <SectionDivider />

        {/* Reach Out / Apply Section */}
        <NeedyAssistanceSection />

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <TrustBadge type="registered" title="Zakariya Masjid Trust" subtitle="Mundhwa, Off Koregaon Park, Pune" />
          <TrustBadge type="audited" title="Audited &amp; Accountable" subtitle="Financial Integrity &amp; Transparency" />
          <TrustBadge type="shariah" title="Strict Zakat Isolation" subtitle="Zakat kept completely separate" />
        </div>
      </div>
    </div>
  );
};
