import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileStickyCTA } from './MobileStickyCTA';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top on route navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark selection:bg-brand-blue selection:text-white">
      <Navbar />
      <main className="flex-grow pt-[72px] sm:pt-[80px] pb-14 md:pb-0" id="main-content">
        {children}
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
};

