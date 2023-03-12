import React from "react";
import { useState } from "react";
import { yankiEvents } from "../events";
import { auth } from "../firebase-config";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const Login = React.memo(() => {

    let navigate = useNavigate();

    const [oldUserInfo, setOldUserInfo] = useState({
        userName: "",
        userPassword: ""
    });

    const userInfoHandle = (eo) => {
        setOldUserInfo({...oldUserInfo, [eo.target.name]: eo.target.value});
    }

    const loginOldUser = async(data) => {
        try {
            const user = await signInWithEmailAndPassword(auth, oldUserInfo.userName, oldUserInfo.userPassword);
            navigate("/authentication");
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div className="Login">
            <input type="text" placeholder="Email" onChange={userInfoHandle} name="userName"/>
            <input type="text" placeholder="Password" onChange={userInfoHandle} name="userPassword"/>
            <button onClick={loginOldUser}>Login</button>
        </div>
    )
})