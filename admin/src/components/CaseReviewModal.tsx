import React, { useState } from 'react';
import { WelfareCase } from '../types';
import { api } from '../services/api';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Phone,
  MapPin,
  FileText,
  Landmark,
  Coins,
  Send,
  Trash2,
  Sparkles,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

interface CaseReviewModalProps {
  welfareCase: WelfareCase;
  onClose: () => void;
  onUpdated: () => void;
}

export const CaseReviewModal: React.FC<CaseReviewModalProps> = ({
  welfareCase,
  onClose,
  onUpdated,
}) => {
  const [formData, setFormData] = useState({
    title: welfareCase.title,
    beneficiaryDisplayName: welfareCase.beneficiaryDisplayName || `${welfareCase.applicantName} & Family`,
    category: welfareCase.category,
    location: welfareCase.location || 'Mundhwa, Off Koregaon Park, Pune',
    story: welfareCase.story,
    targetAmount: welfareCase.targetAmount,
    raisedAmount: welfareCase.raisedAmount || 0,
    urgency: welfareCase.urgency || 'High',
    isZakatEligible: welfareCase.isZakatEligible,
    verifiedBy: welfareCase.verifiedBy || 'Zakariya Masjid',
    verificationNotes: welfareCase.verificationNotes || '',
    rejectionReason: welfareCase.rejectionReason || '',
    bankDetails: {
      accountHolderName: welfareCase.bankDetails?.accountHolderName || '',
      bankName: welfareCase.bankDetails?.bankName || '',
      accountNumber: welfareCase.bankDetails?.accountNumber || '',
      ifscCode: welfareCase.bankDetails?.ifscCode || '',
      upiId: welfareCase.bankDetails?.upiId || '',
      branchName: welfareCase.bankDetails?.branchName || '',
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name.startsWith('bank.')) {
      const bankKey = name.replace('bank.', '');
      setFormData((prev) => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [bankKey]: value },
      }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveEdits = async () => {
    setIsSaving(true);
    setActionError(null);
    try {
      const res = await api.updateCase(welfareCase._id, formData as any);
      if (res.success) {
        onUpdated();
        onClose();
      } else {
        setActionError(res.message || 'Failed to save changes');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error updating case');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateStatus = async (status: 'approved' | 'rejected' | 'completed' | 'pending') => {
    setIsSaving(true);
    setActionError(null);
    try {
      // First save any edited fields
      await api.updateCase(welfareCase._id, formData as any);

      // Then update status
      const res = await api.updateStatus(welfareCase._id, {
        status,
        verifiedBy: formData.verifiedBy,
        verificationNotes: formData.verificationNotes,
        rejectionReason: formData.rejectionReason,
      });

      if (res.success) {
        onUpdated();
        onClose();
      } else {
        setActionError(res.message || 'Status update failed');
      }
    } catch (err: any) {
      setActionError(err.message || 'Error updating status');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to permanently delete case ${welfareCase.caseNumber}?`)) {
      return;
    }
    setIsSaving(true);
    try {
      const res = await api.deleteCase(welfareCase._id);
      if (res.success) {
        onUpdated();
        onClose();
      } else {
        setActionError(res.message || 'Failed to delete');
      }
    } catch (err: any) {
      setActionError(err.message || 'Delete failed');
    } finally {
      setIsSaving(false);
    }
  };

  const cleanPhone = welfareCase.applicantPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Assalamu%20Alaikum%20${encodeURIComponent(
    welfareCase.applicantName
  )},%20this%20is%20Zakariya%20Masjid%20Welfare%20Trust%20regarding%20your%20assistance%20application.`;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="bg-[#0F4C36] text-white p-5 sm:px-8 border-b-2 border-[#D4AF37] flex items-center justify-between flex-shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#D4AF37] text-[#0F4C36] font-mono font-bold text-xs px-2.5 py-0.5 rounded-md">
                {welfareCase.caseNumber}
              </span>
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border ${
                  welfareCase.status === 'approved'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                    : welfareCase.status === 'rejected'
                    ? 'bg-red-500/20 text-red-300 border-red-400'
                    : welfareCase.status === 'completed'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-400'
                    : 'bg-amber-500/20 text-amber-300 border-amber-400 animate-pulse'
                }`}
              >
                ● {welfareCase.status.toUpperCase()}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
              Review &amp; Verify Welfare Application
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-[#D4AF37]/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 flex-grow">
          {actionError && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{actionError}</span>
            </div>
          )}

          {/* Section 1: Confidential Applicant Details (Private) */}
          <div className="bg-[#FAF7F0] p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/50 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
              <div className="flex items-center gap-2 text-[#0F4C36] font-bold text-sm">
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>1. Confidential Applicant Information (Private to Trust)</span>
              </div>
              <span className="text-[11px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full border border-red-300">
                🔒 Hidden from Public
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-gray-500 font-semibold uppercase text-[10px]">Applicant Name:</span>
                <div className="font-bold text-[#0F4C36] text-sm">{welfareCase.applicantName}</div>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 font-semibold uppercase text-[10px]">Contact Number:</span>
                <div className="font-bold text-[#0F4C36] text-sm flex items-center gap-2">
                  <span>{welfareCase.applicantPhone}</span>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="p-1 bg-[#0F4C36]/10 hover:bg-[#0F4C36] text-[#0F4C36] hover:text-white rounded transition-colors"
                    title="Call"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 bg-[#25D366]/20 hover:bg-[#25D366] text-[#0B3C2A] hover:text-white rounded transition-colors"
                    title="WhatsApp"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-gray-500 font-semibold uppercase text-[10px]">Residential Area:</span>
                <div className="font-bold text-[#0F4C36] text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{welfareCase.applicantAddress}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs pt-2 border-t border-[#D4AF37]/20">
              <span className="text-gray-500 font-semibold uppercase text-[10px]">Original Applicant Request:</span>
              <p className="bg-white p-3.5 rounded-xl border border-gray-200 text-[#22261F] leading-relaxed italic">
                "{welfareCase.story}"
              </p>
            </div>
          </div>

          {/* Section 2: Beneficiary Bank & UPI Details (For Donors) */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#D4AF37]/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2">
              <div className="flex items-center gap-2 text-[#0F4C36] font-bold text-sm">
                <Landmark className="w-4 h-4 text-[#D4AF37]" />
                <span>2. Beneficiary Bank &amp; UPI Details (Displayed to Donors once Approved)</span>
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                ✓ Donor Deposit Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Account Holder Name *</label>
                <input
                  type="text"
                  name="bank.accountHolderName"
                  value={formData.bankDetails.accountHolderName}
                  onChange={handleInputChange}
                  placeholder="e.g. Sister Aisha Sheikh"
                  className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2 text-xs font-semibold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Bank Name *</label>
                <input
                  type="text"
                  name="bank.bankName"
                  value={formData.bankDetails.bankName}
                  onChange={handleInputChange}
                  placeholder="e.g. State Bank of India"
                  className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2 text-xs font-semibold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Account Number *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="bank.accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. 39485720194"
                    className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2 text-xs font-mono font-bold text-[#0F4C36] pr-8"
                  />
                  {formData.bankDetails.accountNumber && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.bankDetails.accountNumber, 'acc')}
                      className="absolute right-2 top-2 text-gray-400 hover:text-[#0F4C36]"
                    >
                      {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">IFSC Code *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="bank.ifscCode"
                    value={formData.bankDetails.ifscCode}
                    onChange={handleInputChange}
                    placeholder="e.g. SBIN0001234"
                    className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2 text-xs font-mono font-bold uppercase text-[#0F4C36] pr-8"
                  />
                  {formData.bankDetails.ifscCode && (
                    <button
                      type="button"
                      onClick={() => copyToClipboard(formData.bankDetails.ifscCode, 'ifsc')}
                      className="absolute right-2 top-2 text-gray-400 hover:text-[#0F4C36]"
                    >
                      {copiedField === 'ifsc' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">UPI ID / GPay (Optional)</label>
                <input
                  type="text"
                  name="bank.upiId"
                  value={formData.bankDetails.upiId}
                  onChange={handleInputChange}
                  placeholder="e.g. beneficiary@sbi"
                  className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2 text-xs font-mono text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Branch Name (Optional)</label>
                <input
                  type="text"
                  name="bank.branchName"
                  value={formData.bankDetails.branchName}
                  onChange={handleInputChange}
                  placeholder="e.g. Mundhwa / Koregaon Park, Pune"
                  className="w-full bg-[#FAF7F0] border border-gray-300 rounded-lg p-2 text-xs text-[#0F4C36]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Public Website Listing & Verification Settings */}
          <div className="bg-[#FAF7F0] p-5 sm:p-6 rounded-2xl border border-[#D4AF37]/50 space-y-4">
            <div className="flex items-center gap-2 text-[#0F4C36] font-bold text-sm border-b border-[#D4AF37]/30 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>3. Public Presentation &amp; Trustee Verification Parameters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Public Display Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs font-bold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Public Beneficiary Name (Safe / Masked) *</label>
                <input
                  type="text"
                  name="beneficiaryDisplayName"
                  value={formData.beneficiaryDisplayName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs font-semibold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Welfare Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs font-bold text-[#0F4C36]"
                >
                  <option value="Medical Relief">Medical Relief</option>
                  <option value="Ration & Food">Ration &amp; Food</option>
                  <option value="Orphan Education">Orphan Education</option>
                  <option value="Widow Support">Widow Support</option>
                  <option value="Housing Emergency">Housing Emergency</option>
                  <option value="General Welfare">General Welfare</option>
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Urgency Level *</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs font-bold text-[#0F4C36]"
                >
                  <option value="Critical">Critical (Immediate Emergency)</option>
                  <option value="High">High Priority</option>
                  <option value="Moderate">Moderate Priority</option>
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Target Financial Need (₹) *</label>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs font-bold text-[#0F4C36]"
                />
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Funds Raised So Far (₹)</label>
                <input
                  type="number"
                  name="raisedAmount"
                  value={formData.raisedAmount}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs font-bold text-[#0F4C36]"
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-gray-700">Public Case Narrative / Description *</label>
              <textarea
                name="story"
                rows={3}
                value={formData.story}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-[#22261F] leading-relaxed"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-700">Verified By (Trustee / Committee) *</label>
                <input
                  type="text"
                  name="verifiedBy"
                  value={formData.verifiedBy}
                  onChange={handleInputChange}
                  placeholder="Zakariya Masjid"
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-semibold text-[#0F4C36]"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <label className="flex items-center gap-2 text-xs font-bold text-[#0F4C36] cursor-pointer">
                  <input
                    type="checkbox"
                    name="isZakatEligible"
                    checked={formData.isZakatEligible}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-[#0F4C36] focus:ring-[#0F4C36]"
                  />
                  <span>100% Zakat Eligible Case (Shariah Verified)</span>
                </label>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold text-gray-700">Internal Trustee Verification Notes</label>
              <input
                type="text"
                name="verificationNotes"
                value={formData.verificationNotes}
                onChange={handleInputChange}
                placeholder="e.g. Hospital invoice verified. Physical home visit conducted on 12th Aug."
                className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs text-[#0F4C36]"
              />
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="bg-[#FAF7F0] p-4 sm:px-8 border-t-2 border-[#D4AF37]/50 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSaving}
            className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Delete Case
          </button>

          <div className="flex items-center gap-3 flex-wrap ml-auto">
            <button
              type="button"
              onClick={handleSaveEdits}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl border border-[#0F4C36]/40 text-[#0F4C36] font-bold text-xs hover:bg-white transition-colors"
            >
              Save Draft Edits
            </button>

            {welfareCase.status !== 'rejected' && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('rejected')}
                disabled={isSaving}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" /> Reject
              </button>
            )}

            {welfareCase.status !== 'approved' && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('approved')}
                disabled={isSaving}
                className="btn-islamic-green px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Approve &amp; Publish Live
              </button>
            )}

            {welfareCase.status === 'approved' && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('completed')}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Mark as Fully Funded
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
