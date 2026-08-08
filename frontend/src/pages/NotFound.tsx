import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Logo } from '../components/Logo';

export const NotFound: React.FC = () => {
  return (
    <div className="py-20 bg-[#FAF7F0] min-h-[75vh] flex items-center justify-center text-[#22261F] px-4">
      <div className="max-w-lg w-full bg-white rounded-3xl border-2 border-[#C9A227] p-8 md:p-12 shadow-2xl text-center space-y-6">
        <Logo className="h-16 mx-auto" variant="full" showSubtext={false} />

        <div className="font-serif text-6xl font-extrabold text-[#0F4C36] tracking-wider">
          404
        </div>

        <h1 className="font-serif text-2xl font-bold text-[#0F4C36]">
          Page Not Found
        </h1>

        <p className="text-sm text-[#22261F]/80 leading-relaxed">
          The requested page could not be located on the Zakariya Masjid &amp; Kabrastan Trust portal. Please check the URL or return to the main homepage.
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#0F4C36] hover:bg-[#1C6B4A] text-white font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 border-2 border-[#C9A227] transition-all"
          >
            <Home className="w-4 h-4 text-[#C9A227]" /> Return To Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
