import React from "react";
import { useTranslation } from "react-i18next";

export const Home = React.memo(() => {

    const {t} = useTranslation();

    return (
        <div className="Home">
            {t("status")}
        </div>
    )
})