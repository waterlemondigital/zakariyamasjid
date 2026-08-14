import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login({ username, password });
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message || 'Invalid username or password.');
      }
    } catch (err: any) {
      setError('Connection error. Please ensure backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#072C1E] flex flex-col justify-center items-center px-4 relative overflow-hidden py-12">
      {/* Subtle Islamic Geometric Pattern Background */}
      <div className="absolute inset-0 islamic-pattern-dark opacity-45 pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full space-y-6">
        {/* Emblem & Title */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[#0F4C36] border-2 border-[#D4AF37] mx-auto flex items-center justify-center shadow-2xl relative group">
            <ShieldCheck className="w-9 h-9 text-[#F3E5AB]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-[#0F4C36]" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="font-arabic text-xl text-[#F3E5AB] font-bold block">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              Zakariya Masjid Trust
            </h1>
            <p className="text-xs text-[#F3E5AB] uppercase tracking-widest font-semibold">
              Welfare Case Admin &amp; Trustee Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 gold-gradient-bg"></div>

          <div className="border-b border-gray-100 pb-3 text-center">
            <h2 className="font-serif font-bold text-lg text-[#0F4C36]">Authorized Access Only</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter your trustee credentials to review and publish welfare cases.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#0F4C36] uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Username / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#0F4C36] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50 focus:border-[#0F4C36]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="font-bold text-[#0F4C36] uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAF7F0] border border-[#D4AF37]/50 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#0F4C36] focus:outline-none focus:ring-2 focus:ring-[#0F4C36]/50 focus:border-[#0F4C36] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-[#0F4C36]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-islamic-gold w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" /> Sign In to Trustee Desk <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-white/50 space-y-1">
          <div>Zakariya Masjid &amp; Kabrastan Trust • Pune, Maharashtra</div>
          <div className="text-[10px]">Shariah Compliant &amp; Audited Institution</div>
        </div>
      </div>
    </div>
  );
};
