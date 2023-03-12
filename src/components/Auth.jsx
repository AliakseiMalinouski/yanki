import React from "react";
import {auth} from '../firebase-config';
import { NewUser } from "./NewUser";
import { SignOut } from "./SignOut";
import { yankiEvents } from "../events";
import { useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import { LoggedUser } from "./LoggedUser";
import { NavLink } from "react-router-dom";

export const Authentication = () => {

    const [userEmail, setUserEmail] = useState("");

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
        }); 
    }, []);

    const createNewUser = async(data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.userEmail, data.userPassword);
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
                    <LoggedUser userEmail={userEmail}/>
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