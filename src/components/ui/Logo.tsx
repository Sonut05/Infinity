import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  className = '',
  showTagline = true,
}) => {
  const isDarkBg = variant === 'dark' || variant === 'footer';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group select-none ${className}`} aria-label="Infinity Space Group Homepage">
      {/* Precision Geometric Architectural Logo Mark */}
      <div className="relative w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-sm bg-brand-navy border border-brand-blue/30 shadow-sm overflow-hidden group-hover:border-brand-accent transition-colors">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-40" />
        
        {/* Architectural Infinity Structure Glyph */}
        <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6 text-white relative z-10" xmlns="http://www.w3.org/2000/svg">
          {/* Infinity loop / Cantilever truss */}
          <path
            d="M9 18C9 14.134 11.686 11 15 11C18 11 20 13.5 21.5 15.5L24 18.5C25.5 20.5 27.5 23 30.5 23C33.537 23 36 20.314 36 17"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="transform -translate-x-4"
          />
          <path
            d="M9 18C9 21.866 11.686 25 15 25C18 25 20 22.5 21.5 20.5L24 17.5C25.5 15.5 27.5 13 30.5 13C33.537 13 36 15.686 36 19"
            stroke="#1479D1"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="transform -translate-x-4"
          />
          {/* Gold plumb bob / apex center accent */}
          <circle cx="14" cy="18" r="2.2" fill="#F4C542" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col">
        <span
          className={`font-sans font-bold tracking-architectural text-base sm:text-lg leading-tight transition-colors ${
            isDarkBg ? 'text-white group-hover:text-brand-accent' : 'text-brand-navy group-hover:text-brand-blue'
          }`}
        >
          INFINITY SPACE
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className={`font-sans font-medium tracking-[0.22em] text-[10px] uppercase leading-none ${
              isDarkBg ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            GROUP
          </span>
          {showTagline && (
            <>
              <span className="text-brand-accent text-[8px] leading-none">•</span>
              <span
                className={`text-[9px] tracking-wider uppercase font-mono font-normal hidden sm:inline-block ${
                  isDarkBg ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Ranchi
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
