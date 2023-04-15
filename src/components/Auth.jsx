import React from "react";
import {auth} from '../firebase-config';
import { NewUser } from "./NewUser";
import { SignOut } from "./SignOut";
import { yankiEvents } from "../events";
import { useEffect, useState, useRef } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from 'firebase/auth';
import { LoggedUser } from "./LoggedUser";
import { NavLink } from "react-router-dom";
import {scrollToElement} from '../helpers/scroll';

export const Authentication = () => {

    let parent = useRef();

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        yankiEvents.addListener("createNewUser", createNewUser);
        yankiEvents.addListener("logoutUser", logout);
        return () => {
            yankiEvents.addListener("createNewUser", createNewUser);
            yankiEvents.removeListener("logoutUser", logout);
        }
    }, []); 

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
            {
                userEmail
                ?
                <>
                    <LoggedUser userEmail={userEmail} userName={userName} userPhoto={photo}/>
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