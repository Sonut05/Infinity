import React from 'react';
import { ArrowRight, MessageSquare, MapPin, Calendar } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { CONTACT, getWhatsAppLink } from '../../config/contact';

export const ContactCTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-brand-navy text-white relative overflow-hidden" aria-label="Contact Call to Action">
      {/* Precision Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />

      {/* Subtle architectural framing lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-white/5 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-white/5 pointer-events-none" />

      <Container size="lg" className="relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-brand-dark/60 border border-brand-blue/40 backdrop-blur-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent">
            START THE CONVERSATION
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium uppercase tracking-tight text-white leading-[1.08] mb-6">
          HAVE A PROJECT IN MIND?
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Let&apos;s talk about your space, your ideas and how we can bring them to life.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <Button
            to="/contact"
            variant="accent"
            size="lg"
            className="w-full sm:w-auto"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Start Your Project
          </Button>

          <Button
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            size="lg"
            className="w-full sm:w-auto"
            icon={<MessageSquare className="w-4 h-4" />}
            iconPosition="left"
          >
            WhatsApp Us
          </Button>
        </div>

        {/* Real Location & Contact Transparency Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-y-2 gap-x-8 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-brand-accent" />
            <span>Consultations Available in Ranchi & Across Jharkhand</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-brand-blue" />
            <span>{CONTACT.officeHours}</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
