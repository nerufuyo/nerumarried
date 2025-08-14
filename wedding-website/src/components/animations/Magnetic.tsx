'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, ReactNode, MouseEvent } from 'react';

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  range?: number;
  className?: string;
  disabled?: boolean;
}

export function Magnetic({
  children,
  strength = 0.3,
  range = 100,
  className = '',
  disabled = false
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < range) {
      const force = (range - distance) / range;
      x.set(deltaX * strength * force);
      y.set(deltaY * strength * force);
    }
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    // Optional: Add a subtle pulse effect on enter
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

// Enhanced magnetic button with additional effects
interface MagneticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  magnetStrength?: number;
  glowOnHover?: boolean;
}

export function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  magnetStrength = 0.4,
  glowOnHover = true
}: MagneticButtonProps) {
  const variantClasses = {
    primary: 'bg-yellow-400 hover:bg-yellow-500 text-black font-semibold',
    secondary: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300',
    ghost: 'bg-transparent hover:bg-white/10 text-white border border-white/30'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <Magnetic strength={magnetStrength} className={className}>
      <motion.button
        className={`
          relative rounded-lg transition-all duration-300 overflow-hidden
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${glowOnHover ? 'hover:shadow-lg' : ''}
        `}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
        style={
          glowOnHover && variant === 'primary'
            ? {
                filter: 'drop-shadow(0 0 0px rgba(255, 215, 0, 0))',
              }
            : {}
        }
        whileHover={
          glowOnHover && variant === 'primary'
            ? {
                filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                transition: { duration: 0.3 }
              }
            : {}
        }
      >
        {/* Ripple effect overlay */}
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.2 }}
        />
        
        {/* Content */}
        <span className="relative z-10">{children}</span>
        
        {/* Shimmer effect for primary variant */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 opacity-0"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
              transform: 'translateX(-100%)'
            }}
            whileHover={{
              opacity: 1,
              transform: 'translateX(100%)',
              transition: { duration: 0.6, ease: 'easeInOut' }
            }}
          />
        )}
      </motion.button>
    </Magnetic>
  );
}
