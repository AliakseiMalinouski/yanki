import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { yankiEvents } from "../events";

export const News = React.memo(() => {

    const [emailInfo, setEmailInfo] = useState({
        from_name: '',
        question: '',
        from_email: ''
    })

    const {t} = useTranslation();

    const formHandle = (eo) => {
        setEmailInfo({...emailInfo, [eo.target.name]: eo.target.value})
    }


    const sendInfoToServer = (eo) => {
        eo.preventDefault();
        yankiEvents.emit("startPostRequestWithEmail", emailInfo);
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