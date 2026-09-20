import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutDashboard,
  Inbox,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  User,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/admin/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/enquiries', label: 'Enquiries', icon: Inbox, end: false },
  ];

  return (
    <div className="min-h-screen bg-[#F1F4F6] text-brand-dark flex flex-col font-sans">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#063A58] text-white sticky top-0 z-40 shadow-md border-b border-[#07151D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Portal Name */}
            <div className="flex items-center space-x-3">
              <NavLink to="/admin" className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-blue to-[#063A58] border border-white/20 flex items-center justify-center font-serif font-bold text-white shadow-sm">
                  ISG
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold tracking-wider uppercase font-serif text-white">
                    Infinity Space Group
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-[#F4C542] font-mono flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 inline mr-0.5" />
                    <span>Admin Portal</span>
                  </div>
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#1479D1] text-white shadow-inner font-semibold'
                          : 'text-gray-200 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Desktop User Info & Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {admin && (
                <div className="flex items-center space-x-2 bg-[#07151D]/40 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-200">
                  <User className="w-3.5 h-3.5 text-[#F4C542]" />
                  <span className="truncate max-w-[180px]" title={admin.email}>
                    {admin.email}
                  </span>
                </div>
              )}

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-xs text-gray-300 hover:text-white px-2.5 py-1.5 rounded hover:bg-white/10 transition-colors"
                title="View public website"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center space-x-1.5 text-xs bg-red-600/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{isLoggingOut ? 'Exiting...' : 'Sign Out'}</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex items-center md:hidden space-x-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label="Toggle admin navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#063A58] px-4 pt-2 pb-4 space-y-2">
            {admin && (
              <div className="px-3 py-2 text-xs text-gray-300 border-b border-white/10 flex items-center space-x-2">
                <User className="w-4 h-4 text-[#F4C542]" />
                <span className="truncate">{admin.email}</span>
              </div>
            )}
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1479D1] text-white font-semibold'
                        : 'text-gray-200 hover:bg-white/10'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
            <div className="pt-2 border-t border-white/10 flex flex-col space-y-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white px-3 py-2 rounded hover:bg-white/10"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Public Website</span>
              </a>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center justify-center space-x-2 text-sm bg-red-600/90 hover:bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>{isLoggingOut ? 'Signing out...' : 'Sign Out'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-gray-200 py-3 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Infinity Space Group — Administrative Portal (Ranchi, Jharkhand)</span>
          <span className="font-mono text-[11px] text-gray-400">Secure Session Protected</span>
        </div>
      </footer>
    </div>
  );
};
