'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

export default function IntroLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<'drop' | 'fill' | 'settle'>('drop');

  useEffect(() => {
    // Phase 1: Text drops in center (0 → 700ms)
    // Phase 2: Color fills left-to-right (700ms → 1400ms)
    const fillTimer = setTimeout(() => setPhase('fill'), 700);
    // Phase 3: Settle — text moves to hero position (1400ms → 2100ms)
    const settleTimer = setTimeout(() => setPhase('settle'), 1400);
    // Complete — loader unmounts
    const completeTimer = setTimeout(() => onComplete(), 2100);

    return () => {
      clearTimeout(fillTimer);
      clearTimeout(settleTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="intro-loader"
      className="fixed inset-0 z-[100] bg-black flex items-end justify-center overflow-hidden"
      animate={phase === 'settle' ? { opacity: 0 } : { opacity: 1 }}
      transition={{
        duration: phase === 'settle' ? 0.7 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Centered container that holds the text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={
          phase === 'settle' ? { y: '30vh', scale: 0.6 } : { y: 0, scale: 1 }
        }
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="relative overflow-hidden">
          <motion.h1
            initial={{ y: '-130%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-[clamp(4rem,18vw,16rem)] font-heading font-black tracking-tighter uppercase leading-none select-none"
          >
            {/* Base text (dark) */}
            <span className="text-white/10">Manto™</span>

            {/* Fill overlay (white, clips left-to-right) */}
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={
                phase !== 'drop'
                  ? { clipPath: 'inset(0 0% 0 0)' }
                  : { clipPath: 'inset(0 100% 0 0)' }
              }
              transition={{
                duration: 0.7,
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
    </motion.div>
  );
}
