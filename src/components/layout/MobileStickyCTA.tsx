import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { getWhatsAppLink } from '../../config/contact';

export const MobileStickyCTA: React.FC = () => {
  const { pathname } = useLocation();

  // Do not show sticky bar if the user is already on the contact/consultation page
  if (pathname === '/contact') {
    return null;
  }

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-brand-dark/95 backdrop-blur-md border-t border-brand-navy/80 px-4 py-3 shadow-xl transition-all"
      aria-label="Mobile Quick Action"
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* Primary Discuss Project Route */}
        <Link
          to="/contact"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-accent text-brand-dark font-sans font-bold text-xs uppercase tracking-wider hover:bg-yellow-400 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-1 focus:ring-offset-brand-dark"
        >
          <span>Discuss Your Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {/* Quick WhatsApp Action */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center p-2.5 bg-[#25D366] text-white hover:bg-[#20ba59] active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-1 focus:ring-offset-brand-dark"
          aria-label="Chat on WhatsApp (+91 90225 98556)"
        >
          <MessageSquare className="w-4 h-4" />
        </a>
      </div>
    </aside>
  );
};
