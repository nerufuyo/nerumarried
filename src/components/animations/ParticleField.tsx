'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const sizeVariants = {
  sm: { min: 1, max: 3 },
  md: { min: 2, max: 5 },
  lg: { min: 3, max: 8 }
};

const speedVariants = {
  slow: { min: 8, max: 15 },
  normal: { min: 5, max: 12 },
  fast: { min: 3, max: 8 }
};

export function ParticleField({
  count = 20,
  color = 'rgba(255, 215, 0, 0.6)',
  size = 'md',
  speed = 'normal',
  className = ''
}: ParticleFieldProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const currentSizeVariant = sizeVariants[size];
    const currentSpeedVariant = speedVariants[speed];
    
    const generateParticles = (): Particle[] => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (currentSizeVariant.max - currentSizeVariant.min) + currentSizeVariant.min,
        duration: Math.random() * (currentSpeedVariant.max - currentSpeedVariant.min) + currentSpeedVariant.min,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.2
      }));
    };

    setParticles(generateParticles());
  }, [count, size, speed]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(particle.id) * 50, 0],
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
      
      {/* Ambient glow effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color.replace('0.6', '0.1')} 0%, transparent 70%)`
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}
