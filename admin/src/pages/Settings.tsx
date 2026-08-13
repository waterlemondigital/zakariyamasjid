import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, Lock, Mail, Landmark, Sparkles, CheckCircle2 } from 'lucide-react';

export const Settings: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in pb-12">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/50 shadow-md space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#0F4C36] text-[#F3E5AB] text-xs font-bold px-3.5 py-1 rounded-full border border-[#D4AF37]">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Security &amp; Trust Governance
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F4C36]">
          Trustee Account &amp; System Configuration
        </h1>
        <p className="text-xs text-[#22261F]/70">
          Zakariya Masjid &amp; Kabrastan Trust Administrative security and governance parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Profile Card */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37]/50 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-[#D4AF37]/30 pb-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C36] text-[#F3E5AB] flex items-center justify-center border border-[#D4AF37]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-[#0F4C36]">Active Trustee Profile</h2>
              <span className="text-[11px] text-gray-500">Authenticated Session</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-gray-500 uppercase text-[10px] font-bold">Admin Name:</span>
              <div className="font-bold text-[#0F4C36] text-sm">{user?.name}</div>
            </div>
            <div>
              <span className="text-gray-500 uppercase text-[10px] font-bold">Username:</span>
              <div className="font-mono font-bold text-[#0F4C36]">{user?.username}</div>
            </div>
            <div>
              <span className="text-gray-500 uppercase text-[10px] font-bold">Email:</span>
              <div className="text-gray-700">{user?.email}</div>
            </div>
            <div>
              <span className="text-gray-500 uppercase text-[10px] font-bold">Role:</span>
              <div className="inline-block bg-[#0F4C36] text-[#F3E5AB] text-[10px] font-bold px-2 py-0.5 rounded uppercase mt-0.5">
                {user?.role}
              </div>
            </div>
          </div>
        </div>

        {/* System Security Features */}
        <div className="bg-[#FAF7F0] p-6 rounded-3xl border-2 border-[#D4AF37]/50 shadow-lg space-y-4">
          <div className="flex items-center gap-3 border-b border-[#D4AF37]/30 pb-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C36] text-[#F3E5AB] flex items-center justify-center border border-[#D4AF37]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-[#0F4C36]">Production Security</h2>
              <span className="text-[11px] text-gray-500">Active Protections</span>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs text-[#22261F]/80">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>12-Round Bcrypt Hashing:</strong> Passwords irreversibly salted.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>Helmet HTTP Headers:</strong> XSS &amp; clickjacking defense.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>Rate Limiter:</strong> Brute force &amp; DoS prevention.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>Confidential Data Masking:</strong> Sensitive numbers private.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
