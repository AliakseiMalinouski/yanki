import React from "react";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

export const TranslateSelect = React.memo(() => {

  const [selectionState, setSelectionState] = useState(false);

  const { t, i18n } = useTranslation();

  const setLanguage = (currentLanguage) => {
    i18n.changeLanguage(currentLanguage);
  }
    return (
      <div className="LanguageTools">
        <div className="StaticLang" onClick={() => setSelectionState(prev => !prev)}>
          <span>lang</span>
          <img className="ArrowSelect" src="https://i.ibb.co/rs4w257/Frame-1.png" alt="Arrow"/>
        </div>
        {
          !selectionState
          ?
          null
          :
          <ul className="ActiveSelect">
            <li>EN</li>
            <li>RU</li>
            <li>UA</li>
        </ul>
        }
      </div>
    )
})