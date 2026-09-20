import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageSquare, CheckCircle2, MapPin } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { MediaPlaceholder } from '../components/ui/MediaPlaceholder';
import { ProjectGallery } from '../components/projects/ProjectGallery';
import { DocumentTitle } from '../components/common/DocumentTitle';
import { PROJECTS_DATA } from '../data/projects';
import { getWhatsAppLink } from '../config/contact';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Lookup project by slug
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  // 404 Not Found State
  if (!project) {
    return (
      <div className="w-full py-28 sm:py-36 bg-white min-h-[60vh] flex items-center">
        <DocumentTitle title="Project Not Found | Infinity Space Group" />
        <Container size="md" className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-slate border border-slate-300 text-xs font-mono text-slate-600 uppercase">
            <span>ERROR 404</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-medium uppercase tracking-tight text-brand-navy">
            PROJECT NOT FOUND
          </h1>
          <p className="text-base text-slate-600 max-w-md mx-auto">
            The project study you&apos;re looking for could not be found or has been relocated.
          </p>
          <div className="pt-4">
            <Button
              to="/projects"
              variant="primary"
              size="md"
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              View All Projects
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const pageTitle = `${project.title} | Infinity Space Group`;

  return (
    <div className="w-full">
      <DocumentTitle
        title={pageTitle}
        description={`Architectural study and portfolio entry for ${project.title} by Infinity Space Group in Ranchi, Jharkhand.`}
      />

      {/* Breadcrumb Bar */}
      <section className="bg-brand-dark py-3.5 border-b border-brand-navy/60">
        <Container size="xl">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 hover:text-brand-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-brand-accent uppercase">{project.category}</span>
              <span>/</span>
              <span className="text-slate-200">{project.title}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Project Hero Section */}
      <section className="py-12 sm:py-16 bg-brand-dark text-white relative overflow-hidden border-b border-brand-navy">
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            {/* Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-brand-navy border border-brand-blue/40 text-xs font-mono font-bold tracking-widest text-brand-accent uppercase">
                {project.category}
              </span>

              {!project.verified && (
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-xs font-mono text-slate-300 uppercase">
                  ARCHITECTURAL STUDY • PLACEHOLDER
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium uppercase tracking-tight text-white leading-[1.08]">
              {project.title}
            </h1>

            {/* Location & Status */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-300 pt-1">
              <MapPin className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
              <span>{project.location}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 uppercase">Real Project Photography Will Be Added</span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl pt-2">
              {project.description}
            </p>
          </div>
        </Container>
      </section>

      {/* Large Visual Media Display */}
      <section className="bg-brand-dark-surface py-8 sm:py-12 border-b border-slate-200">
        <Container size="xl">
          <div className="border border-white/10 shadow-2xl overflow-hidden">
            <MediaPlaceholder
              type="project"
              aspectRatio="aspect-[16/9]"
              projectTitle={project.title}
              category={project.category}
              location={project.location}
              label={project.mediaPlaceholderLabel}
            />
          </div>
        </Container>
      </section>

      {/* Project Details: Services & Process Stages */}
      <section className="py-16 sm:py-20 bg-white">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Scope & Overview */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-brand-blue uppercase block mb-2">
                  STUDY OVERVIEW
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-brand-navy uppercase tracking-tight mb-4">
                  ARCHITECTURAL & ENGINEERING OBJECTIVES
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  This project study illustrates how Infinity Space Group structures spatial planning, structural requirements, and civil execution. Real site photography, approved elevation drawings, and completed walkthrough videos will be added as official documentation is verified.
                </p>
              </div>

              {/* Verified Services Involved */}
              <div className="p-6 sm:p-8 bg-brand-slate border border-slate-200">
                <h3 className="text-xs font-mono font-bold tracking-wider text-brand-navy uppercase mb-4">
                  SERVICES INVOLVED
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.services.map((svc) => (
                    <div key={svc} className="flex items-center gap-2.5 text-xs text-slate-700 font-mono">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                      <span>{svc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Process Stages & Context */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 bg-white border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">
                  DELIVERY ROADMAP PHASES
                </h3>
                <div className="space-y-2.5">
                  {project.processStages.map((stage) => (
                    <div
                      key={stage}
                      className="p-3 bg-brand-slate border border-slate-200 text-xs font-mono flex items-center justify-between"
                    >
                      <span className="font-bold text-brand-navy">{stage}</span>
                      <span className="text-[10px] text-slate-500 uppercase">ACTIVE DISCIPLINE</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 font-mono pt-2">
                  Linked with the 6-stage &ldquo;From Concept to Creation&rdquo; methodology.
                </p>
              </div>

              <div className="p-5 border border-dashed border-slate-300 text-xs font-mono text-slate-500 leading-relaxed">
                <strong>Documentation Status:</strong> Visual entries represent schematic placeholders for upcoming project archives in Ranchi.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Project Image Gallery with Lightbox */}
      <section className="py-16 bg-brand-slate border-t border-slate-200">
        <Container size="xl">
          <ProjectGallery
            images={project.images}
            projectTitle={project.title}
          />
        </Container>
      </section>

      {/* Project Bottom CTA */}
      <section className="py-20 sm:py-24 bg-brand-dark text-white border-t border-brand-navy">
        <Container size="lg" className="text-center space-y-6">
          <span className="text-xs font-mono tracking-widest uppercase text-brand-accent font-bold block">
            NEXT STEPS
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-medium uppercase tracking-tight text-white leading-tight">
            LIKE WHAT YOU SEE?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal">
            Let&apos;s discuss your next space. Our architectural, engineering, and civil execution teams in Ranchi are ready to help.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              to={`/contact?service=${encodeURIComponent(project.services[0] || 'Planning')}`}
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Start Your Project
            </Button>

            <Button
              href={getWhatsAppLink(`Hello Infinity Space Group, I am interested in discussing a project similar to ${project.title}.`)}
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
        </Container>
      </section>
    </div>
  );
};
