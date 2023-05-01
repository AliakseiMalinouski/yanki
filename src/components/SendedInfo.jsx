import React from "react";
import { useTranslation } from "react-i18next";
import {motion} from 'framer-motion';

const newsAnimation = {
    hidden: {
        opacity: 0,
        x: -500
    },
    visible: {
        opacity: 1,
        x: 0
    }
}

export const SendedInfo = ({question, name, email}) => {

    const {t} = useTranslation();

    return (
        <>
            <motion.ul className="SendedInfo"
            variants={newsAnimation}
            initial={'hidden'}
            whileInView={'visible'}
            viewport={{once: true, amount: 0.9}}
            >
                <li><h3>{t("title-after-request")}</h3></li>
                <li>{t("from_name")} <span>{name}</span></li>
                <li>{t("from_email")} <span>{email}</span></li>
                <li>{t("question")} <span>{question}</span></li>
            </motion.ul>
        </>
    )
}