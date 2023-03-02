import React from "react";
import { useTranslation } from "react-i18next";
import { FooterIcons } from "./FooterIcons";

export const FooterList = ({text, id}) => {

    const {t} = useTranslation();

    if(id === 4) {
        return (
            <>
                <ul>
                    <li><FooterIcons/></li>
                    {
                        text.map(content => <li key={Date.now() + Math.random()}>{t(`${content}`)}</li>)
                    }
                </ul>
            </>
        )
    }
    else {
        return (
            <ul>
                {
                    text.map(content => <li key={Date.now() + Math.random()}>{t(`${content}`)}</li>)
                }
            </ul>
        )
    }
}