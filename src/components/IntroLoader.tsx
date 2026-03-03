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
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 20 ? 2 : prev < 80 ? 5 : prev < 95 ? 3 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center no-theme-transition"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          {/* Top-left corner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute top-8 left-8 md:left-12"
          >
            <span
              className="font-heading text-xs md:text-sm tracking-widest uppercase"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Warung Mbah Manto
            </span>
          </motion.div>

          {/* Top-right corner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute top-8 right-8 md:right-12"
          >
            <span
              className="font-heading text-xs md:text-sm tracking-widest"
              style={{ color: 'var(--color-text-muted)' }}
            >
              ©2026
            </span>
          </motion.div>

          {/* Center: Counter → Brand */}
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
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }}
                  className="flex flex-col items-center gap-6"
                >
                  <span
                    className="font-heading font-black text-[clamp(5rem,15vw,12rem)] tracking-tighter leading-none tabular-nums"
                    style={{ color: 'var(--color-text-heading)' }}
                  >
                    {count}
                  </span>
                  <div
                    className="w-32 md:w-48 h-[2px] rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-border)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: 'var(--color-text-heading)' }}
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
                      className="font-heading font-black text-[clamp(4rem,16vw,14rem)] tracking-tighter uppercase leading-none"
                      style={{ color: 'var(--color-text-heading)' }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center"
          >
            <span
              className="font-serif italic text-xs md:text-sm tracking-wider"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Grosir & Eceran Sembako Terpercaya
            </span>
          </motion.div>

          {/* Corner brackets */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute inset-8 md:inset-12 pointer-events-none"
          >
            <div
              className="absolute top-0 left-0 w-8 h-8"
              style={{
                borderTop: '1px solid var(--color-text-heading)',
                borderLeft: '1px solid var(--color-text-heading)',
              }}
            />
            <div
              className="absolute top-0 right-0 w-8 h-8"
              style={{
                borderTop: '1px solid var(--color-text-heading)',
                borderRight: '1px solid var(--color-text-heading)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-8 h-8"
              style={{
                borderBottom: '1px solid var(--color-text-heading)',
                borderLeft: '1px solid var(--color-text-heading)',
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-8 h-8"
              style={{
                borderBottom: '1px solid var(--color-text-heading)',
                borderRight: '1px solid var(--color-text-heading)',
              }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
