import React from "react";
import { useTranslation } from 'react-i18next';

export const TranslateSelect = () => {
    const { t, i18n } = useTranslation();

  const setLanguage = (currentLanguage) => {
    i18n.changeLanguage(currentLanguage);

    return (
    <div>
        <span>{t('status')}</span>
        <button onClick={() => setLanguage('ru')}>RU</button>
    </div>
    )
  }
}