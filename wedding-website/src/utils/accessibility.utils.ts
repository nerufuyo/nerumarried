/**
 * Accessibility utilities for the wedding website
 */

import { useEffect, useState } from 'react';

/**
 * Custom hook for managing focus trap
 */
export function useFocusTrap(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
}

/**
 * Custom hook for keyboard navigation
 */
export function useKeyboardNavigation(
  onEscape?: () => void,
  onEnter?: () => void,
  onSpace?: () => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onEscape?.();
          break;
        case 'Enter':
          onEnter?.();
          break;
        case ' ':
          onSpace?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onEnter, onSpace]);
}

/**
 * Custom hook for announcing screen reader updates
 */
export function useScreenReaderAnnouncement() {
  const [announcement, setAnnouncement] = useState('');

  const announce = (message: string) => {
    setAnnouncement(''); // Clear first to ensure re-announcement
    setTimeout(() => setAnnouncement(message), 100);
    
    // Auto-clear after announcement
    setTimeout(() => setAnnouncement(''), 1000);
  };

  return { announcement, announce };
}

/**
 * Accessibility validation utilities
 */
export const AccessibilityValidator = {
  /**
   * Check if element has sufficient color contrast
   */
  checkColorContrast: (foreground: string, background: string): boolean => {
    // Simplified contrast check - in production, use a proper library
    const getLuminance = (color: string): number => {
      // Basic luminance calculation
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16) / 255;
      const g = parseInt(hex.substr(2, 2), 16) / 255;
      const b = parseInt(hex.substr(4, 2), 16) / 255;
      
      return 0.299 * r + 0.587 * g + 0.114 * b;
    };

    const fgLuminance = getLuminance(foreground);
    const bgLuminance = getLuminance(background);
    const contrast = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                    (Math.min(fgLuminance, bgLuminance) + 0.05);
    
    return contrast >= 4.5; // WCAG AA standard
  },

  /**
   * Validate form accessibility
   */
  validateFormAccessibility: (formElement: HTMLFormElement): string[] => {
    const issues: string[] = [];
    const inputs = formElement.querySelectorAll('input, textarea, select');

    inputs.forEach((input) => {
      const inputEl = input as HTMLInputElement;
      
      // Check for labels
      const hasLabel = inputEl.labels && inputEl.labels.length > 0;
      const hasAriaLabel = inputEl.getAttribute('aria-label');
      const hasAriaLabelledBy = inputEl.getAttribute('aria-labelledby');
      
      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        issues.push(`Input "${inputEl.name || inputEl.id || 'unnamed'}" is missing a label`);
      }

      // Check for required field indicators
      if (inputEl.required && !inputEl.getAttribute('aria-required')) {
        issues.push(`Required input "${inputEl.name || inputEl.id}" should have aria-required="true"`);
      }
    });

    return issues;
  },

  /**
   * Check heading hierarchy
   */
  validateHeadingHierarchy: (): string[] => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const issues: string[] = [];
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && currentLevel !== 1) {
        issues.push('Page should start with h1');
      }
      
      if (currentLevel > previousLevel + 1) {
        issues.push(`Heading level ${currentLevel} skips level ${previousLevel + 1}`);
      }
      
      previousLevel = currentLevel;
    });

    return issues;
  },
};

/**
 * ARIA utilities
 */
export const AriaUtils = {
  /**
   * Generate unique IDs for ARIA relationships
   */
  generateId: (prefix: string = 'aria'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Create ARIA live region announcements
   */
  createLiveRegion: (priority: 'polite' | 'assertive' = 'polite'): HTMLDivElement => {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
    return liveRegion;
  },

  /**
   * Announce message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const liveRegion = AriaUtils.createLiveRegion(priority);
    liveRegion.textContent = message;
    
    // Clean up after announcement
    setTimeout(() => {
      document.body.removeChild(liveRegion);
    }, 1000);
  },
};

/**
 * Focus management utilities
 */
export const FocusManager = {
  /**
   * Save current focus and restore later
   */
  saveFocus: (): (() => void) => {
    const activeElement = document.activeElement as HTMLElement;
    
    return () => {
      if (activeElement && typeof activeElement.focus === 'function') {
        activeElement.focus();
      }
    };
  },

  /**
   * Focus first focusable element in container
   */
  focusFirst: (container: HTMLElement): void => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    firstElement?.focus();
  },

  /**
   * Check if element is focusable
   */
  isFocusable: (element: HTMLElement): boolean => {
    const focusableSelectors = [
      'button',
      '[href]',
      'input',
      'select', 
      'textarea',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    return focusableSelectors.some(selector => element.matches(selector)) &&
           !element.hasAttribute('disabled') &&
           element.offsetParent !== null;
  },
};

/**
 * Mobile accessibility utilities
 */
export const MobileA11y = {
  /**
   * Optimize touch targets for mobile
   */
  validateTouchTargets: (): string[] => {
    const issues: string[] = [];
    const touchElements = document.querySelectorAll('button, a, input, [role="button"]');
    
    touchElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      
      if (size < 44) { // Apple's recommended minimum
        issues.push(`Touch target "${element.textContent?.trim() || 'unnamed'}" is too small (${size}px)`);
      }
    });
    
    return issues;
  },

  /**
   * Check for proper mobile viewport configuration
   */
  checkViewport: (): boolean => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return false;
    
    const content = viewport.getAttribute('content') || '';
    return content.includes('width=device-width') && content.includes('initial-scale=1');
  },
};
