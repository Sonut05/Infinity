import React from 'react';
import { Compass, Ruler, Hammer, Eye, RefreshCw, HardHat } from 'lucide-react';
import { Container } from '../ui/Container';

interface CapabilityItem {
  number: string;
  discipline: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    number: '01',
    discipline: 'ARCHITECTURAL',
    title: 'Planning',
    description: 'Spatial layouts, site orientation analysis, and municipal map approval preparation.',
    icon: <Compass className="w-5 h-5 text-brand-blue" />,
  },
  {
    number: '02',
    discipline: 'INTERIOR & SPATIAL',
    title: 'Design',
    description: 'Functional spatial layouts, interior finishing palettes, and balanced natural illumination.',
    icon: <Ruler className="w-5 h-5 text-brand-blue" />,
  },
  {
    number: '03',
    discipline: 'STRUCTURAL',
    title: 'Engineering',
    description: 'Frame analysis, foundation detailing, and bill of quantities (BOQ) estimation.',
    icon: <Hammer className="w-5 h-5 text-brand-blue" />,
  },
  {
    number: '04',
    discipline: 'DIGITAL',
    title: 'Visualization',
    description: 'Photorealistic 3D elevations and exterior/interior perspective walkthroughs.',
    icon: <Eye className="w-5 h-5 text-brand-blue" />,
  },
  {
    number: '05',
    discipline: 'ADAPTIVE',
    title: 'Renovation',
    description: 'Structural retrofitting, spatial redesign, and modernization of existing structures.',
    icon: <RefreshCw className="w-5 h-5 text-brand-blue" />,
  },
  {
    number: '06',
    discipline: 'EXECUTION',
    title: 'Construction-Related Services',
    description: 'On-site 2D/3D civil coordination, material oversight, and milestone implementation.',
    icon: <HardHat className="w-5 h-5 text-brand-blue" />,
  },
];

interface TrustSectionProps {
  className?: string;
}

export const TrustSection: React.FC<TrustSectionProps> = ({ className = '' }) => {
  return (
    <section
      className={`py-20 sm:py-28 bg-white relative overflow-hidden border-b border-slate-200 ${className}`}
      aria-label="Capabilities & Credibility"
    >
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-brand-accent inline-block" />
            <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
              MULTI-DISCIPLINARY PRACTICE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-brand-navy uppercase tracking-tight leading-[1.1]">
            ARCHITECTS. ENGINEERS. CONTRACTORS.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
            Infinity Space Group provides a synchronized coordination model for clients in Ranchi, Jharkhand—bringing together spatial planning, structural calculations, and civil execution.
          </p>
        </div>

        {/* 6 Factual Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((item) => (
            <div
              key={item.number}
              className="p-7 sm:p-8 bg-brand-slate/60 border border-slate-200 hover:border-brand-navy transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-5">
                  <span className="font-mono text-xs tracking-widest text-slate-400 font-bold">
                    {item.number}
                  </span>
                  <div className="w-9 h-9 bg-white border border-slate-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold tracking-widest text-brand-blue uppercase block mb-1">
                  {item.discipline}
                </span>

                <h3 className="text-lg font-sans font-bold text-brand-navy uppercase tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>RANCHI, JHARKHAND</span>
                <span className="text-brand-navy font-semibold">VERIFIED SCOPE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Credibility Statement & Zero-Fabrication Transparency */}
        <div className="mt-12 p-6 bg-brand-slate border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-mono tracking-widest uppercase text-brand-blue font-bold block mb-1">
              DISCIPLINED COLLABORATION
            </span>
            <p className="text-xs text-slate-600 max-w-2xl">
              We communicate transparently regarding scope, structural safety, and execution timelines. All services are coordinated through our Ranchi office.
            </p>
          </div>
          <span className="text-[10px] font-mono px-3 py-1.5 bg-white border border-slate-200 text-slate-500 whitespace-nowrap">
            STRICT ZERO-FABRICATION PRACTICE
          </span>
        </div>
      </Container>
    </section>
  );
};
