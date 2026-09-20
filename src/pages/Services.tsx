import React, { useState } from 'react';
import {
  Compass,
  Layers,
  Hammer,
  Ruler,
  Calculator,
  Trees,
  RefreshCw,
  FileCheck,
  Box,
  ArrowUpRight,
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { MediaPlaceholder } from '../components/ui/MediaPlaceholder';
import { ServiceDetailModal } from '../components/services/ServiceDetailModal';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { ALL_VERIFIED_SERVICES } from '../data/services';
import { getWhatsAppLink } from '../config/contact';
import type { ServiceItem } from '../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5 text-brand-blue" />,
  Layers: <Layers className="w-5 h-5 text-brand-blue" />,
  Hammer: <Hammer className="w-5 h-5 text-brand-blue" />,
  Ruler: <Ruler className="w-5 h-5 text-brand-blue" />,
  Calculator: <Calculator className="w-5 h-5 text-brand-blue" />,
  Trees: <Trees className="w-5 h-5 text-brand-blue" />,
  RefreshCw: <RefreshCw className="w-5 h-5 text-brand-blue" />,
  FileCheck: <FileCheck className="w-5 h-5 text-brand-blue" />,
  Box: <Box className="w-5 h-5 text-brand-blue" />,
};

export const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenDetail = (service: ServiceItem) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full">
      <DocumentTitle
        title="Services | Infinity Space Group"
        description="Explore the 9 verified architecture, structural engineering, civil construction, interior design, and 3D visualization services of Infinity Space Group in Ranchi, Jharkhand."
      />

      {/* Services Hero */}
      <section className="py-16 sm:py-24 bg-brand-dark text-white relative overflow-hidden border-b border-brand-navy/60">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent">
                WHAT WE DO
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium uppercase tracking-tight text-white leading-[1.08]">
              DESIGNING SPACES. <br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                ENGINEERING POSSIBILITIES.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Infinity Space Group brings planning, design, engineering, construction, and transformation services together under one collaborative practice in Ranchi.
            </p>
          </div>
        </Container>
      </section>

      {/* Verified Notice Bar */}
      <section className="bg-brand-slate py-4 border-b border-slate-200">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="font-semibold text-brand-navy">VERIFIED SERVICES:</span>
              <span>All 9 service offerings are managed directly by Infinity Space Group&apos;s interdisciplinary team.</span>
            </div>
            <span className="text-[10px] px-2.5 py-1 bg-white border border-slate-300 text-slate-500 whitespace-nowrap">
              STRICT SCOPE INTEGRITY
            </span>
          </div>
        </Container>
      </section>

      {/* Editorial Services Grid: 9 Services */}
      <section className="py-20 sm:py-28 bg-white relative">
        <Container size="xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {ALL_VERIFIED_SERVICES.map((service, index) => {
              // Create varied editorial visual rhythm: service 0 and service 4 have wider emphasis
              const isProminent = index === 0 || index === 4;

              return (
                <div
                  key={service.id}
                  className={`group relative flex flex-col justify-between bg-white border border-slate-200 shadow-sm hover:border-brand-navy hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    isProminent ? 'lg:col-span-2' : 'lg:col-span-1'
                  }`}
                >
                  {/* Top Visual Area */}
                  <div className="relative overflow-hidden">
                    <MediaPlaceholder
                      type="service"
                      aspectRatio={isProminent ? 'aspect-[21/9]' : 'aspect-[16/10]'}
                      projectTitle={service.title}
                      category="CAPABILITY SPECIFICATION"
                      label={`SERVICE // ${service.number} • ${service.title.toUpperCase()}`}
                      className="transition-transform duration-500 group-hover:scale-103"
                    />

                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-brand-dark/90 backdrop-blur-sm border border-white/20 text-white font-mono text-xs tracking-wider font-bold">
                      {service.number}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="w-10 h-10 bg-brand-slate border border-slate-200 flex items-center justify-center">
                          {ICON_MAP[service.icon] || <Compass className="w-5 h-5 text-brand-blue" />}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                          <span>PROCESS:</span>
                          <span className="font-semibold text-brand-navy">
                            {service.processConnection.join(' • ')}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-sans font-bold text-brand-navy uppercase tracking-tight mb-3 group-hover:text-brand-blue transition-colors">
                        {service.title}
                      </h2>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleOpenDetail(service)}
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-brand-navy hover:text-brand-blue transition-colors group/btn"
                      >
                        <span>Explore service</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </button>

                      <Button
                        to={`/contact?service=${encodeURIComponent(service.slug)}`}
                        variant="ghost"
                        size="sm"
                        className="text-slate-500 hover:text-brand-navy text-[11px]"
                      >
                        {service.ctaText}
                      </Button>
                    </div>
                  </div>

                  {/* Accent Line on hover */}
                  <div className="h-1 w-0 bg-brand-blue group-hover:w-full transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom Consultation CTA */}
      <section className="py-16 sm:py-20 bg-brand-dark text-white border-t border-brand-navy">
        <Container size="lg" className="text-center space-y-6">
          <span className="text-xs font-mono tracking-widest text-brand-accent uppercase font-bold block">
            MULTIDISCIPLINARY COLLABORATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-medium uppercase tracking-tight text-white">
            LOOKING FOR COMBINED ARCHITECTURE & CONSTRUCTION IN RANCHI?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
            Whether starting with land planning or ready to break ground, our team coordinates every stage from municipal sanction to handover.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="accent" size="md">
              Start Your Project
            </Button>
            <Button
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="md"
            >
              WhatsApp Discussion
            </Button>
          </div>
        </Container>
      </section>

      {/* Reusable Service Detail Modal */}
      <ServiceDetailModal
        isOpen={modalOpen}
        service={selectedService}
        onClose={handleCloseModal}
        onSelectService={(svc) => setSelectedService(svc)}
        allServices={ALL_VERIFIED_SERVICES}
      />
    </div>
  );
};
