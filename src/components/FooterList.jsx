import React from "react";
import { useTranslation } from "react-i18next";

export const FooterList = ({text}) => {

    const {t} = useTranslation();

    return (
        <ul>
            {
                text.map(content => <li key={Date.now() + Math.random()}>{t(`${content}`)}</li>)
            }
        </ul>
    )
}