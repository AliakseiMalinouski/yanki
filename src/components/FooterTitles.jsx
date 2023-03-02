import React from "react";
import { useTranslation } from "react-i18next";

export const FooterTitles = React.memo(({title}) => {

    const {t} = useTranslation();

    return (
        <h4>{t(`${title}`)}</h4>
    )
});