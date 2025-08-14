'use client';

import { useState, useEffect } from 'react';
import { StorageUtils } from '@/utils/storage.utils';
import { LanguageUtils } from '@/utils/language.utils';

export type Language = 'en' | 'id' | 'ja' | 'ko' | 'zh' | 'es' | 'fr' | 'ar';

interface Translation {
  [key: string]: string | Translation;
}

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translation>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        // Try to get saved language first, then auto-detect
        let savedLanguage = StorageUtils.getItem<Language | null>('language', null);
        
        if (!savedLanguage) {
          savedLanguage = LanguageUtils.detectUserLanguage();
          StorageUtils.setItem('language', savedLanguage);
        }
        
        setCurrentLanguage(savedLanguage);
        
        // Set document attributes for language
        document.documentElement.setAttribute('lang', savedLanguage);
        document.documentElement.setAttribute('dir', LanguageUtils.getTextDirection(savedLanguage));
        
        await loadTranslations(savedLanguage);
      } catch (err) {
        console.error('Error initializing language:', err);
        setError('Failed to initialize language');
        // Fallback to English
        await loadTranslations('en');
      }
    };
    
    initLanguage();
  }, []);

  const loadTranslations = async (language: Language) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const translationModule = await import(`@/data/translations/${language}.json`);
      setTranslations(translationModule.default);
    } catch (error) {
      console.error(`Error loading translations for ${language}:`, error);
      setError(`Failed to load ${language} translations`);
      
      // Fallback to English if not already trying English
      if (language !== 'en') {
        try {
          const fallbackModule = await import('@/data/translations/en.json');
          setTranslations(fallbackModule.default);
        } catch (fallbackError) {
          console.error('Error loading fallback translations:', fallbackError);
          setError('Failed to load translations');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (language: Language) => {
    if (language === currentLanguage) return;
    
    setCurrentLanguage(language);
    StorageUtils.setItem('language', language);
    
    // Update document attributes
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', LanguageUtils.getTextDirection(language));
    
    // Update font family for special languages
    if (LanguageUtils.requiresSpecialTypography(language)) {
      document.documentElement.style.fontFamily = LanguageUtils.getLanguageFont(language);
    } else {
      document.documentElement.style.fontFamily = '';
    }
    
    await loadTranslations(language);
  };

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let result: string | Translation = translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Return fallback, key, or formatted key if translation not found
        return fallback || key.split('.').pop() || key;
      }
    }

    return typeof result === 'string' ? result : (fallback || key);
  };

  // Format date according to current language
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return LanguageUtils.formatDate(date, currentLanguage, options);
  };

  // Format number according to current language
  const formatNumber = (number: number, options?: Intl.NumberFormatOptions): string => {
    return LanguageUtils.formatNumber(number, currentLanguage, options);
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    formatDate,
    formatNumber,
    isLoading,
    error,
    direction: LanguageUtils.getTextDirection(currentLanguage),
    displayName: LanguageUtils.getLanguageDisplayName(currentLanguage)
  };
}
