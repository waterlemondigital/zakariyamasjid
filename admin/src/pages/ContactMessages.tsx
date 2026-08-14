import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { ContactMessage, ContactStatus } from '../types';
import {
  Mail,
  Phone,
  MessageSquare,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  RefreshCw,
  X,
  Filter,
  User,
  Calendar,
  Save,
  Check
} from 'lucide-react';

export const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0, resolved: 0 });

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const [messagesRes, statsRes] = await Promise.all([
        api.getContacts({
          status: activeTab === 'all' ? undefined : activeTab,
          search: searchQuery || undefined,
        }),
        api.getContactStats(),
      ]);

      if (messagesRes.success) {
        setMessages(messagesRes.messages);
      }
      if (statsRes.success) {
        setStats(statsRes.stats);
      }
    } catch (err) {
      console.error('Error loading contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [activeTab]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleOpenDetail = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setInternalNotes(msg.notes || '');
    setNotesSaved(false);

    // If unread, mark as read automatically
    if (msg.status === 'unread') {
      api.updateContactStatus(msg._id, { status: 'read' }).then((res) => {
        if (res.success) {
          setMessages((prev) =>
            prev.map((m) => (m._id === msg._id ? { ...m, status: 'read' } : m))
          );
          setStats((prev) => ({
            ...prev,
            unread: Math.max(0, prev.unread - 1),
            read: prev.read + 1,
          }));
        }
      });
    }
  };

  const handleStatusChange = async (msgId: string, newStatus: ContactStatus) => {
    try {
      const res = await api.updateContactStatus(msgId, { status: newStatus });
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === msgId ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage && selectedMessage._id === msgId) {
          setSelectedMessage((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        // Refresh stats
        const statsRes = await api.getContactStats();
        if (statsRes.success) setStats(statsRes.stats);
      }
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedMessage) return;
    setSavingNotes(true);
    try {
      const res = await api.updateContactStatus(selectedMessage._id, {
        notes: internalNotes,
      });
      if (res.success) {
        setNotesSaved(true);
        setMessages((prev) =>
          prev.map((m) => (m._id === selectedMessage._id ? { ...m, notes: internalNotes } : m))
        );
        setTimeout(() => setNotesSaved(false), 2500);
      }
    } catch (err) {
      console.error('Failed to save notes:', err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDeleteMessage = async (msgId: string) => {
    if (!window.confirm('Are you sure you want to delete this contact inquiry? This cannot be undone.')) {
      return;
    }
    try {
      const res = await api.deleteContact(msgId);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m._id !== msgId));
        if (selectedMessage && selectedMessage._id === msgId) {
          setSelectedMessage(null);
        }
        const statsRes = await api.getContactStats();
        if (statsRes.success) setStats(statsRes.stats);
      }
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (subjectFilter !== 'all' && m.subject !== subjectFilter) return false;
    return true;
  });

  const getCleanWhatsAppPhone = (phone: string) => {
    return phone.replace(/[^0-9]/g, '');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#D4AF37]/30 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F4C36] text-[#F3E5AB] text-xs font-bold uppercase tracking-wider mb-2 border border-[#D4AF37]">
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" /> Public Inquiries Desk
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C36]">
            Contact Messages &amp; Inquiries
          </h1>
          <p className="text-xs text-[#22261F]/70 mt-1">
            Review general inquiries, burial requests, and community queries submitted via the website.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="inline-flex items-center gap-2 bg-white text-[#0F4C36] hover:bg-[#FAF7F0] border border-[#D4AF37]/60 font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer self-start md:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh Messages
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#D4AF37]/40 shadow-xs">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Total Inquiries</span>
          <span className="font-serif text-2xl font-bold text-[#0F4C36] mt-1 block">{stats.total}</span>
        </div>

        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 shadow-xs relative overflow-hidden">
          {stats.unread > 0 && (
            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
          )}
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">Unread / New</span>
          <span className="font-serif text-2xl font-bold text-amber-700 mt-1 block">{stats.unread}</span>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 shadow-xs">
          <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">Reviewed / Read</span>
          <span className="font-serif text-2xl font-bold text-blue-700 mt-1 block">{stats.read}</span>
        </div>

        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Resolved</span>
          <span className="font-serif text-2xl font-bold text-emerald-700 mt-1 block">{stats.resolved}</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#D4AF37]/40 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
            {(['all', 'unread', 'read', 'resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#0F4C36] text-[#F3E5AB] shadow-xs border border-[#D4AF37]'
                    : 'bg-gray-100 text-[#22261F]/70 hover:bg-gray-200'
                }`}
              >
                {tab === 'all' ? 'All Inquiries' : tab}
                {tab === 'unread' && stats.unread > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-mono">
                    {stats.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Subject Filter & Search Input */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
            <div className="relative">
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-3 py-2 text-xs font-semibold text-[#0F4C36] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50 w-full sm:w-auto"
              >
                <option value="all">All Subjects</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Kabristan & Burial Service">Kabristan &amp; Burial</option>
                <option value="Donation Inquiry">Donation Inquiry</option>
                <option value="Zakat Relief Request">Zakat Relief</option>
                <option value="Madrasa Admission">Madrasa Admission</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search name, phone, msg..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl pl-9 pr-3 py-2 text-xs text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Messages List / Table */}
      <div className="bg-white rounded-3xl border border-[#D4AF37]/40 shadow-md overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#0F4C36] animate-spin mx-auto" />
            <p className="text-xs text-gray-500 font-semibold">Loading inquiries from database...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-gray-700">No Inquiries Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {activeTab === 'unread'
                ? 'Great news! There are no unread inquiries waiting for review.'
                : 'No messages matched your current filter criteria.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredMessages.map((msg) => (
              <div
                key={msg._id}
                onClick={() => handleOpenDetail(msg)}
                className={`p-4 sm:p-5 transition-colors hover:bg-[#FAF7F0]/80 cursor-pointer flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                  msg.status === 'unread' ? 'bg-amber-50/40 border-l-4 border-amber-500' : ''
                }`}
              >
                {/* Left: Sender & Preview */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        msg.status === 'unread'
                          ? 'bg-amber-100 text-amber-800 font-extrabold border border-amber-300'
                          : msg.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {msg.status}
                    </span>

                    <span className="text-[11px] font-bold text-[#0F4C36] bg-[#FAF7F0] border border-[#D4AF37]/40 px-2 py-0.5 rounded-md">
                      {msg.subject}
                    </span>

                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#0F4C36] truncate">{msg.name}</h4>
                    <span className="text-xs text-gray-500 font-mono">({msg.phone})</span>
                  </div>

                  <p className="text-xs text-[#22261F]/75 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>

                  {msg.notes && (
                    <div className="text-[11px] text-[#B8860B] font-semibold flex items-center gap-1 pt-0.5">
                      <span className="italic">Trustee Note: {msg.notes}</span>
                    </div>
                  )}
                </div>

                {/* Right: Quick Action Buttons */}
                <div
                  className="flex items-center gap-2 self-end md:self-center flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={`https://wa.me/${getCleanWhatsAppPhone(msg.phone)}?text=${encodeURIComponent(
                      `Assalamu Alaikum ${msg.name}, this is from Zakariya Masjid & Kabristan Trust regarding your inquiry: "${msg.subject}".`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                    title="Reply via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>

                  <a
                    href={`tel:${msg.phone}`}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors"
                    title="Call Phone Number"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  {msg.status !== 'resolved' ? (
                    <button
                      onClick={() => handleStatusChange(msg._id, 'resolved')}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Mark as Resolved"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Resolve</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(msg._id, 'read')}
                      className="px-2.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reopen
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteMessage(msg._id)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl border-2 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#0F4C36] text-[#FAF7F0] p-5 flex items-center justify-between border-b border-[#D4AF37]/50">
              <div>
                <span className="text-[10px] font-bold text-[#F3E5AB] uppercase tracking-wider block">
                  Inquiry Reference
                </span>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F3E5AB]">
                  {selectedMessage.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#F3E5AB] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Sender Profile Strip */}
              <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#D4AF37]/40 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">Sender Name</span>
                    <span className="font-bold text-sm text-[#0F4C36]">{selectedMessage.name}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">Received Date</span>
                    <span className="font-semibold text-gray-700">
                      {new Date(selectedMessage.createdAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">Phone / Mobile</span>
                    <span className="font-mono font-bold text-[#0F4C36]">{selectedMessage.phone}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase block">Email Address</span>
                    <span className="font-semibold text-gray-700">{selectedMessage.email}</span>
                  </div>
                </div>

                {/* Direct Action Contacts */}
                <div className="pt-2 border-t border-[#D4AF37]/30 flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/${getCleanWhatsAppPhone(selectedMessage.phone)}?text=${encodeURIComponent(
                      `Assalamu Alaikum ${selectedMessage.name}, this is from Zakariya Masjid & Kabristan Trust regarding your inquiry: "${selectedMessage.subject}".`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Open WhatsApp Chat
                  </a>

                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0F4C36] hover:bg-[#155A41] text-[#F3E5AB] font-bold text-xs shadow-xs border border-[#D4AF37]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Call Phone
                  </a>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                      `Response from Zakariya Masjid & Trust: ${selectedMessage.subject}`
                    )}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Send Email
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 uppercase text-[11px] block">
                  Inquiry Message:
                </label>
                <div className="p-4 bg-white border border-gray-300 rounded-2xl text-[#22261F] text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status Update Options */}
              <div className="space-y-2">
                <label className="font-bold text-gray-700 uppercase text-[11px] block">
                  Update Inquiry Status:
                </label>
                <div className="flex gap-2">
                  {(['unread', 'read', 'resolved'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedMessage._id, st)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                        selectedMessage.status === st
                          ? st === 'unread'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : st === 'resolved'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-blue-600 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trustee Internal Notes */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gray-700 uppercase text-[11px] block">
                    Trustee Internal Notes (Private):
                  </label>
                  {notesSaved && (
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved successfully
                    </span>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="e.g. Called and scheduled Kabristan document verification for Saturday 11 AM..."
                  className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl p-3 text-xs text-[#22261F] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50"
                ></textarea>
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="inline-flex items-center gap-1.5 bg-[#0F4C36] hover:bg-[#155A41] text-[#F3E5AB] font-bold text-xs px-3.5 py-1.5 rounded-xl border border-[#D4AF37] shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  {savingNotes ? 'Saving...' : 'Save Internal Note'}
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => handleDeleteMessage(selectedMessage._id)}
                className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 font-bold text-xs p-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Delete Inquiry
              </button>

              <button
                onClick={() => setSelectedMessage(null)}
                className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-bold text-xs text-gray-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
