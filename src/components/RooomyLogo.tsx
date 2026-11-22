import React from 'react';

interface RooomyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const RooomyLogo: React.FC<RooomyLogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const heightClass =
    size === 'lg'
      ? 'h-11 sm:h-12'
      : size === 'sm'
      ? 'h-7 sm:h-8'
      : 'h-9 sm:h-10';

  const padClass =
    size === 'lg'
      ? 'px-5 py-2'
      : size === 'sm'
      ? 'px-3.5 py-1.5'
      : 'px-4 py-1.5';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border border-[#74C69D]/35 bg-white/95 shadow-lg shadow-black/20 backdrop-blur-md transition group-hover:border-[#95D5B2] group-hover:bg-white ${padClass} ${className}`}
    >
      <img
        src="/images/rooomy-logo.png"
        alt="rooomy.lk — Smart Hospitality Management System"
        className={`w-auto object-contain ${heightClass}`}
      />
    </div>
  );
};
