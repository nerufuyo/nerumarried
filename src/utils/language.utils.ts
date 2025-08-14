import { Language } from '@/hooks/useTranslation';

interface LanguageDetectionOptions {
  fallback?: Language;
  supportedLanguages?: Language[];
}

export class LanguageUtils {
  private static readonly defaultSupportedLanguages: Language[] = [
    'en', 'id', 'ja', 'ko', 'zh', 'es', 'fr', 'ar'
  ];

  /**
   * Detects the user's preferred language based on browser settings
   */
  static detectUserLanguage(options: LanguageDetectionOptions = {}): Language {
    const { 
      fallback = 'en', 
      supportedLanguages = this.defaultSupportedLanguages 
    } = options;

    try {
      // Get browser languages in order of preference
      const browserLanguages = navigator.languages || [navigator.language];
      
      for (const browserLang of browserLanguages) {
        // Extract the primary language code (e.g., 'en' from 'en-US')
        const primaryLang = browserLang.split('-')[0].toLowerCase() as Language;
        
        if (supportedLanguages.includes(primaryLang)) {
          return primaryLang;
        }
      }
      
      return fallback;
    } catch (error) {
      console.warn('Error detecting user language:', error);
      return fallback;
    }
  }

  /**
   * Gets the display name for a language in its native script
   */
  static getLanguageDisplayName(language: Language): string {
    const displayNames = {
      'en': 'English',
      'id': 'Bahasa Indonesia',
      'ja': '日本語',
      'ko': '한국어',
      'zh': '中文',
      'es': 'Español',
      'fr': 'Français',
      'ar': 'العربية'
    };

    return displayNames[language] || language;
  }

  /**
   * Gets the text direction for a language
   */
  static getTextDirection(language: Language): 'ltr' | 'rtl' {
    const rtlLanguages: Language[] = ['ar'];
    return rtlLanguages.includes(language) ? 'rtl' : 'ltr';
  }

  /**
   * Gets the flag emoji for a language
   */
  static getLanguageFlag(language: Language): string {
    const flags = {
      'en': '🇺🇸',
      'id': '🇮🇩',
      'ja': '🇯🇵',
      'ko': '🇰🇷',
      'zh': '🇨🇳',
      'es': '🇪🇸',
      'fr': '🇫🇷',
      'ar': '🇸🇦'
    };

    return flags[language] || '🌐';
  }

  /**
   * Formats a date according to the language's locale
   */
  static formatDate(date: Date, language: Language, options?: Intl.DateTimeFormatOptions): string {
    const locales = {
      'en': 'en-US',
      'id': 'id-ID',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'zh': 'zh-CN',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'ar': 'ar-SA'
    };

    const locale = locales[language] || 'en-US';
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
  }

  /**
   * Formats a number according to the language's locale
   */
  static formatNumber(number: number, language: Language, options?: Intl.NumberFormatOptions): string {
    const locales = {
      'en': 'en-US',
      'id': 'id-ID',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'zh': 'zh-CN',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'ar': 'ar-SA'
    };

    const locale = locales[language] || 'en-US';
    
    return new Intl.NumberFormat(locale, options).format(number);
  }

  /**
   * Gets appropriate font family for a language
   */
  static getLanguageFont(language: Language): string {
    const fonts = {
      'en': '"Inter", system-ui, sans-serif',
      'id': '"Inter", system-ui, sans-serif',
      'ja': '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif',
      'ko': '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
      'zh': '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      'es': '"Inter", system-ui, sans-serif',
      'fr': '"Inter", system-ui, sans-serif',
      'ar': '"Noto Sans Arabic", "Tahoma", sans-serif'
    };

    return fonts[language] || fonts['en'];
  }

  /**
   * Checks if a language requires special typography considerations
   */
  static requiresSpecialTypography(language: Language): boolean {
    return ['ja', 'ko', 'zh', 'ar'].includes(language);
  }

  /**
   * Gets the appropriate line height for a language
   */
  static getLanguageLineHeight(language: Language): number {
    const lineHeights = {
      'en': 1.6,
      'id': 1.6,
      'ja': 1.8,
      'ko': 1.7,
      'zh': 1.8,
      'es': 1.6,
      'fr': 1.6,
      'ar': 1.8
    };

    return lineHeights[language] || 1.6;
  }
}
