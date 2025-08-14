/**
 * SEO optimization utilities for the wedding website
 */

import { type Metadata } from 'next';

/**
 * Generate optimized metadata for different pages
 */
export const SEOUtils = {
  /**
   * Generate page metadata with SEO best practices
   */
  generateMetadata: (options: {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'event';
    publishedTime?: string;
    modifiedTime?: string;
  }): Metadata => {
    const {
      title,
      description,
      keywords = [],
      image = '/images/og-wedding.jpg',
      url = '/',
      type = 'website',
      publishedTime,
      modifiedTime,
    } = options;

    return {
      title,
      description,
      keywords: keywords.join(', '),
      
      openGraph: {
        title,
        description,
        type: type as 'website' | 'article',
        url,
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        siteName: 'Neru & AI Wedding',
        locale: 'en_US',
        publishedTime,
        modifiedTime,
      },
      
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
        creator: '@wedding',
      },
      
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  },

  /**
   * Generate structured data for wedding event
   */
  generateWeddingStructuredData: (weddingData: {
    brideName: string;
    groomName: string;
    date: string;
    ceremonyTime: string;
    ceremonyVenue: string;
    ceremonyAddress: string;
    receptionTime: string;
    receptionVenue: string;
    receptionAddress: string;
    description?: string;
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${weddingData.brideName} & ${weddingData.groomName} Wedding`,
      description: weddingData.description || `Wedding ceremony and celebration of ${weddingData.brideName} and ${weddingData.groomName}`,
      startDate: `${weddingData.date}T${weddingData.ceremonyTime}:00`,
      endDate: `${weddingData.date}T23:59:59`,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      location: [
        {
          '@type': 'Place',
          name: weddingData.ceremonyVenue,
          address: {
            '@type': 'PostalAddress',
            streetAddress: weddingData.ceremonyAddress,
          },
        },
        {
          '@type': 'Place',
          name: weddingData.receptionVenue,
          address: {
            '@type': 'PostalAddress',
            streetAddress: weddingData.receptionAddress,
          },
        },
      ],
      organizer: [
        {
          '@type': 'Person',
          name: weddingData.brideName,
        },
        {
          '@type': 'Person',
          name: weddingData.groomName,
        },
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    };
  },

  /**
   * Generate breadcrumb structured data
   */
  generateBreadcrumbData: (breadcrumbs: Array<{ name: string; url: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  },

  /**
   * Generate organization structured data
   */
  generateOrganizationData: (organizationData: {
    name: string;
    url: string;
    logo?: string;
    socialLinks?: string[];
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: organizationData.name,
      url: organizationData.url,
      logo: organizationData.logo,
      sameAs: organizationData.socialLinks || [],
    };
  },
};

/**
 * Performance and SEO monitoring utilities
 */
export const SEOMonitor = {
  /**
   * Check page SEO health
   */
  checkSEOHealth: (): {
    score: number;
    issues: string[];
    suggestions: string[];
  } => {
    const issues: string[] = [];
    const suggestions: string[] = [];

    // Check title tag
    const title = document.querySelector('title');
    if (!title || !title.textContent) {
      issues.push('Missing page title');
    } else if (title.textContent.length > 60) {
      suggestions.push('Title is too long (>60 characters)');
    } else if (title.textContent.length < 30) {
      suggestions.push('Title might be too short (<30 characters)');
    }

    // Check meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription || !metaDescription.getAttribute('content')) {
      issues.push('Missing meta description');
    } else {
      const description = metaDescription.getAttribute('content') || '';
      if (description.length > 160) {
        suggestions.push('Meta description is too long (>160 characters)');
      } else if (description.length < 120) {
        suggestions.push('Meta description might be too short (<120 characters)');
      }
    }

    // Check heading structure
    const h1Tags = document.querySelectorAll('h1');
    if (h1Tags.length === 0) {
      issues.push('Missing H1 tag');
    } else if (h1Tags.length > 1) {
      suggestions.push('Multiple H1 tags found');
    }

    // Check images alt text
    const images = document.querySelectorAll('img');
    let imagesWithoutAlt = 0;
    images.forEach((img) => {
      if (!img.getAttribute('alt')) {
        imagesWithoutAlt++;
      }
    });
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt text`);
    }

    // Check internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="#"]');
    if (internalLinks.length === 0) {
      suggestions.push('Consider adding internal links for better navigation');
    }

    // Calculate score
    const totalChecks = 5;
    const score = Math.max(0, (totalChecks - issues.length) / totalChecks * 100);

    return { score, issues, suggestions };
  },

  /**
   * Check page loading performance
   */
  checkPageSpeed: (): Promise<{
    score: number;
    metrics: Record<string, number>;
    suggestions: string[];
  }> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({ score: 0, metrics: {}, suggestions: [] });
        return;
      }

      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const paint = performance.getEntriesByType('paint');
          
          const metrics = {
            'First Contentful Paint': paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
            'Load Complete': navigation.loadEventEnd - navigation.loadEventStart,
            'DOM Content Loaded': navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
            'Server Response': navigation.responseEnd - navigation.requestStart,
          };

          const suggestions: string[] = [];
          
          if (metrics['First Contentful Paint'] > 2500) {
            suggestions.push('First Contentful Paint is slow (>2.5s)');
          }
          if (metrics['Load Complete'] > 5000) {
            suggestions.push('Page load time is slow (>5s)');
          }
          if (metrics['Server Response'] > 600) {
            suggestions.push('Server response time is slow (>600ms)');
          }

          // Simple scoring based on FCP
          const score = Math.max(0, 100 - (metrics['First Contentful Paint'] / 25));

          resolve({ score, metrics, suggestions });
        }, 100);
      });
    });
  },

  /**
   * Generate SEO report
   */
  generateSEOReport: async () => {
    const checkSEOHealth = () => {
      const issues: string[] = [];
      const suggestions: string[] = [];

      // Check title tag
      const title = document.querySelector('title');
      if (!title || !title.textContent) {
        issues.push('Missing page title');
      } else if (title.textContent.length > 60) {
        suggestions.push('Title is too long (>60 characters)');
      } else if (title.textContent.length < 30) {
        suggestions.push('Title might be too short (<30 characters)');
      }

      // Check meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription || !metaDescription.getAttribute('content')) {
        issues.push('Missing meta description');
      } else {
        const description = metaDescription.getAttribute('content') || '';
        if (description.length > 160) {
          suggestions.push('Meta description is too long (>160 characters)');
        } else if (description.length < 120) {
          suggestions.push('Meta description might be too short (<120 characters)');
        }
      }

      // Calculate score
      const totalChecks = 2;
      const score = Math.max(0, (totalChecks - issues.length) / totalChecks * 100);

      return { score, issues, suggestions };
    };

    const checkPageSpeed = (): Promise<{
      score: number;
      metrics: Record<string, number>;
      suggestions: string[];
    }> => {
      return new Promise((resolve) => {
        if (typeof window === 'undefined') {
          resolve({ score: 0, metrics: {}, suggestions: [] });
          return;
        }

        window.addEventListener('load', () => {
          setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            const paint = performance.getEntriesByType('paint');
            
            const metrics = {
              'First Contentful Paint': paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
              'Load Complete': navigation.loadEventEnd - navigation.loadEventStart,
            };

            const suggestions: string[] = [];
            
            if (metrics['First Contentful Paint'] > 2500) {
              suggestions.push('First Contentful Paint is slow (>2.5s)');
            }

            // Simple scoring based on FCP
            const score = Math.max(0, 100 - (metrics['First Contentful Paint'] / 25));

            resolve({ score, metrics, suggestions });
          }, 100);
        });
      });
    };
    
    const seoHealth = checkSEOHealth();
    const pageSpeed = await checkPageSpeed();
    
    const overallScore = (seoHealth.score + pageSpeed.score) / 2;

    return {
      seoHealth,
      pageSpeed,
      overallScore,
    };
  },
};

/**
 * URL and sitemap utilities
 */
export const URLUtils = {
  /**
   * Generate canonical URL
   */
  generateCanonicalURL: (path: string, baseURL: string = 'https://neruandai-wedding.vercel.app'): string => {
    return `${baseURL}${path.startsWith('/') ? path : `/${path}`}`;
  },

  /**
   * Generate sitemap entries
   */
  generateSitemapEntries: (pages: Array<{
    url: string;
    lastModified?: Date;
    priority?: number;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }>) => {
    return pages.map(page => ({
      url: page.url,
      lastModified: page.lastModified || new Date(),
      priority: page.priority || 0.5,
      changeFrequency: page.changeFrequency || 'monthly',
    }));
  },

  /**
   * Validate URL structure
   */
  validateURL: (url: string): { isValid: boolean; issues: string[] } => {
    const issues: string[] = [];
    
    try {
      const urlObj = new URL(url);
      
      if (url.length > 2048) {
        issues.push('URL is too long (>2048 characters)');
      }
      
      if (urlObj.pathname.includes('_')) {
        issues.push('URL contains underscores (use hyphens instead)');
      }
      
      if (urlObj.pathname !== urlObj.pathname.toLowerCase()) {
        issues.push('URL contains uppercase characters');
      }
      
      return { isValid: issues.length === 0, issues };
    } catch {
      issues.push('Invalid URL format');
      return { isValid: false, issues };
    }
  },
};
