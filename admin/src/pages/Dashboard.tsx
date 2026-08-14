import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { WelfareCase, DashboardStats, ContactMessage, ContactStats } from '../types';
import { CaseReviewModal } from '../components/CaseReviewModal';
import { NewCaseModal } from '../components/NewCaseModal';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Coins,
  ArrowRight,
  User,
  MapPin,
  Landmark,
  ShieldCheck,
  RefreshCw,
  PlusCircle,
  ExternalLink,
  Sparkles,
  MessageSquare,
  MessageCircle,
  Phone,
  Mail,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    completed: 0,
    totalTarget: 0,
    totalRaised: 0,
  });

  const [contactStats, setContactStats] = useState<ContactStats>({
    total: 0,
    unread: 0,
    read: 0,
    resolved: 0,
  });

  const [pendingCases, setPendingCases] = useState<WelfareCase[]>([]);
  const [recentContacts, setRecentContacts] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<WelfareCase | null>(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statsRes, pendingRes, contactStatsRes, contactsRes] = await Promise.all([
        api.getDashboardStats(),
        api.getCases({ status: 'pending' }),
        api.getContactStats(),
        api.getContacts({ status: 'unread' }),
      ]);

      if (statsRes.success && statsRes.stats) {
        setStats(statsRes.stats);
      }
      if (pendingRes.success && pendingRes.cases) {
        setPendingCases(pendingRes.cases);
      }
      if (contactStatsRes.success && contactStatsRes.stats) {
        setContactStats(contactStatsRes.stats);
      }
      if (contactsRes.success && contactsRes.messages) {
        setRecentContacts(contactsRes.messages.slice(0, 3));
      }
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Welcome Banner */}
      <div className="bg-[#0F4C36] text-white rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute inset-0 islamic-pattern-dark opacity-35 pointer-events-none"></div>

        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#1C6B4A] text-[#F3E5AB] text-xs font-bold px-3.5 py-1 rounded-full border border-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Trustee Administration Desk
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Welfare Cases &amp; Needy Assistance Workflow
          </h1>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Review incoming welfare requests submitted through the portal, verify bank details, set public presentation parameters, and approve cases for live donation.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setShowNewCaseModal(true)}
            className="btn-islamic-gold px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <PlusCircle className="w-4 h-4" /> Add Verified Case
          </button>

          <button
            onClick={loadData}
            title="Refresh"
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-[#D4AF37]/50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending Review Card */}
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/60 p-6 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Pending Review</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="pt-4 flex items-baseline justify-between">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C36]">{stats.pending}</div>
            {stats.pending > 0 && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                Action Needed
              </span>
            )}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Applications waiting for trustee verification</p>
        </div>

        {/* Live Approved Card */}
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/60 p-6 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Live on Website</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="pt-4 flex items-baseline justify-between">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C36]">{stats.approved}</div>
            <a
              href="http://localhost:3000/welfare-cases"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-[#0F4C36] font-bold hover:underline flex items-center gap-1"
            >
              <span>View Public</span> <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Active verified cases visible to donors</p>
        </div>

        {/* Total Target Fund Card */}
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/60 p-6 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Total Need Target</span>
            <div className="w-10 h-10 rounded-xl bg-[#0F4C36]/10 border border-[#0F4C36]/30 flex items-center justify-center text-[#0F4C36]">
              <Coins className="w-5 h-5 text-[#B8860B]" />
            </div>
          </div>

          <div className="pt-4">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C36]">
              ₹{stats.totalTarget.toLocaleString('en-IN')}
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Across all approved welfare requirements</p>
        </div>

        {/* Total Applications Card */}
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/60 p-6 shadow-lg relative overflow-hidden flex flex-col justify-between hover:border-[#D4AF37] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Contact Inquiries</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-600">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          <div className="pt-4 flex items-baseline justify-between">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F4C36]">{contactStats.total}</div>
            {contactStats.unread > 0 && (
              <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {contactStats.unread} Unread
              </span>
            )}
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            <Link to="/contacts" className="text-[#0F4C36] font-bold hover:underline">
              Open Inquiries Inbox →
            </Link>
          </p>
        </div>
      </div>

      {/* Priority Section: Pending Review Queue */}
      <div className="bg-white rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F4C36]">
                Pending Verification Queue ({pendingCases.length})
              </h2>
            </div>
            <p className="text-xs text-[#22261F]/70">
              Applications submitted by community members awaiting trustee verification and approval.
            </p>
          </div>

          <Link
            to="/cases?status=pending"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C36] hover:text-[#B8860B] uppercase tracking-wider transition-colors"
          >
            <span>View All Cases</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {pendingCases.length === 0 ? (
          <div className="text-center py-12 bg-[#FAF7F0] rounded-2xl border border-[#D4AF37]/40 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#0F4C36]">All Caught Up! Alhamdulillah.</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              There are no pending assistance requests at this time. New applications from the website will appear here instantly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingCases.map((c) => (
              <div
                key={c._id}
                className="bg-[#FAF7F0] rounded-2xl border-2 border-[#D4AF37]/50 p-5 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-[#D4AF37]/30 pb-2.5">
                    <span className="bg-[#0F4C36] text-[#F3E5AB] font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                      {c.caseNumber}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      Pending Approval
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#0F4C36] leading-snug line-clamp-2">
                    {c.title}
                  </h3>

                  <div className="space-y-1 text-xs text-[#22261F]/80">
                    <div className="flex items-center gap-1.5 font-semibold text-[#0F4C36]">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{c.applicantName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span className="line-clamp-1">{c.applicantAddress}</span>
                    </div>
                    {c.targetAmount > 0 && (
                      <div className="flex items-center gap-1.5 font-bold text-[#B8860B] pt-1">
                        <Coins className="w-3.5 h-3.5" />
                        <span>Need Target: ₹{c.targetAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-200 line-clamp-3 italic">
                    "{c.story}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D4AF37]/30">
                  <button
                    onClick={() => setSelectedCase(c)}
                    className="btn-islamic-gold w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Review &amp; Verify</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Inquiries Recent Stream */}
      <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/60 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D4AF37]/30 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#0F4C36]" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F4C36]">
                Recent Contact Inquiries ({contactStats.unread} Unread)
              </h2>
            </div>
            <p className="text-xs text-[#22261F]/70">
              General inquiries, burial assistance, and public messages submitted from the contact section.
            </p>
          </div>

          <Link
            to="/contacts"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4C36] hover:text-[#B8860B] uppercase tracking-wider transition-colors"
          >
            <span>Open Inquiries Desk</span> <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentContacts.length === 0 ? (
          <div className="text-center py-8 bg-[#FAF7F0] rounded-2xl border border-[#D4AF37]/40 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-serif text-base font-bold text-[#0F4C36]">No Unread Inquiries</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              All contact messages have been reviewed or resolved.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentContacts.map((msg) => (
              <div
                key={msg._id}
                className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#D4AF37]/40 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-[#0F4C36] bg-white border border-[#D4AF37]/40 px-2 py-0.5 rounded">
                      {msg.subject}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                      New
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-[#0F4C36]">{msg.name}</h4>
                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    "{msg.message}"
                  </p>
                </div>

                <div className="pt-2 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-gray-500">{msg.phone}</span>
                  <Link
                    to="/contacts"
                    className="font-bold text-[#0F4C36] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Reply</span> <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Case Review Modal */}
      {selectedCase && (
        <CaseReviewModal
          welfareCase={selectedCase}
          onClose={() => setSelectedCase(null)}
          onUpdated={() => {
            loadData();
            setSelectedCase(null);
          }}
        />
      )}

      {/* New Case Modal */}
      {showNewCaseModal && (
        <NewCaseModal
          onClose={() => setShowNewCaseModal(false)}
          onCreated={() => {
            loadData();
            setShowNewCaseModal(false);
          }}
        />
      )}
    </div>
  );
};
