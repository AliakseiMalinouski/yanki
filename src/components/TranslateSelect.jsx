import React from "react";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import {useDispatch } from "react-redux";
import { updateLanguage } from "../Redux/TranslateState/translateSlice";

export const TranslateSelect = React.memo(() => {

  let dispatch = useDispatch();

  const [selectionState, setSelectionState] = useState(false);

  const { t, i18n } = useTranslation();

  const setLanguage = (currentLanguage) => {
    i18n.changeLanguage(currentLanguage);
    dispatch(updateLanguage(currentLanguage));
    setSelectionState(prev => !prev);
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
            <li onClick={() => setLanguage('en')}>EN</li>
            <li onClick={() => setLanguage('ru')}>RU</li>
            <li onClick={() => setLanguage('ua')}>UA</li>
        </ul>
        }
      </div>
    )
})