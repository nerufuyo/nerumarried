'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'hearts' | 'rings' | 'dots';
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'hearts' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'hearts') {
    return (
      <div className="flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart className={`${sizeClasses[size]} text-yellow-500 fill-current`} />
        </motion.div>
      </div>
    );
  }

  if (variant === 'rings') {
    return (
      <div className="flex items-center justify-center">
        <div className="relative">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`absolute border-2 border-yellow-500 rounded-full ${sizeClasses[size]}`}
              style={{ borderTopColor: 'transparent' }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1 + i * 0.2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // dots variant
  return (
    <div className="flex items-center justify-center space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-yellow-500 rounded-full"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
