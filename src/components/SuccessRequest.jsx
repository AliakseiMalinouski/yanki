import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SendedInfo } from "./SendedInfo";
import { updateLoadState, updateRequestBody } from "../Redux/SuccessRequest/requestSlice";

export const SuccessRequest = () => {

    let dispatch = useDispatch();

    const request = useSelector(state => state.request.userMessage);
    const statusRequest = useSelector(state => state.request.loadState);

    useEffect(() => {
        const data = localStorage.getItem("request-info") ? JSON.parse(localStorage.getItem("request-info")) : {};
        dispatch(updateRequestBody(data));
        dispatch(updateLoadState(2));
    }, [dispatch]);

    return (
        <div className="SuccessRequest">
           {(statusRequest === 0 && <div>You did not send message, return to Home Page and do</div>)}
           {(statusRequest === 1 && <div>loading, wait please</div>)}
           {(statusRequest === 2 && <SendedInfo name={request.from_name} question={request.question} email={request.from_email}/>)}
            {(statusRequest === 3 && <div>Error with sending message. Please, try again</div>)}
        </div>
    )
}