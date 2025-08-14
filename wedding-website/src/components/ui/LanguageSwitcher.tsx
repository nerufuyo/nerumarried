'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation, Language as TranslationLanguage } from '@/hooks/useTranslation';
import { ChevronDown, Check } from 'lucide-react';

interface Language {
  code: TranslationLanguage;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵'
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷'
  },
  {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    flag: '🇨🇳'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    rtl: true
  }
];

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full';
  className?: string;
  showFlags?: boolean;
  showNative?: boolean;
}

export function LanguageSwitcher({
  variant = 'compact',
  className = '',
  showFlags = true,
  showNative = true
}: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-24 h-10 bg-gray-200 rounded-lg animate-pulse ${className}`} />
    );
  }

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (langCode: TranslationLanguage) => {
    changeLanguage(langCode);
    setIsOpen(false);
    
    // Add RTL support
    const selectedLang = languages.find(lang => lang.code === langCode);
    if (selectedLang?.rtl) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', langCode);
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', langCode);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <motion.button
          className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showFlags && (
            <span className="text-lg">{currentLang.flag}</span>
          )}
          <span className="text-sm font-medium text-gray-700">
            {currentLang.code.toUpperCase()}
          </span>
          <ChevronDown 
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dropdown */}
              <motion.div
                className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="py-2">
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => handleLanguageChange(lang.code)}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                    >
                      <div className="flex items-center space-x-3">
                        {showFlags && (
                          <span className="text-lg">{lang.flag}</span>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {lang.name}
                          </span>
                          {showNative && (
                            <span className="text-xs text-gray-500">
                              {lang.nativeName}
                            </span>
                          )}
                        </div>
                      </div>
                      {currentLanguage === lang.code && (
                        <Check className="w-4 h-4 text-yellow-500" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full variant for larger displays
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
            currentLanguage === lang.code
              ? 'bg-yellow-400 border-yellow-500 text-black'
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => handleLanguageChange(lang.code)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showFlags && (
            <span className="text-sm">{lang.flag}</span>
          )}
          <span className="text-sm font-medium">
            {showNative ? lang.nativeName : lang.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// Floating language switcher for better UX
export function FloatingLanguageSwitcher() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-full shadow-lg border border-gray-200 p-2"
            whileHover={{ scale: 1.05 }}
          >
            <LanguageSwitcher variant="compact" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
