import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { ProjectCard } from '../components/projects/ProjectCard';
import { Button } from '../components/ui/Button';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { PROJECTS_DATA, PROJECT_CATEGORIES } from '../data/projects';
import { getWhatsAppLink } from '../config/contact';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      <DocumentTitle
        title="Projects | Infinity Space Group"
        description="Explore selected architectural work, structural engineering models, and interior visual studies from Infinity Space Group in Ranchi, Jharkhand."
      />

      {/* Header */}
      <section className="py-16 sm:py-24 bg-brand-dark text-white relative overflow-hidden border-b border-brand-navy/60">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent">
                SELECTED WORK
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium uppercase tracking-tight text-white leading-[1.08]">
              SPACES, IDEAS &amp; <br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                TRANSFORMATIONS.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Explore selected work and visual studies from the world of architecture, design and construction.
            </p>
          </div>
        </Container>
      </section>

      {/* Transparency Notice */}
      <section className="bg-brand-slate py-4 border-b border-slate-200">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span className="font-semibold text-brand-navy">PORTFOLIO NOTICE:</span>
              <span>All items below represent architectural layout studies until real site photography is officially published.</span>
            </div>
            <span className="text-[10px] px-2.5 py-1 bg-white border border-slate-300 text-slate-500 whitespace-nowrap">
              ZERO-FABRICATION STANDARDS
            </span>
          </div>
        </Container>
      </section>

      {/* Main Portfolio Grid with Accessible Filter Tabs */}
      <section className="py-16 sm:py-24 bg-white relative">
        <Container size="xl">
          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2 mr-3 text-xs font-mono text-slate-400">
              <Filter className="w-3.5 h-3.5" />
              <span>CATEGORY:</span>
            </div>
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${
                    isActive
                      ? 'bg-brand-navy text-white font-bold shadow-sm'
                      : 'bg-brand-slate text-slate-700 hover:bg-slate-200 hover:text-brand-navy'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Animated Project Cards Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className={index === 0 && activeCategory === 'All' ? 'lg:col-span-2' : 'lg:col-span-1'}
                >
                  <ProjectCard
                    project={project}
                    featured={index === 0 && activeCategory === 'All'}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* Bottom Consultation Banner */}
      <section className="py-16 sm:py-20 bg-brand-dark text-white border-t border-brand-navy">
        <Container size="lg" className="text-center space-y-6">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-accent font-bold block">
            CUSTOM SPATIAL SOLUTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-medium uppercase tracking-tight text-white">
            PLANNING A RESIDENTIAL OR COMMERCIAL SPACE IN RANCHI?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
            Discuss your requirements with our architects and engineers to prepare custom 2D/3D layouts and realistic budget planning.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="accent" size="md">
              Start Your Project
            </Button>
            <Button
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline-white"
              size="md"
            >
              WhatsApp Us
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};
