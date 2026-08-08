import React from 'react';
import { SectionDivider } from '../components/SectionDivider';
import { ShieldCheck, FileText, Lock, RefreshCw } from 'lucide-react';

export const Policies: React.FC = () => {
  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#E8D08A] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#C9A227]">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" /> Gateway &amp; Legal Compliance
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C36]">
            Privacy Policy &amp; Refund Terms
          </h1>
          <p className="text-sm md:text-base text-[#22261F]/80">
            Terms of Use, Privacy Protection, and Contribution Guidelines
          </p>
          <div className="w-20 h-1 bg-[#C9A227] mx-auto rounded-full mt-3"></div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#C9A227]/40 p-8 md:p-12 shadow-xl space-y-10 text-[#22261F] text-sm md:text-base leading-relaxed">
          
          {/* Privacy Policy */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C36] flex items-center gap-2 border-b border-[#C9A227]/30 pb-2">
              <Lock className="w-6 h-6 text-[#C9A227]" /> 1. Privacy Policy
            </h2>
            <p>
              Zakariya Masjid &amp; Kabristan values your privacy. We collect personal information (Name, Email, Mobile Number) strictly for processing online contributions, sending confirmation notifications, and maintaining record-keeping.
            </p>
            <p className="text-xs text-[#22261F]/70 italic">
              We never sell, trade, rent, or lease donor personal data to any third-party commercial organizations or marketing entities.
            </p>
          </section>

          {/* Refund & Cancellation Policy */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C36] flex items-center gap-2 border-b border-[#C9A227]/30 pb-2">
              <RefreshCw className="w-6 h-6 text-[#C9A227]" /> 2. Contribution Refund &amp; Cancellation Policy
            </h2>
            <p>
              All online contributions (Sadaqah, Zakat, Masjid Maintenance, Kabristan Maintenance) are voluntary contributions applied directly to religious, welfare, and community causes.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm text-[#22261F]/90">
              <li><strong>Erroneous or Duplicate Transactions:</strong> If a contributor experiences a technical error resulting in an unintended double charge or wrong input amount, a written refund request must be submitted within 7 days of the transaction to contact@zakariyamasjid.org along with transaction ID and bank receipt copy.</li>
              <li><strong>Refund Processing:</strong> Approved refunds will be processed via original payment mode within 7 to 10 working days after review.</li>
            </ul>
          </section>

          {/* Payment Gateway Security */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C36] flex items-center gap-2 border-b border-[#C9A227]/30 pb-2">
              <FileText className="w-6 h-6 text-[#C9A227]" /> 3. Payment Gateway &amp; Security Statement
            </h2>
            <p>
              Online payments on zakariyamasjid.org are processed through RBI-authorized payment aggregators (e.g., Razorpay / Cashfree / PhonePe / PayU) utilizing 256-Bit SSL Encryption. The management does not store credit card numbers, debit card PINs, or net banking passwords on its servers.
            </p>
          </section>

          {/* Terms of Use */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C36] flex items-center gap-2 border-b border-[#C9A227]/30 pb-2">
              <ShieldCheck className="w-6 h-6 text-[#C9A227]" /> 4. Terms of Use &amp; Disclaimers
            </h2>
            <p>
              By accessing this website, visitors agree to respect the sacred nature of the content and refrain from unauthorized copying of official logos, photography, or published cemetery records. Prayer times provided on the website are calculated for Pune, MH and are subject to local moon sighting for Ramadan and Eid.
            </p>
          </section>

          <p className="text-xs text-gray-500 pt-4 border-t border-gray-100">
            Last Updated: August 2026 • Zakariya Masjid &amp; Kabristan, Pune, MH
          </p>
        </div>

        <SectionDivider />
      </div>
    </div>
  );
};
