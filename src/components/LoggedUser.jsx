import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { yankiEvents } from "../events";

export const LoggedUser = React.memo(({userEmail, setLng, userName, userPhoto, historyUrl}) => {

    const [newPhoto, setNewPhoto] = useState("");

    const changePhoto = () => {
        yankiEvents.emit('setNewPhotoProfile', newPhoto);
    }

    return (
        <div className="LoggedUser">
            <div className="UsersPhoto">
                <img style={{width: '550px'}} src={userPhoto} alt="Avatar"/>
                <br/>
                <input value={newPhoto} type="text" onChange={(eo) => {setNewPhoto(eo.target.value)}}/>
                <button onClick={changePhoto}>change photo</button>
            </div>
            <div className="UserInfo">
                <h4>{userName}</h4>
                <h5>{setLng('email-auth')} {userEmail}</h5>
                <NavLink to={historyUrl}>{setLng('check-history')}</NavLink>
            </div>
        </div>
    )
})