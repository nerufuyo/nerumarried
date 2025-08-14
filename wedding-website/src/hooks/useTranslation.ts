'use client';

import { useState, useEffect } from 'react';
import { StorageUtils } from '@/utils/storage.utils';

export type Language = 'en' | 'id';

interface Translation {
  [key: string]: string | Translation;
}

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translation>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLanguage = StorageUtils.getItem<Language>('language', 'en');
    setCurrentLanguage(savedLanguage);
    loadTranslations(savedLanguage);
  }, []);

  const loadTranslations = async (language: Language) => {
    try {
      setIsLoading(true);
      const translationModule = await import(`@/data/translations/${language}.json`);
      setTranslations(translationModule.default);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to English
      if (language !== 'en') {
        const fallbackModule = await import('@/data/translations/en.json');
        setTranslations(fallbackModule.default);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
    StorageUtils.setItem('language', language);
    loadTranslations(language);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: string | Translation = translations;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    isLoading
  };
}
