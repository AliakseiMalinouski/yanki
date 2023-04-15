import React from "react";

export const LoggedUser = React.memo(({userEmail, userName, userPhoto}) => {

    return (
        <div className="LoggedUser">
            <h4>{userEmail}</h4>
            <br/>
            <h5>{userName}</h5>
            <img style={{widht: '150px'}} src={userPhoto} alt="Avatar"/>
        </div>
    )
})