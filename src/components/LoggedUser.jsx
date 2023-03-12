import React from "react";

export const LoggedUser = React.memo(({userEmail, userName}) => {
    return (
        <div className="LoggedUser">
            <h4>{userEmail}</h4>
            <br/>
            <h5>{userName}</h5>
        </div>
    )
})