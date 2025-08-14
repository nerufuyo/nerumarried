'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elegant' | 'glass' | 'minimal' | 'luxury';
  hover?: boolean;
  glow?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  padding = 'md',
  variant = 'default',
  hover = true,
  glow = false
}: CardProps) {
  const baseClasses = 'rounded-xl transition-all duration-300 relative overflow-hidden';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md',
    elegant: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-lg hover:shadow-xl',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg',
    minimal: 'bg-white border-l-4 border-yellow-400 shadow-md hover:shadow-lg',
    luxury: 'bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 shadow-xl hover:shadow-2xl'
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;

  const hoverAnimation = hover ? {
    whileHover: { y: -5, scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <motion.div 
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...hoverAnimation}
      style={glow ? { 
        filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.4))'
      } : {}}
    >
      {/* Luxury shimmer effect */}
      {variant === 'luxury' && (
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%)',
          }}
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}
      
      {children}
    </motion.div>
  );
}
