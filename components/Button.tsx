import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-black disabled:opacity-50 disabled:pointer-events-none active:translate-y-[1px]";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-signal border border-transparent rounded-none shadow-hard-sm hover:shadow-hard",
    secondary: "bg-signal text-background hover:bg-signal/90 border border-transparent rounded-none shadow-hard-sm",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-background rounded-none",
    ghost: "text-muted hover:text-primary hover:bg-primary/10 rounded-none",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs font-mono uppercase",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button 
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};