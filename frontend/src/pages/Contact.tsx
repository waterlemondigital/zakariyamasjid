import React, { useState } from 'react';
import { MapEmbed } from '../components/MapEmbed';
import { SectionDivider } from '../components/SectionDivider';
import { NeedyAssistanceSection } from '../components/NeedyAssistanceSection';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [inquiryRef, setInquiryRef] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState('+91');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const fullPhoneNumber = formData.phone.startsWith('+')
      ? formData.phone.trim()
      : `${countryCode} ${formData.phone.trim()}`;

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
      const response = await fetch(`${API_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: fullPhoneNumber,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit message. Please try again.');
      }

      setInquiryRef(data.inquiryId ? String(data.inquiryId).slice(-6).toUpperCase() : null);
      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setSubmitError(err.message || 'Unable to connect to server. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-[#FAF7F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#E8D08A] font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#C9A227]">
            <Phone className="w-4 h-4 text-[#C9A227]" /> Get In Touch
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C36]">
            Contact Zakariya Masjid &amp; Trust
          </h1>
          <p className="text-base text-[#22261F]/80">
            For burial assistance, prayer timing inquiries, Zakat queries, or visiting the Trust office in Pune
          </p>
          <div className="w-20 h-1 bg-[#C9A227] mx-auto rounded-full mt-3"></div>
        </div>

        {/* Contact Form & Direct Contacts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info Box */}
          <div className="lg:col-span-5 bg-[#0F4C36] text-white rounded-3xl border-2 border-[#C9A227] p-8 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8D08A]">Official Contact</span>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">Zakariya Masjid &amp; Kabristan</h3>
              <p className="text-xs text-white/80 mt-1">
                For burial arrangements, prayer timings, or general administrative queries:
              </p>
            </div>

            <div className="space-y-4 text-sm pt-2">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/20 space-y-1">
                <span className="text-xs text-[#E8D08A] font-bold uppercase block">Mobile Contact</span>
                <div className="flex items-center gap-2 text-white/90 pt-1">
                  <Phone className="w-4 h-4 text-[#C9A227]" />
                  <a href="tel:+919890185013" className="font-bold text-lg hover:underline text-[#E8D08A]">+91 98901 85013</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <div>
                  <strong className="block text-[#E8D08A] font-serif">Location:</strong>
                  <p className="text-white/90 text-xs leading-relaxed mt-0.5">
                    Zakariya Masjid &amp; Kabristan,<br />
                    Mundhwa, Off Koregaon Park,<br />
                    Pune, Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                <div>
                  <strong className="block text-[#E8D08A] font-serif">Email Address:</strong>
                  <a href="mailto:contact@zakariyamasjid.org" className="text-white/90 hover:underline text-xs">contact@zakariyamasjid.org</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C9A227] flex-shrink-0 mt-1" />
                <div>
                  <strong className="block text-[#E8D08A] font-serif">Office Working Hours:</strong>
                  <p className="text-white/90 text-xs">
                    Mon – Sat: 09:00 AM – 07:00 PM<br />
                    Masjid Prayers: Open 24 Hours
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20 text-xs text-[#E8D08A] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" /> Serving the Community with Dedication &amp; Care
            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-[#C9A227]/40 p-8 shadow-xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#0F4C36] text-[#C9A227] flex items-center justify-center mx-auto border-2 border-[#C9A227] shadow-lg">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#0F4C36]">Message Received</h3>
                {inquiryRef && (
                  <div className="inline-block bg-[#0F4C36] text-[#F3E5AB] font-mono text-xs font-bold px-3 py-1 rounded-full border border-[#C9A227]">
                    Inquiry Ref: #{inquiryRef}
                  </div>
                )}
                <p className="text-sm text-[#22261F]/80 max-w-md mx-auto leading-relaxed">
                  JazakAllah Khair for reaching out. Your message has been routed to the Masjid &amp; Trust administrative panel. A trustee coordinator will review your query and respond via phone or email shortly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setInquiryRef(null);
                    }}
                    className="px-6 py-3 rounded-xl bg-[#0F4C36] text-[#F3E5AB] font-bold text-xs uppercase tracking-wider hover:bg-[#1C6B4A] transition-colors border border-[#C9A227] shadow-md"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F4C36]">
                    Send Message To The Trust
                  </h3>
                  <p className="text-xs text-[#22261F]/70 mt-1">
                    Your inquiry will be logged directly on the Trustee desk for prompt follow-up.
                  </p>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-300 text-red-700 p-3.5 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#22261F]/80 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mohammed Rafiq"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none text-sm bg-[#FAF7F0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#22261F]/80 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rafiq@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none text-sm bg-[#FAF7F0]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#22261F]/80 mb-1">Phone / WhatsApp *</label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="bg-[#FAF7F0] border border-[#C9A227]/40 rounded-xl px-2 py-2 text-xs font-bold text-[#0F4C36] focus:outline-none focus:border-[#C9A227]"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+966">🇸🇦 +966</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+968">🇴🇲 +968</option>
                        <option value="+974">🇶🇦 +974</option>
                        <option value="+965">🇰🇼 +965</option>
                        <option value="+973">🇧🇭 +973</option>
                      </select>
                      <input
                        type="tel"
                        required
                        placeholder="98225 54090"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none text-sm bg-[#FAF7F0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#22261F]/80 mb-1">Subject / Nature of Inquiry</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none text-sm bg-[#FAF7F0]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Kabristan & Burial Service">Kabristan &amp; Burial Service</option>
                      <option value="Donation Inquiry">Donation Inquiry</option>
                      <option value="Zakat Relief Request">Zakat Relief Request</option>
                      <option value="Madrasa Admission">Qur'an Madrasa Admission</option>
                      <option value="Other">Other Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#22261F]/80 mb-1">Your Message / Query *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C9A227]/40 focus:border-[#C9A227] focus:outline-none text-sm bg-[#FAF7F0]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#0F4C36] hover:bg-[#1C6B4A] text-[#F3E5AB] font-bold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border border-[#C9A227] disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#C9A227]" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C9A227]" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <SectionDivider />

        {/* Welfare Assistance Portal Section */}
        <NeedyAssistanceSection />

        <SectionDivider />

        {/* Map Embed Section */}
        <MapEmbed />
      </div>
    </div>
  );
};
