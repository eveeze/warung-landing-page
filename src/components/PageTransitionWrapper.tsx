'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Using Framer's Expo curve for cinematic drama
  const transitionCurve = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const };

  // Force scroll to top on route change since `mode="wait"` delays unmounting
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This mathematical continuous Wipe utilizes 2 interlocking canvases!
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative w-full h-full">
        {/* 1. ENTER WIPE: Starts fully covering, then slides UP off the screen to reveal content */}
        <motion.div
          className="fixed inset-0 z-[70] bg-forest-deep pointer-events-none"
          initial={{ clipPath: 'inset(0% 0 0 0)' }}
          animate={{ clipPath: 'inset(0 0 100% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }} // Stay hidden at top during exit
          transition={transitionCurve}
        />

        {/* 2. EXIT WIPE: Stays hidden at bottom, then slides UP to cover the screen upon exit */}
        <motion.div
          className="fixed inset-0 z-[71] bg-forest-deep pointer-events-none"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(100% 0 0 0)' }}
          exit={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={transitionCurve}
        />

        {/* 3. PAGE CONTENT: 
            Only manages opacity to avoid breaking `fixed` children (Navbar, IntroLoader, Cart).
            Individual pages handle their own slide-in transforms!
        */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
