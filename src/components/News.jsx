import React from "react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { yankiEvents } from "../events";

export const News = React.memo(() => {

    const [emailInfo, setEmailInfo] = useState({
        from_name: '',
        question: '',
        from_email: ''
    });

    const textarea = useRef(); 

    const [currentLengthTextArea, setCurrentLengthTextArea] = useState(70);

    const {t} = useTranslation();

    const formHandle = (eo) => {
        setEmailInfo({...emailInfo, [eo.target.name]: eo.target.value});
        if(eo.target.name === 'question') setCurrentLengthTextArea(prev => prev - 1);
    }

    const sendInfoToServer = (eo) => {
        eo.preventDefault();
        yankiEvents.emit("startPostRequestWithEmail", emailInfo);
        setEmailInfo({
            from_name: '',
            question: '',
            from_email: ''
        });
    }

    return (
        <div className="News">
            <h2>{t("about-new")}</h2>
            <form className="SubscribeForm">
                <input type="text" name="from_name" value={emailInfo.from_name} onChange={formHandle} placeholder={t("name-author-email")}/>
                <textarea ref={textarea} maxLength={70} type="text" name="question" value={emailInfo.question} onChange={formHandle} placeholder={t("author-body-email")}></textarea>
                <span>{currentLengthTextArea}</span>
                <input type="text" name="from_email" value={emailInfo.from_email} onChange={formHandle} placeholder={t("author-email")}/>
                <button onClick={sendInfoToServer} type="button">{t("subscribe-button-text")}</button>
            </form>
        </div>
    )
})