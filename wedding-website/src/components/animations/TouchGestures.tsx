'use client';

import { motion, PanInfo, useDragControls } from 'framer-motion';
import { ReactNode, useState, useRef } from 'react';

interface SwipeGestureProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  className?: string;
  disabled?: boolean;
}

export function SwipeGesture({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  className = '',
  disabled = false
}: SwipeGestureProps) {
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    if (disabled) return;

    const { offset } = info;
    
    // Horizontal swipes
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      if (offset.x > threshold && onSwipeRight) {
        onSwipeRight();
      } else if (offset.x < -threshold && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    // Vertical swipes
    else {
      if (offset.y > threshold && onSwipeDown) {
        onSwipeDown();
      } else if (offset.y < -threshold && onSwipeUp) {
        onSwipeUp();
      }
    }
  };

  return (
    <motion.div
      ref={constraintsRef}
      className={`touch-pan-y ${className}`}
      drag={!disabled}
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragControls={dragControls}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 0.95, opacity: 0.8 }}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {children}
    </motion.div>
  );
}

// Pinch to zoom gesture component
interface PinchZoomProps {
  children: ReactNode;
  minScale?: number;
  maxScale?: number;
  className?: string;
}

export function PinchZoom({
  children,
  minScale = 0.5,
  maxScale = 3,
  className = ''
}: PinchZoomProps) {
  const [scale, setScale] = useState(1);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    const newScale = Math.max(minScale, Math.min(maxScale, scale + (delta > 0 ? -0.1 : 0.1)));
    setScale(newScale);
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      onWheel={handleWheel}
      style={{ touchAction: 'none' }}
    >
      <motion.div
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ 
          transformOrigin: 'center center',
          width: '100%',
          height: '100%'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Pull to refresh component
interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  refreshThreshold?: number;
  className?: string;
}

export function PullToRefresh({
  children,
  onRefresh,
  refreshThreshold = 80,
  className = ''
}: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 0) {
      setPullDistance(Math.min(info.offset.y, refreshThreshold * 1.5));
    }
  };

  const handleDragEnd = async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > refreshThreshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  };

  const refreshProgress = Math.min(pullDistance / refreshThreshold, 1);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center bg-yellow-400 text-black font-medium"
        style={{ 
          height: pullDistance,
          opacity: refreshProgress
        }}
        initial={{ y: -refreshThreshold }}
        animate={{ y: pullDistance - refreshThreshold }}
      >
        {isRefreshing ? (
          <motion.div
            className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <motion.div
            className="w-6 h-6 flex items-center justify-center"
            animate={{ rotate: refreshProgress * 180 }}
          >
            ↓
          </motion.div>
        )}
        <span className="ml-2">
          {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ y: pullDistance }}
      >
        {children}
      </motion.div>
    </div>
  );
}
