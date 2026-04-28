import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import en from '../i18n/en.json';
import hi from '../i18n/hi.json';
import kn from '../i18n/kn.json';

type Language = 'en' | 'hi' | 'kn';

interface Translations {
  [key: string]: any;
}

const translations: Record<Language, Translations> = {
  en,
  hi,
  kn
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('app_language') as Language;
    if (savedLang && ['en', 'hi', 'kn'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    
    // Fallback to English if translation is missing
    if (value === undefined) {
      let fallbackValue = translations['en'];
      for (const k of keys) {
        if (fallbackValue === undefined) break;
        fallbackValue = fallbackValue[k];
      }
      value = fallbackValue;
    }
    
    if (typeof value !== 'string') return keys[keys.length - 1];

    // Replace parameters if provided
    if (params) {
      let result: string = value;
      for (const [paramKey, paramValue] of Object.entries(params)) {
        result = result.replace(new RegExp(`{${paramKey}}`, 'g'), paramValue);
      }
      return result;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
