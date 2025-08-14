/**
 * Mobile optimization and responsive behavior component
 */

'use client';

import { useEffect, useState } from 'react';
import { useDebounce } from '@/utils/performance.utils';

interface MobileOptimizationProps {
  children: React.ReactNode;
}

export function MobileOptimization({ children }: MobileOptimizationProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [viewportHeight, setViewportHeight] = useState(0);

  // Debounced viewport updates for performance
  const debouncedHeight = useDebounce(viewportHeight, 150);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      const currentOrientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      
      setIsMobile(mobile);
      setOrientation(currentOrientation);
      setViewportHeight(window.innerHeight);
      
      // Set CSS custom properties for viewport units
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
      document.documentElement.style.setProperty('--vw', `${window.innerWidth * 0.01}px`);
    };

    checkDevice();
    
    const handleResize = () => checkDevice();
    const handleOrientationChange = () => {
      // Delay to ensure viewport is updated after orientation change
      setTimeout(checkDevice, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Update CSS custom properties when debounced height changes
  useEffect(() => {
    document.documentElement.style.setProperty('--vh', `${debouncedHeight * 0.01}px`);
  }, [debouncedHeight]);

  // Add mobile-specific classes to body
  useEffect(() => {
    document.body.classList.toggle('mobile', isMobile);
    document.body.classList.toggle('desktop', !isMobile);
    document.body.classList.toggle('portrait', orientation === 'portrait');
    document.body.classList.toggle('landscape', orientation === 'landscape');
  }, [isMobile, orientation]);

  return (
    <>
      {children}
      {/* Mobile-specific optimizations */}
      {isMobile && <MobileTouchOptimization />}
    </>
  );
}

/**
 * Touch-specific optimizations for mobile devices
 */
function MobileTouchOptimization() {
  useEffect(() => {
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    const preventZoom = (event: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Prevent pinch-to-zoom
    const preventPinchZoom = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    // Add iOS Safari specific optimizations
    const preventIOSZoom = (event: TouchEvent) => {
      // Prevent zoom on input focus
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }
      
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchend', preventZoom, { passive: false });
    document.addEventListener('touchstart', preventPinchZoom, { passive: false });
    document.addEventListener('touchmove', preventIOSZoom, { passive: false });

    return () => {
      document.removeEventListener('touchend', preventZoom);
      document.removeEventListener('touchstart', preventPinchZoom);
      document.removeEventListener('touchmove', preventIOSZoom);
    };
  }, []);

  useEffect(() => {
    // Improve scroll performance on mobile
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-overflow-scrolling: touch;
      }
      
      body {
        overscroll-behavior: none;
        touch-action: pan-x pan-y;
      }
      
      /* Optimize animations for mobile */
      @media (max-width: 768px) {
        * {
          animation-duration: 0.3s !important;
          transition-duration: 0.3s !important;
        }
      }
      
      /* Use hardware acceleration */
      .will-change-transform {
        will-change: transform;
      }
      
      .will-change-opacity {
        will-change: opacity;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

/**
 * Hook for responsive breakpoints
 */
export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  };
}

/**
 * Hook for detecting network connection
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>('unknown');

  useEffect(() => {
    const updateNetworkStatus = () => {
      setIsOnline(navigator.onLine);
      
      // Get connection info if available
      if ('connection' in navigator) {
        const connection = (navigator as Navigator & {
          connection?: {
            effectiveType?: string;
          }
        }).connection;
        setConnectionType(connection?.effectiveType || 'unknown');
      }
    };

    updateNetworkStatus();
    
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  return { isOnline, connectionType };
}

/**
 * Component for offline fallback
 */
export function OfflineFallback() {
  const { isOnline } = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center p-8 bg-white text-black rounded-lg max-w-md mx-4">
        <div className="text-4xl mb-4">📡</div>
        <h2 className="text-2xl font-bold mb-4">You&apos;re Offline</h2>
        <p className="mb-4">
          It looks like you&apos;ve lost your internet connection. 
          Some features may not work properly until you&apos;re back online.
        </p>
        <p className="text-sm text-gray-600">
          Don&apos;t worry - this wedding invitation will still display 
          the essential information!
        </p>
      </div>
    </div>
  );
}
