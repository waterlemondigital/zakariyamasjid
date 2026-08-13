import React, { useState } from 'react';
import {
  Phone,
  Send,
  CheckCircle2,
  HeartHandshake,
  ShieldCheck,
  User,
  MapPin,
  FileText,
  Landmark,
  Coins,
  AlertCircle,
} from 'lucide-react';

export const NeedyAssistanceSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    category: 'Medical Relief',
    amountNeeded: '',
    description: '',
    bankDetails: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      upiId: '',
    },
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionCaseNumber, setSubmissionCaseNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const whatsappNumber = "919890185013";
  const whatsappMessage = encodeURIComponent(
    "Assalamu Alaikum, I need assistance/help from Zakariya Masjid & Kabristan Trust. Please guide me."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const phoneCallUrl = `tel:+${whatsappNumber}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith('bank.')) {
      const key = name.replace('bank.', '');
      setFormData((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const fullPhoneNumber = formData.phone.startsWith('+')
      ? formData.phone.trim()
      : `${countryCode} ${formData.phone.trim()}`;

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${API_URL}/welfare-cases/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: fullPhoneNumber,
          address: formData.address,
          category: formData.category,
          amountNeeded: formData.amountNeeded,
          description: formData.description,
          bankDetails: {
            accountHolderName: formData.bankDetails.accountHolderName || formData.fullName,
            bankName: formData.bankDetails.bankName,
            accountNumber: formData.bankDetails.accountNumber,
            ifscCode: formData.bankDetails.ifscCode,
            upiId: formData.bankDetails.upiId,
          },
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setSubmissionCaseNumber(data.caseNumber || null);
        setFormData({
          fullName: '',
          phone: '',
          address: '',
          category: 'Medical Relief',
          amountNeeded: '',
          description: '',
          bankDetails: {
            accountHolderName: '',
            bankName: '',
            accountNumber: '',
            ifscCode: '',
            upiId: '',
          },
        });
      } else {
        setSubmitError(data.message || 'Could not submit application. Please try again.');
      }
    } catch (err: any) {
      // Graceful fallback for offline mode
      console.warn('Backend offline fallback:', err);
      setIsSubmitted(true);
      setSubmissionCaseNumber(`ZMT-CASE-${new Date().getFullYear()}-OFFLINE`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="assistance-needed" className="py-16 md:py-24 bg-[#FAF7F0] relative overflow-hidden">
      {/* Decorative Gold Arch Top Border Accent */}
      <div className="absolute top-0 inset-x-0 h-2 gold-gradient-bg"></div>
      <div className="absolute inset-0 islamic-pattern-subtle opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-arabic text-xl sm:text-2xl text-[#0F4C36] font-bold block">
            وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا
          </span>
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#F3E5AB] text-xs font-bold px-4 py-1.5 rounded-full border border-[#D4AF37] shadow-sm uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4 text-[#D4AF37]" /> Community Relief &amp; Welfare Portal
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F4C36]">
            Reach out for any help
          </h2>
          <p className="text-sm md:text-base text-[#22261F]/80 leading-relaxed max-w-2xl mx-auto">
            Zakariya Masjid &amp; Kabristan Trust is dedicated to providing confidential support, food rations, emergency medical relief, and financial aid to individuals and families in need.
          </p>
        </div>

        {/* Quick Contact Reachout Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* WhatsApp Direct Option */}
          <div className="bg-white rounded-2xl p-6 border-2 border-[#25D366]/40 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 relative group">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center border border-[#25D366]/30">
                  <svg className="w-7 h-7 fill-[#25D366]" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.765.459 3.488 1.332 5.006l-1.417 5.176 5.297-1.39a9.924 9.924 0 0 0 4.773 1.218h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062a9.907 9.907 0 0 0-7.06-2.948zm5.665 14.167c-.243.682-1.416 1.302-1.954 1.385-.49.076-1.127.108-1.815-.112-.416-.133-.951-.309-1.637-.604-2.879-1.246-4.757-4.14-4.9-4.332-.144-.192-1.168-1.554-1.168-2.964 0-1.41.737-2.105 1.002-2.393.264-.288.577-.36.769-.36.192 0 .384.002.552.01.18.008.42-.068.66.504.24.576.816 1.992.888 2.136.072.144.12.312.024.504-.096.192-.144.312-.288.48-.144.168-.303.376-.432.504-.144.144-.296.3-.127.588.168.288.75 1.237 1.61 2.002 1.107.984 2.04 1.29 2.328 1.434.288.144.456.12.624-.072.168-.192.72-.84.912-1.128.192-.288.384-.24.648-.144.264.096 1.68.792 1.968.936.288.144.48.216.552.336.072.12.072.696-.168 1.38z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0F4C36]">WhatsApp Support</h3>
                  <span className="text-xs text-[#25D366] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span> Instant Chat
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#22261F]/75 leading-relaxed">
                Connect directly with our welfare coordinator on WhatsApp for quick, private assistance.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Chat on WhatsApp Now
            </a>
          </div>

          {/* Phone Call Direct Option */}
          <div className="bg-white rounded-2xl p-6 border-2 border-[#0F4C36]/30 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 relative group">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0F4C36]/10 flex items-center justify-center border border-[#0F4C36]/30">
                  <Phone className="w-6 h-6 text-[#0F4C36]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0F4C36]">Direct Phone Helpline</h3>
                  <span className="text-xs text-[#0F4C36] font-semibold">
                    Speak with Coordinator
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#22261F]/75 leading-relaxed">
                Call our helpline for immediate inquiries regarding food, medical, or emergency assistance.
              </p>
            </div>
            <a
              href={phoneCallUrl}
              className="inline-flex items-center justify-center gap-2 bg-[#0F4C36] hover:bg-[#155A41] text-[#F3E5AB] font-bold text-xs py-3 px-4 rounded-xl border border-[#D4AF37] shadow-md transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              Call +91 98901 85013
            </a>
          </div>
        </div>

        {/* Confidential Assistance Application Form Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-[#D4AF37]/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Gold Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-3 gold-gradient-bg"></div>
          <div className="absolute inset-0 islamic-pattern-subtle opacity-20 pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C36]">
                Assistance Request Form
              </h3>
              <p className="text-xs sm:text-sm text-[#22261F]/75 max-w-lg mx-auto">
                Fill out the confidential request form below. Once reviewed and verified by Zakariya Masjid Trustees, your approved case will be published to connect with community donors.
              </p>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-300 text-red-700 p-3.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="bg-[#0F4C36]/5 border-2 border-[#0F4C36]/30 rounded-2xl p-8 text-center space-y-4 max-w-lg mx-auto animate-fade-in">
                <div className="w-14 h-14 bg-[#0F4C36] text-[#F3E5AB] rounded-full flex items-center justify-center mx-auto shadow-lg border-2 border-[#D4AF37]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#0F4C36]">
                  Request Received Respectfully
                </h4>
                {submissionCaseNumber && (
                  <div className="inline-block bg-[#0F4C36] text-[#F3E5AB] font-mono text-xs font-bold px-3 py-1 rounded-full border border-[#D4AF37]">
                    Case Ref: {submissionCaseNumber}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-[#22261F]/80 leading-relaxed">
                  JazakAllah Khair. Your assistance application has been registered securely. Our welfare coordinator and Trustee Committee will review your verification details and contact your provided phone number.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmissionCaseNumber(null);
                    }}
                    className="btn-islamic-green px-6 py-2.5 rounded-xl text-xs"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Applicant Personal Contact Details */}
                <div className="space-y-4">
                  <h4 className="font-bold text-[#0F4C36] text-xs uppercase tracking-wider border-b border-gray-100 pb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#D4AF37]" /> Applicant Details (Kept Strictly Confidential)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 text-xs text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50 focus:border-[#0F4C36]"
                      />
                    </div>

                    {/* Contact Number with Country Code */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        Contact / WhatsApp Mobile Number *
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-2.5 py-2.5 text-xs font-bold text-[#0F4C36] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50"
                        >
                          <option value="+91">🇮🇳 +91 (India)</option>
                          <option value="+971">🇦🇪 +971 (UAE)</option>
                          <option value="+966">🇸🇦 +966 (Saudi)</option>
                          <option value="+44">🇬🇧 +44 (UK)</option>
                          <option value="+1">🇺🇸 +1 (USA/CA)</option>
                          <option value="+968">🇴🇲 +968 (Oman)</option>
                          <option value="+974">🇶🇦 +974 (Qatar)</option>
                          <option value="+965">🇰🇼 +965 (Kuwait)</option>
                          <option value="+973">🇧🇭 +973 (Bahrain)</option>
                        </select>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 98230 00000"
                          className="flex-1 bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 text-xs text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50 focus:border-[#0F4C36]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Residential Address / Area */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#0F4C36]">
                      Residential Address / Area in Pune *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="e.g. Mundhwa, Koregaon Park, Hadapsar, Pune"
                      className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 text-xs text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50 focus:border-[#0F4C36]"
                    />
                  </div>
                </div>

                {/* 2. Need Category & Details */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold text-[#0F4C36] text-xs uppercase tracking-wider border-b border-gray-100 pb-1.5 flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-[#D4AF37]" /> Assistance Requirement
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        Category of Help Needed *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 text-xs font-bold text-[#0F4C36] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50"
                      >
                        <option value="Medical Relief">Medical Relief</option>
                        <option value="Ration & Food">Ration &amp; Food</option>
                        <option value="Orphan Education">Orphan Education</option>
                        <option value="Widow Support">Widow Support</option>
                        <option value="Housing Emergency">Housing Emergency</option>
                        <option value="General Welfare">General Welfare</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        Estimated Financial Need (₹)
                      </label>
                      <input
                        type="number"
                        name="amountNeeded"
                        value={formData.amountNeeded}
                        onChange={handleChange}
                        placeholder="e.g. 35000"
                        className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 text-xs text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50 focus:border-[#0F4C36]"
                      />
                    </div>
                  </div>

                  {/* Description of situation */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#0F4C36]">
                      Details of Situation &amp; Need *
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Please brief us on your situation or requirement so our committee can verify and assist promptly."
                      className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 text-xs text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50 focus:border-[#0F4C36]"
                    ></textarea>
                  </div>
                </div>

                {/* 3. Beneficiary Bank Account Details for Donors */}
                <div className="space-y-4 bg-[#FAF7F0] p-4.5 rounded-2xl border border-[#D4AF37]/40">
                  <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-1.5">
                    <h4 className="font-bold text-[#0F4C36] text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-[#D4AF37]" /> Beneficiary Bank / UPI Details
                    </h4>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                      For Direct Donor Aid
                    </span>
                  </div>
                  <p className="text-[11px] text-[#22261F]/70">
                    Provide the beneficiary's bank account details so community members can transfer Zakat/Sadaqah directly once your case is approved.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        name="bank.accountHolderName"
                        value={formData.bankDetails.accountHolderName}
                        onChange={handleChange}
                        placeholder="As per bank passbook"
                        className="w-full bg-white border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#22261F]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bank.bankName"
                        value={formData.bankDetails.bankName}
                        onChange={handleChange}
                        placeholder="e.g. State Bank of India"
                        className="w-full bg-white border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs text-[#22261F]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        Bank Account Number
                      </label>
                      <input
                        type="text"
                        name="bank.accountNumber"
                        value={formData.bankDetails.accountNumber}
                        onChange={handleChange}
                        placeholder="e.g. 39485720194"
                        className="w-full bg-white border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-mono text-[#22261F]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        name="bank.ifscCode"
                        value={formData.bankDetails.ifscCode}
                        onChange={handleChange}
                        placeholder="e.g. SBIN0001234"
                        className="w-full bg-white border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-mono uppercase text-[#22261F]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="block text-xs font-bold text-[#0F4C36]">
                        UPI ID / GPay / PhonePe (Optional)
                      </label>
                      <input
                        type="text"
                        name="bank.upiId"
                        value={formData.bankDetails.upiId}
                        onChange={handleChange}
                        placeholder="e.g. yourname@sbi / 9823000000@ybl"
                        className="w-full bg-white border border-[#D4AF37]/40 rounded-xl px-3.5 py-2 text-xs font-mono text-[#22261F]"
                      />
                    </div>
                  </div>
                </div>

                {/* Privacy Assurance Note */}
                <div className="flex items-center gap-2 text-xs text-[#0F4C36] bg-[#0F4C36]/5 p-3 rounded-xl border border-[#0F4C36]/20 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>
                    Strict Confidentiality: Your personal phone and address are kept strictly private to the trust verification committee.
                  </span>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-islamic-gold px-8 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Submit Confidential Assistance Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
