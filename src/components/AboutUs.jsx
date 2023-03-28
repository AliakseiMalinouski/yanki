import React, { useMemo } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { aboutUsThunk } from "../Redux/About us/aboutUsThunk";
import { useTranslation } from "react-i18next";
import { Contact } from "./Contact";

export const AboutUs = React.memo(() => {

    let dispatch = useDispatch();

    let {t} = useTranslation();

    const aboutUsInformation = useSelector(state => state.about.info);

    useEffect(() => {
        dispatch(aboutUsThunk);
    }, [dispatch]);

    let contactsMemoizeed = useMemo(() => aboutUsInformation.contacts && aboutUsInformation.contacts.map(({id, title, contact, type}) => <Contact setLanguage={t} key={id} title={title} contact={contact} type={type}/>), [aboutUsInformation, t])

    return (
        <div className="AboutUs">
            {t(`${aboutUsInformation.description}`)}
            {contactsMemoizeed}
        </div>
    )
})