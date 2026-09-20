import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Layers, MessageSquare } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { PROCESS_STEPS } from '../data/process';
import { getWhatsAppLink } from '../config/contact';

// Map service titles to service detail URLs
const SERVICE_ANCHOR_MAP: Record<string, string> = {
  'Planning': '/services#planning',
  'Estimating & Costing': '/services#estimating',
  'Map Approval': '/services#approval',
  'Structural Designing': '/services#structural',
  'Interior Designing': '/services#interior',
  '3D Animation / 3D Visualization': '/services#visualization',
  '2D & 3D Civil Work': '/services#civil',
  'Renovation': '/services#renovation',
  'Landscaping': '/services#landscaping',
};

export const Process: React.FC = () => {
  return (
    <div className="w-full">
      <DocumentTitle
        title="Our Process | From Concept to Creation | Infinity Space Group"
        description="Learn about the typical 6-stage project journey of Infinity Space Group in Ranchi: Discuss, Plan, Develop, Refine, Execute, and Complete."
      />

      {/* Hero Header */}
      <section className="py-20 sm:py-28 bg-brand-dark text-white relative overflow-hidden border-b border-brand-navy/60">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent">
                STRUCTURED CLIENT JOURNEY
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium uppercase tracking-tight text-white leading-[1.08] mb-6">
              OUR PROCESS. <br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                FROM CONCEPT TO CREATION.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
              Constructing or renovating a space represents a major commitment. We coordinate architectural planning, engineering specifications, and civil execution so clients experience clear communication at every milestone.
            </p>

            {/* Factual Disclaimer Banner */}
            <div className="mt-8 p-4 bg-brand-navy/60 border border-brand-blue/30 flex items-start sm:items-center gap-3 text-xs font-mono text-slate-300">
              <Layers className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong>Note on Project Journeys:</strong> The stages outlined below represent a typical way a project may progress. Actual workflows vary by project scale, site specifics, and individual client goals.
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* 6-Stage Process Journey Timeline */}
      <section className="py-20 sm:py-28 bg-white relative">
        <Container size="xl">
          <div className="max-w-2xl mb-14 sm:mb-20">
            <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue block mb-2">
              TYPICAL PROJECT JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-navy uppercase tracking-tight">
              SIX PROGRESSIVE STAGES
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              A structured progression designed to provide clarity, safety, and mutual alignment.
            </p>
          </div>

          <div className="space-y-12 sm:space-y-16 relative">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.number}
                className="relative p-8 sm:p-12 bg-white border border-slate-200 shadow-sm hover:border-brand-navy transition-all duration-200"
              >
                {/* Timeline connector visual (desktop) */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute left-12 -bottom-16 w-0.5 h-16 bg-slate-200 pointer-events-none" />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number, Title & Stage Description */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand-navy text-brand-accent flex items-center justify-center font-mono font-bold text-lg">
                        {step.number}
                      </div>
                      <span className="text-xs font-mono tracking-widest text-brand-blue uppercase font-bold">
                        {step.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-sans font-bold text-brand-navy uppercase tracking-tight">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {step.description}
                    </p>

                    {/* Linked Services for this stage */}
                    {step.relatedServices && step.relatedServices.length > 0 && (
                      <div className="pt-3 border-t border-slate-100">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                          Relevant Verified Services:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {step.relatedServices.map((serviceName) => {
                            const link = SERVICE_ANCHOR_MAP[serviceName] || '/services';
                            return (
                              <Link
                                key={serviceName}
                                to={link}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-slate text-brand-navy hover:bg-brand-navy hover:text-white border border-slate-200 text-xs font-mono transition-colors"
                              >
                                <span>{serviceName}</span>
                                <ArrowRight className="w-3 h-3 text-brand-accent" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Deliverables & Milestones */}
                  <div className="lg:col-span-7 bg-brand-slate p-6 sm:p-8 border border-slate-200/80">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                      <h4 className="text-xs font-mono font-bold tracking-wider text-slate-600 uppercase">
                        STAGE {step.number} MILESTONES &amp; DELIVERABLES
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        MUTUAL REVIEW
                      </span>
                    </div>

                    <div className="space-y-3">
                      {step.deliverables?.map((deliv) => (
                        <div key={deliv} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>Collaborative review stage</span>
                      <Link
                        to="/contact"
                        className="text-brand-blue hover:text-brand-navy font-bold underline underline-offset-2"
                      >
                        Inquire about Stage {step.number}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Consultation CTA */}
      <section className="py-20 bg-brand-dark text-white border-t border-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
        <Container size="lg" className="relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent block">
              BEGIN WITH STAGE 01
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-medium uppercase text-white tracking-tight leading-snug">
              DISCUSS YOUR PROJECT IN RANCHI
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto font-normal leading-relaxed">
              Every project journey starts with an open discussion of your goals, plot orientation, and spatial needs. Reach out to schedule a preliminary consultation.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button to="/contact" variant="accent" size="lg">
                Schedule Consultation
              </Button>
              <Button
                href={getWhatsAppLink("Hello Infinity Space Group, I would like to discuss Stage 01 (Discovery) for my project.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-white"
                size="lg"
                icon={<MessageSquare className="w-4 h-4 text-[#25D366]" />}
              >
                WhatsApp Discussion
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
