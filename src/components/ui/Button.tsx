import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'outline-white' | 'ghost' | 'whatsapp';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  target,
  rel,
  onClick,
  className = '',
  icon,
  iconPosition = 'right',
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold tracking-wider text-xs uppercase transition-all duration-200 select-none rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none group';

  const sizeStyles = {
    sm: 'px-4 py-2.5 text-[11px] gap-2',
    md: 'px-6 py-3.5 text-xs gap-2.5',
    lg: 'px-8 py-4 text-[13px] gap-3 tracking-widest',
  }[size];

  const variantStyles = {
    primary:
      'bg-brand-navy hover:bg-brand-navy-light text-white border border-brand-navy focus-visible:ring-brand-blue shadow-sm',
    secondary:
      'bg-brand-blue hover:bg-brand-blue-hover text-white border border-brand-blue focus-visible:ring-brand-blue shadow-sm',
    accent:
      'bg-brand-accent hover:bg-brand-accent-hover text-brand-dark border border-brand-accent font-bold focus-visible:ring-brand-accent shadow-sm',
    outline:
      'bg-transparent hover:bg-brand-navy hover:text-white text-brand-navy border border-brand-navy focus-visible:ring-brand-navy',
    'outline-white':
      'bg-transparent hover:bg-white hover:text-brand-dark text-white border border-white/60 hover:border-white focus-visible:ring-white',
    ghost:
      'bg-transparent hover:bg-slate-100 text-brand-navy hover:text-brand-blue focus-visible:ring-brand-blue p-2',
    whatsapp:
      'bg-[#25D366] hover:bg-[#20bd5a] text-white border border-[#25D366] font-bold focus-visible:ring-[#25D366] shadow-sm',
  }[variant];

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="transition-transform duration-200 group-hover:-translate-x-0.5 flex-shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0">
          {icon}
        </span>
      )}
    </>
  );

  const combinedClass = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
