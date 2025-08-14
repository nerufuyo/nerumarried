'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface ScrollProgressProps {
  children: ReactNode;
  className?: string;
}

export function ScrollProgress({ children, className = '' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  
  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <div className={className}>{children}</div>
    </>
  );
}

// Scroll-triggered scale animation
interface ScrollScaleProps {
  children: ReactNode;
  scale?: [number, number];
  className?: string;
}

export function ScrollScale({ 
  children, 
  scale = [0.8, 1], 
  className = '' 
}: ScrollScaleProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [scale[0], scale[1], scale[0]]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ 
        scale: scaleTransform,
        opacity
      }}
    >
      {children}
    </motion.div>
  );
}

// Scroll-triggered rotation
interface ScrollRotateProps {
  children: ReactNode;
  rotation?: [number, number];
  className?: string;
}

export function ScrollRotate({ 
  children, 
  rotation = [0, 360], 
  className = '' 
}: ScrollRotateProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const rotate = useTransform(scrollYProgress, [0, 1], rotation);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotate }}
    >
      {children}
    </motion.div>
  );
}

// Advanced parallax with multiple layers
interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ParallaxLayer({ 
  children, 
  speed = 0.5,
  direction = 'up',
  className = '' 
}: ParallaxLayerProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const transforms = {
    up: useTransform(scrollYProgress, [0, 1], [0, -100 * speed]),
    down: useTransform(scrollYProgress, [0, 1], [0, 100 * speed]),
    left: useTransform(scrollYProgress, [0, 1], [0, -100 * speed]),
    right: useTransform(scrollYProgress, [0, 1], [0, 100 * speed])
  };

  const style = direction === 'up' || direction === 'down' 
    ? { y: transforms[direction] }
    : { x: transforms[direction] };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// Scroll-triggered text reveal
interface ScrollTextRevealProps {
  text: string;
  className?: string;
}

export function ScrollTextReveal({ 
  text, 
  className = ''
}: ScrollTextRevealProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start']
  });

  const words = text.split(' ');

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + (1 / words.length);
        
        return (
          <ScrollTextWord
            key={index}
            word={word}
            scrollYProgress={scrollYProgress}
            start={start}
            end={end}
          />
        );
      })}
    </div>
  );
}

// Helper component for individual words
function ScrollTextWord({ 
  word, 
  scrollYProgress, 
  start, 
  end 
}: {
  word: string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);

  return (
    <motion.span
      className="inline-block mr-1"
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}

// Morphing shapes based on scroll
interface ScrollMorphProps {
  className?: string;
  color?: string;
}

export function ScrollMorph({ 
  className = '',
  color = '#fbbf24'
}: ScrollMorphProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={className}>
      <svg width="200" height="200" viewBox="0 0 200 200">
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke={color}
          strokeWidth="3"
          style={{
            pathLength,
            opacity
          }}
        />
        <motion.path
          d="M100,40 Q140,100 100,160 Q60,100 100,40"
          fill="none"
          stroke={color}
          strokeWidth="2"
          style={{
            pathLength: useTransform(scrollYProgress, [0.3, 0.7], [0, 1]),
            opacity: useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0])
          }}
        />
      </svg>
    </div>
  );
}

// Scroll-based 3D card flip
interface Scroll3DCardProps {
  children: ReactNode;
  backContent?: ReactNode;
  className?: string;
}

export function Scroll3DCard({ 
  children, 
  backContent,
  className = '' 
}: Scroll3DCardProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 0]);

  return (
    <div ref={ref} className={`perspective-1000 ${className}`}>
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{ rotateY }}
      >
        {/* Front face */}
        <div className="absolute inset-0 backface-hidden">
          {children}
        </div>
        
        {/* Back face */}
        {backContent && (
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            {backContent}
          </div>
        )}
      </motion.div>
    </div>
  );
}
