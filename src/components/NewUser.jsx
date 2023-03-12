import React from "react";
import { useState } from "react";
import {yankiEvents} from '../events';

export const NewUser = React.memo(() => {

    const [newUserInfo, setNewUserInfo] = useState({
        userEmail: "",
        userPassword: ""
    })

    const userInfoHandle = (eo) => {
        setNewUserInfo({...newUserInfo, [eo.target.name]: eo.target.value});
    }

    const setNewUser = () => {
        yankiEvents.emit("createNewUser", newUserInfo);
    }

    return (
        <div className="NewUser">
            <input type="text" placeholder="Email" onChange={userInfoHandle} name="userEmail"/>
            <input type="text" placeholder="Password" onChange={userInfoHandle} name="userPassword"/>
            <button onClick={setNewUser}>create New User</button>
        </div>
    )
})