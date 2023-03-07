import React from "react";
import { useTranslation } from "react-i18next";

export const SendedInfo = ({question, name, email}) => {

    const {t} = useTranslation();

    return (
        <>
            <ul className="SendedInfo">
                <li><h3>{t("title-after-request")}</h3></li>
                <li>{t("from_name")} <span>{name}</span></li>
                <li>{t("from_email")} <span>{email}</span></li>
                <li>{t("question")} <span>{question}</span></li>
            </ul>
        </>
    )
}