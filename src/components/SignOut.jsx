import React from "react";
import { yankiEvents } from "../events";

export const SignOut = React.memo(() => {

    const logout = () => {
        yankiEvents.emit("logoutUser", true);
    }

    return (
        <div className="SignOut">
            <button onClick={logout}>Sign out</button>
        </div>
    )
})