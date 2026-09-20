import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '../ui/Container';
import { PROCESS_STEPS } from '../../data/process';

export const ConceptToCreation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-white relative overflow-hidden" aria-label="Process Roadmap">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-brand-accent inline-block" />
            <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
              STRUCTURED ROADMAP
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-brand-navy uppercase tracking-tight leading-[1.05]">
            FROM CONCEPT <br />
            <span className="font-sans font-bold text-brand-blue">TO CREATION.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
            A typical project journey connecting initial spatial vision with engineered civil execution.
          </p>
          <p className="mt-2 text-xs font-mono text-slate-400">
            * Workflows may vary depending on project classification, municipal approvals, and site conditions.
          </p>
        </div>


        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="relative">
          {/* Horizontal Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-[28px] left-8 right-8 h-0.5 bg-slate-200 z-0">
            <div className="h-full bg-gradient-to-r from-brand-blue via-brand-navy to-brand-accent w-full opacity-60" />
          </div>

          {/* Grid of Steps: 6 cols on desktop, vertical stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-4 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: shouldReduceMotion ? 0 : idx * 0.08 }}
                className="group relative flex flex-col bg-white border border-slate-200/90 p-5 sm:p-6 hover:border-brand-navy hover:shadow-md transition-all duration-200"
              >
                {/* Step Node Marker on Desktop */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-none bg-brand-navy text-white flex items-center justify-center font-mono font-bold text-sm tracking-widest border border-brand-navy group-hover:bg-brand-blue transition-colors">
                    {step.number}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                    STAGE {step.number}
                  </span>
                </div>

                {/* Step Title & Subtitle */}
                <h3 className="text-xl font-sans font-bold text-brand-navy uppercase tracking-tight mb-1 group-hover:text-brand-blue transition-colors">
                  {step.title}
                </h3>
                <span className="text-[11px] font-mono text-brand-blue uppercase tracking-wider font-semibold mb-3">
                  {step.subtitle}
                </span>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Bottom decorative accent tick */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>PHASE // 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-brand-accent transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
