import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  FileCheck2,
  ExternalLink,
  PlusCircle,
  Clock,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

interface AdminNavbarProps {
  onOpenNewCase?: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onOpenNewCase }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Welfare Cases', path: '/cases', icon: FileCheck2 },
    { name: 'Contact Inquiries', path: '/contacts', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F4C36] text-white border-b-2 border-[#D4AF37] shadow-xl">
      {/* Top Bismillah & Date Ribbon */}
      <div className="bg-[#0A3324] border-b border-[#D4AF37]/30 text-xs py-1 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-arabic text-sm text-[#F3E5AB]">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            <span className="text-[#D4AF37]">•</span>
            <span className="text-white/80 font-medium text-[11px]">
              Zakariya Masjid &amp; Kabrastan Trust Trustee Portal
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/70 text-[11px]">
            <span className="flex items-center gap-1 text-[#F3E5AB]">
              <Clock className="w-3 h-3 text-[#D4AF37]" /> Mundhwa, Pune, MH
            </span>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F3E5AB] flex items-center gap-1 transition-colors text-white/90 font-medium"
            >
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#1C6B4A] border-2 border-[#D4AF37] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-[#F3E5AB]" />
          </div>
          <div>
            <div className="font-serif font-bold text-base sm:text-lg text-white leading-tight flex items-center gap-1.5">
              <span>Zakariya Masjid</span>
              <span className="text-[10px] bg-[#D4AF37] text-[#0F4C36] px-1.5 py-0.2 rounded font-bold uppercase">Admin</span>
            </div>
            <div className="text-[10px] text-[#F3E5AB] uppercase tracking-wider font-semibold">
              Welfare Case Approval Desk
            </div>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0A3324]/80 p-1 rounded-xl border border-[#D4AF37]/40">
          {navLinks.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'gold-gradient-bg text-[#0F4C36] shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {onOpenNewCase && (
            <button
              onClick={onOpenNewCase}
              className="btn-islamic-gold hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Case</span>
            </button>
          )}

          {/* User Badge & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#D4AF37]/30">
            <div className="hidden sm:block text-right">
              <div className="text-xs font-bold text-white leading-tight">{user?.name || 'Trustee Admin'}</div>
              <div className="text-[10px] text-[#F3E5AB] uppercase font-mono">{user?.role || 'Trustee'}</div>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 text-white border border-[#D4AF37]/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
