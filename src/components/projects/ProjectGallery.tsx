import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
  className?: string;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  images,
  projectTitle,
  className = '',
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);

  const openLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  }, []);

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex > 0 ? lightboxIndex - 1 : images.length - 1);
  }, [lightboxIndex, images.length]);

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex < images.length - 1 ? lightboxIndex + 1 : 0);
  }, [lightboxIndex, images.length]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  // Body scroll lock & focus trap
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => lightboxCloseRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Gallery Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
          PROJECT VISUAL STUDIES ({images.length})
        </span>
        <span className="text-[11px] font-mono text-slate-400">
          CLICK TO EXPAND LIGHTBOX
        </span>
      </div>

      {/* Editorial Responsive Grid */}
      <div
        className={`grid gap-4 sm:gap-6 ${
          images.length === 1
            ? 'grid-cols-1'
            : images.length === 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {images.map((imgSrc, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => openLightbox(idx, e)}
            className="group relative aspect-[16/10] w-full overflow-hidden bg-brand-dark border border-slate-200 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            aria-label={`Open image ${idx + 1} of ${images.length} in lightbox`}
          >
            <img
              src={imgSrc}
              alt={`${projectTitle} - Architectural Visual Study ${idx + 1}`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
            />

            {/* Hover overlay with expand icon */}
            <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-brand-navy/90 border border-brand-accent text-white flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <Maximize2 className="w-4 h-4 text-brand-accent" />
              </span>
            </div>

            {/* Bottom tag */}
            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center px-2 py-1 bg-brand-dark/80 backdrop-blur-sm text-[9px] font-mono text-slate-300">
              <span>FIG // 0{idx + 1}</span>
              <span className="text-brand-accent uppercase">SCHEMATIC STUDY</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/95 backdrop-blur-md p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
          >
            {/* Close Button */}
            <button
              ref={lightboxCloseRef}
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-accent"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter Bar Top */}
            <div className="absolute top-6 left-6 z-20 px-3 py-1.5 bg-brand-navy/80 border border-white/20 text-xs font-mono text-white tracking-widest">
              <span>{lightboxIndex + 1}</span>
              <span className="mx-1 text-slate-400">/</span>
              <span>{images.length}</span>
              <span className="ml-3 text-brand-accent">• {projectTitle}</span>
            </div>

            {/* Left Nav Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-brand-navy/80 hover:bg-brand-navy border border-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-blue"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Nav Button */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-brand-navy/80 hover:bg-brand-navy border border-white/20 text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-blue"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Active Lightbox Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center p-2"
            >
              <img
                src={images[lightboxIndex]}
                alt={`${projectTitle} - Architectural Visual Study ${lightboxIndex + 1}`}
                className="max-h-[75vh] w-auto max-w-full object-contain border border-white/15 shadow-2xl"
              />
            </motion.div>

            {/* Bottom Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-center text-xs font-mono text-slate-400">
              <span>Use Left/Right arrow keys to navigate • Esc to close</span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
