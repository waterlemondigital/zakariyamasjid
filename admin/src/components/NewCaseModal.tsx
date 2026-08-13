import React, { useState } from 'react';
import { api } from '../services/api';
import { X, PlusCircle, User, Phone, MapPin, Landmark, Coins, FileText, Send, AlertTriangle } from 'lucide-react';

interface NewCaseModalProps {
  onClose: () => void;
  onCreated: () => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({ onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: 'Mundhwa, Off Koregaon Park, Pune',
    category: 'Medical Relief',
    description: '',
    amountNeeded: '',
    bankDetails: {
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      upiId: '',
      branchName: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    setError(null);

    try {
      const res = await api.createCase(formData);
      if (res.success) {
        onCreated();
        onClose();
      } else {
        setError(res.message || 'Failed to create case');
      }
    } catch (err: any) {
      setError(err.message || 'Error submitting application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0F4C36] text-white p-5 sm:px-8 border-b-2 border-[#D4AF37] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Create New Welfare Assistance Case
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-[#D4AF37]/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-grow text-xs">
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-3.5 rounded-xl flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Applicant Details */}
          <div className="space-y-4 bg-[#FAF7F0] p-4.5 rounded-2xl border border-[#D4AF37]/40">
            <h3 className="font-bold text-[#0F4C36] flex items-center gap-1.5 border-b border-[#D4AF37]/30 pb-2">
              <User className="w-4 h-4 text-[#D4AF37]" /> Applicant Information (Confidential)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Mohammed Rafiq"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 font-semibold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Contact / WhatsApp Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. +91 98230 11223"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 font-semibold text-[#0F4C36]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Residential Address / Area in Pune *</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                placeholder="e.g. Mundhwa, Off Koregaon Park, Pune"
                className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-[#0F4C36]"
              />
            </div>
          </div>

          {/* Section 2: Case Need Parameters */}
          <div className="space-y-4 bg-white p-4.5 rounded-2xl border-2 border-[#D4AF37]/40">
            <h3 className="font-bold text-[#0F4C36] flex items-center gap-1.5 border-b border-gray-200 pb-2">
              <Coins className="w-4 h-4 text-[#D4AF37]" /> Welfare Need Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2.5 font-bold text-[#0F4C36]"
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
                <label className="font-bold text-gray-700">Estimated Need Amount (₹) *</label>
                <input
                  type="number"
                  name="amountNeeded"
                  required
                  value={formData.amountNeeded}
                  onChange={handleInputChange}
                  placeholder="e.g. 45000"
                  className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2.5 font-bold text-[#0F4C36]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700">Description / Verification Story *</label>
              <textarea
                name="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Explain the background, family situation, medical diagnosis, etc."
                className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2.5 text-[#22261F] leading-relaxed"
              ></textarea>
            </div>
          </div>

          {/* Section 3: Bank Details */}
          <div className="space-y-4 bg-[#FAF7F0] p-4.5 rounded-2xl border border-[#D4AF37]/40">
            <h3 className="font-bold text-[#0F4C36] flex items-center gap-1.5 border-b border-[#D4AF37]/30 pb-2">
              <Landmark className="w-4 h-4 text-[#D4AF37]" /> Beneficiary Bank Account Details (For Donors)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700">Account Holder Name *</label>
                <input
                  type="text"
                  name="bank.accountHolderName"
                  value={formData.bankDetails.accountHolderName}
                  onChange={handleInputChange}
                  placeholder="Name as per bank passbook"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 font-semibold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Bank Name *</label>
                <input
                  type="text"
                  name="bank.bankName"
                  value={formData.bankDetails.bankName}
                  onChange={handleInputChange}
                  placeholder="e.g. State Bank of India, HDFC"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 font-semibold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Account Number *</label>
                <input
                  type="text"
                  name="bank.accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. 50100492837461"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 font-mono font-bold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">IFSC Code *</label>
                <input
                  type="text"
                  name="bank.ifscCode"
                  value={formData.bankDetails.ifscCode}
                  onChange={handleInputChange}
                  placeholder="e.g. SBIN0001234"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 font-mono font-bold uppercase text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">UPI ID / GPay / PhonePe (Optional)</label>
                <input
                  type="text"
                  name="bank.upiId"
                  value={formData.bankDetails.upiId}
                  onChange={handleInputChange}
                  placeholder="e.g. beneficiary@sbi"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 font-mono text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700">Branch Name (Optional)</label>
                <input
                  type="text"
                  name="bank.branchName"
                  value={formData.bankDetails.branchName}
                  onChange={handleInputChange}
                  placeholder="e.g. Pune Main Branch"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-[#0F4C36]"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-islamic-gold px-8 py-3 rounded-xl font-bold text-xs shadow-lg inline-flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Save Case in System
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
