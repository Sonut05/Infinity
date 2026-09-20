import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { MediaPlaceholder } from '../ui/MediaPlaceholder';
import type { ProjectItem } from '../../types';

interface ProjectCardProps {
  project: ProjectItem;
  featured?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false }) => {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group relative flex flex-col bg-white border border-slate-200/90 shadow-sm hover:border-brand-navy hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Visual Media Area */}
      <div className="relative overflow-hidden">
        <MediaPlaceholder
          type="project"
          aspectRatio={featured ? 'aspect-[16/10]' : project.aspectRatio || 'aspect-[4/3]'}
          projectTitle={project.title}
          category={project.category}
          label={project.mediaPlaceholderLabel}
          className="transition-transform duration-500 ease-out group-hover:scale-103"
        />

        {/* Category & Status Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-0.5 bg-brand-dark/90 backdrop-blur-sm border border-white/20 text-[10px] font-mono font-bold tracking-wider text-white uppercase">
            {project.category}
          </span>
          {!project.verified && (
            <span className="px-2 py-0.5 bg-brand-navy/90 backdrop-blur-sm border border-brand-accent/40 text-[9px] font-mono text-brand-accent uppercase">
              STUDY PLACEHOLDER
            </span>
          )}
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
              {project.category} // ARCHITECTURAL STUDY
            </span>
            <span className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white flex items-center justify-center transition-all text-slate-700">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <h3 className="text-xl font-sans font-bold text-brand-navy uppercase tracking-tight group-hover:text-brand-blue transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
            {project.description}
          </p>
        </div>

        {/* Services & Scope Chips */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {project.services.map((svc) => (
              <span
                key={svc}
                className="text-[10px] font-mono px-2 py-0.5 bg-brand-slate text-slate-600 border border-slate-200"
              >
                {svc}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>EXPLORE STUDY DETAILS</span>
            <span className="text-brand-blue font-semibold">VIEW STUDY →</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
