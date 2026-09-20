import React from 'react';
import { ExternalLink, Camera } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { InstagramIcon } from '../ui/InstagramIcon';
import { CONTACT } from '../../config/contact';


interface InstagramPlaceholderPost {
  id: string;
  category: string;
  title: string;
  scopeTag: string;
  gradient: string;
}

const PLACEHOLDER_POSTS: InstagramPlaceholderPost[] = [
  {
    id: 'ig-01',
    category: 'ARCHITECTURAL STUDY',
    title: 'Elevation & Volume Planning',
    scopeTag: 'Planning & Form',
    gradient: 'from-[#063A58]/90 via-[#07151D] to-[#063A58]/80',
  },
  {
    id: 'ig-02',
    category: 'CIVIL & STRUCTURE',
    title: 'RCC Framework Coordination',
    scopeTag: 'Site Engineering',
    gradient: 'from-[#0a273b] via-[#07151D] to-[#1479D1]/50',
  },
  {
    id: 'ig-03',
    category: 'INTERIOR SPACE',
    title: 'Residential Spatial Balance',
    scopeTag: 'Interior Detailing',
    gradient: 'from-[#082233] via-[#063A58]/90 to-[#07151D]',
  },
  {
    id: 'ig-04',
    category: '3D VISUALIZATION',
    title: 'Rendered Architectural Perspective',
    scopeTag: '3D Animation',
    gradient: 'from-[#1479D1]/40 via-[#063A58] to-[#07151D]',
  },
];

export const InstagramSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-brand-slate/70 relative overflow-hidden border-b border-slate-200" aria-label="Instagram Community">
      <Container size="xl">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <InstagramIcon className="w-4 h-4 text-brand-blue" />
              <span className="font-mono text-xs font-bold tracking-architectural uppercase text-brand-blue">
                OFFICIAL INSTAGRAM COMMUNITY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-brand-navy uppercase tracking-tight leading-[1.1]">
              FOLLOW OUR WORK.
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
              Follow <span className="font-semibold text-brand-navy">@infinity_space_group</span> on Instagram to see our evolving architectural ideas, 3D visualizations, and site coordination in Ranchi.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              href={CONTACT.instagram}
              variant="outline"
              size="md"
              icon={<ExternalLink className="w-4 h-4" />}
            >
              FOLLOW OUR WORK
            </Button>
          </div>
        </div>

        {/* Visual Placeholders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLACEHOLDER_POSTS.map((post) => (
            <a
              key={post.id}
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-brand-dark border border-slate-200 hover:border-brand-navy transition-all duration-300 shadow-sm"
              aria-label={`View ${post.title} on Instagram`}
            >
              {/* Background gradient & architectural texture */}
              <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-90 group-hover:scale-105 transition-transform duration-500`} />
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

              {/* Top Meta Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white/70">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-brand-dark/80 px-2 py-0.5 border border-white/10">
                  {post.category}
                </span>
                <Camera className="w-4 h-4 text-white/60 group-hover:text-brand-accent transition-colors" />
              </div>

              {/* Bottom Info Content */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[10px] font-mono text-brand-accent uppercase tracking-wider mb-1">
                  {post.scopeTag}
                </div>
                <h3 className="text-sm font-sans font-bold uppercase tracking-tight text-white group-hover:text-brand-accent transition-colors">
                  {post.title}
                </h3>
                <div className="mt-3 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span>@infinity_space_group</span>
                  <span className="flex items-center gap-1 text-white/80 group-hover:text-white">
                    View on IG <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-brand-navy/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-mono font-bold text-white bg-brand-dark/90 px-3 py-1.5 border border-brand-accent uppercase tracking-wider">
                  @infinity_space_group
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Factual Disclaimer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            Official profile: <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-navy font-semibold underline underline-offset-2">instagram.com/infinity_space_group</a>
          </p>
          <span className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 text-slate-500">
            Visual representations are catalogued on the official Instagram profile
          </span>
        </div>
      </Container>
    </section>
  );
};
