'use client';

import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let previousScrollY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollDirection(currentScrollY > previousScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      previousScrollY = currentScrollY;
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return { scrollY, scrollDirection };
}
