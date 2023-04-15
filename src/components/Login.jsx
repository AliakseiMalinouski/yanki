import React from "react";
import { useState } from "react";
import { auth } from "../firebase-config";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const Login = React.memo(() => {

    let navigate = useNavigate();

    const [oldUserInfo, setOldUserInfo] = useState({
        userEmail: "",
        userPassword: ""
    });

    const userInfoHandle = (eo) => {
        setOldUserInfo({...oldUserInfo, [eo.target.name]: eo.target.value});
    }

    const loginOldUser = async(data) => {
        try {
            await signInWithEmailAndPassword(auth, oldUserInfo.userEmail, oldUserInfo.userPassword);
            navigate("/authentication");
        }
        catch(error) {
            
        }
    }

    return (
        <div className="Login">
            <input type="text" placeholder="Email" onChange={userInfoHandle} name="userEmail"/>
            <input type="text" placeholder="Password" onChange={userInfoHandle} name="userPassword"/>
            <button onClick={loginOldUser}>Login</button>
        </div>
    )
})