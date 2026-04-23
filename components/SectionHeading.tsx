import React from 'react';
import { clsx } from 'clsx';

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  className,
  eyebrowClassName,
  titleClassName,
}) => {
  return (
    <div className={clsx("relative", className)}>
      <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-signal via-signal/50 to-transparent hidden md:block" />
      <span className={clsx('section-eyebrow mb-2', eyebrowClassName)}>{eyebrow}</span>
      <h2 className={clsx('section-title', titleClassName)}>{title}</h2>
    </div>

  );
};
