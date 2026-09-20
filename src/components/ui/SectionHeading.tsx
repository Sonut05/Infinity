import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
  serifTitle?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className = '',
  serifTitle = false,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-4 h-0.5 bg-brand-accent inline-block" />
          <span
            className={`font-sans font-bold text-[11px] sm:text-xs tracking-architectural uppercase ${
              dark ? 'text-brand-accent' : 'text-brand-blue'
            }`}
          >
            {eyebrow}
          </span>
          {isCenter && <span className="w-4 h-0.5 bg-brand-accent inline-block" />}
        </div>
      )}

      <h2
        className={`tracking-tight uppercase font-bold text-2xl sm:text-3xl lg:text-4xl leading-[1.15] ${
          serifTitle ? 'font-serif font-normal tracking-normal' : 'font-sans'
        } ${dark ? 'text-white' : 'text-brand-navy'}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed max-w-2xl ${
            isCenter ? 'mx-auto' : ''
          } ${dark ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
