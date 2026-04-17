import React from 'react';
import { DottedSurface } from './dotted-surface';
import { cn } from '../../lib/utils';

export function DottedSurfaceDemo() {
  return (
    <div className="relative min-h-[420px] overflow-hidden border border-border bg-background">
      <DottedSurface className="opacity-70 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_78%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,var(--foreground),transparent_68%)] opacity-[0.05] blur-3xl'
          )}
        />
        <h2 className="font-mono text-2xl font-semibold text-foreground">Dotted Surface</h2>
      </div>
    </div>
  );
}
