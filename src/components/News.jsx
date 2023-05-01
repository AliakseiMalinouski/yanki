import React from "react";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { yankiEvents } from "../events";
import {motion} from 'framer-motion';

const newsAnimation = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

export const News = React.memo(() => {

    const [emailInfo, setEmailInfo] = useState({
        from_name: '',
        question: '',
        from_email: ''
    });

    const textarea = useRef(); 
    const inputName = useRef();
    const inputEmail = useRef();

    const [isActiveSubscribe, setIsActiveSubscribe] = useState(true);

    const {t} = useTranslation();

    const formHandle = (eo) => {
        setEmailInfo({...emailInfo, [eo.target.name]: eo.target.value});
        if(textarea.current.value.length > 1 && inputName.current.value.length > 3 && inputEmail.current.value.length > 10) setIsActiveSubscribe(false);
        else setIsActiveSubscribe(true);
    }


    const sendInfoToServer = (eo) => {
        eo.preventDefault();
        yankiEvents.emit("startPostRequestWithEmail", emailInfo);
        setEmailInfo({
            from_name: '',
            question: '',
            from_email: ''
        });
        setIsActiveSubscribe(true);
    }

    return (
        <div className="News">
            <h2>{t("about-new")}</h2>
            <motion.form className="SubscribeForm"
            variants={newsAnimation}
            initial={'hidden'}
            whileInView={'visible'}
            >
                <input ref={inputName} type="text" name="from_name" value={emailInfo.from_name} onChange={formHandle} placeholder={t("name-author-email")}/>
                <textarea ref={textarea} maxLength={70} type="text" name="question" value={emailInfo.question} onChange={formHandle} placeholder={t("author-body-email")}></textarea>
                <input ref={inputEmail} type="text" name="from_email" value={emailInfo.from_email} onChange={formHandle} placeholder={t("author-email")}/>
                <button onClick={sendInfoToServer} style={{opacity: isActiveSubscribe ? '0.7' : ""}} disabled={isActiveSubscribe} type="button">{t("subscribe-button-text")}</button>
            </motion.form>
        </div>
    )
})