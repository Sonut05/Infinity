import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative bg-brand-dark text-white overflow-hidden border-b border-brand-navy/60" aria-label="Hero">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

      {/* Hero Media Container with Subtle Cinematic Scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: shouldReduceMotion ? 1 : 1.04, opacity: 0.35 }}
          animate={{ scale: 1, opacity: 0.45 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          className="w-full h-full"
        >
          <img
            src="/assets/hero-project.svg"
            alt="Infinity Space Group Architectural Blueprint Schematic"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-110"
            loading="eager"
          />
        </motion.div>
        {/* Dark Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/40" />
      </div>

      {/* Decorative Blueprint Corner Markings */}
      <div className="absolute top-6 left-6 hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest text-slate-400 z-10">
        <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
        <span>ISG // ARCHITECTURAL ELEVATION 01</span>
      </div>
      <div className="absolute top-6 right-6 hidden md:block text-[10px] font-mono tracking-widest text-slate-400 z-10">
        <span>SCALE: 1:100 • RANCHI HQ</span>
      </div>

      {/* Main Content Area */}
      <Container size="xl" className="relative z-10 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28 lg:pb-36 min-h-[calc(100vh-80px)] flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Small Eyebrow */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-brand-navy/80 border border-brand-blue/40 backdrop-blur-sm mb-6"
          >
            <Compass className="w-3.5 h-3.5 text-brand-accent animate-spin-slow" />
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-architectural uppercase text-brand-accent">
              ARCHITECTS | ENGINEERS | CONTRACTORS
            </span>
          </motion.div>

          {/* Large Headline */}
          <motion.h1
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-white uppercase leading-[1.05] sm:leading-[1.05] mb-6"
          >
            FROM CONCEPT <br />
            <span className="font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              TO CREATION.
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10"
          >
            Planning, design, engineering and construction solutions for spaces built around your vision.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-12"
          >
            <Button
              to="/projects"
              variant="accent"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Our Projects
            </Button>

            <Button
              to="/contact"
              variant="outline-white"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Project
            </Button>
          </motion.div>

          {/* Location & Real Business Indicator */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-mono"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-accent" />
              <span className="tracking-widest font-semibold text-white">RANCHI • JHARKHAND</span>
            </div>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400">COMPLETE SPATIAL & CIVIL SOLUTIONS</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-brand-navy border border-brand-blue/30 text-brand-accent">
              LOCAL JUIDCO & MUNICIPAL COMPLIANT
            </span>
          </motion.div>
        </div>
      </Container>

      {/* Bottom subtle architectural scale line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-navy via-brand-blue to-brand-accent opacity-80" />
    </section>
  );
};
