import React from 'react';
import { SectionDivider } from '../components/SectionDivider';
import { TrustBadge } from '../components/TrustBadge';
import { CTASection } from '../components/CTASection';
import { TrusteeItem, AuditDoc } from '../types';
import { ShieldCheck, FileText, Download, Award, Building, Mail, Phone, CheckCircle2, PieChart } from 'lucide-react';

export const Transparency: React.FC = () => {
  const trustees: TrusteeItem[] = [
    {
      name: 'Trust Representative',
      role: 'Managing Trustee & Key Contact',
      qualification: 'Community Leader & Administrator',
      bio: 'Overseeing daily operations, community welfare, and maintenance for Zakariya Masjid & Kabristan.',
    },
    {
      name: 'Maulana Mohammad Zubair',
      role: 'Religious Advisor & Imam',
      qualification: 'Alim & Qari',
      bio: 'Provides Shariah guidance on Zakat distribution, funeral rites, and religious education programs.',
    },
    {
      name: 'Farooq Ahmed Shaikh',
      role: 'Kabristan Management',
      qualification: 'Social Worker',
      bio: 'Coordinates daily cemetery maintenance, cleanliness, lighting, and bereavement family support.',
    },
  ];

  const auditReports: AuditDoc[] = [
    { year: 'FY 2025 – 2026', title: 'Financial Statements & Activity Summary', fileSize: '1.8 MB (PDF)', downloadUrl: '#' },
    { year: 'FY 2024 – 2025', title: 'Annual Activity & Fund Allocation Report', fileSize: '2.4 MB (PDF)', downloadUrl: '#' },
    { year: 'FY 2023 – 2024', title: 'Annual Balance Sheet & Income Statement', fileSize: '1.6 MB (PDF)', downloadUrl: '#' },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Banner */}
        <div className="text-center max-w-4xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#E8D08A] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#C9A227]">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" /> Governance &amp; Stewardship
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F4C36]">
            Transparency &amp; Governance
          </h1>
          <p className="text-base md:text-lg text-[#22261F]/80 max-w-2xl mx-auto">
            Our commitment to accountability, responsible stewardship of contributions, and dedicated community service at Zakariya Masjid &amp; Kabristan.
          </p>
          <div className="w-24 h-1 bg-[#C9A227] mx-auto rounded-full mt-4"></div>
        </div>

        {/* Solemn Transparency Statement Block */}
        <div className="bg-white rounded-3xl border-2 border-[#C9A227] p-8 md:p-12 shadow-xl space-y-4">
          <div className="flex items-center gap-3 text-[#0F4C36] font-serif text-2xl font-bold border-b border-[#C9A227]/30 pb-3">
            <Award className="w-7 h-7 text-[#C9A227]" />
            Governance Commitment
          </div>
          <p className="text-[#22261F] text-base md:text-lg leading-relaxed font-serif italic text-justify">
            "Zakariya Masjid &amp; Kabristan Trust is dedicated to serving the community with full transparency, integrity, and responsible stewardship. Every contribution received is directed solely towards maintaining the Masjid premises, preserving the Kabristan grounds, and supporting community welfare — purely for the pleasure of Allah (SWT)."
          </p>
        </div>

        {/* Legal & Registration Credentials Table */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C9A227]">
            <FileText className="w-4 h-4" /> Location &amp; Premises Details
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#0F4C36]">
            Premises &amp; Administrative Details
          </h2>

          <div className="bg-white rounded-3xl border-2 border-[#C9A227]/40 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm md:text-base">
                <thead className="bg-[#0F4C36] text-[#E8D08A] font-serif font-bold">
                  <tr>
                    <th className="p-4 md:p-5">Entity / Facility</th>
                    <th className="p-4 md:p-5">Details</th>
                    <th className="p-4 md:p-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans text-[#22261F]">
                  <tr className="hover:bg-[#FAF7F0]">
                    <td className="p-4 md:p-5 font-bold text-[#0F4C36]">Institution Name</td>
                    <td className="p-4 md:p-5 font-semibold">Zakariya Masjid &amp; Kabristan</td>
                    <td className="p-4 md:p-5"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Active</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F0]">
                    <td className="p-4 md:p-5 font-bold text-[#0F4C36]">Address / Location</td>
                    <td className="p-4 md:p-5 text-xs md:text-sm">
                      Zakariya Masjid &amp; Kabristan, Mundhwa, Off Koregaon Park, Pune, Maharashtra, India
                    </td>
                    <td className="p-4 md:p-5"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Open Daily</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F0]">
                    <td className="p-4 md:p-5 font-bold text-[#0F4C36]">Contact Mobile</td>
                    <td className="p-4 md:p-5 font-mono font-bold">+91 98901 85013</td>
                    <td className="p-4 md:p-5"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Available</span></td>
                  </tr>
                  <tr className="hover:bg-[#FAF7F0]">
                    <td className="p-4 md:p-5 font-bold text-[#0F4C36]">Official Email</td>
                    <td className="p-4 md:p-5 font-mono font-semibold">contact@zakariyamasjid.org</td>
                    <td className="p-4 md:p-5"><span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Verified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Board of Trustees Section */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
              Leadership &amp; Oversight
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F4C36] mt-1">
              Board of Trustees &amp; Managing Committee
            </h2>
            <p className="text-xs md:text-sm text-[#22261F]/70 mt-1">
              Experienced, dedicated community members serving with zero personal financial compensation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustees.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border-2 border-[#C9A227]/30 hover:border-[#C9A227] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0F4C36] text-[#E8D08A] font-serif font-bold text-xl flex items-center justify-center mb-4 shadow-inner">
                    {t.name.charAt(0)}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#0F4C36]">{t.name}</h3>
                  <div className="text-xs font-bold text-[#C9A227] uppercase tracking-wider mt-0.5">{t.role}</div>
                  <div className="text-[11px] text-[#22261F]/60 mt-1 font-semibold">{t.qualification}</div>
                  <p className="text-xs text-[#22261F]/80 leading-relaxed mt-3">{t.bio}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] text-[#0F4C36] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" /> Honorary Trustee (No Remuneration)
                </div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* Fund Utilization & Financial Summary */}
        <section className="bg-white rounded-3xl border-2 border-[#C9A227]/40 p-8 md:p-12 shadow-xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227] flex items-center gap-1.5">
                <PieChart className="w-4 h-4" /> Financial Allocation Summary
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0F4C36]">
                How Your Donations Are Utilized
              </h2>
              <p className="text-sm text-[#22261F]/80 leading-relaxed">
                In strict adherence to Islamic principles and public trust laws, 100% of public funds are spent directly on facility upkeep, burial ground preservation, and community welfare. Administrative expenses are kept under 4% and covered by dedicated institutional patrons.
              </p>

              <div className="space-y-3 pt-2 text-xs md:text-sm font-semibold">
                <div>
                  <div className="flex justify-between text-[#0F4C36] mb-1">
                    <span>Masjid Operations &amp; Electricity (38%)</span>
                    <span className="font-mono">38%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#0F4C36] w-[38%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#0F4C36] mb-1">
                    <span>Kabristan Maintenance &amp; Staff (32%)</span>
                    <span className="font-mono">32%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C9A227] w-[32%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#0F4C36] mb-1">
                    <span>Zakat &amp; Needy Family Welfare (22%)</span>
                    <span className="font-mono">22%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1C6B4A] w-[22%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#0F4C36] mb-1">
                    <span>Qur'an Education &amp; Library (5%)</span>
                    <span className="font-mono">5%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8D08A] w-[5%]"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[#0F4C36] mb-1">
                    <span>Administrative &amp; Audit Fees (3%)</span>
                    <span className="font-mono">3%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-400 w-[3%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Downloadable Audit PDF Documents List */}
            <div className="lg:col-span-6 bg-[#FAF7F0] p-6 rounded-2xl border border-[#C9A227]/40 space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#0F4C36] border-b border-[#C9A227]/30 pb-2">
                Download Annual Audit Reports (PDF)
              </h3>
              <div className="space-y-3">
                {auditReports.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-xl border border-[#C9A227]/20 hover:border-[#C9A227] transition-all flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0F4C36]/10 text-[#0F4C36] px-2 py-0.5 rounded-md mb-1 inline-block">
                        {doc.year}
                      </span>
                      <h4 className="font-bold text-[#0F4C36]">{doc.title}</h4>
                      <span className="text-[11px] text-gray-500">{doc.fileSize}</span>
                    </div>
                    <button
                      onClick={() => alert(`Downloading document: ${doc.title}`)}
                      className="p-2 rounded-lg bg-[#0F4C36] text-[#C9A227] hover:bg-[#1C6B4A] transition-colors flex-shrink-0"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory & Audit Contact Box */}
        <div className="bg-[#0F4C36] text-white p-8 rounded-3xl border-2 border-[#C9A227] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-[#E8D08A]">Grievance &amp; Information Cell</h3>
            <p className="text-xs md:text-sm text-white/80 max-w-xl">
              For any query or information regarding Masjid facilities or Kabristan guidelines, please contact us directly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="mailto:contact@zakariyamasjid.org"
              className="px-6 py-3 rounded-xl bg-[#C9A227] text-[#0F4C36] font-bold text-xs uppercase tracking-wider hover:bg-[#E8D08A] transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
            <a
              href="tel:+919890185013"
              className="px-6 py-3 rounded-xl border border-white/40 text-white font-bold text-xs uppercase tracking-wider hover:border-[#C9A227] transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> +91 98901 85013
            </a>
          </div>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <TrustBadge type="registered" title="Dedicated Institution" subtitle="Serving Pune Community" />
          <TrustBadge type="nonprofit" title="No Personal Gain" subtitle="Strict charitable mandate" />
          <TrustBadge type="audited" title="Audited Annually" subtitle="Financial Integrity" />
          <TrustBadge type="shariah" title="Shariah Governance" subtitle="Under Islamic scholarship" />
        </div>

        <CTASection />
      </div>
    </div>
  );
};
