'use client';

import { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const isLenisInitialized = useRef(false);

  useEffect(() => {
    // Only initialize once to prevent memory leaks in strict mode / dev
    if (isLenisInitialized.current) return;
    isLenisInitialized.current = true;

    const lenis = new Lenis({
      lerp: 0.08, // Dynamic linear interpolation for Framer-like vibes instead of hardcoded duration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Slightly faster wheel mapping
      touchMultiplier: 2, // Make touch feel a bit faster/responsive
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      isLenisInitialized.current = false;
    };
  }, []);

  return <>{children}</>;
}
