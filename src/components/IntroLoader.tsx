'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letterVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.04,
    },
  }),
  exit: (i: number) => ({
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.02,
    },
  }),
};

export default function IntroLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<'enter' | 'counter' | 'brand' | 'exit'>(
    'enter',
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Phase counter: 0% → 100% fast tick
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate: slow start, fast middle, slow end
        const increment = prev < 20 ? 2 : prev < 80 ? 5 : prev < 95 ? 3 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    // Timeline
    const counterStart = setTimeout(() => setPhase('counter'), 100);
    const brandStart = setTimeout(() => setPhase('brand'), 1200);
    const exitStart = setTimeout(() => setPhase('exit'), 2400);
    const complete = setTimeout(() => onComplete(), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(counterStart);
      clearTimeout(brandStart);
      clearTimeout(exitStart);
      clearTimeout(complete);
    };
  }, [onComplete]);

  const brandText = 'MANTO™';
  const brandLetters = brandText.split('');

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="intro"
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.8, ease: [0.85, 0, 0.15, 1] },
          }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          {/* Top-left corner: Warung Mbah Manto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="absolute top-8 left-8 md:left-12"
          >
            <span className="font-heading text-xs md:text-sm text-white/40 tracking-widest uppercase">
              Warung Mbah Manto
            </span>
          </motion.div>

          {/* Top-right corner: Year */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            className="absolute top-8 right-8 md:right-12"
          >
            <span className="font-heading text-xs md:text-sm text-white/40 tracking-widest">
              ©2026
            </span>
          </motion.div>

          {/* Center: Counter → Brand Transition */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === 'enter' || phase === 'counter' ? (
                <motion.div
                  key="counter"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    filter: 'blur(10px)',
                    transition: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Percentage Counter */}
                  <span className="font-heading font-black text-[clamp(5rem,15vw,12rem)] text-white tracking-tighter leading-none tabular-nums">
                    {count}
                  </span>

                  {/* Progress bar */}
                  <div className="w-32 md:w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${count}%` }}
                      transition={{ duration: 0.05 }}
                    />
                  </div>
                </motion.div>
              ) : phase === 'brand' ? (
                <motion.div
                  key="brand"
                  className="flex items-center overflow-hidden"
                >
                  {brandLetters.map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className="font-heading font-black text-[clamp(4rem,16vw,14rem)] text-white tracking-tighter uppercase leading-none"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Bottom: Animated tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3,
            }}
            className="absolute bottom-8 left-0 right-0 flex justify-center"
          >
            <span className="font-serif italic text-xs md:text-sm text-white/30 tracking-wider">
              Grosir & Eceran Sembako Terpercaya
            </span>
          </motion.div>

          {/* Animated corner brackets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute inset-8 md:inset-12 pointer-events-none"
          >
            {/* Top-left bracket */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[1px] border-l-[1px] border-white" />
            {/* Top-right bracket */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[1px] border-r-[1px] border-white" />
            {/* Bottom-left bracket */}
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[1px] border-l-[1px] border-white" />
            {/* Bottom-right bracket */}
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[1px] border-r-[1px] border-white" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
