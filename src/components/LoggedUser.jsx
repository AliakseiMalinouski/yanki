import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { yankiEvents } from "../events";
import { transformNameToUpCase } from "../helpers/transformNameToUpCase";

export const LoggedUser = React.memo(({userEmail, setLng, userName, userPhoto, historyUrl, metadataInfo}) => {

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
                    <div className="ChangePhotoTools">
                        <input value={newPhoto} type="text" onChange={(eo) => {setNewPhoto(eo.target.value)}}/>
                        <button onClick={changePhoto}>{setLng("change-photo-profile")}</button>
                    </div>
                    :
                    null
                }
                
            </div>
            <div className="UserInfo">
                <h4 className="UserNameAuth">{setLng('auth-name')} <span>{transformNameToUpCase(userName)}</span></h4>
                <h5 className="UserEmailAuth">{setLng('email-auth')} <span>{userEmail}</span></h5>
                <h6 className="MetadataTitle">{setLng("creation-time-and-last-signin")}</h6>
                <ul className="ListOfMetadataUser">
                    {
                        metadataInfo.map(element => <li key={Math.random()}>{element.substr(0,25)}</li>)
                    }
                </ul>
                <NavLink to={historyUrl} className='CheckOrderHistoryButton'>{setLng('check-history')}</NavLink>
                <span className="ChangeUsersPhotoButton" onClick={() => {setActive(prev => !prev)}}>{
                    !active
                    ?
                    setLng("change-photo-profile")
                    :
                    setLng("close-change-photo")
                }</span>
            </div>
        </div>
    )
})