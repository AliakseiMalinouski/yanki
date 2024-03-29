import React from "react";
import { useState } from "react";
import {yankiEvents} from '../events';

export const NewUser = React.memo(({setLng, navigate, resultOfValidation}) => {

    const [newUserInfo, setNewUserInfo] = useState({
        userEmail: "",
        userPassword: "",
        userName: "",
        userPhoto: ""
    })

    const userInfoHandle = (eo) => {
        setNewUserInfo({...newUserInfo, [eo.target.name]: eo.target.value});
    }

    const setNewUser = () => {
        yankiEvents.emit("createNewUser", newUserInfo);
    }

    return (
        <div className="NewUser">
            <h3>{setLng("new-user-title")}</h3>
            <input type="text" placeholder="Name" onChange={userInfoHandle} name="userName"/>
            <input type="text" placeholder="Photo" onChange={userInfoHandle} name="userPhoto"/>
            <input type="text" placeholder="Email" onChange={userInfoHandle} name="userEmail"/>
            <div>
                {
                    resultOfValidation.status === 0
                    ?
                    setLng(`${resultOfValidation.text}`)
                    :
                    null
                }
            </div>
            <input type="text" placeholder="Password" onChange={userInfoHandle} name="userPassword"/>
            <span onClick={() => {navigate('/login')}}>Do you have an account?</span>
            <button onClick={setNewUser}>{setLng("new-user-title")}</button>
        </div>
    )
})