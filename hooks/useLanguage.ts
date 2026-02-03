// Language Hook
import { useState, useEffect } from 'react';
import { translations, Language, TranslationKey } from '../i18n/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // 檢查本地儲存
    const saved = localStorage.getItem('language');
    if (saved && (saved === 'zh-TW' || saved === 'en-US')) {
      return saved as Language;
    }
    // 檢查瀏覽器語言
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh')) {
      return 'zh-TW';
    }
    return 'en-US';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return { language, t, switchLanguage };
};
