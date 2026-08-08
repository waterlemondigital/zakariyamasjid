import React from 'react';
import { SectionDivider } from '../components/SectionDivider';
import { TrustBadge } from '../components/TrustBadge';
import { CTASection } from '../components/CTASection';
import { ShieldCheck, Mail, Phone, Award, FileText } from 'lucide-react';

export const Transparency: React.FC = () => {

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
