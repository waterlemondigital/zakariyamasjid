import React from 'react';
import { PhoneCall, Crosshair, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const JanazahQuickBar: React.FC = () => {
  return (
    <div className="bg-[#FAF7F0] border-2 border-[#D4AF37] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 gold-gradient-bg"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Immediate Emergency Callout */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#F3E5AB] text-xs font-bold px-3.5 py-1 rounded-full border border-[#D4AF37]">
            <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Janazah &amp; Kabristan Assistance</span>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#0F4C36] leading-tight">
            Janazah &amp; Burial Assistance
          </h3>

          <p className="text-xs md:text-sm text-[#22261F]/80 leading-relaxed">
            In the event of a death in the family, Zakariya Masjid &amp; Kabristan Trust provides compassionate support for grave allocation, Ghusl, Kafan, and funeral procedures in Pune.
          </p>

          {/* Direct Phone Call Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="tel:+919890185013"
              className="btn-islamic-gold px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" /> Call Trust Office: +91 98901 85013
            </a>
            <Link
              to="/kabristan"
              className="px-5 py-3.5 rounded-2xl border-2 border-[#0F4C36] text-[#0F4C36] font-bold text-xs hover:bg-[#0F4C36] hover:text-white transition-colors flex items-center gap-1.5"
            >
              Full Burial Rules <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Steps for Bereaved Family */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#D4AF37]/40 p-5 md:p-6 shadow-sm">
          <h4 className="font-serif font-bold text-[#0F4C36] text-base mb-4 flex items-center gap-2 border-b border-[#D4AF37]/30 pb-2">
            <Crosshair className="w-4 h-4 text-[#D4AF37]" /> Burial Process &amp; Mandatory Guidelines
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-red-50/80 border-2 border-red-200 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs mb-2">
                  !
                </span>
                <strong className="block text-red-900 font-serif text-sm mb-1">PMC Burial Pass</strong>
                <p className="text-red-800 text-[11px] font-medium leading-normal">
                  A valid PMC Burial Pass is mandatory for burial. Burial will not be permitted without a PMC Pass.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#D4AF37]/30 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#0F4C36] text-[#F3E5AB] font-bold flex items-center justify-center text-xs mb-2">
                  2
                </span>
                <strong className="block text-[#0F4C36] font-serif text-sm mb-1">Inform Trust Office</strong>
                <p className="text-[#22261F]/70 text-[11px]">
                  Contact +91 98901 85013 to register details &amp; allocate grave slot.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#D4AF37]/30 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-full bg-[#0F4C36] text-[#F3E5AB] font-bold flex items-center justify-center text-xs mb-2">
                  3
                </span>
                <strong className="block text-[#0F4C36] font-serif text-sm mb-1">Ghusl &amp; Janazah</strong>
                <p className="text-[#22261F]/70 text-[11px]">
                  Perform Ghusl, Janazah Namaz at Zakariya Masjid &amp; proceed for burial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

