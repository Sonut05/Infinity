import React from 'react';

interface MediaPlaceholderProps {
  label?: string;
  projectTitle?: string;
  category?: string;
  location?: string;
  aspectRatio?: string;
  type?: 'hero' | 'project' | '3d' | 'service';
  className?: string;
}

export const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({
  label = 'PROJECT MEDIA PLACEHOLDER',
  projectTitle,
  category,
  location = 'RANCHI, JHARKHAND',
  aspectRatio = 'aspect-[16/10]',
  type = 'project',
  className = '',
}) => {
  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-gradient-to-br from-brand-dark via-brand-navy to-[#0b324b] text-white select-none group ${className}`}
    >
      {/* Precision architectural blueprint grid */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-35" />

      {/* Subtle blueprint accent diagonal line & drafting circles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#1479D1" strokeWidth="1" strokeDasharray="6 6" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#1479D1" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="50%" cy="50%" r="22%" stroke="#F4C542" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <circle cx="50%" cy="50%" r="35%" stroke="#1479D1" strokeWidth="0.8" fill="none" />
      </svg>

      {/* Architectural Corner Crop Marks */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-brand-accent/70" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-brand-accent/70" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-brand-accent/70" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-brand-accent/70" />

      {/* Technical dimension markings */}
      <div className="absolute top-4 left-12 right-12 flex justify-between items-center text-[10px] tracking-widest text-slate-400 font-mono">
        <span>ELEVATION // 01</span>
        <span>SCALE: 1:100</span>
        <span>{location}</span>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
        {type === '3d' ? (
          <div className="w-14 h-14 rounded-full border border-brand-accent/80 flex items-center justify-center bg-brand-dark/60 backdrop-blur-sm mb-3 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-brand-accent ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg border border-brand-blue/60 flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm mb-3 text-brand-blue group-hover:border-brand-accent transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>
        )}

        {category && (
          <span className="text-[11px] font-mono tracking-widest uppercase text-brand-accent mb-1">
            {category}
          </span>
        )}

        {projectTitle && (
          <h4 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-white mb-2 max-w-md">
            {projectTitle}
          </h4>
        )}

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-dark/80 border border-white/10 text-[11px] font-mono tracking-wider text-slate-300">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
          <span>{label}</span>
        </div>

        <p className="text-[10px] tracking-wider text-slate-400 mt-2 font-mono uppercase">
          Real Verified Photography Will Be Added
        </p>
      </div>

      {/* Bottom coordinate bar */}
      <div className="absolute bottom-4 left-12 right-12 flex justify-between items-center text-[9px] tracking-widest text-slate-400/80 font-mono">
        <span>LAT 23.3441° N</span>
        <span>INFINITY SPACE GROUP • RANCHI</span>
        <span>LON 85.3096° E</span>
      </div>
    </div>
  );
};
