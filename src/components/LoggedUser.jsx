import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { yankiEvents } from "../events";

export const LoggedUser = React.memo(({userEmail, setLng, userName, userPhoto, historyUrl}) => {

    const [newPhoto, setNewPhoto] = useState("");
    const [active, setActive] = useState(false);

    const changePhoto = () => {
        yankiEvents.emit('setNewPhotoProfile', newPhoto);
    }

    return (
        <div className="LoggedUser">
            <div className="UsersPhoto">
                <img style={{width: '560px'}} src={userPhoto} alt="Avatar"/>
                <br/>
                {
                    active
                    ?
                    <>
                        <input value={newPhoto} type="text" onChange={(eo) => {setNewPhoto(eo.target.value)}}/>
                        <button onClick={changePhoto}>change photo</button>
                    </>
                    :
                    null
                }
                
            </div>
            <div className="UserInfo">
                <h4>{setLng('auth-name')}{userName}</h4>
                <h5>{setLng('email-auth')} {userEmail}</h5>
                <NavLink to={historyUrl} className='CheckOrderHistoryButton'>{setLng('check-history')}</NavLink>
                <span className="ChangeUsersPhotoButton" onClick={() => {setActive(prev => !prev)}}>{
                    !active
                    ?
                    setLng("change-photo-profile")
                    :
                    "sadasd"
                }</span>
            </div>
        </div>
    )
})