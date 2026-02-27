'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: string; // We enforce string so we can split it into characters
  className?: string;
  onClick?: (e?: any) => void;
  href?: string;
  as?: 'button' | 'a' | 'span';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fillColor?: string; // e.g. "bg-white", "bg-gray-200"
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export default function AnimatedButton({
  children,
  className = '',
  onClick,
  href,
  as = 'button',
  iconLeft,
  iconRight,
  fillColor,
  disabled = false,
  target,
  rel,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Best practice: Let the parent handle the stagger orchestration.
  // Using explicit state guarantees that unhover reversals always stagger cleanly without relying on whileHover quirks.
  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.015,
        staggerDirection: -1,
      },
    },
    hovered: {
      transition: {
        staggerChildren: 0.015,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    initial: {},
    hovered: {},
  };

  const characters = Array.from(children);
  const transitionSettings = {
    duration: 0.25,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const topVariants = {
    initial: { y: 0, opacity: 1, transition: transitionSettings },
    hovered: { y: '-100%', opacity: 0, transition: transitionSettings },
  };

  const bottomVariants = {
    initial: { y: '100%', opacity: 0, transition: transitionSettings },
    hovered: { y: 0, opacity: 1, transition: transitionSettings },
  };

  const innerContent = (
    <>
      {/* Dynamic Background Fill Layer */}
      {fillColor && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isHovered ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className={`absolute inset-0 z-0 origin-bottom ${fillColor}`}
        />
      )}

      {/* Content wrapper */}
      <div className="relative z-10 flex items-center justify-center gap-3 w-full">
        {iconLeft}
        <motion.div
          initial="initial"
          animate={isHovered ? 'hovered' : 'initial'}
          variants={containerVariants}
          className="relative overflow-hidden flex items-center justify-center whitespace-pre"
        >
          {characters.map((char, i) => (
            <motion.span
              key={i}
              variants={itemVariants}
              className={
                char === ' '
                  ? 'w-[0.3em] inline-block relative'
                  : 'inline-block relative'
              }
            >
              <motion.span
                variants={topVariants}
                className="block relative z-10"
              >
                {char}
              </motion.span>
              <motion.span
                variants={bottomVariants}
                className="absolute inset-0 z-20 flex items-center justify-center"
              >
                {char}
              </motion.span>
            </motion.span>
          ))}
        </motion.div>
        {iconRight}
      </div>
    </>
  );

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };
  const handleMouseLeave = () => setIsHovered(false);

  const outerClasses = fillColor
    ? `${className} relative overflow-hidden`
    : className;

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        className={outerClasses}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        target={target}
        rel={rel}
      >
        {innerContent}
      </a>
    );
  }

  if (as === 'span') {
    return (
      <span
        className={outerClasses}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {innerContent}
      </span>
    );
  }

  return (
    <button
      className={outerClasses}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {innerContent}
    </button>
  );
}
