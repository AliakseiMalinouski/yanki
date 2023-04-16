import React from "react";
import { useState, useRef, useEffect } from "react";
import { auth } from "../firebase-config";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { validationForm } from "../helpers/validationForm";
import { useDispatch, useSelector } from "react-redux";
import { updateErrorState } from "../Redux/Auth/errorStateSlice";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "../helpers/scroll";
import { onAuthStateChanged } from "firebase/auth";
import { updateUser } from "../Redux/Auth/currentUserSlice";

export const Login = React.memo(() => {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {t} = useTranslation();
    let parent = useRef();

    useEffect(() => {
        scrollToElement(parent.current);
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, current => {
            dispatch(updateUser({
                email: current?.email, displayName: current?.displayName, photoURL: current?.photoURL, creationTime: current?.metadata.creationTime, lastSignInTime: current?.metadata.lastSignInTime
            }))
        })
    }, [dispatch]);

    const errorState = useSelector(state => state.errorState.errorState);
    const currentUserState = useSelector(state => state.currentUser);

    const [oldUserInfo, setOldUserInfo] = useState({
        userEmail: "",
        userPassword: ""
    });

    const userInfoHandle = (eo) => {
        setOldUserInfo({...oldUserInfo, [eo.target.name]: eo.target.value});
    }

    const loginOldUser = async() => {
        let resultOfValidation = validationForm(oldUserInfo);
        if(resultOfValidation.status === 1) {
            try {
                await signInWithEmailAndPassword(auth, oldUserInfo.userEmail, oldUserInfo.userPassword);
                navigate("/authentication");
            }
            catch(error) {
                
            }
        }
        else {
            dispatch(updateErrorState(resultOfValidation));
        }
    }
    

    if(currentUserState.email) {
        return (
            <div className="LoggedUserHint" ref={parent}>
                <p>{
                    `${t('user-logged-in')} ${currentUserState.email}`
                }</p>
                <span onClick={() => {navigate('/authentication')}}>{t("go-to-account")}</span>
            </div>
        )
    }
    else {
        return (
            <div className="Login" ref={parent}>
                <h3>{t('login-title')}</h3>
                <input type="text" placeholder={t('placeholder-email')} onChange={userInfoHandle} name="userEmail"/>
                <div>
                    {
                        errorState.status === 0
                        ?
                        `${t(errorState.text)}`
                        :
                        null
                    }
                </div>
                <input type="text" placeholder={t('placeholder-password')} onChange={userInfoHandle} name="userPassword"/>
                <span onClick={() => {navigate("/authentication")}}>{t('not-be-account')}</span>
                <button onClick={loginOldUser}>{t('login-title')}</button>
            </div>
        )
    }
})