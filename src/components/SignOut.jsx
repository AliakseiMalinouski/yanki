import React from "react";
import { yankiEvents } from "../events";

export const SignOut = React.memo(({setLng}) => {

    const logout = () => {
        yankiEvents.emit("logoutUser", true);
    }

    return (
        <div className="SignOut">
            <button onClick={logout}>{
                setLng("sign-out")
            }</button>
        </div>
    )
})