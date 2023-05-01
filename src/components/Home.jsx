import React, { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesThunk } from "../Redux/Home/categoriesThunk";
import { Category } from "./Category";
import { yankiEvents } from "../events";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { News } from "./News";
import { configLetterThunk } from "../Redux/Subscribe/configLetterThunk";
import { send } from "emailjs-com";
import { updateRequestBody } from "../Redux/SuccessRequest/requestSlice";
import { updateLoadState } from "../Redux/SuccessRequest/requestSlice";
import { SendedInfo } from "./SendedInfo";
import {motion} from 'framer-motion';

export const Home = React.memo(() => {
    
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const {t} = useTranslation();

    const categories = useSelector(state => state.categories.categories);
    const configLetter = useSelector(state => state.letterConfig.config);
    const request = useSelector(state => state.request.userMessage);

    const [isView, setIsView] = useState(false);

    useEffect(() => {
        dispatch(configLetterThunk);
    }, [dispatch]);

    useEffect(() => {
        const data = localStorage.getItem("request-info") ? JSON.parse(localStorage.getItem("request-info")) : {};
        if(localStorage.getItem("request-info")) {
            setIsView(true);
            dispatch(updateRequestBody(data));
            dispatch(updateLoadState(2));
        }
        else {
            setIsView(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if(!categories.length) dispatch(categoriesThunk)
    }, [dispatch, categories]);

    const goToDetailsCategory = useCallback((key) => {
        const uri = "/categoriesdetails/" + key;
        navigate(uri);
    }, [navigate]);

    const sendInfoToServer = useCallback((requestBody) => {
        dispatch(updateLoadState(1));
        send(configLetter.serviceId, configLetter.templateId, requestBody, configLetter.publicKey)
        .then(res => {
            dispatch(updateLoadState(2));
            localStorage.setItem("request-info", JSON.stringify(requestBody));
            dispatch(updateRequestBody(requestBody));
        })
        .catch(error => {
            alert(`Oops...Error with sending message. Type error ${error}. Please, try again`);
        })
        navigate("/successrequestmessage");
    }, [configLetter, dispatch, navigate]);

    useEffect(() => {
        yankiEvents.addListener("goToDetailsCategory", goToDetailsCategory);
        yankiEvents.addListener("startPostRequestWithEmail", sendInfoToServer);
        return () => {
            yankiEvents.removeListener("goToDetailsCategory", goToDetailsCategory);
            yankiEvents.removeListener("startPostRequestWithEmail", sendInfoToServer);
        }
    }, [goToDetailsCategory, sendInfoToServer]);

    let categoriesMemoizeed = useMemo(() => categories === undefined || categories === null || categories === []
    ?
    null
    :
    categories.map((e, i) => <Category key={e.id} index={i} title={e.title} translateKey={e.key} link={e.link} image={e.image}/>), [categories]
    )

    return (
        <div className="Home">
            <h2 className="CategoryTitle">{t("category-title")}</h2>
            <div className="Categories"
            >
                {categoriesMemoizeed}
            </div>
            {isView ? <div className="SuccessRequest"><SendedInfo name={request.from_name} question={request.question} email={request.from_email}/></div> : <News/>}
        </div>
    )
})