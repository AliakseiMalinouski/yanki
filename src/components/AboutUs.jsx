import React, { useMemo } from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { aboutUsThunk } from "../Redux/About us/aboutUsThunk";
import { useTranslation } from "react-i18next";
import { Contact } from "./Contact";
import { HintCurrentPage } from "./HintCurrentPage";
import { scrollToElement } from "../helpers/scroll";

export const AboutUs = React.memo(() => {

    let dispatch = useDispatch();

    let parent = useRef();

    let {t} = useTranslation();

    const aboutUsInformation = useSelector(state => state.about.info);

    useEffect(() => {
        dispatch(aboutUsThunk);
    }, [dispatch]);

    useEffect(() => {
        scrollToElement(parent.current);
    }, []);

    let contactsMemoizeed = useMemo(() => aboutUsInformation.contacts && aboutUsInformation.contacts.map(({id, title, contact, type}) => <Contact setLanguage={t} key={id} title={title} contact={contact} type={type}/>), [aboutUsInformation, t])

    return (
        <div className="AboutUs" ref={parent}>
            <HintCurrentPage mainPage={"main-page"} t={t} currentPage={"about-us-title"}/>
            <p className="DescritionOfYanki">{t(`${aboutUsInformation.description}`)}</p>
            <div className="Contacts">
                {contactsMemoizeed}
            </div>
        </div>
    )
})