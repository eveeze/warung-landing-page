'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<'drop' | 'fill' | 'exit'>('drop');

  useEffect(() => {
    // Phase 1: Text drops in (0 → 800ms)
    // Phase 2: Color fills left-to-right (800ms → 1600ms)
    const fillTimer = setTimeout(() => setPhase('fill'), 800);
    // Phase 3: Loader exits (1600ms → 2200ms)
    const exitTimer = setTimeout(() => setPhase('exit'), 1600);
    // Complete (2200ms)
    const completeTimer = setTimeout(() => onComplete(), 2200);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="intro-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="relative overflow-hidden">
            {/* Text: "Manto™" */}
            <motion.h1
              initial={{ y: '-120%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(4rem,18vw,16rem)] font-heading font-black tracking-tighter uppercase leading-none select-none"
            >
              {/* Base text (dark gray) */}
              <span className="text-white/15">Manto™</span>

              {/* Fill overlay (white, clips left-to-right) */}
              <motion.span
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={
                  phase === 'fill'
                    ? { clipPath: 'inset(0 0% 0 0)' }
                    : { clipPath: 'inset(0 100% 0 0)' }
                }
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 text-white"
                aria-hidden="true"
              >
                Manto™
              </motion.span>
            </motion.h1>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
