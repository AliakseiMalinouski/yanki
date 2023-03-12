import React from "react";

export const LoggedUser = React.memo(({userEmail}) => {
    return (
        <div className="LoggedUser">
            {userEmail}
        </div>
    )
})