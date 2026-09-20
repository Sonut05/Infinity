import React from 'react';
import { ArrowRight, Play, Eye } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const VisualizationPreview: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#041724] text-white relative overflow-hidden border-y border-brand-navy" aria-label="3D Visualization Preview">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-30 pointer-events-none" />

      {/* Subtle radial glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-brand-navy/30 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Capabilities */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-navy/90 border border-brand-blue/40 text-[11px] font-mono tracking-widest text-brand-accent uppercase">
              <Eye className="w-3.5 h-3.5 text-brand-accent" />
              <span>3D ANIMATION & SPATIAL SIMULATION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-5xl font-serif font-medium uppercase tracking-tight text-white leading-[1.08]">
              SEE IT BEFORE <br />
              <span className="font-sans font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-300 to-white">
                WE BUILD IT.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Visualize your future space through detailed 3D designs and walkthroughs before execution begins.
            </p>

            {/* Value bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-5 h-5 rounded-none bg-brand-navy border border-brand-blue/50 flex items-center justify-center text-brand-accent flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span>Experience true-to-scale spatial proportions and sun path illumination</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-5 h-5 rounded-none bg-brand-navy border border-brand-blue/50 flex items-center justify-center text-brand-accent flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span>Finalize material textures, wall paneling, and false ceiling layouts beforehand</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-5 h-5 rounded-none bg-brand-navy border border-brand-blue/50 flex items-center justify-center text-brand-accent flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span>Prevent costly on-site demolition, structural redesigns, and material rework</span>
              </div>
            </div>

            {/* CTA Trigger */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button
                to="/services#3d"
                variant="accent"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Watch 3D Walkthrough
              </Button>

              <Button
                to="/contact"
                variant="outline-white"
                size="md"
              >
                Request 3D Model
              </Button>
            </div>
          </div>

          {/* Right Column: 3D Walkthrough Media Simulator / Placeholder */}
          <div className="lg:col-span-7">
            <div className="relative bg-brand-dark rounded-none border border-brand-blue/40 shadow-2xl overflow-hidden group">
              {/* Media Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src="/assets/3d-walkthrough.svg"
                  alt="Infinity Space Group 3D Walkthrough Perspective Placeholder"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />

                {/* HUD Overlay Top */}
                <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-300 bg-brand-dark/75 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span>3D WALKTHROUGH PREVIEW</span>
                  </div>
                  <span>PHYSICALLY BASED RENDER // 4K</span>
                </div>

                {/* Center Interactive Trigger Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-brand-navy/90 border-2 border-brand-accent flex items-center justify-center text-brand-accent shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 ml-1 fill-brand-accent" />
                  </div>
                  <span className="mt-3 text-xs font-mono tracking-widest text-white uppercase bg-brand-dark/90 px-3 py-1 border border-white/10">
                    Click to Preview Walkthrough
                  </span>
                </div>

                {/* HUD Overlay Bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-400 bg-brand-dark/75 backdrop-blur-sm px-3 py-1.5 border border-white/10">
                  <span>FILE: /assets/3d-walkthrough.mp4</span>
                  <span className="text-brand-accent">REAL VIDEO MEDIA WILL BE EMBEDDED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
