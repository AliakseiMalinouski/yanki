import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";

export const NewCollection = () => {

    const {t} = useTranslation();

    return (
        <div className="NewCollection">
            <h3>{t("new-collection")}</h3>
            <div className="NewCollectionLine"></div>
            <NavLink className="GoToNewColletion" to='/catalog'>{t("look-at-new-collection")} <img src="https://i.ibb.co/rs4w257/Frame-1.png" alt="Arrow"/></NavLink>
        </div>
    )
}