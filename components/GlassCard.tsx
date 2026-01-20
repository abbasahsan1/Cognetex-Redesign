import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  noPadding?: boolean;
}

// Renamed conceptually to Card, but keeping filename to avoid import churn if used directly
export const Card: React.FC<CardProps> = ({ 
  children, 
  className,
  hoverEffect = false,
  noPadding = false
}) => {
  return (
    <div 
      className={cn(
        "bg-paper border border-border relative overflow-hidden transition-all duration-200",
        hoverEffect && "hover:border-signal hover:shadow-hard hover:-translate-y-1",
        !noPadding && "p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

// Alias for backward compatibility if needed, though we will update consumers
export const GlassCard = Card;