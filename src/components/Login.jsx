import React from "react";
import { useState } from "react";
import { yankiEvents } from "../events";

export const Login = React.memo(() => {

    const [oldUserInfo, setOldUserInfo] = useState({
        userName: "",
        userPassword: ""
    });

    const userInfoHandle = (eo) => {
        setOldUserInfo({...oldUserInfo, [eo.target.name]: eo.target.value});
    }

    const loginUser = () => {
        yankiEvents.emit("loginUser", oldUserInfo);
    }

    return (
        <div className="Login">
            <input type="text" placeholder="Email" onChange={userInfoHandle} name="userName"/>
            <input type="text" placeholder="Password" onChange={userInfoHandle} name="userPassword"/>
            <button onClick={loginUser}>Login</button>
        </div>
    )
})