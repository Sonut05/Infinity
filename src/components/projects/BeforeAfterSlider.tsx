import React, { useState, useRef, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  aspectRatio?: string;
  isDemonstration?: boolean;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Before state',
  afterAlt = 'After state',
  aspectRatio = 'aspect-[16/10]',
  isDemonstration = true,
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Demonstration notice tag */}
      {isDemonstration && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-slate border border-slate-300 text-[10px] font-mono text-slate-600 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
          <span>DEMONSTRATION — NOT AN INFINITY SPACE GROUP PROJECT</span>
        </div>
      )}

      {/* Slider Container */}
      <div
        ref={containerRef}
        className={`relative w-full ${aspectRatio} overflow-hidden select-none border border-slate-200 shadow-sm cursor-ew-resize`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* "After" Image (Underneath) */}
        <img
          src={afterImage}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-brand-dark/85 backdrop-blur-sm border border-white/20 text-[10px] font-mono font-bold tracking-widest text-white uppercase">
          AFTER
        </div>

        {/* "Before" Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-brand-dark/85 backdrop-blur-sm border border-white/20 text-[10px] font-mono font-bold tracking-widest text-white uppercase">
            BEFORE
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none z-20"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Draggable Handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-valuenow={Math.round(sliderPosition)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Before and after spatial comparison slider"
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand-navy border-2 border-white shadow-xl flex items-center justify-center text-white z-30 focus:outline-none focus:ring-2 focus:ring-brand-accent cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          <svg className="w-4 h-4 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </div>
      </div>
    </div>
  );
};
