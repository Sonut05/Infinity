import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';

export const IntroSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white relative overflow-hidden" aria-label="Introduction">
      {/* Subtle blueprint grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Large Heading */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
                INTEGRATED PRACTICE
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-brand-navy uppercase tracking-tight leading-[1.08]">
              WE DESIGN. <br />
              <span className="text-brand-blue font-sans font-bold">WE ENGINEER.</span> <br />
              WE BUILD.
            </h2>
          </div>

          {/* Right Column: Supporting Copy + Link */}
          <div className="lg:col-span-6 flex flex-col justify-between pt-2 lg:pt-8">
            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed mb-8">
              From initial planning and structural design to interiors, visualization and execution, Infinity Space Group brings the essential expertise together under one roof.
            </p>

            {/* Disciplines under one roof mini-badges */}
            <div className="grid grid-cols-2 gap-3 mb-10 text-xs font-mono text-slate-600">
              <div className="flex items-center gap-2 p-2.5 bg-brand-slate border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>Architecture & Planning</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-brand-slate border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>Structural Engineering</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-brand-slate border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>Civil Execution & BOQ</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-brand-slate border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                <span>Interiors & 3D Walkthrough</span>
              </div>
            </div>

            {/* Direct Link */}
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-sans font-bold tracking-widest uppercase text-brand-navy hover:text-brand-blue transition-colors group"
              >
                <span>Discover Infinity Space</span>
                <span className="w-8 h-8 rounded-full border border-brand-navy/30 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-all">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
