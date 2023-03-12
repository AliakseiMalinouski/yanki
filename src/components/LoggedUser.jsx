import React from "react";

export const LoggedUser = React.memo(({userEmail, userName}) => {
    return (
        <div className="LoggedUser">
            {userEmail}
            {userName}
        </div>
    )
})