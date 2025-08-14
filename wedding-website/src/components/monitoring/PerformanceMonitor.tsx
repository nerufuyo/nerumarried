/**
 * Performance and accessibility monitoring component
 */

'use client';

import { useEffect } from 'react';
import { PerformanceMonitor as PerfMonitor } from '@/utils/performance.utils';
import { SEOMonitor } from '@/utils/seo.utils';
import { AccessibilityValidator } from '@/utils/accessibility.utils';

interface PerformanceMonitorProps {
  enablePerformanceLogging?: boolean;
  enableA11yValidation?: boolean;
  enableSEOMonitoring?: boolean;
  isDevelopment?: boolean;
}

export function PerformanceMonitorComponent({
  enablePerformanceLogging = true,
  enableA11yValidation = true,
  enableSEOMonitoring = true,
  isDevelopment = process.env.NODE_ENV === 'development',
}: PerformanceMonitorProps) {
  useEffect(() => {
    if (!isDevelopment) return;

    // Performance monitoring
    if (enablePerformanceLogging) {
      PerfMonitor.measurePageLoad();
      PerfMonitor.measureCoreWebVitals();
    }

    // SEO monitoring
    if (enableSEOMonitoring) {
      setTimeout(async () => {
        try {
          const seoReport = await SEOMonitor.generateSEOReport();
          console.log('📊 SEO Report:', seoReport);
          
          if (seoReport.seoHealth.issues.length > 0) {
            console.warn('⚠️ SEO Issues:', seoReport.seoHealth.issues);
          }
          
          if (seoReport.seoHealth.suggestions.length > 0) {
            console.info('💡 SEO Suggestions:', seoReport.seoHealth.suggestions);
          }
        } catch (error) {
          console.error('SEO monitoring error:', error);
        }
      }, 2000);
    }

    // Accessibility validation
    if (enableA11yValidation) {
      setTimeout(() => {
        try {
          // Check heading hierarchy
          const headingIssues = AccessibilityValidator.validateHeadingHierarchy();
          if (headingIssues.length > 0) {
            console.warn('♿ Heading Hierarchy Issues:', headingIssues);
          }

          // Check forms if they exist
          const forms = document.querySelectorAll('form');
          forms.forEach((form, index) => {
            const formIssues = AccessibilityValidator.validateFormAccessibility(form as HTMLFormElement);
            if (formIssues.length > 0) {
              console.warn(`♿ Form ${index + 1} Accessibility Issues:`, formIssues);
            }
          });

          // Check color contrast for key elements
          const contrastChecks = [
            { fg: '#ffffff', bg: '#000000', name: 'White on Black' },
            { fg: '#d4af37', bg: '#000000', name: 'Gold on Black' },
            { fg: '#000000', bg: '#ffffff', name: 'Black on White' },
          ];

          contrastChecks.forEach(({ fg, bg, name }) => {
            const hasGoodContrast = AccessibilityValidator.checkColorContrast(fg, bg);
            if (!hasGoodContrast) {
              console.warn(`♿ Poor Color Contrast: ${name}`);
            }
          });

        } catch (error) {
          console.error('Accessibility validation error:', error);
        }
      }, 1500);
    }
  }, [isDevelopment, enablePerformanceLogging, enableA11yValidation, enableSEOMonitoring]);

  // Only render in development for visual feedback
  if (!isDevelopment) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity duration-300">
      <div className="bg-black bg-opacity-90 text-white text-xs p-2 rounded-lg shadow-lg max-w-xs">
        <div className="font-semibold mb-1">Development Monitoring</div>
        <div className="space-y-1 text-xs">
          {enablePerformanceLogging && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Performance
            </div>
          )}
          {enableA11yValidation && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Accessibility
            </div>
          )}
          {enableSEOMonitoring && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              SEO
            </div>
          )}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Check console for details
        </div>
      </div>
    </div>
  );
}

/**
 * Hook for runtime performance monitoring
 */
export function usePerformanceMonitoring() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Monitor memory usage
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as Performance & { 
          memory: {
            usedJSHeapSize: number;
            totalJSHeapSize: number;
            jsHeapSizeLimit: number;
          }
        }).memory;
        const memoryMB = {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
        };
        
        console.log('🧠 Memory Usage:', memoryMB);
        
        // Warn if memory usage is high
        if (memoryMB.used > memoryMB.limit * 0.8) {
          console.warn('⚠️ High memory usage detected');
        }
      }
    };

    // Check memory every 30 seconds in development
    const memoryInterval = setInterval(checkMemoryUsage, 30000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);
}
