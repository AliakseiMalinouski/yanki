import React from "react";
import { useTranslation } from 'react-i18next';
import { NavLink } from "react-router-dom";
import {motion} from 'framer-motion';

export const NewCollection = ({currentPage}) => {

    const {t} = useTranslation();

    if(currentPage === '/catalog') {
        return (
            <motion.div className="NewCollection"
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 0.8
            }}
            viewport={{once: true}}
            >
                <h3>{t("active-new-collection")}</h3>
            </motion.div>
        )
    }
    else {
        return (
            <motion.div className="NewCollection"
            initial={{
                x: -1000,
                opacity: 0
            }}
            animate={{
                x: 0,
                opacity: 1
            }}
            transition={{
                duration: 0.8
            }}
            viewport={{once: true}}
            >
                <h3>{t("new-collection")}</h3>
                <div className="NewCollectionLine"></div>
                <NavLink className="GoToNewColletion" to='/catalog'>{t("look-at-new-collection")} <img src="https://i.ibb.co/rs4w257/Frame-1.png" alt="Arrow"/></NavLink>
            </motion.div>
        )
    }
}