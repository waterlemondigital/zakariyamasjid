import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Masjid } from './pages/Masjid';
import { Kabristan } from './pages/Kabristan';
import { Donate } from './pages/Donate';
import { Transparency } from './pages/Transparency';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { Policies } from './pages/Policies';
import { NeedyCases } from './pages/NeedyCases';
import { NotFound } from './pages/NotFound';
import { useSEO } from './hooks/useSEO';
import { Analytics } from '@vercel/analytics/react';

// Helper component to handle SEO and scroll restoration
function AppSEO() {
  useSEO();
  return null;
}

export default function App() {
  return (
    <Router>
      <AppSEO />
      <Analytics />
      <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-[#22261F] font-sans antialiased">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/masjid" element={<Masjid />} />
            <Route path="/kabristan" element={<Kabristan />} />
            <Route path="/welfare-cases" element={<NeedyCases />} />
            <Route path="/needy-cases" element={<NeedyCases />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
