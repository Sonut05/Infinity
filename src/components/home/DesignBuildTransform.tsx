import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { MediaPlaceholder } from '../ui/MediaPlaceholder';

interface PillarBlock {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  link: string;
}

const PILLARS: PillarBlock[] = [
  {
    number: '01',
    title: 'DESIGN',
    subtitle: 'Conceptualize & Envision',
    description: 'Planning, architecture, interiors and photorealistic 3D visualization tailored for modern living.',
    services: ['Planning & Map Approval', 'Architectural Design', 'Interior Architecture', '3D Walkthroughs'],
    link: '/services#design',
  },
  {
    number: '02',
    title: 'BUILD',
    subtitle: 'Engineered Construction',
    description: 'Structural engineering, precision civil execution, estimation & costing, and rigorous site supervision.',
    services: ['Structural Engineering', '2D & 3D Civil Work', 'Estimating & BOQ', 'On-Site Execution'],
    link: '/services#build',
  },
  {
    number: '03',
    title: 'TRANSFORM',
    subtitle: 'Renew & Harmonize',
    description: 'Renovation, structural retrofitting, landscaping, and finished residential/commercial spaces.',
    services: ['Structural Renovation', 'Facade Redesign', 'Landscaping & Hardscape', 'Final Handover'],
    link: '/services#transform',
  },
];

export const DesignBuildTransform: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-brand-slate relative border-y border-slate-200" aria-label="Core Pillars">
      <Container size="xl">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
                HOLISTIC METHODOLOGY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-brand-navy uppercase tracking-tight">
              DESIGN • BUILD • TRANSFORM
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-slate-600 max-w-md font-sans">
            A cohesive three-pillar discipline ensuring architectural vision is matched with engineering precision on site.
          </p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              to={pillar.link}
              className="group relative flex flex-col bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-blue/60 transition-all duration-300 overflow-hidden"
            >
              {/* Top Media Placeholder Area with Subtle Zoom on Hover */}
              <div className="relative overflow-hidden">
                <MediaPlaceholder
                  type="project"
                  aspectRatio="aspect-[16/10]"
                  projectTitle={pillar.title}
                  category={pillar.subtitle}
                  label={`PILLAR ${pillar.number} • ${pillar.title}`}
                  className="transition-transform duration-500 ease-out group-hover:scale-105"
                />
                
                {/* Number Badge */}
                <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-brand-dark/85 backdrop-blur-sm border border-white/20 text-white font-mono text-xs tracking-wider font-bold">
                  {pillar.number}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-brand-blue font-semibold">
                      {pillar.subtitle}
                    </span>
                    <span className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-all duration-200 text-slate-700">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  <h3 className="text-2xl font-sans font-bold text-brand-navy uppercase tracking-tight mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Services Scope List */}
                <div className="pt-4 border-t border-slate-100">
                  <ul className="space-y-1.5">
                    {pillar.services.map((svc) => (
                      <li key={svc} className="text-xs text-slate-500 flex items-center gap-2 font-mono">
                        <span className="w-1 h-1 rounded-full bg-brand-accent" />
                        <span>{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Brand Color Bar on hover */}
              <div className="h-1 w-0 bg-brand-blue group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
