import React from "react";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SendedInfo } from "./SendedInfo";
import { updateRequestBody } from "../Redux/SuccessRequest/requestSlice";
import { useTranslation } from "react-i18next";
import {scrollToElement} from '../helpers/scroll';

export const SuccessRequest = () => {

    let dispatch = useDispatch();

    const {t} = useTranslation();

    let parent = useRef();

    const request = useSelector(state => state.request.userMessage);
    const statusRequest = useSelector(state => state.request.loadState);

    useEffect(() => {
        const data = localStorage.getItem("request-info") ? JSON.parse(localStorage.getItem("request-info")) : {};
        dispatch(updateRequestBody(data));
    }, [dispatch]);

    useEffect(() => {
        scrollToElement(parent.current);
    }, []);

    return (
        <div className="SuccessRequest" ref={parent}>
           {(statusRequest === 0 && <div className="HaveNotSent">{t("have-not-send")}</div>)}
           {(statusRequest === 1 && <div className="SendLoading">Loading, wait please...</div>)}
           {(statusRequest === 2 && <SendedInfo name={request.from_name} question={request.question} email={request.from_email}/>)}
            {(statusRequest === 3 && <div className="ErrorWithSend">Error with sending message. Please, try again</div>)}
        </div>
    )
}