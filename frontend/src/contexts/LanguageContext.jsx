import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }) {
  const { i18n, t } = useTranslation();

  const language = i18n.language;
  const isRTL = language === 'ar' || language === 'tz';

  const setLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute('dir', lang === 'ar' || lang === 'tz' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  };

  const value = {
    language,
    setLanguage,
    isRTL,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
