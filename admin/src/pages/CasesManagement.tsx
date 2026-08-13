import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { WelfareCase } from '../types';
import { CaseReviewModal } from '../components/CaseReviewModal';
import { NewCaseModal } from '../components/NewCaseModal';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Coins,
  MapPin,
  User,
  PlusCircle,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Landmark,
  Eye,
  Trash2,
} from 'lucide-react';

export const CasesManagement: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStatus = searchParams.get('status') || 'all';

  const [cases, setCases] = useState<WelfareCase[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<WelfareCase | null>(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  const loadCases = async () => {
    setIsLoading(true);
    try {
      const res = await api.getCases({
        status: statusFilter,
        category: categoryFilter,
        search: searchQuery,
      });
      if (res.success && res.cases) {
        setCases(res.cases);
      }
    } catch (err) {
      console.error('Error fetching cases:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, [statusFilter, categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadCases();
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setSearchParams(status === 'all' ? {} : { status });
  };

  const handleQuickStatus = async (id: string, status: 'approved' | 'rejected' | 'completed') => {
    try {
      const res = await api.updateStatus(id, { status });
      if (res.success) {
        loadCases();
      }
    } catch (err) {
      console.error('Quick status update error:', err);
    }
  };

  const handleDelete = async (c: WelfareCase) => {
    if (!window.confirm(`Are you sure you want to permanently delete ${c.caseNumber}?`)) return;
    try {
      const res = await api.deleteCase(c._id);
      if (res.success) {
        loadCases();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const statusPills: { id: string; label: string; count?: number }[] = [
    { id: 'all', label: 'All Records' },
    { id: 'pending', label: 'Pending Review' },
    { id: 'approved', label: 'Approved & Live' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border-2 border-[#D4AF37]/50 shadow-md">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C36]">
            Welfare Cases Repository
          </h1>
          <p className="text-xs text-[#22261F]/70 mt-1">
            Search, verify, inspect bank credentials, and manage public donation profiles.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowNewCaseModal(true)}
            className="btn-islamic-gold px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
          >
            <PlusCircle className="w-4 h-4" /> Add New Case
          </button>
          <button
            onClick={loadCases}
            title="Refresh"
            className="p-2.5 rounded-xl border border-[#D4AF37]/50 bg-[#FAF7F0] hover:bg-[#0F4C36] hover:text-white text-[#0F4C36] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/50 p-6 shadow-md space-y-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-4">
          {statusPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => handleStatusFilterChange(pill.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                statusFilter === pill.id
                  ? 'bg-[#0F4C36] text-[#F3E5AB] shadow-md border-2 border-[#D4AF37]'
                  : 'bg-[#FAF7F0] text-[#22261F]/80 hover:bg-[#0F4C36]/10 border border-gray-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Search Bar & Category Dropdown */}
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          <div className="md:col-span-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Case Number, Applicant Name, Public Title, or Location..."
              className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-4 py-2.5 pl-10 text-xs font-semibold text-[#0F4C36] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          </div>

          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-3 py-2.5 text-xs font-bold text-[#0F4C36] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50"
            >
              <option value="all">All Categories</option>
              <option value="Medical Relief">Medical Relief</option>
              <option value="Ration & Food">Ration &amp; Food</option>
              <option value="Orphan Education">Orphan Education</option>
              <option value="Widow Support">Widow Support</option>
              <option value="Housing Emergency">Housing Emergency</option>
              <option value="General Welfare">General Welfare</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <button
              type="submit"
              className="w-full h-full bg-[#0F4C36] text-[#F3E5AB] font-bold rounded-xl flex items-center justify-center p-2.5 hover:bg-[#155A41] transition-colors border border-[#D4AF37]"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Cases Table / Card Grid */}
      <div className="bg-white rounded-3xl border-2 border-[#D4AF37] shadow-xl overflow-hidden">
        <div className="p-4 sm:px-6 bg-[#0F4C36] text-white flex items-center justify-between border-b-2 border-[#D4AF37]">
          <span className="font-serif font-bold text-sm sm:text-base">
            Total Results: {cases.length} records
          </span>
          <span className="text-xs text-[#F3E5AB] font-mono">Status: {statusFilter.toUpperCase()}</span>
        </div>

        {cases.length === 0 ? (
          <div className="text-center py-16 p-6 space-y-2">
            <ShieldCheck className="w-12 h-12 text-[#D4AF37] mx-auto opacity-50" />
            <h3 className="font-serif text-lg font-bold text-[#0F4C36]">No Cases Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              No welfare cases match the selected filters. Try changing status or search terms.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F0] text-[#0F4C36] border-b border-[#D4AF37]/30 uppercase text-[10px] tracking-wider font-bold">
                  <th className="p-4">Case #</th>
                  <th className="p-4">Applicant &amp; Location</th>
                  <th className="p-4">Category &amp; Title</th>
                  <th className="p-4">Target Need</th>
                  <th className="p-4">Bank Status</th>
                  <th className="p-4">Workflow Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cases.map((c) => (
                  <tr key={c._id} className="hover:bg-[#FAF7F0]/60 transition-colors">
                    {/* Case Number */}
                    <td className="p-4">
                      <span className="bg-[#0F4C36] text-[#F3E5AB] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[#D4AF37]">
                        {c.caseNumber}
                      </span>
                      {c.isZakatEligible && (
                        <div className="text-[9px] text-[#8C620B] font-bold mt-1">★ Zakat Verified</div>
                      )}
                    </td>

                    {/* Applicant & Location */}
                    <td className="p-4 space-y-1">
                      <div className="font-bold text-[#0F4C36] text-xs flex items-center gap-1">
                        <User className="w-3 h-3 text-[#D4AF37]" />
                        <span>{c.applicantName}</span>
                      </div>
                      <div className="text-gray-500 text-[11px] flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        <span>{c.location}</span>
                      </div>
                    </td>

                    {/* Category & Title */}
                    <td className="p-4 space-y-1 max-w-xs">
                      <span className="inline-block bg-[#0F4C36]/10 text-[#0F4C36] border border-[#0F4C36]/20 text-[10px] font-bold px-2 py-0.2 rounded-full">
                        {c.category}
                      </span>
                      <div className="font-serif font-bold text-[#22261F] text-xs line-clamp-1">
                        {c.title}
                      </div>
                    </td>

                    {/* Target Amount */}
                    <td className="p-4">
                      <div className="font-bold text-[#0F4C36] text-sm">
                        ₹{c.targetAmount.toLocaleString('en-IN')}
                      </div>
                      {c.raisedAmount > 0 && (
                        <div className="text-[10px] text-emerald-700 font-semibold">
                          Raised: ₹{c.raisedAmount.toLocaleString('en-IN')}
                        </div>
                      )}
                    </td>

                    {/* Bank Details Status */}
                    <td className="p-4">
                      {c.bankDetails?.accountNumber ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                            <Landmark className="w-3 h-3" /> Account Configured
                          </span>
                          <div className="font-mono text-[10px] text-gray-500 line-clamp-1">
                            {c.bankDetails.bankName || 'Bank set'}
                          </div>
                        </div>
                      ) : (
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Missing Bank
                        </span>
                      )}
                    </td>

                    {/* Workflow Status */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          c.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : c.status === 'rejected'
                            ? 'bg-red-100 text-red-800 border-red-300'
                            : c.status === 'completed'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
                        }`}
                      >
                        {c.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                        {c.status === 'rejected' && <XCircle className="w-3 h-3" />}
                        {c.status === 'pending' && <Clock className="w-3 h-3" />}
                        <span>{c.status}</span>
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedCase(c)}
                          className="p-1.5 rounded-lg bg-[#0F4C36]/10 hover:bg-[#0F4C36] text-[#0F4C36] hover:text-white transition-colors"
                          title="Review & Edit"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {c.status !== 'approved' && (
                          <button
                            onClick={() => handleQuickStatus(c._id, 'approved')}
                            className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-600 text-emerald-800 hover:text-white transition-colors"
                            title="Quick Approve"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDelete(c)}
                          className="p-1.5 rounded-lg bg-red-100 hover:bg-red-600 text-red-700 hover:text-white transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedCase && (
        <CaseReviewModal
          welfareCase={selectedCase}
          onClose={() => setSelectedCase(null)}
          onUpdated={() => {
            loadCases();
            setSelectedCase(null);
          }}
        />
      )}

      {showNewCaseModal && (
        <NewCaseModal
          onClose={() => setShowNewCaseModal(false)}
          onCreated={() => {
            loadCases();
            setShowNewCaseModal(false);
          }}
        />
      )}
    </div>
  );
};
