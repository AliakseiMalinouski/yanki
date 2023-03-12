import React from "react";
import {auth} from '../firebase-config';
import { NewUser } from "./NewUser";
import { SignOut } from "./SignOut";
import { yankiEvents } from "../events";
import { useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from 'firebase/auth';
import { LoggedUser } from "./LoggedUser";
import { NavLink } from "react-router-dom";

export const Authentication = () => {

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
            setPhoto(current?.photoURL)
        }); 
    }, []);

    const createNewUser = async(data) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, data.userEmail, data.userPassword)
            await updateProfile(auth.currentUser, {displayName: data.userName, photoURL: "https://webmg.ru/wp-content/uploads/2022/11/i-26-51.jpeg"});
            console.log(user)
        }
        catch(error) {
            console.log(error)
        }
    }

    const logout = (value) => {
        if(value === true) signOut(auth);
    }

    return (
        <div className="Auth">
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