"use client";

export default function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`absolute inset-0 -z-10 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'radial-gradient(#D2D2D7 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.4,
        maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)',
      }}
      aria-hidden="true"
    />
  );
}
