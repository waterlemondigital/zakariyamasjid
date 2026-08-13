import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CasesManagement } from './pages/CasesManagement';
import { Settings } from './pages/Settings';
import { AdminNavbar } from './components/AdminNavbar';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#072C1E] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-[#0F4C36] border-2 border-[#D4AF37] flex items-center justify-center animate-spin">
          <div className="w-6 h-6 border-2 border-t-[#D4AF37] border-white/20 rounded-full"></div>
        </div>
        <span className="font-serif text-sm font-bold text-[#F3E5AB]">
          Authenticating Zakariya Trust Session...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col">
      <AdminNavbar />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {children}
      </main>
      <footer className="bg-white border-t-2 border-[#D4AF37]/40 py-4 text-center text-xs text-[#22261F]/70 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full gap-2 font-medium">
        <div>Zakariya Masjid &amp; Kabrastan Trust • Trustee Administration Portal • Mundhwa, Pune</div>
        <div>Made by <strong className="text-[#B8860B]">WaterLemon Digital</strong></div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cases"
            element={
              <ProtectedRoute>
                <CasesManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
