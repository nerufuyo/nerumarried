'use client';

import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export function Typewriter({ 
  text, 
  delay = 0, 
  speed = 0.05,
  className = ''
}: TypewriterProps) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        opacity: { duration: 0 }
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        opacity: { duration: 0 }
      }
    }
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
