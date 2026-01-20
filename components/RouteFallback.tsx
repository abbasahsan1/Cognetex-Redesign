import React from 'react';

export const RouteFallback: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background text-foreground" role="status" aria-live="polite">
      <div className="border border-border bg-paper p-6 flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-border border-t-signal animate-spin" />
        <p className="font-mono text-xs text-muted uppercase tracking-wider">Loading</p>
      </div>
    </div>
  );
};
