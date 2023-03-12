import React from "react";
import {auth} from '../firebase-config';
import { NewUser } from "./NewUser";
import { Login } from "./Login";
import { SignOut } from "./SignOut";
import { yankiEvents } from "../events";
import { useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';

export const Authentication = () => {

    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        yankiEvents.addListener("createNewUser", createNewUser);
        yankiEvents.addListener("loginUser", loginOldUser);
        yankiEvents.addListener("logoutUser", logout);
        return () => {
            yankiEvents.addListener("createNewUser", createNewUser);
            yankiEvents.removeListener("loginUser", loginOldUser);
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
            const user = await createUserWithEmailAndPassword(auth, data.userName, data.userPassword);
            console.log(user)
        }
        catch(error) {
            console.log(error)
        }
    }

    const loginOldUser = async(data) => {
        try {
            const user = await signInWithEmailAndPassword(auth, data.userName, data.userPassword);
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
            <NewUser/>
            <br/>
            <br/>
            <br/>
            <Login/>
            <br/>
            <h2>{userEmail}</h2>
            <SignOut/>
        </div>
    )
}