import React, { useCallback } from "react";
import {auth} from '../firebase-config';
import { NewUser } from "./NewUser";
import { SignOut } from "./SignOut";
import { yankiEvents } from "../events";
import { useEffect, useState, useRef } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from 'firebase/auth';
import { LoggedUser } from "./LoggedUser";
import { NavLink } from "react-router-dom";
import {scrollToElement} from '../helpers/scroll';
import { useTranslation } from "react-i18next";
import { HintCurrentPage } from "./HintCurrentPage";

export const Authentication = () => {

    let parent = useRef();

    let {t} = useTranslation();

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [photo, setPhoto] = useState("");

    const setNewPhoto = useCallback( async(newPhoto) => {
        try {
            await updateProfile(auth.currentUser, {photoURL: newPhoto});
            window.location.reload();
        }
        catch(error) {
            console.log(error)
        }
    }, []);

    useEffect(() => {
        yankiEvents.addListener("createNewUser", createNewUser);
        yankiEvents.addListener("logoutUser", logout);
        yankiEvents.addListener("setNewPhotoProfile", setNewPhoto);
        return () => {
            yankiEvents.removeListener("createNewUser", createNewUser);
            yankiEvents.removeListener("logoutUser", logout);
            yankiEvents.removeListener("setNewPhotoProfile", setNewPhoto);
        }
    }, [setNewPhoto]); 



    useEffect(() => {
        onAuthStateChanged(auth, current => {
            setUserEmail(current?.email);
            setUserName(current?.displayName);
            setPhoto(current?.photoURL);
        });
    }, []);

    useEffect(() => {
        scrollToElement(parent.current);
    }, []);

    useEffect(() => {
        if(userName !== "" && userEmail !== "" && photo === "") {
            window.location.reload();
            console.log('eee')
        }
    }, [userEmail, userName, photo]);


    const createNewUser = async(data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.userEmail, data.userPassword)
            await updateProfile(auth.currentUser, {displayName: data.userName, photoURL: data.userPhoto});
            setPhoto(data.userPhoto);
        }
        catch(error) {
            
        }
    }

    const logout = (value) => {
        if(value === true) signOut(auth);
    }

    return (
        <div className="Auth" ref={parent}>
            <HintCurrentPage mainPage="main-page" currentPage='Auth' t={t}/>
            {
                userEmail
                ?
                <>
                    <LoggedUser userEmail={userEmail} setLng={t} userName={userName} historyUrl="/history" userPhoto={photo}/>
                    <br/>
                    <SignOut/>
                </>
                :
                <>
                    <NewUser/>
                    <NavLink to='/login'>Do you have an account?</NavLink>
                </>
            }
        </div>
    )
}