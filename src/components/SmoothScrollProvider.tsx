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
      lerp: 0.04, // Lower lerp for a much heavier, buttery smooth "Framer" feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly slower wheel mapping for elegance
      touchMultiplier: 1.5, // Balance touch input
    });

    // Expose lenis globally for use in other components like the "Back to Top" button
    (window as any).lenis = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      if ((window as any).lenis === lenis) {
        delete (window as any).lenis;
      }
      isLenisInitialized.current = false;
    };
  }, []);

  return <>{children}</>;
}
