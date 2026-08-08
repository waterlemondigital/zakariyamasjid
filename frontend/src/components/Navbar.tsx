import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X, Heart, Phone, ShieldCheck, Clock } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Masjid', path: '/masjid' },
    { name: 'Kabristan', path: '/kabristan' },
    { name: 'Donate', path: '/donate' },
    { name: 'Transparency', path: '/transparency' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#0B3C2A] text-[#FAF7F0] border-b border-[#D4AF37]/40 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#F3E5AB]">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Zuhr Jamaat: 1:20 PM
            </span>
            <a
              href="https://wa.me/919890185013?text=Assalamu%20Alaikum,%20I%20need%20assistance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-[#25D366] text-white px-2.5 py-0.5 rounded-full font-bold hover:bg-[#1EBE5A] transition-colors"
            >
              Need any Help Contact Us
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+919890185013" className="flex items-center gap-1.5 hover:text-[#F3E5AB] transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> +91 98901 85013
            </a>
            <Link to="/policies" className="hover:text-[#F3E5AB] transition-colors text-white/70">
              Privacy &amp; Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`relative transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-[#D4AF37]/50 shadow-md py-3 text-[#22261F]'
            : 'bg-white border-[#D4AF37]/40 shadow-sm py-4 text-[#22261F]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <Logo className="h-12 md:h-14" variant="full" showSubtext={true} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-bold uppercase tracking-wider transition-all relative ${
                    isActive
                      ? 'text-[#0F4C36] bg-[#0F4C36]/10 font-extrabold border-b-2 border-[#D4AF37] shadow-sm'
                      : 'text-[#22261F]/80 hover:text-[#0F4C36] hover:bg-[#0F4C36]/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Donate Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/donate"
              className="btn-islamic-gold px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <Heart className="w-4 h-4 fill-current" /> Donate Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/donate"
              className="sm:hidden btn-islamic-gold px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 fill-current" /> Donate
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0F4C36] hover:bg-[#0F4C36]/10 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#0F4C36]" /> : <Menu className="w-6 h-6 text-[#0F4C36]" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-In Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full inset-x-0 bg-white border-b-4 border-[#D4AF37] shadow-2xl p-5 rounded-b-[24px] z-50 animate-fade-in text-[#22261F] space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-sm font-bold tracking-wide transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#0F4C36] text-[#F3E5AB] shadow-md'
                        : 'text-[#22261F] hover:bg-[#0F4C36]/5 hover:text-[#0F4C36]'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono">{isActive ? '✓' : '→'}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/30 text-center space-y-3">
              <Link
                to="/donate"
                className="btn-islamic-gold w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Heart className="w-4 h-4 fill-current" /> Donate Now
              </Link>
              <div className="text-xs text-[#0F4C36] font-bold pt-1">
                Mundhwa, Off Koregaon Park, Pune
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
