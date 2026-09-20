import React from 'react';
import { Layers, Eye, Calculator, CheckCircle2 } from 'lucide-react';
import { Container } from '../ui/Container';

interface ValuePillar {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const VALUE_PILLARS: ValuePillar[] = [
  {
    number: '01',
    title: 'COMPLETE EXPERTISE',
    description: 'Planning, structural design, interiors and construction working together under one cohesive team.',
    icon: <Layers className="w-6 h-6 text-brand-blue" />,
  },
  {
    number: '02',
    title: 'VISUALIZE BEFORE YOU BUILD',
    description: 'Understand proposed spaces through detailed 3D visualization and elevations before on-site execution begins.',
    icon: <Eye className="w-6 h-6 text-brand-blue" />,
  },
  {
    number: '03',
    title: 'CLEAR PLANNING',
    description: 'Thoughtful municipal map planning, zoning alignment, and transparent estimating before breaking ground.',
    icon: <Calculator className="w-6 h-6 text-brand-blue" />,
  },
  {
    number: '04',
    title: 'END-TO-END APPROACH',
    description: 'A connected workflow from initial concept sketches through engineered civil structure and final transformation.',
    icon: <CheckCircle2 className="w-6 h-6 text-brand-blue" />,
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white relative overflow-hidden" aria-label="Why Infinity Space Group">
      {/* Background blueprint dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-brand-accent inline-block" />
            <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
              OUR COMMITMENT
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-brand-navy uppercase tracking-tight leading-[1.1]">
            WHY INFINITY SPACE GROUP?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
            Grounded in architectural discipline, engineering rigor, and transparent client communication in Ranchi.
          </p>
        </div>

        {/* 4 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {VALUE_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="relative p-7 sm:p-8 bg-white border border-slate-200 shadow-sm hover:border-brand-navy hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Number & Icon */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                  <span className="font-mono text-xs tracking-widest text-slate-400 font-bold">
                    {pillar.number}
                  </span>
                  <div className="w-10 h-10 rounded-none bg-brand-slate border border-slate-200 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-sans font-bold text-brand-navy uppercase tracking-tight mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom line */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>INFINITY SPACE GROUP</span>
                <span className="text-brand-accent">CORE PILLAR</span>
              </div>
            </div>
          ))}
        </div>

        {/* Client feedback placeholder block */}
        <div className="mt-14 p-6 sm:p-8 bg-brand-slate border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-[11px] font-mono tracking-widest uppercase text-brand-blue font-bold block mb-1">
              AUTHENTIC CLIENT FEEDBACK
            </span>
            <p className="text-xs sm:text-sm text-slate-600">
              Verified client reviews and project testimonials will appear here as ongoing site handovers in Ranchi are documented.
            </p>
          </div>
          <span className="text-[10px] font-mono px-3 py-1 bg-white border border-slate-200 text-slate-500 whitespace-nowrap">
            STRICT ZERO-FABRICATION POLICY
          </span>
        </div>
      </Container>
    </section>
  );
};
