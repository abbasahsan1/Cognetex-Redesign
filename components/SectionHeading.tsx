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
    <div className={clsx(className)}>
      <span className={clsx('section-eyebrow mb-2', eyebrowClassName)}>{eyebrow}</span>
      <h2 className={clsx('section-title', titleClassName)}>{title}</h2>
    </div>
  );
};
