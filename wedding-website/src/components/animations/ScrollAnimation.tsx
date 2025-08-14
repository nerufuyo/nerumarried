'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

const getAnimationVariants = (direction: string) => {
  const directions = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 }
  };

  return {
    hidden: directions[direction as keyof typeof directions] || directions.up,
    visible: {
      x: 0,
      y: 0,
      opacity: 1
    }
  };
};

export function ScrollAnimation({
  children,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  delay = 0,
  direction = 'up',
  duration = 0.6
}: ScrollAnimationProps) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  });

  const variants = getAnimationVariants(direction);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}
