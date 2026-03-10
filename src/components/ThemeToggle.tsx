'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // Only set mounted flag after initial paint to prevent hydration mismatch
    let isMounted = true;
    setTimeout(() => {
      if (isMounted) {
        setMounted(true);
      }
    }, 0);
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleTheme = async (e: React.MouseEvent) => {
    const isDark = resolvedTheme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.documentElement.classList.add('theme-transition');

    const transition = document.startViewTransition(() => {
      const root = document.documentElement;
      root.setAttribute('data-theme', nextTheme);
      // Let next-themes also sync its state
      setTheme(nextTheme);
    });

    await transition.finished;
    document.documentElement.classList.remove('theme-transition');
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-full border border-border bg-transparent flex items-center justify-center opacity-0" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-8 h-8 rounded-full border border-border/40 hover:border-text-primary transition-colors group overflow-hidden bg-transparent"
      aria-label="Toggle Dark Mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center text-text-primary"
          >
            <Moon className="w-4 h-4" strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center text-text-primary"
          >
            <Sun className="w-4 h-4" strokeWidth={1.5} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover fill effect matching AnimatedButton style */}
      <motion.div
        className="absolute inset-0 bg-text-primary z-[-1]"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
        style={{ originY: 1 }}
      />
    </button>
  );
}
