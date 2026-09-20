import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight, Compass, Layers, Hammer, Ruler, Calculator, Trees, RefreshCw, FileCheck, Box } from 'lucide-react';
import { Button } from '../ui/Button';
import { MediaPlaceholder } from '../ui/MediaPlaceholder';
import type { ServiceItem } from '../../types';

interface ServiceDetailModalProps {
  isOpen: boolean;
  service: ServiceItem | null;
  onClose: () => void;
  onSelectService: (service: ServiceItem) => void;
  allServices: ServiceItem[];
}

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

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  service,
  onClose,
  onSelectService,
  allServices,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const currentIndex = service
    ? allServices.findIndex((s) => s.id === service.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelectService(allServices[currentIndex - 1]);
    } else {
      // Loop to end
      onSelectService(allServices[allServices.length - 1]);
    }
  }, [currentIndex, allServices, onSelectService]);

  const handleNext = useCallback(() => {
    if (currentIndex < allServices.length - 1) {
      onSelectService(allServices[currentIndex + 1]);
    } else {
      // Loop to start
      onSelectService(allServices[0]);
    }
  }, [currentIndex, allServices, onSelectService]);

  // Keyboard navigation: Escape closes, Left/Right navigates
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Body scroll lock and focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 shadow-2xl z-10 flex flex-col"
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              {/* Pagination Controls */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-none border border-slate-200 text-slate-600 hover:text-brand-navy hover:border-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-blue"
                  aria-label="Previous service"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="text-xs font-mono tracking-widest text-slate-500 font-semibold select-none">
                  <span className="text-brand-navy">{service.number}</span>
                  <span className="mx-1 text-slate-300">/</span>
                  <span>{String(allServices.length).padStart(2, '0')}</span>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-none border border-slate-200 text-slate-600 hover:text-brand-navy hover:border-brand-navy transition-colors focus-visible:ring-2 focus-visible:ring-brand-blue"
                  aria-label="Next service"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-brand-navy hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-brand-blue"
                aria-label="Close service details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-8 flex-1">
              {/* Service Hero Info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs tracking-widest text-brand-blue font-bold">
                    SERVICE // {service.number}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase">
                    INFINITY SPACE GROUP
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-slate border border-slate-200 flex items-center justify-center flex-shrink-0">
                    {ICON_MAP[service.icon] || <Compass className="w-5 h-5 text-brand-blue" />}
                  </div>
                  <h2
                    id="service-modal-title"
                    className="text-2xl sm:text-3xl font-serif font-medium uppercase tracking-tight text-brand-navy"
                  >
                    {service.title}
                  </h2>
                </div>

                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  {service.shortDescription}
                </p>
              </div>

              {/* Visual Placeholder Area */}
              <div className="overflow-hidden border border-slate-200">
                <MediaPlaceholder
                  type="service"
                  aspectRatio="aspect-[16/9]"
                  projectTitle={service.title}
                  category="SERVICE ARCHITECTURE"
                  label={`SERVICE SPECIFICATION • ${service.title.toUpperCase()}`}
                />
              </div>

              {/* What the Service Involves */}
              <div className="p-6 bg-brand-slate border border-slate-200/80 space-y-3">
                <h3 className="text-xs font-mono font-bold tracking-wider text-brand-navy uppercase">
                  SCOPE & APPROACH
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Typical Project Context & Process Connection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 border border-slate-200">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-2">
                    TYPICAL CONTEXT
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {service.typicalContext}
                  </p>
                </div>

                <div className="p-5 border border-slate-200">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-2">
                    PROCESS CONNECTION
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.processConnection.map((stage) => (
                      <span
                        key={stage}
                        className="text-xs font-mono px-2.5 py-1 bg-white border border-brand-blue/30 text-brand-navy font-semibold"
                      >
                        {stage}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-2">
                    Aligned with the six-stage delivery framework.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="sticky bottom-0 bg-brand-dark text-white p-5 sm:p-6 border-t border-brand-navy/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-mono text-slate-400 block">
                  READY TO DISCUSS YOUR SPACE?
                </span>
                <span className="text-sm font-semibold text-white">
                  Consult our team on {service.title} in Ranchi
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  to={`/contact?service=${encodeURIComponent(service.slug)}`}
                  variant="accent"
                  size="md"
                  className="w-full sm:w-auto"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={onClose}
                >
                  Discuss this service →
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
