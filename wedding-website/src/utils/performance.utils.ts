/**
 * Performance optimization utilities for the wedding website
 */

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for lazy loading components
 */
export function useLazyLoad<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  boolean
] {
  const elementRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);

  return [elementRef, isVisible];
}

/**
 * Custom hook for debouncing values
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Performance monitoring utilities
 */
export const PerformanceMonitor = {
  measurePageLoad: () => {
    if (typeof window === 'undefined') return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        console.log('🚀 Page Load Performance:', {
          'DNS Lookup': `${perfData.domainLookupEnd - perfData.domainLookupStart}ms`,
          'TCP Connection': `${perfData.connectEnd - perfData.connectStart}ms`,
          'Server Response': `${perfData.responseEnd - perfData.requestStart}ms`,
          'DOM Content Loaded': `${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`,
          'Page Load Complete': `${perfData.loadEventEnd - perfData.loadEventStart}ms`,
        });
      }, 0);
    });
  },

  measureCoreWebVitals: () => {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('📊 LCP:', `${lastEntry.startTime}ms`);
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  },
};
