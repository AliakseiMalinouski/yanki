import React from "react";
import { useSelector } from "react-redux";

export const SuccessRequest = () => {

    const request = useSelector(state => state.request.userMessage);
    const statusRequest = useSelector(state => state.request.loadState);

    return (
        <div className="SuccessRequest">
           {(statusRequest === 0 && <div>You did not send message, return to Home Page and do</div>)}
           {(statusRequest === 1 && <div>loading, wait please</div>)}
           {(statusRequest === 2 && <ul>
                <li>{request.from_name}</li>
                <li>{request.question}</li>
                <li>{request.from_email}</li>
            </ul>)}
            {(statusRequest === 3 && <div>Error with sending message. Please, try again</div>)}
        </div>
    )
}