'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  children: string;
  variant?: 'words' | 'letters' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

export function TextReveal({
  children,
  variant = 'words',
  stagger = 0.1,
  duration = 0.6,
  delay = 0,
  className = '',
  direction = 'up',
  once = true
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: 50, opacity: 0 },
    right: { x: -50, opacity: 0 }
  };

  const renderWords = () => {
    const words = children.split(' ');
    return (
      <span className={className}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-1"
            initial={directionVariants[direction]}
            animate={isInView ? { y: 0, x: 0, opacity: 1 } : directionVariants[direction]}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: 'easeOut'
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  };

  const renderLetters = () => {
    const letters = children.split('');
    return (
      <span className={className}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={directionVariants[direction]}
            animate={isInView ? { y: 0, x: 0, opacity: 1 } : directionVariants[direction]}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: 'easeOut'
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </span>
    );
  };

  const renderLines = () => {
    const lines = children.split('\n');
    return (
      <div className={className}>
        {lines.map((line, index) => (
          <motion.div
            key={index}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{
              duration,
              delay: delay + index * stagger,
              ease: 'easeOut'
            }}
          >
            <motion.div
              initial={directionVariants[direction]}
              animate={isInView ? { y: 0, x: 0, opacity: 1 } : directionVariants[direction]}
              transition={{
                duration,
                delay: delay + index * stagger + 0.1,
                ease: 'easeOut'
              }}
            >
              {line}
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (variant) {
      case 'letters':
        return renderLetters();
      case 'lines':
        return renderLines();
      default:
        return renderWords();
    }
  };

  return (
    <div ref={ref} className="inline-block">
      {renderContent()}
    </div>
  );
}

// Gradient text reveal with sophisticated effects
interface GradientTextRevealProps {
  children: string;
  gradient?: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function GradientTextReveal({
  children,
  gradient = 'from-yellow-400 via-yellow-500 to-yellow-600',
  className = '',
  delay = 0,
  duration = 1.5
}: GradientTextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      {/* Background text for depth */}
      <motion.span
        className={`absolute inset-0 bg-gradient-to-r ${gradient} bg-clip-text text-transparent blur-sm opacity-50`}
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: duration * 0.8, delay }}
      >
        {children}
      </motion.span>
      
      {/* Main text */}
      <motion.span
        className={`relative bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration, delay, ease: 'easeOut' }}
      >
        {children}
      </motion.span>
      
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        style={{
          maskImage: `linear-gradient(to right, transparent 0%, black 50%, transparent 100%)`,
          WebkitMaskImage: `linear-gradient(to right, transparent 0%, black 50%, transparent 100%)`
        }}
        animate={
          isInView
            ? {
                x: ['-100%', '100%'],
                opacity: [0, 0.3, 0]
              }
            : {}
        }
        transition={{
          duration: 2,
          delay: delay + duration * 0.7,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}
