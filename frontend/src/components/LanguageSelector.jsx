import React from 'react';
import { useTranslation } from '../context/I18nContext';
import './LanguageSelector.css';

export default function LanguageSelector() {
  const { locale, changeLocale, availableLocales } = useTranslation();

  const languages = {
    es: { name: 'Español', flag: '🇪🇸' },
    en: { name: 'English', flag: '🇺🇸' }
  };

  return (
    <div className="language-selector">
      <select 
        value={locale} 
        onChange={(e) => changeLocale(e.target.value)}
        className="language-select"
        aria-label="Select language"
      >
        {availableLocales.map(lang => (
          <option key={lang} value={lang}>
            {languages[lang]?.flag} {languages[lang]?.name}
          </option>
        ))}
      </select>
    </div>
  );
}
