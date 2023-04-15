import React, { useCallback, useMemo } from "react";
import {auth} from '../firebase-config';
import { NewUser } from "./NewUser";
import { SignOut } from "./SignOut";
import { yankiEvents } from "../events";
import { useEffect, useRef } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from 'firebase/auth';
import { LoggedUser } from "./LoggedUser";
import { NavLink } from "react-router-dom";
import {scrollToElement} from '../helpers/scroll';
import { useTranslation } from "react-i18next";
import { HintCurrentPage } from "./HintCurrentPage";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../Redux/Auth/currentUserSlice";

export const Authentication = () => {

    let parent = useRef();

    let {t} = useTranslation();
    let dispatch = useDispatch();

    const currentUserState = useSelector(state => state.currentUser);

    const setNewPhoto = useCallback( async(newPhoto) => {
        try {
            await updateProfile(auth.currentUser, {photoURL: newPhoto});
            window.location.reload();
        }
        catch(error) {
            console.log(error)
        }
    }, []);


    const createNewUser = useCallback(async(data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.userEmail, data.userPassword)
            await updateProfile(auth.currentUser, {displayName: data.userName, photoURL: data.userPhoto});
            dispatch(updateUser({email: data.userEmail, displayName: data.userName, photoURL: data.photoURL, creationTime: auth.currentUser.metadata?.creationTime, lastSignInTime: auth.currentUser.metadata?.lastSignInTime}));
            window.location.reload();
        }
        catch(error) {
            
        }
    }, [dispatch]);

    useEffect(() => {
        yankiEvents.addListener("createNewUser", createNewUser);
        yankiEvents.addListener("logoutUser", logout);
        yankiEvents.addListener("setNewPhotoProfile", setNewPhoto);
        return () => {
            yankiEvents.removeListener("createNewUser", createNewUser);
            yankiEvents.removeListener("logoutUser", logout);
            yankiEvents.removeListener("setNewPhotoProfile", setNewPhoto);
        }
    }, [setNewPhoto, createNewUser]); 



    useEffect(() => {
        onAuthStateChanged(auth, current => {
            dispatch(updateUser({email: current?.email, displayName: current?.displayName, photoURL: current?.photoURL, creationTime: current?.metadata.creationTime, lastSignInTime: current?.metadata.lastSignInTime}));
        });
    }, [dispatch]);

    useEffect(() => {
        scrollToElement(parent.current);
    }, []);


    const logout = (value) => {
        if(value === true) signOut(auth);
    }

    let userMemoizeed = useMemo(() => <LoggedUser 
    userEmail={currentUserState.email} 
    setLng={t} userName={currentUserState.displayName} 
    historyUrl="/history" 
    userPhoto={currentUserState.photoURL}
    metadataInfo={[currentUserState.creationTime, currentUserState.lastSignInTime]}
    />, 
    [currentUserState, t])

    return (
        <div className="Auth" ref={parent}>
            <HintCurrentPage mainPage="main-page" currentPage='Auth' t={t}/>
            {
                currentUserState.email
                ?
                <>
                    {userMemoizeed}
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