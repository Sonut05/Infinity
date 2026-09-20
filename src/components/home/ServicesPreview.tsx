import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Ruler,
  Hammer,
  Layers,
  Trees,
  Box,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { HOMEPAGE_SERVICES } from '../../data/services';

const ICON_MAP: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5 text-brand-navy group-hover:text-brand-accent transition-colors" />,
  Ruler: <Ruler className="w-5 h-5 text-brand-navy group-hover:text-brand-accent transition-colors" />,
  Hammer: <Hammer className="w-5 h-5 text-brand-navy group-hover:text-brand-accent transition-colors" />,
  Layers: <Layers className="w-5 h-5 text-brand-navy group-hover:text-brand-accent transition-colors" />,
  Trees: <Trees className="w-5 h-5 text-brand-navy group-hover:text-brand-accent transition-colors" />,
  Box: <Box className="w-5 h-5 text-brand-navy group-hover:text-brand-accent transition-colors" />,
};

export const ServicesPreview: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white relative overflow-hidden" aria-label="Services Preview">
      {/* Background blueprint dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
                WHAT WE DO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-brand-navy uppercase tracking-tight max-w-2xl leading-[1.1]">
              COMPLETE SOLUTIONS FOR YOUR SPACE.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm sm:text-base text-slate-600 max-w-md font-sans">
            Multidisciplinary architecture, engineering, and civil contracting under one unified team in Ranchi.
          </p>
        </div>

        {/* 6 Clean Architectural Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {HOMEPAGE_SERVICES.map((service) => (
            <Link
              key={service.id}
              to={`/services#${service.id}`}
              className="group relative flex flex-col justify-between p-7 sm:p-8 bg-white border border-slate-200 shadow-sm hover:border-brand-navy hover:shadow-lg transition-all duration-300 rounded-none overflow-hidden"
            >
              {/* Card Top: Number + Icon */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
                  <span className="font-mono text-xs tracking-widest text-slate-400 group-hover:text-brand-blue font-bold transition-colors">
                    {service.number}
                  </span>
                  <div className="w-11 h-11 rounded-none bg-brand-slate border border-slate-200 flex items-center justify-center group-hover:bg-brand-navy group-hover:border-brand-navy transition-all duration-200">
                    {ICON_MAP[service.icon] || <Compass className="w-5 h-5 text-brand-navy" />}
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-xl font-sans font-bold text-brand-navy uppercase tracking-tight mb-3 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {service.shortDescription}
                </p>
              </div>

              {/* Card Footer: Scope Tags + Arrow */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-100">
                  {service.processConnection.map((item) => (
                    <span
                      key={item}
                      className="text-[10px] font-mono px-2 py-0.5 bg-brand-slate text-slate-600 border border-slate-200/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-navy group-hover:text-brand-blue transition-colors pt-2">
                  <span>Explore Service</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Accent Line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-navy opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Section Bottom: View All Services */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 text-xs sm:text-sm font-sans font-bold tracking-widest uppercase text-brand-navy hover:text-brand-blue transition-colors group"
          >
            <span>View All Services</span>
            <span className="w-9 h-9 rounded-full border border-brand-navy/30 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-all">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
};
