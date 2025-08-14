'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverAnimationProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
  glowColor?: string;
}

export function HoverAnimation({
  children,
  className = '',
  scale = 1.05,
  duration = 0.3,
  glowColor = 'rgba(212, 175, 55, 0.3)'
}: HoverAnimationProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        boxShadow: `0 20px 40px ${glowColor}`
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration }}
    >
      {children}
    </motion.div>
  );
}
