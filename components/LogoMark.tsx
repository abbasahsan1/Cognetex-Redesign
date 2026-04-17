import React from 'react';

interface LogoMarkProps {
  className?: string;
  title?: string;
}

export const LogoMark: React.FC<LogoMarkProps> = ({ className = 'w-6 h-6', title = 'Cognetex logo' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={title}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 13 90 L 88 90 L 88 10 L 76 22 L 76 85 L 67 85 L 67 31 L 55 43 L 55 85 L 46 85 L 46 52 L 34 64 L 34 85 L 25 85 L 25 73 L 13 85 Z" />
    </svg>
  );
};