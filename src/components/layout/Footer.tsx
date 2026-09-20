import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, MessageSquare, ExternalLink, ArrowUpRight, Lock } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Container } from '../ui/Container';
import { InstagramIcon } from '../ui/InstagramIcon';
import { CONTACT, getWhatsAppLink } from '../../config/contact';


export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white border-t border-brand-navy/60 relative overflow-hidden" role="contentinfo">
      {/* Precision Blueprint Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative z-10 pt-16 pb-12">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Column 1 & 2: Brand & Positioning */}
            <div className="lg:col-span-2 space-y-5">
              <Logo variant="footer" />
              
              <div className="inline-block px-3 py-1 bg-brand-navy/60 border border-brand-blue/30 text-[11px] font-mono tracking-widest text-brand-accent uppercase">
                {CONTACT.brandPositioning}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                From concept to creation. Planning, architecture, structural engineering, and precision construction solutions tailored for residential and commercial environments in Ranchi, Jharkhand.
              </p>

              {/* Tagline highlight */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs font-serif italic text-brand-accent tracking-wide">
                  &ldquo;{CONTACT.tagline}&rdquo;
                </span>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h3 className="text-xs font-mono font-bold tracking-architectural uppercase text-brand-blue mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-slate-300 hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-slate-300 hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/process" className="text-slate-300 hover:text-white transition-colors">
                    Process
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li className="pt-1">
                  <Link
                    to="/admin"
                    className="text-slate-400 hover:text-brand-accent transition-colors inline-flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Admin Portal</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Core Services */}
            <div>
              <h3 className="text-xs font-mono font-bold tracking-architectural uppercase text-brand-blue mb-4">
                Services
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/services#planning" className="text-slate-300 hover:text-white transition-colors">
                    Architecture & Planning
                  </Link>
                </li>
                <li>
                  <Link to="/services#structural" className="text-slate-300 hover:text-white transition-colors">
                    Structural Design
                  </Link>
                </li>
                <li>
                  <Link to="/services#construction" className="text-slate-300 hover:text-white transition-colors">
                    Construction & Civil Work
                  </Link>
                </li>
                <li>
                  <Link to="/services#interior" className="text-slate-300 hover:text-white transition-colors">
                    Interior Design
                  </Link>
                </li>
                <li>
                  <Link to="/services#renovation" className="text-slate-300 hover:text-white transition-colors">
                    Renovation & Landscaping
                  </Link>
                </li>
                <li>
                  <Link to="/services#3d" className="text-slate-300 hover:text-white transition-colors">
                    3D Visualization
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5: Contact & Location */}
            <div>
              <h3 className="text-xs font-mono font-bold tracking-architectural uppercase text-brand-blue mb-4">
                Location & Connect
              </h3>
              <div className="space-y-3.5 text-sm">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-1" />
                  <div className="text-xs leading-relaxed">
                    <span className="font-semibold text-white block">Ranchi, Jharkhand</span>
                    <span className="text-slate-400">India</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-slate-300">
                  <MessageSquare className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
                  <div>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-white hover:text-brand-accent transition-colors font-semibold flex items-center gap-1"
                    >
                      <span>WhatsApp Discussion</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a
                      href={`tel:${CONTACT.phone}`}
                      className="text-[11px] text-slate-300 hover:text-brand-accent block font-mono mt-0.5 transition-colors"
                    >
                      {CONTACT.whatsappDisplay || CONTACT.phone || '+91 90225 98556'}
                    </a>
                  </div>
                </div>

                {/* Social Placeholder */}
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[11px] font-mono text-slate-400 block mb-2">Social:</span>
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-brand-accent transition-colors font-medium"
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>

                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
            <p>
              &copy; {currentYear} Infinity Space Group. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-[11px]">
              <span>Ranchi, Jharkhand</span>
              <span>•</span>
              <span className="text-brand-accent">From Concept to Creation</span>
              <span>•</span>
              <Link
                to="/admin"
                className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 hover:underline"
              >
                <Lock className="w-3 h-3 text-slate-400" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
