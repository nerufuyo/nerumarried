'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  range?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FloatingElement({ 
  children, 
  duration = 3,
  delay = 0,
  range = 10,
  className = '',
  style = {}
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [-range, range, -range],
        rotate: [-1, 1, -1]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
}
