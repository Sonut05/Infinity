import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Hammer, Sparkles, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { CONTACT } from '../config/contact';
import { ALL_VERIFIED_SERVICES } from '../data/services';

export const About: React.FC = () => {
  return (
    <div className="w-full">
      <DocumentTitle
        title="About Us | Infinity Space Group Ranchi"
        description="Infinity Space Group unites architects, structural engineers, and civil contractors in Ranchi, Jharkhand. Learn about our integrated design, build, and transformation practice."
      />

      {/* SECTION 1 — HERO */}
      <section className="py-20 sm:py-28 bg-brand-dark text-white relative overflow-hidden border-b border-brand-navy/60">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent">
                ABOUT INFINITY SPACE GROUP
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium uppercase tracking-tight text-white leading-[1.08] mb-6">
              DESIGNING WITH INTENT. <br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                BUILDING WITH PURPOSE.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
              Infinity Space Group operates as a synchronized practice in Ranchi, Jharkhand, bringing together architects, structural engineers, and civil execution teams. We believe spatial clarity and structural integrity develop best when design and building disciplines collaborate from the start.
            </p>

            {/* Brand Positioning Badges */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="px-3 py-1 bg-white/10 text-white border border-white/15">
                {CONTACT.brandPositioning}
              </span>
              <span className="text-brand-accent">
                {CONTACT.tagline}
              </span>
              <span className="text-slate-400">
                • {CONTACT.address}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — DESIGN • BUILD • TRANSFORM */}
      <section className="py-20 sm:py-28 bg-white relative border-b border-slate-200">
        <Container size="xl">
          <div className="max-w-2xl mb-14 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
                CORE EDITORIAL PILLARS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-navy uppercase tracking-tight leading-[1.15]">
              DESIGN • BUILD • TRANSFORM
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
              Three distinct disciplinary capabilities aligned to address spatial challenges at every phase of your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 01 — DESIGN */}
            <div className="p-8 sm:p-10 bg-brand-slate/50 border border-slate-200 hover:border-brand-navy transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                  <span className="font-mono font-bold text-2xl text-brand-navy">01</span>
                  <div className="w-10 h-10 bg-brand-navy text-brand-accent flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-blue uppercase block mb-1">
                  SPATIAL ARCHITECTURE
                </span>
                <h3 className="text-xl font-sans font-bold text-brand-navy uppercase mb-4">
                  DESIGN
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Planning, architectural thinking and spatial development. Focused on light, ventilation, zoning bylaws, and practical day-to-day utility for living and working spaces.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
                PLANNING • SPATIAL DEVELOPMENT
              </div>
            </div>

            {/* 02 — BUILD */}
            <div className="p-8 sm:p-10 bg-brand-slate/50 border border-slate-200 hover:border-brand-navy transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                  <span className="font-mono font-bold text-2xl text-brand-navy">02</span>
                  <div className="w-10 h-10 bg-brand-navy text-brand-accent flex items-center justify-center">
                    <Hammer className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-blue uppercase block mb-1">
                  TECHNICAL EXECUTION
                </span>
                <h3 className="text-xl font-sans font-bold text-brand-navy uppercase mb-4">
                  BUILD
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Engineering, construction-related coordination and execution. Anchored in structural load safety, material validation, and disciplined on-site supervision in Ranchi.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
                ENGINEERING • CIVIL COORDINATION
              </div>
            </div>

            {/* 03 — TRANSFORM */}
            <div className="p-8 sm:p-10 bg-brand-slate/50 border border-slate-200 hover:border-brand-navy transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                  <span className="font-mono font-bold text-2xl text-brand-navy">03</span>
                  <div className="w-10 h-10 bg-brand-navy text-brand-accent flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-blue uppercase block mb-1">
                  SPATIAL EVOLUTION
                </span>
                <h3 className="text-xl font-sans font-bold text-brand-navy uppercase mb-4">
                  TRANSFORM
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Interior, renovation, landscaping and spatial transformation. Upgrading existing properties, optimizing layouts, and shaping exterior green environments.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-200 text-xs font-mono text-slate-500">
                INTERIOR • RENOVATION • LANDSCAPE
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 3 — INTEGRATED APPROACH */}
      <section className="py-20 sm:py-28 bg-brand-slate relative border-b border-slate-200">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 text-xs font-mono tracking-widest text-brand-blue uppercase">
                <Layers className="w-3.5 h-3.5" />
                <span>INTEGRATED DISCIPLINARY APPROACH</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-medium text-brand-navy uppercase tracking-tight leading-tight">
                ONE COHESIVE PRACTICE FOR MULTIPLE PROJECT NEEDS.
              </h2>
              <p className="text-base text-slate-700 leading-relaxed">
                A building project usually requires consultations with different independent professionals: spatial planners for municipal bylaws, structural engineers for load frames, 3D artists for elevation visualization, and contractors for site execution.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                At Infinity Space Group, our listed services allow clients to discuss different parts of a project through one synchronized company. This coordinated structure reduces communication gaps between design blueprints and on-site reality.
              </p>
              <div className="pt-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Direct alignment between architectural concepts and structural engineering.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Accurate bill of quantities (BOQ) prepared alongside working drawings.</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Clear point of contact throughout the project lifecycle in Ranchi.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-brand-dark text-white p-8 sm:p-12 border border-brand-navy relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <div className="text-xs font-mono text-brand-accent tracking-widest uppercase">
                  POSITIONING SUMMARY
                </div>
                <blockquote className="text-xl sm:text-2xl font-serif italic text-slate-100 leading-snug">
                  &ldquo;From initial concept sketches to engineered structural coordination, we bring discipline and architectural clarity to every space.&rdquo;
                </blockquote>
                <div className="pt-6 border-t border-white/15 text-xs font-mono text-slate-400 space-y-1">
                  <div className="text-white font-bold tracking-wider">INFINITY SPACE GROUP</div>
                  <div>ARCHITECTS • ENGINEERS • CONTRACTORS</div>
                  <div>RANCHI, JHARKHAND, INDIA</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECTION 4 — 9 VERIFIED SERVICES */}
      <section className="py-20 sm:py-28 bg-white relative border-b border-slate-200">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-0.5 bg-brand-accent inline-block" />
                <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
                  OUR CAPABILITIES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-navy uppercase tracking-tight leading-[1.1]">
                THE 9 VERIFIED SERVICES
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
                Explore our full spectrum of architectural, structural, and interior services.
              </p>
            </div>

            <div className="flex-shrink-0">
              <Button to="/services" variant="outline" size="md">
                View All Services
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_VERIFIED_SERVICES.map((service) => (
              <div
                key={service.id}
                className="p-6 sm:p-7 bg-white border border-slate-200 hover:border-brand-navy transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {service.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-brand-slate text-brand-blue border border-slate-200">
                      Verified Service
                    </span>
                  </div>
                  <h3 className="text-lg font-sans font-bold text-brand-navy uppercase tracking-tight mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-blue hover:text-brand-navy transition-colors"
                  >
                    <span>View Service Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={`/contact?service=${service.slug}`}
                    className="text-[11px] font-mono text-slate-500 hover:text-brand-navy"
                  >
                    Enquire &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 5 — CTA */}
      <section className="py-20 sm:py-28 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
        <Container size="lg" className="relative z-10 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent block">
              START YOUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium uppercase text-white tracking-tight leading-tight">
              HAVE A SPACE IN MIND?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl mx-auto">
              Schedule a preliminary consultation with our team in Ranchi to evaluate plot feasibility, architectural zoning, or structural requirements.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button to="/contact" variant="accent" size="lg">
                START YOUR PROJECT
              </Button>
              <Button to="/process" variant="outline-white" size="lg">
                Explore Our Process
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
