import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { CONTACT, getWhatsAppLink } from '../../config/contact';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Process', path: '/process' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll detection for sticky navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4 sm:py-5'
        }`}
      >
        <Container size="xl">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Logo variant="light" />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs lg:text-[13px] font-semibold tracking-wider uppercase transition-colors relative py-1.5 ${
                      isActive
                        ? 'text-brand-blue'
                        : 'text-slate-700 hover:text-brand-navy'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-blue"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                to="/contact"
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Start Your Project
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-brand-navy hover:text-brand-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Navigation with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-brand-dark/60 backdrop-blur-sm md:hidden"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col justify-between p-6 md:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <div>
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                  <Logo variant="light" showTagline={false} />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-slate-500 hover:text-brand-navy"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Location indicator */}
                <div className="mt-4 px-3 py-2 rounded bg-brand-slate border border-slate-200 text-[11px] font-mono tracking-wider text-slate-600 flex items-center justify-between">
                  <span>LOCATION:</span>
                  <span className="font-bold text-brand-navy">RANCHI, JHARKHAND</span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 mt-6" aria-label="Mobile Menu Links">
                  {NAV_LINKS.map((link, idx) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-3 rounded-none text-sm font-bold uppercase tracking-wider transition-colors ${
                          isActive
                            ? 'text-brand-blue bg-brand-blue/5 border-l-4 border-brand-blue'
                            : 'text-slate-800 hover:text-brand-navy hover:bg-slate-50'
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      <span className="text-xs font-mono text-slate-400">0{idx + 1}</span>
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="pt-6 border-t border-slate-200 space-y-3">
                <Button
                  to="/contact"
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start Your Project
                </Button>

                <Button
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="md"
                  className="w-full"
                  icon={<MessageSquare className="w-4 h-4" />}
                  iconPosition="left"
                >
                  WhatsApp Us (+91 90225 98556)
                </Button>

                <div className="text-center pt-2 text-[11px] text-slate-500 font-mono">
                  {CONTACT.brandPositioning}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
