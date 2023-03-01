import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {send} from 'emailjs-com';
import { useSelector } from "react-redux";

export const News = React.memo(() => {

    const configLetter = useSelector(state => state.letterConfig.config);

    const [emailInfo, setEmailInfo] = useState({
        from_name: '',
        question: '',
        from_email: ''
    })

    const {t} = useTranslation();

    const formHandle = (eo) => {
        setEmailInfo({...emailInfo, [eo.target.name]: eo.target.value})
    }

    //  serviceId = "service_5l5h7c1";
    //  publicKey = "TEEd-8_0HXteJTfo6";
    //  templateId = "template_ciamkc5";

    console.log(configLetter)

    const sendInfoToServer = (eo) => {
        eo.preventDefault();
        send(configLetter.serviceId, configLetter.templateId, emailInfo, configLetter.publicKey)
        .then(res => console.log(res.text));
    }

    return (
        <div className="News">
            <h2>{t("about-new")}</h2>
            <form>
                <input type="text" name="from_name" onChange={formHandle}/>
                <input type="text" name="question" onChange={formHandle}/>
                <input type="text" name="from_email" onChange={formHandle}/>
                <button onClick={sendInfoToServer} type="button">Send</button>
            </form>
        </div>
    )
})