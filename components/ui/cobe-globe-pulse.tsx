"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import createGlobe from 'cobe';

interface PulseMarker {
  id: string;
  location: [number, number];
  delay: number;
}

interface GlobePulseProps {
  markers?: PulseMarker[];
  className?: string;
  speed?: number;
}

const defaultMarkers: PulseMarker[] = [
  { id: 'pulse-1', location: [51.51, -0.13], delay: 0 },
  { id: 'pulse-2', location: [40.71, -74.01], delay: 0.5 },
  { id: 'pulse-3', location: [35.68, 139.65], delay: 1 },
  { id: 'pulse-4', location: [-33.87, 151.21], delay: 1.5 },
];

export function GlobePulse({
  markers = defaultMarkers,
  className = '',
  speed = 0.002,
}: GlobePulseProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const dragOffset = useRef({ phi: 0, theta: 0 });
  const phiOffsetRef = useRef(0);
  const thetaOffsetRef = useRef(0);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const [isInView, setIsInView] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const normalizedMarkers = useMemo(
    () => markers.map((m) => ({ ...m, location: m.location as [number, number] })),
    [markers]
  );

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
  }, []);

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi;
      thetaOffsetRef.current += dragOffset.current.theta;
      dragOffset.current = { phi: 0, theta: 0 };
    }
    pointerInteracting.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setIsPageVisible(document.visibilityState === 'visible');
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 320,
          theta: (e.clientY - pointerInteracting.current.y) / 1100,
        };
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerUp]);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    let globe: ReturnType<typeof createGlobe> | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let resizeRaf = 0;

    const initGlobe = () => {
      const rect = wrapper.getBoundingClientRect();
      const size = Math.floor(Math.min(rect.width, rect.height));
      if (!size) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bufferSize = Math.max(1, Math.round(size * dpr));

      canvas.width = bufferSize;
      canvas.height = bufferSize;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      if (Math.abs(size - widthRef.current) < 2 && globe) return;
      widthRef.current = size;

      if (globe) {
        globe.destroy();
        globe = null;
      }

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: bufferSize,
        height: bufferSize,
        phi: 0,
        theta: 0,
        offset: [0, 0],
        scale: 1,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 9000,
        mapBrightness: 6,
        baseColor: [0.5, 0.5, 0.5],
        markerColor: [0.49, 0.23, 0.92],
        glowColor: [0.05, 0.05, 0.05],
        markerElevation: 0,
        markers: normalizedMarkers.map((m) => ({ location: m.location, size: 0.04 })),
        arcs: [],
        opacity: 0.95,
        onRender: (state) => {
          const shouldAnimate = !reducedMotion && isInView && isPageVisible && pointerInteracting.current === null;
          if (shouldAnimate) {
            phiRef.current += speed;
          }

          state.width = bufferSize;
          state.height = bufferSize;
          state.offset = [0, 0];
          state.scale = 1;
          state.phi = phiRef.current + phiOffsetRef.current + dragOffset.current.phi;
          state.theta = 0 + thetaOffsetRef.current + dragOffset.current.theta;
        },
      });

      canvas.style.opacity = '1';
    };

    initGlobe();

    resizeObserver = new ResizeObserver(() => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(initGlobe);
    });
    resizeObserver.observe(wrapper);

    return () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeObserver?.disconnect();
      globe?.destroy();
    };
  }, [normalizedMarkers, speed, reducedMotion, isInView, isPageVisible]);

  return (
    <div
      ref={wrapperRef}
      className={`relative aspect-square select-none mx-auto flex items-center justify-center overflow-hidden rounded-full [contain:layout_paint] ${className}`}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          display: 'block',
          maxWidth: '100%',
          maxHeight: '100%',
          cursor: 'grab',
          opacity: 0,
          transition: 'opacity 500ms ease',
          borderRadius: '50%',
          touchAction: 'none',
        }}
      />
    </div>
  );
}
