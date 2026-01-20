import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        paper: 'var(--paper)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        signal: 'var(--signal)',
        'on-primary': 'var(--on-primary)',
      },
      fontFamily: {
        sans: ["'Inter Tight'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      borderRadius: {
        DEFAULT: '2px',
        md: '2px',
        lg: '0px',
        xl: '0px',
      },
      boxShadow: {
        hard: '4px 4px 0px 0px rgba(0,0,0,1)',
        'hard-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
      },
      fontSize: {
        hero: ['clamp(3rem, 6vw, 6rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        display: ['clamp(2.5rem, 4vw, 3.75rem)', { lineHeight: '1', letterSpacing: '-0.02em' }],
        section: ['clamp(2rem, 3vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        eyebrow: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.2em' }],
        caption: ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.2em' }],
      },
    },
  },
  plugins: [],
} satisfies Config;
