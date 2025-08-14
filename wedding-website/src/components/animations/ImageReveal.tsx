'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ImageRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  duration?: number;
  delay?: number;
  className?: string;
  overlay?: boolean;
  overlayColor?: string;
}

export function ImageReveal({
  children,
  direction = 'bottom',
  duration = 1,
  delay = 0,
  className = '',
  overlay = true,
  overlayColor = 'rgba(0, 0, 0, 0.7)'
}: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directionVariants = {
    left: {
      clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
    },
    right: {
      clipPath: ['inset(0 0 0 100%)', 'inset(0 0 0 0%)']
    },
    top: {
      clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)']
    },
    bottom: {
      clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0% 0)']
    },
    center: {
      clipPath: ['inset(50% 50% 50% 50%)', 'inset(0% 0% 0% 0%)']
    }
  };

  const overlayVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 0 }
  };

  const overlayTransition = { 
    duration: duration * 0.6, 
    delay: delay + duration * 0.4,
    ease: 'easeOut' as const
  };

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Main content reveal */}
      <motion.div
        initial={{ clipPath: directionVariants[direction].clipPath[0] }}
        animate={
          isInView 
            ? { clipPath: directionVariants[direction].clipPath[1] }
            : { clipPath: directionVariants[direction].clipPath[0] }
        }
        transition={{
          duration,
          delay,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.div>

      {/* Overlay effect */}
      {overlay && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: overlayColor }}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          variants={overlayVariants}
          transition={overlayTransition}
        >
          {/* Elegant loading indicator */}
          <motion.div
            className="w-12 h-12 border-2 border-white/30 rounded-full"
            style={{
              borderTopColor: 'white'
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </motion.div>
      )}

      {/* Shimmer effect on reveal */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
          transform: 'translateX(-100%)'
        }}
        animate={
          isInView 
            ? { transform: 'translateX(100%)' }
            : { transform: 'translateX(-100%)' }
        }
        transition={{
          duration: 0.8,
          delay: delay + duration * 0.7,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}
