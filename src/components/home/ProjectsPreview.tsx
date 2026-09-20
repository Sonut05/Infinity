import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Container } from '../ui/Container';
import { MediaPlaceholder } from '../ui/MediaPlaceholder';
import { PROJECTS_DATA } from '../../data/projects';

export const ProjectsPreview: React.FC = () => {
  // Take first 3 featured projects for homepage preview
  const [projectOne, projectTwo, projectThree] = PROJECTS_DATA.slice(0, 3);

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-brand-dark text-white relative overflow-hidden" id="projects" aria-label="Selected Projects">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-brand-accent inline-block" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-accent">
                SELECTED WORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium uppercase tracking-tight text-white leading-[1.1]">
              SPACES WE&apos;VE DESIGNED. <br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                PROJECTS WE&apos;VE BUILT.
              </span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 text-left md:text-right">
            <p className="text-xs font-mono text-slate-400 tracking-wider uppercase mb-2">
              PORTFOLIO ARCHITECTURE // RANCHI
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-accent hover:text-white transition-colors"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Asymmetric Editorial Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Large Featured Project (Project 1 - 7 cols on desktop) */}
          {projectOne && (
            <div className="lg:col-span-7">
              <Link
                to={`/projects/${projectOne.slug}`}
                className="group block relative bg-brand-dark-surface border border-white/10 hover:border-brand-accent transition-all duration-300 overflow-hidden"
              >
                {/* Large Media Placeholder */}
                <MediaPlaceholder
                  type="project"
                  aspectRatio="aspect-[16/11]"
                  projectTitle={projectOne.title}
                  category={projectOne.category}
                  location={projectOne.location}
                  label={projectOne.mediaPlaceholderLabel}
                  className="transition-transform duration-500 group-hover:scale-102"
                />

                {/* Project Metadata Bar */}
                <div className="p-6 sm:p-8 bg-brand-dark-surface border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mb-1.5">
                      <span className="text-brand-accent uppercase font-bold">{projectOne.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {projectOne.location}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-sans font-bold text-white uppercase tracking-tight group-hover:text-brand-accent transition-colors">
                      {projectOne.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {projectOne.services.map((svc) => (
                        <span
                          key={svc}
                          className="text-[10px] font-mono px-2 py-0.5 bg-brand-navy/80 text-slate-300 border border-brand-blue/30"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 self-start sm:self-center">
                    <span className="w-10 h-10 rounded-full border border-white/20 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark text-white flex items-center justify-center transition-all duration-200">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary Stacked Column (Projects 2 & 3 - 5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {[projectTwo, projectThree].filter(Boolean).map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group block relative bg-brand-dark-surface border border-white/10 hover:border-brand-blue transition-all duration-300 overflow-hidden"
              >
                <MediaPlaceholder
                  type="project"
                  aspectRatio="aspect-[16/9]"
                  projectTitle={project.title}
                  category={project.category}
                  location={project.location}
                  label={project.mediaPlaceholderLabel}
                  className="transition-transform duration-500 group-hover:scale-102"
                />

                <div className="p-5 sm:p-6 bg-brand-dark-surface border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mb-1">
                      <span className="text-brand-blue uppercase font-semibold">{project.category}</span>
                      <span>•</span>
                      <span>{project.location}</span>
                    </div>

                    <h4 className="text-lg font-sans font-bold text-white uppercase tracking-tight group-hover:text-brand-blue transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-xs text-slate-400 font-mono mt-1">
                      {project.services.join(' • ')}
                    </p>
                  </div>

                  <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white text-white flex items-center justify-center transition-all flex-shrink-0 ml-3">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Note on genuine media */}
        <div className="mt-8 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Notice: Visual representations shown above are architectural portfolio schematics. Verified on-site photography will be added as documentation completes.
          </p>
        </div>
      </Container>
    </section>
  );
};
