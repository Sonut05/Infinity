import React from 'react';
import { ShieldCheck, MessageSquareQuote } from 'lucide-react';
import { Container } from '../ui/Container';
import { TESTIMONIALS } from '../../data/testimonials';
import type { Testimonial } from '../../types';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = TESTIMONIALS,
  className = '',
}) => {
  // Only render testimonial cards when verified === true
  const verifiedTestimonials = testimonials.filter((t) => t.verified === true);

  return (
    <section className={`py-16 sm:py-24 bg-white border-b border-slate-200 ${className}`} aria-label="Client Testimonials">
      <Container size="xl">
        {verifiedTestimonials.length > 0 ? (
          <div>
            <div className="max-w-2xl mb-12">
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue block mb-2">
                VERIFIED EXPERIENCES
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-medium text-brand-navy uppercase tracking-tight">
                CLIENT PERSPECTIVES
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="p-8 bg-brand-slate border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <MessageSquareQuote className="w-8 h-8 text-brand-blue mb-4" />
                    <blockquote className="text-sm text-slate-700 italic leading-relaxed mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>
                  <div className="pt-4 border-t border-slate-200/80">
                    <div className="text-sm font-sans font-bold text-brand-navy uppercase">
                      {item.clientName}
                    </div>
                    <div className="text-xs font-mono text-slate-500">
                      {item.projectType} • Ranchi, Jharkhand
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Subtle Trust Alternative when zero verified testimonials exist */
          <div className="p-8 sm:p-12 bg-brand-slate border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-blue uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brand-blue" />
                <span>AUTHENTIC CLIENT FEEDBACK POLICY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-brand-navy uppercase tracking-tight">
                VERIFIED CLIENT ENDORSEMENTS
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Infinity Space Group maintains a strict zero-fabrication standard. Client reviews and project case studies will be catalogued as on-site project handovers across Ranchi and Jharkhand reach completion.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="px-4 py-2 bg-white border border-slate-200 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                NO SYNTHETIC RATINGS
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};
