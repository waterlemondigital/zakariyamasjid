import React, { useState, useEffect } from 'react';
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
  Coins,
  Landmark,
  Copy,
  Check,
  QrCode,
  RefreshCw
} from 'lucide-react';

const defaultFallbackProfiles: NeedyProfile[] = [
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
    verifiedBy: 'Zakariya Masjid',
    urgency: 'Critical',
    isZakatEligible: true,
    bankDetails: {
      accountHolderName: 'Aisha Begum Sheikh',
      bankName: 'State Bank of India',
      accountNumber: '39485720194',
      ifscCode: 'SBIN0001234',
      upiId: 'aishasheikh@sbi',
      branchName: 'Koregaon Park Branch, Pune',
    },
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
    verifiedBy: 'Zakariya Masjid',
    urgency: 'High',
    isZakatEligible: true,
    bankDetails: {
      accountHolderName: 'Zohra Begum Qureshi',
      bankName: 'Bank of Maharashtra',
      accountNumber: '60182930491',
      ifscCode: 'MAHB0000456',
      upiId: 'zohrabegum@mahb',
      branchName: 'Mundhwa Branch, Pune',
    },
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
    verifiedBy: 'Zakariya Masjid',
    urgency: 'Moderate',
    isZakatEligible: true,
    bankDetails: {
      accountHolderName: 'Fatima Mohammed Shaikh',
      bankName: 'HDFC Bank',
      accountNumber: '50100293847561',
      ifscCode: 'HDFC0000123',
      upiId: 'fatimashaikh@hdfcbank',
      branchName: 'Kalyani Nagar Branch, Pune',
    },
  },
];

export const NeedyCases: React.FC = () => {
  const [profiles, setProfiles] = useState<NeedyProfile[]>(defaultFallbackProfiles);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openBankCaseId, setOpenBankCaseId] = useState<string | null>(null);

  const fetchPublicCases = async () => {
    setIsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const res = await fetch(`${API_URL}/welfare-cases/public`);
      const data = await res.json();

      if (res.ok && data.success && Array.isArray(data.cases) && data.cases.length > 0) {
        setProfiles(data.cases);
      } else {
        setProfiles(defaultFallbackProfiles);
      }
    } catch (err) {
      console.warn('Using default verified profiles:', err);
      setProfiles(defaultFallbackProfiles);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicCases();
  }, []);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

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
              Every case listed below is verified by the Zakariya Masjid Welfare Committee in Pune. Donors can directly transfer Zakat and Sadaqah to the verified beneficiary bank accounts.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-[#F3E5AB]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> 100% Authenticated by Trustees
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Shariah Zakat Isolation
              </span>
              <span className="flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-[#D4AF37]" /> Direct Beneficiary Bank Details
              </span>
            </div>
          </div>
        </div>

        {/* Demo Cases Disclaimer Banner */}
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 text-xs text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-200/90 text-amber-900 flex items-center justify-center flex-shrink-0 font-bold border border-amber-300">
              <Sparkles className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <strong className="block text-amber-900 font-bold text-xs uppercase tracking-wider">
                Illustrative Demo Cases Preview
              </strong>
              <p className="text-amber-800/90 text-xs mt-0.5 leading-relaxed">
                The profiles shown below are <strong>sample demonstration cases</strong> to show donors how verified community welfare cases and direct bank donation details will appear in the future once approved by the Trust.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-900 font-bold text-[11px] px-3 py-1 rounded-full border border-amber-400 whitespace-nowrap self-start sm:self-auto shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Sample Layout
          </span>
        </div>

        {/* Live Synchronization Notice */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-[#D4AF37]/50 shadow-sm text-xs">
          <div className="flex items-center gap-2 text-[#0F4C36] font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <span>Showing <strong>{profiles.length} Active Verified Welfare Cases</strong> approved for community donation.</span>
          </div>
          <button
            onClick={fetchPublicCases}
            className="flex items-center gap-1 text-[#0F4C36] hover:text-[#B8860B] font-bold uppercase tracking-wider text-[11px] p-1.5 rounded-lg hover:bg-[#FAF7F0] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Needy Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {profiles.map((profile) => {
            const isBankOpen = openBankCaseId === profile.id || openBankCaseId === profile.caseNumber;
            const bank = profile.bankDetails;

            return (
              <div
                key={profile.id || profile.caseNumber}
                className="bg-white rounded-3xl border-2 border-[#D4AF37]/50 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group"
              >
                {/* Top Metallic Gold Accent */}
                <div className="h-2 gold-gradient-bg"></div>

                <div className="p-6 space-y-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Card Header & Badges */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 bg-[#0F4C36]/10 text-[#0F4C36] border border-[#0F4C36]/30 text-[11px] font-bold px-3 py-1 rounded-full">
                          <Coins className="w-3.5 h-3.5 text-[#B8860B]" /> {profile.category}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          <Sparkles className="w-3 h-3 text-amber-600" /> Demo Case
                        </span>
                      </div>

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
                    <p className="text-xs text-[#22261F]/80 leading-relaxed bg-[#FAF7F0] p-3.5 rounded-xl border border-[#D4AF37]/30">
                      "{profile.story}"
                    </p>

                    {/* Target Amount */}
                    {profile.targetAmount > 0 && (
                      <div className="bg-[#0F4C36]/5 p-3 rounded-xl border border-[#0F4C36]/20 flex items-center justify-between text-xs">
                        <span className="text-[#0F4C36] font-bold uppercase text-[10px]">Estimated Need:</span>
                        <span className="font-serif font-bold text-[#0F4C36] text-base">
                          ₹{profile.targetAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}

                    {/* Verification Note */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#0F4C36] font-medium pt-1 border-t border-gray-100">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                      <span>Verified by: <strong className="text-[#0F4C36]">{profile.verifiedBy}</strong></span>
                    </div>
                  </div>

                  {/* Direct Bank Donation Card */}
                  <div className="pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setOpenBankCaseId(isBankOpen ? null : (profile.id || profile.caseNumber))}
                      className="btn-islamic-gold w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                    >
                      <Landmark className="w-4 h-4" />
                      <span>{isBankOpen ? 'Hide Bank Details' : 'Donate Directly (View Bank Account)'}</span>
                    </button>

                    {isBankOpen && (
                      <div className="mt-3 bg-[#FAF7F0] p-4 rounded-2xl border-2 border-[#D4AF37] space-y-3 text-xs animate-fade-in">
                        <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
                          <span className="font-bold text-[#0F4C36] uppercase text-[10px] flex items-center gap-1">
                            <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" /> Verified Beneficiary Bank Details
                          </span>
                        </div>

                        {bank && bank.accountNumber ? (
                          <div className="space-y-2">
                            <div>
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Account Holder:</span>
                              <div className="font-bold text-[#0F4C36]">{bank.accountHolderName || profile.beneficiaryName}</div>
                            </div>

                            <div>
                              <span className="text-[10px] text-gray-500 font-bold uppercase">Bank Name:</span>
                              <div className="font-bold text-[#0F4C36]">{bank.bankName}</div>
                            </div>

                            {/* Account Number with Copy */}
                            <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-[#D4AF37]/40">
                              <div>
                                <span className="text-[9px] text-gray-500 uppercase font-bold block">Account Number:</span>
                                <span className="font-mono font-bold text-sm text-[#0F4C36]">{bank.accountNumber}</span>
                              </div>
                              <button
                                onClick={() => handleCopy(bank.accountNumber, `acc-${profile.id}`)}
                                className="px-2.5 py-1 bg-[#0F4C36] hover:bg-[#155A41] text-[#F3E5AB] rounded text-[10px] font-bold flex items-center gap-1 transition-colors"
                              >
                                {copiedKey === `acc-${profile.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-green-300" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" /> Copy
                                  </>
                                )}
                              </button>
                            </div>

                            {/* IFSC Code with Copy */}
                            <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-[#D4AF37]/40">
                              <div>
                                <span className="text-[9px] text-gray-500 uppercase font-bold block">IFSC Code:</span>
                                <span className="font-mono font-bold text-xs text-[#0F4C36] uppercase">{bank.ifscCode}</span>
                              </div>
                              <button
                                onClick={() => handleCopy(bank.ifscCode, `ifsc-${profile.id}`)}
                                className="px-2.5 py-1 bg-[#0F4C36] hover:bg-[#155A41] text-[#F3E5AB] rounded text-[10px] font-bold flex items-center gap-1 transition-colors"
                              >
                                {copiedKey === `ifsc-${profile.id}` ? (
                                  <>
                                    <Check className="w-3 h-3 text-green-300" /> Copied
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" /> Copy
                                  </>
                                )}
                              </button>
                            </div>

                            {/* UPI ID (if available) */}
                            {bank.upiId && (
                              <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-[#D4AF37]/40">
                                <div>
                                  <span className="text-[9px] text-gray-500 uppercase font-bold block">UPI ID / GPay:</span>
                                  <span className="font-mono font-bold text-xs text-[#0F4C36]">{bank.upiId}</span>
                                </div>
                                <button
                                  onClick={() => handleCopy(bank.upiId!, `upi-${profile.id}`)}
                                  className="px-2.5 py-1 bg-[#0F4C36] hover:bg-[#155A41] text-[#F3E5AB] rounded text-[10px] font-bold flex items-center gap-1 transition-colors"
                                >
                                  {copiedKey === `upi-${profile.id}` ? (
                                    <>
                                      <Check className="w-3 h-3 text-green-300" /> Copied
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" /> Copy
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-gray-500 text-[11px] py-1 text-center">
                            Please contact Zakariya Masjid Trust Office (+91 98901 85013) for direct cash / cheque deposit assistance for this case.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Admin Integration Note Banner */}
        <div className="bg-[#0F4C36]/5 border border-[#0F4C36]/30 rounded-2xl p-4 text-center max-w-3xl mx-auto flex items-center justify-center gap-3 text-xs text-[#0F4C36]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
          <span>
            <strong>Trust Governance:</strong> All donations sent directly to these verified beneficiary accounts are monitored and audited under the supervision of the Zakariya Masjid &amp; Kabrastan Trust.
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
